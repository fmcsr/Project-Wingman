import { useState } from 'react';
import { InspectSurface } from '../inspector/InspectSurface';
import { InspectorLayerHost } from '../inspector/InspectorLayer';
import { examplesFor, matchesQuery } from '../library';
import type { Category, LibraryExample, Platform } from '../library';
import { Link, useDocumentTitle } from '../router';
import { FitPhone } from '../showcase/FitPhone';
import { InteractionGuide } from '../showcase/InteractionGuide';
import { SitePreview } from './SitePreview';
import styles from './Library.module.css';

const TABS: { platform: Platform; label: string }[] = [
  { platform: 'mobile', label: 'Mobile' },
  { platform: 'web', label: 'Web' },
];

/**
 * The library: mobile apps and websites in two tabs, like a pattern gallery. Phones can be inspected right in
 * the grid; sites open on their own page, where there's room to scroll through them.
 */
export function Library({ platform }: { platform: Platform }) {
  const label = platform === 'mobile' ? 'Mobile' : 'Web';
  useDocumentTitle(`${label} · Library · Project Wingman`);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  // Categories belong to a tab, so switching tabs starts again from "All"
  const [categoryTab, setCategoryTab] = useState(platform);
  if (categoryTab !== platform) {
    setCategoryTab(platform);
    setCategory(null);
  }

  const examples = examplesFor(platform);
  const categories = [...new Set(examples.map((example) => example.category))].sort();
  const shown = examples.filter(
    (example) => (!category || example.category === category) && matchesQuery(example, query),
  );
  const elementCount = shown.reduce((sum, example) => sum + example.specs.length, 0);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p className={styles.kicker}>[ Library ]</p>
        <h1 className={styles.title}>
          Every element, <span className={styles.muted}>explained.</span>
        </h1>
        <p className={styles.lead}>
          Patterns from the apps and sites you use every day. Hover anything to learn its name; click it for the
          full explanation.
        </p>
        <div className={styles.guide}>
          <InteractionGuide />
        </div>
      </header>

      <div className={styles.controls}>
        <nav className={styles.tabs} aria-label="Platform">
          {TABS.map((tab) => (
            <Link
              key={tab.platform}
              href={`/app/${tab.platform}`}
              className={styles.tab}
              aria-current={tab.platform === platform ? 'page' : undefined}
            >
              {tab.label}
              <span className={styles.tabCount}>{examplesFor(tab.platform).length}</span>
            </Link>
          ))}
        </nav>
        <label className={styles.search}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="sr-only">Search the library</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search apps or elements, e.g. bottom sheet"
          />
        </label>
      </div>

      <div className={styles.chips} role="group" aria-label="Category">
        <button type="button" className={styles.chip} aria-pressed={category === null} onClick={() => setCategory(null)}>
          All
        </button>
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            className={styles.chip}
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <p className={styles.summary} aria-live="polite">
        {shown.length} {shown.length === 1 ? 'example' : 'examples'} · {elementCount} elements
      </p>

      {shown.length === 0 ? (
        <div className={styles.empty}>
          <p>No {label.toLowerCase()} examples match “{query}”.</p>
          <button
            type="button"
            className={styles.chip}
            onClick={() => {
              setQuery('');
              setCategory(null);
            }}
          >
            Clear search
          </button>
        </div>
      ) : platform === 'mobile' ? (
        <div className={styles.stage}>
          <InspectorLayerHost className={styles.layer}>
            <ul className={styles.mobileGrid}>
              {shown.map((example) => (
                <MobileCard key={example.id} example={example} />
              ))}
            </ul>
          </InspectorLayerHost>
        </div>
      ) : (
        <ul className={styles.webGrid}>
          {shown.map((example) => (
            <WebCard key={example.id} example={example} />
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileCard({ example }: { example: LibraryExample }) {
  const { Component } = example;
  return (
    <li className={styles.card}>
      <div className={styles.meta}>
        <Link href={`/app/mobile/${example.id}`} className={styles.name}>
          {example.name}
        </Link>
        <span className={styles.kind}>{example.kind}</span>
        <span className={styles.count}>{example.specs.length} elements</span>
      </div>
      <FitPhone>
        <InspectSurface label={`${example.name} ${example.kind.toLowerCase()}`} specs={example.specs} fill>
          <Component />
        </InspectSurface>
      </FitPhone>
      <p className={styles.inspired}>Inspired by {example.inspiredBy.join(', ')}</p>
    </li>
  );
}

/** The whole card opens the example: the title's link stretches over it (the preview has links of its own). */
function WebCard({ example }: { example: LibraryExample }) {
  return (
    <li className={styles.webCard}>
      <div className={styles.thumb}>
        <SitePreview Component={example.Component} />
      </div>
      <div className={styles.meta}>
        <Link href={`/app/web/${example.id}`} className={`${styles.name} ${styles.cardLink}`}>
          {example.name}
        </Link>
        <span className={styles.kind}>{example.kind}</span>
        <span className={styles.count}>{example.specs.length} elements</span>
      </div>
      <p className={styles.description}>{example.description}</p>
      <p className={styles.inspired}>Inspired by {example.inspiredBy.join(', ')}</p>
    </li>
  );
}
