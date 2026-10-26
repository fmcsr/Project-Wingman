import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { valueFor } from '../catalog';
import type { ConceptKind, UiElementSpec } from '../catalog';
import { useTheme } from '../theme';
import type { AnchorPosition } from './useAnchorPosition';
import type { InspectMode } from './useInspectSurface';
import styles from './Explainer.module.css';

const GROUPS: { kind: ConceptKind; label: string }[] = [
  { kind: 'appearance', label: 'Look' },
  { kind: 'behavior', label: 'Behavior' },
];

type ExplainerProps = Pick<
  HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onBlur'
> & {
  ref?: Ref<HTMLElement>;
  id: string;
  spec: UiElementSpec;
  mode: InspectMode;
  position: AnchorPosition | null;
  onClose: () => void;
};

/**
 * Explainer balloon. In preview, a short summary and term chips; once pinned, everyday names
 * and plain-language explanations of the concepts ("hover: learn its name, click: understand it").
 */
export function Explainer({ ref, id, spec, mode, position, onClose, ...handlers }: ExplainerProps) {
  const titleId = `${id}title`;
  const pinned = mode === 'pinned';
  // The example sites follow the page theme, so color values are shown for the theme in use
  const theme = useTheme();
  const style = position
    ? ({ top: position.top, left: position.left, '--arrow-x': `${position.arrowX}px` } as CSSProperties)
    : undefined;

  return (
    <section
      ref={ref}
      id={id}
      className={styles.panel}
      data-mode={mode}
      data-placement={position?.placement ?? 'bottom'}
      hidden={mode === 'closed'}
      aria-labelledby={titleId}
      tabIndex={-1}
      style={style}
      {...handlers}
    >
      <span className={styles.arrow} aria-hidden="true" />

      <header className={styles.header}>
        <p className={styles.eyebrow}>UI element</p>
        <h3 id={titleId} className={styles.title}>
          {spec.name}{' '}
          {spec.htmlTag && <code className={styles.tag}>{spec.htmlTag}</code>}
        </h3>
        {spec.variant && <p className={styles.variant}>{spec.variant}</p>}
      </header>

      {pinned && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close details">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      <p className={styles.summary}>{spec.summary}</p>

      {pinned ? (
        <>
          {spec.aliases.length > 0 && (
            <div className={styles.aliases}>
              <span className={styles.aliasesLabel}>Also known as</span>
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
                  <h4 className={styles.groupTitle}>{label}</h4>
                  <ul className={styles.concepts} role="list">
                    {concepts.map((concept) => (
                      <li key={concept.term} className={styles.concept}>
                        <div className={styles.termRow}>
                          <code className={styles.term}>{concept.term}</code>{' '}
                          {concept.value && (
                            <code className={styles.value}>
                              {valueFor(concept.value, theme)}
                            </code>
                          )}
                        </div>
                        <p className={styles.plain}>{concept.plain}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <ul className={styles.termList} role="list">
          {spec.concepts.map((concept) => (
            <li key={concept.term}>
              <code className={styles.term}>{concept.term}</code>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.hint}>
        {pinned ? (
          <>
            <span className={styles.forHover}>
              Pinned · Click outside or press <kbd>Esc</kbd> to close
            </span>
            <span className={styles.forTouch}>Pinned · Tap outside to close</span>
          </>
        ) : (
          <>
            Click or press <kbd>Enter</kbd> for details
          </>
        )}
      </p>
    </section>
  );
}
