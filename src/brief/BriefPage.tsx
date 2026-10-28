import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ButtonLink } from '../landing/ButtonLink';
import { Link, useDocumentTitle } from '../router';
import { briefToMarkdown } from './briefMarkdown';
import {
  clearBrief,
  moveInBrief,
  removeFromBrief,
  setBriefGoal,
  setBriefNote,
  useBrief,
  useBriefItems,
} from './briefStore';
import type { ResolvedItem } from './briefStore';
import styles from './BriefPage.module.css';

/**
 * The brief: what the user is building and the elements they picked in the library, turned into Markdown an AI
 * coding tool can follow. It's kept in this browser and the Markdown updates as you type.
 */
export function BriefPage() {
  useDocumentTitle('Brief · Project Wingman');
  const { goal } = useBrief();
  const items = useBriefItems();
  const markdown = useMemo(() => briefToMarkdown(goal, items), [goal, items]);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p className={styles.kicker}>[ Brief ]</p>
        <h1 className={styles.title}>
          Your brief <span className={styles.muted}>for AI coding tools</span>
        </h1>
        <p className={styles.lead}>
          Pick elements in the library, say what you're building, and copy a brief that Claude Code, Cursor or any AI
          coding tool can follow.
        </p>
      </header>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.layout}>
          <div className={styles.editor}>
            <GoalField goal={goal} />
            <ItemList items={items} />
          </div>
          <Preview markdown={markdown} />
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle}>Your brief is empty</p>
      <p className={styles.emptyText}>
        Open an example in the library and choose <strong>Add to brief</strong> on any element, in its pinned
        explanation or in the element list next to it.
      </p>
      <div className={styles.emptyActions}>
        <ButtonLink href="/app/mobile" variant="primary" size="sm">
          Browse apps
        </ButtonLink>
        <ButtonLink href="/app/web" size="sm">
          Browse websites
        </ButtonLink>
      </div>
    </div>
  );
}

function GoalField({ goal }: { goal: string }) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        What are you building?
      </label>
      <textarea
        id={id}
        className={styles.textarea}
        rows={3}
        value={goal}
        onChange={(event) => setBriefGoal(event.target.value)}
        placeholder="e.g. A pricing page for our SaaS: a sticky navbar, three plan cards and an FAQ."
        aria-describedby={`${id}hint`}
      />
      <p id={`${id}hint`} className={styles.hint}>
        Optional. A sentence or two of context helps the tool make the right calls.
      </p>
    </div>
  );
}

function ItemList({ items }: { items: ResolvedItem[] }) {
  const [confirming, setConfirming] = useState(false);
  const clearRef = useRef<HTMLButtonElement>(null);

  // The question replaces the button, so focus moves to Cancel and comes back when it's answered with Cancel
  const cancel = () => {
    flushSync(() => setConfirming(false));
    clearRef.current?.focus();
  };

  return (
    <section aria-labelledby="brief-elements">
      <div className={styles.listHead}>
        <h2 id="brief-elements" className={styles.sectionTitle}>
          Elements <span className={styles.count}>{items.length}</span>
        </h2>
        {confirming ? (
          <div className={styles.confirm}>
            <span>Clear the whole brief?</span>
            <button type="button" className={`${styles.textButton} ${styles.danger}`} onClick={clearBrief}>
              Clear
            </button>
            <button type="button" className={styles.textButton} onClick={cancel} autoFocus>
              Cancel
            </button>
          </div>
        ) : (
          <button ref={clearRef} type="button" className={styles.textButton} onClick={() => setConfirming(true)}>
            Clear brief
          </button>
        )}
      </div>
      <ol className={styles.list}>
        {items.map((resolved, index) => (
          <Item key={resolved.key} resolved={resolved} index={index} last={index === items.length - 1} />
        ))}
      </ol>
    </section>
  );
}

function Item({ resolved, index, last }: { resolved: ResolvedItem; index: number; last: boolean }) {
  const { key, item, example, spec } = resolved;
  const noteId = useId();
  const upRef = useRef<HTMLButtonElement>(null);
  const downRef = useRef<HTMLButtonElement>(null);

  const move = (offset: -1 | 1) => {
    // Reordering can move the row in the DOM or turn its arrow off, either of which drops focus. Apply the move
    // right away, then put focus back on the same arrow (or the other one once the row reaches the end).
    flushSync(() => moveInBrief(key, offset));
    const [same, other] = offset === -1 ? [upRef.current, downRef.current] : [downRef.current, upRef.current];
    (same && !same.disabled ? same : other)?.focus();
  };

  return (
    <li className={styles.item}>
      <div className={styles.itemHead}>
        <span className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className={styles.itemTitle}>
          <h3 className={styles.itemName}>
            {spec.name}
            {spec.htmlTag && <code className={styles.tag}>{spec.htmlTag}</code>}
          </h3>
          <p className={styles.itemMeta}>
            {spec.variant && `${spec.variant} · `}from{' '}
            <Link href={`/app/${example.platform}/${example.id}`}>{example.name}</Link>
          </p>
        </div>
        <div className={styles.itemActions}>
          <button
            ref={upRef}
            type="button"
            className={styles.iconButton}
            disabled={index === 0}
            onClick={() => move(-1)}
            aria-label={`Move ${spec.name} up`}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="m4 10 4-4 4 4" />
            </svg>
          </button>
          <button
            ref={downRef}
            type="button"
            className={styles.iconButton}
            disabled={last}
            onClick={() => move(1)}
            aria-label={`Move ${spec.name} down`}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="m4 6 4 4 4-4" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => removeFromBrief(key)}
            aria-label={`Remove ${spec.name}`}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="m4.5 4.5 7 7M11.5 4.5l-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <label htmlFor={noteId} className={styles.noteLabel}>
        Note <span>optional</span>
      </label>
      <textarea
        id={noteId}
        className={styles.textarea}
        rows={2}
        value={item.note}
        onChange={(event) => setBriefNote(key, event.target.value)}
        placeholder="Anything that should differ from the example? e.g. Use our brand color"
      />
    </li>
  );
}

type CopyState = 'idle' | 'copied' | 'failed';

function Preview({ markdown }: { markdown: string }) {
  const [copy, setCopy] = useState<CopyState>('idle');

  useEffect(() => {
    if (copy === 'idle') return;
    const timer = window.setTimeout(() => setCopy('idle'), copy === 'copied' ? 2000 : 6000);
    return () => window.clearTimeout(timer);
  }, [copy]);

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopy('copied');
    } catch {
      setCopy('failed');
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ui-brief.md';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className={styles.preview} aria-labelledby="brief-markdown">
      <div className={styles.previewHead}>
        <h2 id="brief-markdown" className={styles.sectionTitle}>
          Markdown
        </h2>
        <div className={styles.previewActions}>
          <button type="button" className={styles.secondary} onClick={download}>
            Download .md
          </button>
          <button type="button" className={styles.primary} onClick={copyBrief}>
            {copy === 'copied' ? (
              <>
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                Copied
              </>
            ) : (
              'Copy brief'
            )}
          </button>
        </div>
      </div>
      {/* Focusable so keyboard users can scroll it */}
      <pre className={styles.code} tabIndex={0} aria-label="The brief in Markdown">
        <code>{markdown}</code>
      </pre>
      <p className={styles.status} role="status">
        {copy === 'copied' && 'Copied. Paste it into your coding tool.'}
        {copy === 'failed' && "Couldn't copy. Select the text above and copy it instead."}
      </p>
    </section>
  );
}
