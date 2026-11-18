import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import { StatusIcons } from '../StatusIcons';
import styles from './PullToRefresh.module.css';

type Message = { sender: string; time: string; subject: string; preview: string; unread?: boolean };

/** The message the refresh brings in; it lands at the top of the inbox. */
const ARRIVING: Message = {
  sender: 'Juniper Air',
  time: '9:41 AM',
  subject: 'Your trip to Lisbon is confirmed',
  preview:
    'Booking QX7R2M, Thursday, November 20. Online check-in opens 24 hours before departure, and seat 14A is held for you.',
  unread: true,
};

/** The inbox before the refresh, newest first. It last checked for mail at 9:29, twelve minutes ago. */
const INBOX: Message[] = [
  {
    sender: 'Hannah Pierce',
    time: '9:12 AM',
    subject: 'Dinner on Saturday?',
    preview:
      'We found a table at the new Portuguese place on Elm Street for 7:30. Can you two make it? I can book for four.',
    unread: true,
  },
  {
    sender: 'Fieldnotes Weekly',
    time: '8:30 AM',
    subject: 'Five small habits for a calmer week',
    preview: 'This week: a ten-minute evening reset, the one-tab rule, and why a paper list still beats every app we tried.',
  },
  {
    sender: 'Daniel Cho',
    time: 'Yesterday',
    subject: 'Re: Kitchen quote',
    preview:
      'The contractor sent revised numbers. If we keep the old cabinets it comes to $1,240 less, and they can start on the 2nd.',
    unread: true,
  },
  {
    sender: 'Northwind Library',
    time: 'Yesterday',
    subject: 'Your hold is ready for pickup',
    preview: 'The book you reserved is waiting at the front desk of the Elm Street branch until Saturday, November 22.',
  },
];

/** How far the finger drags, in px (the CSS lifts the finger off at the same 150px). The threshold is at 134px. */
const PULL = 150;

/**
 * While it refreshes, the list rests 56px down, enough to keep the spinner in view. The pull that stretches the list
 * that far, from the rubber band in the CSS: offset = (1 − 1 ∕ (0.55 × pull ∕ 480 + 1)) × 480.
 */
const HOLD = (480 / 0.55) * (1 / (1 - 56 / 480) - 1);

/** The drag lasts 1100ms on cubic-bezier(0.45, 0.05, 0.25, 1), which reaches the threshold (89% of PULL) at 64%. */
const DRAG_MS = 1100;
const CROSS_MS = 705;

/**
 * One moment of the loop. `pull` is the finger's travel in px, which moves the finger, stretches the list and draws
 * the spokes; `motion` is how it gets there (a finger's drag, the iOS spring, or at once). `status` is what the
 * toolbar says, `arrived` puts the new message in and `highlight` tints it. `dip` fades the list out to start over.
 */
type Frame = {
  pull: number;
  motion: 'drag' | 'spring' | 'none';
  finger: 'away' | 'down' | 'lifted';
  spinner: 'pulling' | 'spinning' | 'gone';
  status: 'earlier' | 'checking' | 'now';
  arrived: boolean;
  highlight?: boolean;
  dip?: boolean;
  ms: number;
};

const REST: Frame = {
  pull: 0,
  motion: 'none',
  finger: 'away',
  spinner: 'pulling',
  status: 'earlier',
  arrived: false,
  ms: 0,
};

/**
 * A finger lands on the list and drags down; the list follows at about half its pace, and the spokes appear one by
 * one. Past the threshold the spinner spins and the toolbar checks for mail; the finger lets go and the list springs
 * back to rest just under the spinner. Then the spinner shrinks away, the list closes the gap, and the new message
 * slides in at the top, tinted for a moment, with Updated just now below. The list fades out and starts over.
 */
const SCRIPT: Frame[] = [
  { ...REST, ms: 1400 },
  { ...REST, finger: 'down', ms: 260 },
  { ...REST, pull: PULL, motion: 'drag', finger: 'down', ms: CROSS_MS },
  {
    ...REST,
    pull: PULL,
    motion: 'drag',
    finger: 'down',
    spinner: 'spinning',
    status: 'checking',
    ms: DRAG_MS - CROSS_MS + 350,
  },
  { ...REST, pull: HOLD, motion: 'spring', finger: 'lifted', spinner: 'spinning', status: 'checking', ms: 1300 },
  { ...REST, motion: 'spring', spinner: 'gone', status: 'now', arrived: true, highlight: true, ms: 1100 },
  { ...REST, motion: 'spring', spinner: 'gone', status: 'now', arrived: true, ms: 1700 },
  { ...REST, motion: 'spring', spinner: 'gone', status: 'now', arrived: true, dip: true, ms: 260 },
  { ...REST, dip: true, ms: 80 },
];

/**
 * The still picture: pulled past the threshold with the spinner drawn, the finger still down, and the message the
 * last refresh brought in at the top with Updated just now below.
 */
const FINAL: Frame = {
  pull: PULL,
  motion: 'none',
  finger: 'down',
  spinner: 'spinning',
  status: 'now',
  arrived: true,
  highlight: true,
  ms: 0,
};

/** Steps through the script while `playing`; each frame lasts its own time, and a held frame starts over. */
function useScript(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % SCRIPT.length), SCRIPT[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : SCRIPT[index];
}

/** Opacity of each of the spinner's eight spokes while it spins, from the head (at 12 o'clock) clockwise. */
const TAIL = [1, 0.28, 0.35, 0.43, 0.52, 0.62, 0.73, 0.86];

function Row({ message }: { message: Message }) {
  return (
    <>
      {message.unread && <span className={styles.dot} />}
      <span className={styles.top}>
        <span className={styles.sender}>{message.sender}</span>
        <span className={styles.time}>
          {message.time}
          <svg viewBox="0 0 8 13" aria-hidden="true">
            <path d="M1.5 1.5l5 5-5 5" />
          </svg>
        </span>
      </span>
      <span className={styles.subject}>{message.subject}</span>
      <span className={styles.preview}>{message.preview}</span>
    </>
  );
}

/**
 * Pull to refresh: an inbox in the iOS Mail style on an iPhone screen (cropped to a phone's width on wide pictures),
 * pulled down by a finger. The list stretches like a rubber band, moving about half as far as the finger, and the
 * activity indicator above the large title draws its spokes one by one as the pull nears the threshold. Past it the
 * spinner spins and the toolbar says Checking for mail…; on release the list rests just under the spinner, then the
 * spinner shrinks away, a new message slides in at the top with a brief tint, and the toolbar says Updated just now.
 */
export function PullToRefresh() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);
  const unread = INBOX.filter((message) => message.unread).length;

  return (
    <div
      ref={ref}
      className={styles.tile}
      style={{ '--pull-to-refresh': frame.pull } as CSSProperties}
      data-motion={frame.motion}
      data-finger={frame.finger}
      data-spinner={frame.spinner}
      data-status={frame.status}
      data-arrived={frame.arrived || undefined}
      data-highlight={frame.highlight || undefined}
      data-dip={frame.dip || undefined}
      data-paused={playing ? undefined : ''}
    >
      <div className={styles.screen}>
        <div className={styles.app}>
          {/* The refresh control: the gap that opens above the large title, with the spinner in it */}
          <div className={styles.refresh} data-inspect="pull-to-refresh">
            <span className={styles.spinner} data-inspect="pull-to-refresh-spinner">
              <span className={styles.spokes}>
                {TAIL.map((tail, index) => (
                  <span
                    key={index}
                    className={styles.spoke}
                    style={{ '--i': index, '--tail': tail } as CSSProperties}
                  />
                ))}
              </span>
            </span>
          </div>

          <div className={styles.content}>
            <span className={styles.largeTitle}>Inbox</span>
            <div className={styles.listClip}>
              <ul className={styles.list}>
                <li className={styles.row} data-new="" data-inspect="pull-to-refresh-new-row">
                  <span className={styles.highlight} />
                  <Row message={ARRIVING} />
                </li>
                {INBOX.map((message) => (
                  <li key={message.sender} className={styles.row}>
                    <Row message={message} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.navBar}>
            <span className={styles.back}>
              <svg viewBox="0 0 12 20" aria-hidden="true">
                <path d="M10 2 2 10l8 8" />
              </svg>
              Mailboxes
            </span>
            <span>Edit</span>
          </div>

          <div className={styles.statusBar}>
            <span className={styles.clock}>9:41</span>
            <span className={styles.island} />
            <StatusIcons className={styles.indicators} />
          </div>

          <div className={styles.toolbar}>
            <svg className={styles.toolIcon} viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9.25" />
              <path d="M7.5 9h9M9 12.25h6M10.75 15.5h2.5" />
            </svg>
            <span className={styles.status} data-inspect="pull-to-refresh-timestamp">
              <span className={styles.statusLine} data-shown={frame.status === 'earlier' || undefined}>
                <span className={styles.updated}>Updated 12 minutes ago</span>
                <span className={styles.unread}>{unread} unread</span>
              </span>
              <span className={styles.statusLine} data-shown={frame.status === 'checking' || undefined}>
                <span className={styles.updated}>Checking for mail…</span>
                <span className={styles.unread}>{unread} unread</span>
              </span>
              <span className={styles.statusLine} data-shown={frame.status === 'now' || undefined}>
                <span className={styles.updated}>Updated just now</span>
                <span className={styles.unread}>{unread + 1} unread</span>
              </span>
            </span>
            <svg className={styles.toolIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 4.5H6.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V13" />
              <path d="M17.6 3.6a1.9 1.9 0 0 1 2.7 2.7L12.7 14l-3.4.8.8-3.4z" />
            </svg>
          </div>
          <span className={styles.homeIndicator} />

          {/* The finger: a touch drawn on the screen, as a screen recording shows it */}
          <span className={styles.finger} />
        </div>
      </div>
    </div>
  );
}
