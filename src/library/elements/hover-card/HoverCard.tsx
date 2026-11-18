import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './HoverCard.module.css';
import kofi from '../photos/kofi.webp';
import leila from '../photos/leila.webp';

/** Where the pointer is: off to the side, on the mention, or on the card's Follow button. */
type Spot = 'away' | 'mention' | 'follow';

/**
 * One beat of the loop: where the pointer is, whether the card is open, whether Leila is followed, whether the pointer
 * is pressing, and how long the beat lasts.
 */
type Step = { at: Spot; open: boolean; following?: boolean; press?: boolean; ms: number };

/**
 * The pointer comes onto the mention and rests; after the open delay the card fades and scales in under it. The
 * pointer moves down into the card, which stays open, and clicks Follow: the button turns to Following and the count
 * goes up by one. It leaves, and after a short grace period the card fades away.
 */
const STEPS: Step[] = [
  { at: 'away', open: false, ms: 1200 },
  { at: 'mention', open: false, ms: 950 },
  { at: 'mention', open: true, ms: 2000 },
  { at: 'follow', open: true, ms: 1000 },
  { at: 'follow', open: true, press: true, ms: 120 },
  { at: 'follow', open: true, following: true, ms: 1400 },
  { at: 'away', open: true, following: true, ms: 750 },
  { at: 'away', open: false, following: true, ms: 600 },
];

/** Reduced motion: the card open under the mention, the pointer still on it. */
const FINAL = STEPS[2];

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return final ? FINAL : STEPS[index];
}

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  more: 'M6 12h.01M12 12h.01M18 12h.01',
  thumbsUp:
    'M7.5 10.5v9M7.5 10.5l3.6-6.3a1.6 1.6 0 0 1 2.9 1.2l-.8 4.1h4.9a2 2 0 0 1 2 2.4l-1.3 6a2 2 0 0 1-2 1.6H7.5M7.5 10.5h-3v9h3',
  smilePlus:
    'M20.5 11.5a8.5 8.5 0 1 1-7-8.4M8.5 14a4 4 0 0 0 6 0M9 9.5h.01M14 9.5h.01M18.5 2.5v5M16 5h5',
  at: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm0 0v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1',
};

function Icon({ d }: { d: string }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

/**
 * Hover card: a comment on an issue that mentions @leila. Resting the pointer on the mention opens a card with her
 * avatar, name, handle, a one-line bio, her follower counts and a Follow button, an arrow pointing back at the
 * mention. The loop: the pointer arrives and, after a short delay, the card fades and scales in; the pointer moves
 * into it (it stays open) and follows her, then leaves, and the card fades away.
 */
export function HoverCard() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-at={step.at}
      data-open={step.open || undefined}
      data-press={step.press || undefined}
    >
      <article className={styles.comment}>
        <header className={styles.byline}>
          <img className={styles.face} src={kofi} alt="" width={20} height={20} />
          <span className={styles.author}>Kofi Mensah</span>
          <span className={styles.time}>
            <span className={styles.verb}>commented </span>2h ago
          </span>
          <Icon d={ICONS.more} />
        </header>
        <p className={styles.body}>
          <a className={styles.mention} data-inspect="hover-card-trigger">
            @leila
          </a>{' '}
          can you give the empty-state copy a last pass before Friday?
        </p>
        <div className={styles.reactions}>
          <span className={styles.reaction}>
            <Icon d={ICONS.thumbsUp} />2
          </span>
          <span className={`${styles.reaction} ${styles.addReaction}`}>
            <Icon d={ICONS.smilePlus} />
          </span>
        </div>
      </article>

      <div className={styles.composer}>
        Reply…
        <Icon d={ICONS.at} />
      </div>

      <div className={styles.card} role="dialog" aria-label="Leila Haddad" data-inspect="hover-card">
        <div className={styles.cardTop}>
          <img
            className={styles.avatar}
            src={leila}
            alt=""
            width={36}
            height={36}
            data-inspect="hover-card-avatar"
          />
          <span className={styles.follow} data-following={step.following || undefined} data-inspect="hover-card-action">
            {step.following ? 'Following' : 'Follow'}
          </span>
        </div>
        <span className={styles.name}>Leila Haddad</span>
        <span className={styles.handle}>@leila</span>
        <span className={styles.bio}>Content designer at Kestrel</span>
        <span className={styles.counts}>
          <span>
            <b>312</b> Following
          </span>
          <span>
            <b>{step.following ? '1,285' : '1,284'}</b> Followers
          </span>
        </span>
      </div>

      <span className={styles.pointer}>
        <svg className={styles.arrow} viewBox="0 0 14 20">
          <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
        </svg>
        <svg className={styles.hand} viewBox="0 0 24 24">
          <path d="M8.5 3.5a1.5 1.5 0 0 1 3 0V10a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0v.8a1.25 1.25 0 0 1 2.5 0V16a6 6 0 0 1-6 6h-1.6a5 5 0 0 1-4.1-2.1l-3.7-4.5a1.6 1.6 0 0 1 2.4-2.1l1.5 1.3z" />
          <path d="M11.5 10v3.2M14.5 10.5v2.7M17.5 11.3v2.2" />
        </svg>
      </span>
    </div>
  );
}
