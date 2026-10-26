import { InspectSurface } from '../inspector/InspectSurface';
import { InspectorLayerHost } from '../inspector/InspectorLayer';
import { examplesFor } from '../library';
import type { LibraryExample } from '../library';
import { Link, useDocumentTitle } from '../router';
import { BrowserFrame } from '../showcase/BrowserFrame';
import { FitPhone } from '../showcase/FitPhone';
import { ElementGlossary } from './ElementGlossary';
import styles from './ExamplePage.module.css';

/**
 * One example at full size, with every element written out next to it (phones) or below it (sites).
 * Sites use the scroll scene: the window pins and page scrolling scrolls the site.
 */
export function ExamplePage({ example }: { example: LibraryExample }) {
  useDocumentTitle(`${example.name} · Library · Project Wingman`);
  const { Component } = example;
  const label = example.platform === 'mobile' ? 'Mobile' : 'Web';
  const siblings = examplesFor(example.platform);
  const index = siblings.indexOf(example);
  const previous = siblings[(index - 1 + siblings.length) % siblings.length];
  const next = siblings[(index + 1) % siblings.length];

  const surface = (
    <InspectSurface
      label={`${example.name} ${example.kind.toLowerCase()}`}
      specs={example.specs}
      fill={example.platform === 'mobile'}
    >
      <Component />
    </InspectSurface>
  );

  return (
    <div className={`container ${styles.page}`}>
      <Link href={`/app/${example.platform}`} className={styles.back}>
        ← {label}
      </Link>
      <header className={styles.header}>
        <p className={styles.kicker}>
          [ {label} · {example.category} ]
        </p>
        <h1 className={styles.title}>
          {example.name} <span className={styles.muted}>{example.kind}</span>
        </h1>
        <p className={styles.lead}>{example.description}</p>
        <p className={styles.inspired}>Inspired by {example.inspiredBy.join(', ')}</p>
      </header>

      <div className={styles.stage}>
        <InspectorLayerHost className={styles.layer}>
          {example.platform === 'web' ? (
            <div className={styles.webLayout}>
              <BrowserFrame url={example.url ?? `${example.id}.app`}>{surface}</BrowserFrame>
              <ElementGlossary name={example.name} specs={example.specs} />
            </div>
          ) : (
            <div className={styles.mobileLayout}>
              <div className={styles.phoneColumn}>
                <FitPhone>{surface}</FitPhone>
              </div>
              <ElementGlossary name={example.name} specs={example.specs} />
            </div>
          )}
        </InspectorLayerHost>
      </div>

      <nav className={styles.pager} aria-label="More examples">
        <Link href={`/app/${example.platform}/${previous.id}`}>
          <span className={styles.pagerLabel}>Previous</span>← {previous.name}
        </Link>
        <Link href={`/app/${example.platform}/${next.id}`} className={styles.next}>
          <span className={styles.pagerLabel}>Next</span>
          {next.name} →
        </Link>
      </nav>
    </div>
  );
}
