import { useId } from 'react';
import { AddToBrief } from '../brief/AddToBrief';
import { valueFor } from '../catalog';
import type { LibraryExample } from '../library';
import { useTheme } from '../theme';
import styles from './ElementGlossary.module.css';

/**
 * Every element of an example written out, in the order it appears: what it is, what people call it, and the
 * terms and values to brief a coding tool with. Each one can go into the brief. Color values follow the theme
 * in use, like the balloons.
 */
export function ElementGlossary({ example }: { example: LibraryExample }) {
  const id = useId();
  const theme = useTheme();
  const { name, specs } = example;

  return (
    <section className={styles.section} aria-labelledby="glossary-title">
      <p className={styles.kicker}>[ Elements ]</p>
      <h2 id="glossary-title" className={styles.title}>
        {specs.length} elements in {name}
      </h2>
      <ol className={styles.list}>
        {specs.map((spec) => (
          <li key={spec.id} className={styles.entry}>
            <div className={styles.head}>
              <div>
                <h3 id={`${id}${spec.id}`} className={styles.name}>
                  {spec.name}
                  {spec.htmlTag && <code className={styles.tag}>{spec.htmlTag}</code>}
                </h3>
                {spec.variant && <p className={styles.variant}>{spec.variant}</p>}
              </div>
              <AddToBrief example={example} specId={spec.id} describedBy={`${id}${spec.id}`} />
            </div>
            <p className={styles.summary}>{spec.summary}</p>
            {spec.aliases.length > 0 && (
              <p className={styles.aliases}>
                <span>Also called</span>
                {spec.aliases.map((alias) => (
                  <span key={alias} className={styles.alias}>
                    “{alias}”
                  </span>
                ))}
              </p>
            )}
            <dl className={styles.concepts}>
              {spec.concepts.map((concept) => (
                <div key={concept.term} className={styles.concept}>
                  <dt>
                    <span className={styles.kind}>{concept.kind === 'appearance' ? 'Look' : 'Behavior'}</span>
                    <code className={styles.term}>{concept.term}</code>
                    {concept.value && <code className={styles.value}>{valueFor(concept.value, theme)}</code>}
                  </dt>
                  <dd>{concept.plain}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
