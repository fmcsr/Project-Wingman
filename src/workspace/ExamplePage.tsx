import { AddToBrief } from '../brief/AddToBrief';
import { InspectSurface } from '../inspector/InspectSurface';
import { InspectorLayerHost } from '../inspector/InspectorLayer';
import { examplesFor, platformLabel } from '../library';
import type { LibraryExample } from '../library';
import { Link, useDocumentTitle } from '../router';
import { BrowserFrame } from '../showcase/BrowserFrame';
import { FitPhone } from '../showcase/FitPhone';
import { FitWatch } from '../showcase/WatchFrame';
import { ElementGlossary } from './ElementGlossary';
import styles from './ExamplePage.module.css';

/**
 * One example at full size, with every element written out next to it (phones and watches) or below it (sites).
 * Sites use the scroll scene: the window pins and page scrolling scrolls the site.
 */
export function ExamplePage({ example }: { example: LibraryExample }) {
  useDocumentTitle(`${example.name} · Library · Project Wingman`);
  const { Component } = example;
  const label = platformLabel(example.platform);
  const siblings = examplesFor(example.platform);
  const index = siblings.indexOf(example);
  const previous = siblings[(index - 1 + siblings.length) % siblings.length];
  const next = siblings[(index + 1) % siblings.length];

  const surface = (
    <InspectSurface
      label={`${example.name} ${example.kind.toLowerCase()}`}
      specs={example.specs}
      fill={example.platform !== 'web'}
      renderAction={(spec) => <AddToBrief example={example} specId={spec.id} tone="balloon" />}
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
        <p className={styles.inspired}>
          Inspired by {example.inspiredBy.join(', ')}. A fictional example, not affiliated with them.
        </p>
      </header>

      <div className={styles.stage}>
        <InspectorLayerHost className={styles.layer}>
          {example.platform === 'web' ? (
            <div className={styles.webLayout}>
              <BrowserFrame url={example.url ?? `${example.id}.app`}>{surface}</BrowserFrame>
              <ElementGlossary example={example} />
            </div>
          ) : (
            <div className={styles.mobileLayout}>
              <div className={styles.phoneColumn}>
                {example.platform === 'watch' ? <FitWatch>{surface}</FitWatch> : <FitPhone>{surface}</FitPhone>}
              </div>
              <ElementGlossary example={example} />
            </div>
          )}
        </InspectorLayerHost>
      </div>

      {/* A tab with a single example has nowhere else to go */}
      {siblings.length > 1 && (
        <nav className={styles.pager} aria-label="More examples">
          <Link href={`/app/${example.platform}/${previous.id}`}>
            <span className={styles.pagerLabel}>Previous</span>← {previous.name}
          </Link>
          <Link href={`/app/${example.platform}/${next.id}`} className={styles.next}>
            <span className={styles.pagerLabel}>Next</span>
            {next.name} →
          </Link>
        </nav>
      )}
    </div>
  );
}
