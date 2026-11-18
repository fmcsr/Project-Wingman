import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { InteractionGuide } from '../showcase/InteractionGuide';
import { ButtonLink } from './ButtonLink';
import { Comparisons } from './Comparisons';
import { Gallery } from './Gallery';
import { ELEMENTS_HREF, WORKSPACE_HREF } from './links';
import { SectionHeader } from './SectionHeader';
import styles from './Examples.module.css';

type TabId = 'with' | 'without';

type Tab = {
  id: TabId;
  label: string;
  /** The section's description while the tab is open. */
  description: string;
  /** The way into the library under the tab's examples. */
  more: { text: string; href: string; label: string };
};

const TABS: Tab[] = [
  {
    id: 'with',
    label: 'With Wingman',
    description:
      'Fifteen elements from apps you use every day, working the way they do there. Each has a name your AI coding tool understands, and so does every part of it.',
    more: {
      text: "There's a lot more inside: forms, navigation, charts and the small interactions in between, every part explained.",
      href: ELEMENTS_HREF,
      label: 'Explore all elements',
    },
  },
  {
    id: 'without',
    label: 'Without Wingman',
    description:
      'What an AI coding tool builds from a vague prompt, next to the same product built from a Wingman brief that names every element. Drag the line on each example and hover either side to learn the names.',
    more: {
      text: "There's a lot more inside: a library of mobile apps, websites and watch apps, every element explained.",
      href: WORKSPACE_HREF,
      label: 'Explore the library',
    },
  },
];

/**
 * The examples, right under the hero, in two tabs next to the ways to explore them. With Wingman, the default, is
 * the element gallery: elements from apps people use every day, live and inspectable. Without Wingman puts the AI
 * slop a vague prompt produces next to the same products built from a Wingman brief, on two sites and three phones.
 * Only the open tab is rendered, so the comparisons' scroll scenes don't run behind the gallery.
 */
export function Examples() {
  const [tab, setTab] = useState<TabId>('with');
  const buttons = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const current = TABS.find((entry) => entry.id === tab) ?? TABS[0];

  // Tabs pattern: one tab stop; the arrow keys, Home and End move between the tabs and open them
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = TABS.findIndex((entry) => entry.id === tab);
    const target = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: TABS.length - 1,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = TABS[(target + TABS.length) % TABS.length];
    setTab(next.id);
    buttons.current[next.id]?.focus();
  };

  return (
    <section id="examples" className={styles.section} aria-labelledby="examples-title">
      <div className="container">
        <SectionHeader
          id="examples-title"
          index="[01]"
          label="Examples"
          title="You've seen them."
          muted="Now name them."
          description={current.description}
        />
        <div className={styles.controls}>
          <div role="tablist" aria-label="Examples" className={styles.tabs} onKeyDown={onKeyDown}>
            {TABS.map((entry) => (
              <button
                key={entry.id}
                ref={(button) => {
                  buttons.current[entry.id] = button;
                }}
                id={`examples-tab-${entry.id}`}
                type="button"
                role="tab"
                aria-selected={entry.id === tab}
                aria-controls="examples-panel"
                tabIndex={entry.id === tab ? 0 : -1}
                className={styles.tab}
                onClick={() => setTab(entry.id)}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <InteractionGuide />
        </div>
      </div>

      <div id="examples-panel" role="tabpanel" aria-labelledby={`examples-tab-${tab}`}>
        {tab === 'with' ? <Gallery /> : <Comparisons />}
      </div>

      <div className={`container ${styles.more}`}>
        <p className={styles.moreText}>{current.more.text}</p>
        <ButtonLink href={current.more.href} variant="primary" size="lg">
          {current.more.label}
        </ButtonLink>
      </div>
    </section>
  );
}
