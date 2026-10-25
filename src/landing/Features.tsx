import { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import styles from './Features.module.css';

const FEATURES = [
  {
    title: 'Name what you see',
    text: "Hover any element to learn what it's really called — navbar, toast, skeleton loader — and why it looks that way.",
  },
  {
    title: 'Explained like a friend would',
    text: 'Concepts like backdrop-filter or breakpoints in plain language, with the exact values behind them.',
  },
  {
    title: 'Prompts that land',
    text: 'Turn a vague idea into a structured prompt: look, behavior, technical terms, and acceptance criteria.',
    soon: true,
  },
  {
    title: "Speak your engineers' language",
    text: 'Share one vocabulary with your team and cut the back-and-forth on every ticket.',
  },
  {
    title: 'Real interfaces, not diagrams',
    text: 'Learn on marketing sites, dashboards, and mobile apps that look like the products you ship.',
  },
  {
    title: 'Made for AI coding tools',
    text: 'Copy-ready briefs for Claude Code, Cursor, and whatever your team uses next.',
    soon: true,
  },
];

function FeatureCards() {
  return FEATURES.map((feature, index) => (
    <li key={feature.title} className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.index}>[{String(index + 1).padStart(2, '0')}]</span>
        {feature.soon && <span className={styles.soon}>Soon</span>}
      </div>
      <div>
        <h3 className={styles.cardTitle}>{feature.title}</h3>
        <p className={styles.cardText}>{feature.text}</p>
      </div>
    </li>
  ));
}

/**
 * Değer kartları: kayan yazı gibi yavaşça sola akan, kesintisiz bir şerit. İmleç üzerindeyken ya da düğmeyle
 * durur; "hareketi azalt" açıkken akmaz, kartlar sıralı durur. İkinci kopya yalnızca döngü içindir, gizlidir.
 */
export function Features() {
  const [paused, setPaused] = useState(false);

  const toggle = (
    <button
      type="button"
      className={styles.toggle}
      aria-label="Pause scrolling"
      aria-pressed={paused}
      onClick={() => setPaused((current) => !current)}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        {paused ? <path d="M8 5.5v13l10.5-6.5z" /> : <path d="M7.5 5h3v14h-3zM13.5 5h3v14h-3z" />}
      </svg>
    </button>
  );

  return (
    <section id="features" className={styles.section} aria-labelledby="features-title">
      <div className="container">
        <SectionHeader
          id="features-title"
          index="[02]"
          label="Features"
          title="Less guessing."
          muted="More shipping."
          description="Everything a PM needs to talk design with confidence, and to brief AI coding tools like a pro."
          actions={toggle}
        />
      </div>
      <div className={styles.marquee} data-paused={paused || undefined}>
        <div className={styles.track}>
          <ul className={styles.group} aria-label="Features">
            <FeatureCards />
          </ul>
          <ul className={styles.group} aria-hidden="true">
            <FeatureCards />
          </ul>
        </div>
      </div>
    </section>
  );
}
