import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../demos/motion';
import styles from './OneTimeCode.module.css';

/** The code from the text message, as it arrives digit by digit. */
const CODE = '381729';

type Status = 'typing' | 'verifying' | 'verified';

/**
 * One moment of the loop: how many digits are in, what the field is doing, the resend countdown and how long the
 * moment lasts.
 */
type Frame = { typed: number; status: Status; seconds: number; ms: number };

/**
 * Someone types the code off their phone: three digits 200 ms apart, a pause while they read the rest, then the other
 * three. The sixth digit submits the code on its own; it verifies for a second, the slots turn green and it says
 * Verified. Then it clears and starts over. The countdown ticks once a second while they type.
 */
const SCRIPT: Frame[] = [
  { typed: 0, status: 'typing', seconds: 26, ms: 1000 },
  { typed: 1, status: 'typing', seconds: 25, ms: 200 },
  { typed: 2, status: 'typing', seconds: 25, ms: 200 },
  { typed: 3, status: 'typing', seconds: 25, ms: 600 },
  { typed: 4, status: 'typing', seconds: 24, ms: 200 },
  { typed: 5, status: 'typing', seconds: 24, ms: 200 },
  { typed: 6, status: 'typing', seconds: 24, ms: 350 },
  { typed: 6, status: 'verifying', seconds: 24, ms: 1100 },
  { typed: 6, status: 'verified', seconds: 24, ms: 2800 },
];

/** The still picture: four digits in, the caret waiting in the fifth slot, the countdown running. */
const FINAL: Frame = { typed: 4, status: 'typing', seconds: 24, ms: 0 };

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

/**
 * One-time code field: the verification step after signing in, with six slots for the code sent by text message.
 * The slot that takes the next digit has the accent border, a focus ring and a blinking caret. In the loop the digits
 * arrive one by one, the code verifies, the slots turn green with a Verified line, and it starts over.
 */
export function OneTimeCode() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);
  const typing = frame.status === 'typing';
  // The slot the caret waits in; while the code is checked the last slot keeps that name, so it stays inspectable
  const active = typing ? Math.min(frame.typed, CODE.length - 1) : CODE.length - 1;

  return (
    <div ref={ref} className={styles.tile} data-status={frame.status} data-paused={playing ? undefined : ''}>
      <div className={styles.panel}>
        <span className={styles.badge}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.75" />
            <path d="M10.5 18h3" />
          </svg>
        </span>
        <span className={styles.title}>Enter the code</span>
        <span className={styles.subtitle}>
          Sent to{' '}
          <span className={styles.destination} data-inspect="one-time-code-destination">
            •••• 4821
          </span>
        </span>

        <div className={styles.field} data-inspect="one-time-code">
          {[...CODE].map((digit, index) => (
            <span
              key={index}
              className={styles.slot}
              style={{ '--i': index } as CSSProperties}
              data-inspect={index === active ? 'one-time-code-active-slot' : 'one-time-code-slot'}
              data-active={typing && index === active ? '' : undefined}
              data-filled={index < frame.typed ? '' : undefined}
            >
              <span className={styles.digit}>{digit}</span>
              <span className={styles.caret} />
            </span>
          ))}
        </div>

        <div className={styles.status}>
          <span className={styles.resend} data-inspect="one-time-code-resend" data-shown={typing ? '' : undefined}>
            Resend code in <span className={styles.countdown}>0:{String(frame.seconds).padStart(2, '0')}</span>
          </span>
          <span className={styles.verifying} data-shown={frame.status === 'verifying' ? '' : undefined}>
            <span className={styles.spinner} />
            Verifying…
          </span>
          <span className={styles.verified} data-shown={frame.status === 'verified' ? '' : undefined}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9.25" />
              <path d="m8.25 12.25 2.5 2.5 5-5.25" />
            </svg>
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
