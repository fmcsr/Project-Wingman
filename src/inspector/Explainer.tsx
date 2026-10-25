import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import type { ConceptKind, UiElementSpec } from '../catalog';
import type { AnchorPosition } from './useAnchorPosition';
import type { InspectorMode } from './useInspector';
import styles from './Explainer.module.css';

const GROUPS: { kind: ConceptKind; label: string }[] = [
  { kind: 'appearance', label: 'Görünüm' },
  { kind: 'behavior', label: 'Davranış' },
];

type ExplainerProps = Pick<
  HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onBlur'
> & {
  ref?: Ref<HTMLElement>;
  id: string;
  summaryId: string;
  spec: UiElementSpec;
  mode: InspectorMode;
  position: AnchorPosition | null;
  onClose: () => void;
};

/** Açıklama balonu: teknik ad, kısa açıklama ve ilgili kavramların sade dille anlatımı. */
export function Explainer({ ref, id, summaryId, spec, mode, position, onClose, ...handlers }: ExplainerProps) {
  const titleId = `${id}title`;
  const style = position
    ? ({ top: position.top, left: position.left, '--arrow-x': `${position.arrowX}px` } as CSSProperties)
    : undefined;

  return (
    <section
      ref={ref}
      id={id}
      className={styles.panel}
      data-mode={mode}
      hidden={mode === 'closed'}
      aria-labelledby={titleId}
      tabIndex={-1}
      style={style}
      {...handlers}
    >
      <span className={styles.arrow} aria-hidden="true" />

      <header className={styles.header}>
        <p className={styles.eyebrow}>UI öğesi</p>
        <h2 id={titleId} className={styles.title}>
          {spec.name}{' '}
          {spec.htmlTag && <code className={styles.tag}>{spec.htmlTag}</code>}
        </h2>
        {spec.variant && <p className={styles.variant}>{spec.variant}</p>}
      </header>

      {mode === 'pinned' && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Açıklamayı kapat">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      <p id={summaryId} className={styles.summary}>
        {spec.summary}
      </p>

      {spec.aliases.length > 0 && (
        <div className={styles.aliases}>
          <span className={styles.aliasesLabel}>Gündelik dilde</span>
          <ul className={styles.aliasList} role="list">
            {spec.aliases.map((alias) => (
              <li key={alias}>“{alias}”</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.groups}>
        {GROUPS.map(({ kind, label }) => {
          const concepts = spec.concepts.filter((concept) => concept.kind === kind);
          if (concepts.length === 0) return null;
          return (
            <div key={kind}>
              <h3 className={styles.groupTitle}>{label}</h3>
              <ul className={styles.concepts} role="list">
                {concepts.map((concept) => (
                  <li key={concept.term} className={styles.concept}>
                    <div className={styles.termRow}>
                      <code className={styles.term}>{concept.term}</code>{' '}
                      {concept.value && <code className={styles.value}>{concept.value}</code>}
                    </div>
                    <p className={styles.plain}>{concept.plain}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className={styles.hint}>
        {mode === 'pinned' ? (
          <>
            <span className={styles.forHover}>
              Sabitlendi · Dışarı tıkla ya da <kbd>Esc</kbd> ile kapat
            </span>
            <span className={styles.forTouch}>Sabitlendi · Kapatmak için dışarıya dokun</span>
          </>
        ) : (
          <>
            Tıkla ya da <kbd>Enter</kbd> ile sabitle · <kbd>Esc</kbd> ile kapat
          </>
        )}
      </p>
    </section>
  );
}
