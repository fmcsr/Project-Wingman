import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './SelectableCards.module.css';

type Plan = { name: string; price: number; description: string; popular?: boolean };

/** The three plans, cheapest first, as a sign-up flow offers them. */
const PLANS: Plan[] = [
  { name: 'Starter', price: 0, description: 'For personal projects' },
  { name: 'Pro', price: 12, description: 'For growing teams', popular: true },
  { name: 'Team', price: 24, description: 'Adds SSO and audit logs' },
];

/** Pro's place in the list: the plan selected at rest. */
const PRO = 1;

/**
 * One moment of the loop: the plan that's selected, the card the pointer is over, whether it's pressing, and how long
 * the moment lasts. `hold` moments wait while the tile is inspected or out of view; a press always finishes, so a
 * card is never left pressed in.
 */
type Step = { selected: number; pointer: number; pressed?: boolean; hold?: boolean; ms: number };

/** The pointer moves to a card, rests a moment over it, presses and lets go: the selection moves there. */
function choose(from: number, to: number, rest: number): Step[] {
  return [
    { selected: from, pointer: to, hold: true, ms: 750 },
    { selected: from, pointer: to, pressed: true, ms: 130 },
    { selected: to, pointer: to, hold: true, ms: rest },
  ];
}

/** Pro, then Team, back to Pro, Starter and back to Pro: the selection walks the group and returns. */
const STEPS: Step[] = [
  ...choose(PRO, 2, 1700),
  ...choose(2, PRO, 1300),
  ...choose(PRO, 0, 1700),
  ...choose(0, PRO, 1300),
];

/** The still picture: Pro selected, no pointer. */
const FINAL: Step = { selected: PRO, pointer: PRO, ms: 0 };

/** Steps through the loop; `hold` steps wait while the tile isn't playing, the short beats in between always finish. */
function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(STEPS.length - 1);
  const held = final || (STEPS[index].hold === true && !playing);

  useEffect(() => {
    if (held) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, held]);

  return final ? FINAL : STEPS[index];
}

/**
 * Selectable cards: the plan step of a sign-up flow, with three plans as cards in a radio group. Each card is one big
 * radio button: a radio circle, the plan's name, a short description and the price; Pro carries a Most popular badge.
 * The selected card has the accent border, a faint accent fill and its radio filled with a check. Side by side where
 * there's room, stacked as compact rows on a narrow tile. In the loop a pointer clicks Team, Pro, Starter and Pro again,
 * and the border and the fill move with it; reduced motion shows Pro selected.
 */
export function SelectableCards() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);

  return (
    <div ref={ref} className={styles.tile} data-still={final || undefined}>
      <div className={styles.picker}>
        <div className={styles.header}>
          <span className={styles.heading}>
            <span className={styles.title}>Choose a plan</span>
            <span className={styles.subtitle}>Switch or cancel anytime</span>
          </span>
          <span className={styles.billing}>
            <span className={styles.period} data-current="">
              Monthly
            </span>
            <span className={styles.period}>Yearly</span>
          </span>
        </div>

        <div
          className={styles.group}
          role="radiogroup"
          aria-label="Plan"
          data-inspect="selectable-cards"
          style={{ '--pointer': step.pointer } as CSSProperties}
        >
          {PLANS.map((plan, index) => {
            const selected = index === step.selected;
            return (
              <div
                key={plan.name}
                className={styles.card}
                role="radio"
                aria-checked={selected}
                data-inspect={selected ? 'selectable-cards-selected' : 'selectable-cards-card'}
                data-hover={(!final && index === step.pointer) || undefined}
                data-pressed={(index === step.pointer && step.pressed) || undefined}
              >
                <span className={styles.radio} data-inspect="selectable-cards-radio">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m4.75 8.25 2.25 2.25 4.25-4.5" pathLength={1} />
                  </svg>
                </span>
                <span className={styles.name}>
                  {plan.name}
                  {plan.popular && (
                    <span className={styles.badge} data-inspect="selectable-cards-badge">
                      Most popular
                    </span>
                  )}
                </span>
                <span className={styles.description}>{plan.description}</span>
                <span className={styles.price}>
                  <span className={styles.amount}>${plan.price}</span>
                  <span className={styles.per}>/mo</span>
                </span>
              </div>
            );
          })}

          <svg className={styles.pointer} viewBox="0 0 20 24" aria-hidden="true">
            <path d="M3 2.5v16.2l4.1-4 2.7 6.3 2.9-1.2-2.7-6.3h5.8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
