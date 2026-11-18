import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './FloatingLabel.module.css';

const NAME = 'Leila Haddad';
const EMAIL = 'leila@kestrel.io';

/**
 * One moment of the loop: whether Email has focus, how much of the address is in, whether it checks out, and how
 * long the moment lasts. `dip` fades the address out, so the field can start over empty.
 */
type Frame = { focused: boolean; typed: number; valid?: boolean; dip?: boolean; ms: number };

/**
 * Email gets focus: its border turns to the accent with a ring around it, and the label rides up into a notch in the
 * border while a placeholder fades in. The address types out at about 85 ms a key, with a short pause before the
 * domain; once it's a whole address a check appears. Focus moves on, the label stays up because the field is filled,
 * and after a rest the address fades out and the label drops back inside.
 */
const SCRIPT: Frame[] = [
  { focused: false, typed: 0, ms: 1300 },
  { focused: true, typed: 0, ms: 950 },
  ...[...EMAIL].map((char, index) => ({ focused: true, typed: index + 1, ms: char === '@' ? 240 : 85 })),
  { focused: true, typed: EMAIL.length, ms: 350 },
  { focused: true, typed: EMAIL.length, valid: true, ms: 1300 },
  { focused: false, typed: EMAIL.length, valid: true, ms: 1900 },
  { focused: false, typed: EMAIL.length, valid: true, dip: true, ms: 300 },
];

/** The still picture: Email focused, the label up in its notch, the address half typed. */
const FINAL: Frame = { focused: true, typed: 9, ms: 0 };

function useScript(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % SCRIPT.length), SCRIPT[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return final ? FINAL : SCRIPT[index];
}

type FieldProps = {
  label: string;
  value: string;
  focused?: boolean;
  placeholder?: string;
  valid?: boolean;
  /** Fades the value out before the field empties. */
  dip?: boolean;
};

/**
 * An outlined text field. The label rests inside like a placeholder and floats into the border once the field has
 * focus or a value; the notch is the gap it leaves in the border, as wide as the floated label.
 */
function Field({ label, value, focused = false, placeholder, valid = false, dip = false }: FieldProps) {
  const floated = focused || value !== '';

  return (
    <div
      className={styles.field}
      data-inspect="floating-label"
      data-focused={focused || undefined}
      data-floated={floated || undefined}
      data-empty={value === '' || undefined}
      data-valid={valid || undefined}
      data-dip={dip || undefined}
    >
      {/* Under the outline, so only its band outside the border takes the pointer */}
      <span className={styles.ring} data-inspect="floating-label-focus-ring" />
      <span className={styles.outline} />
      <span className={styles.notch} data-inspect="floating-label-notch">
        {label}
      </span>
      <span className={styles.label} data-inspect="floating-label-label">
        {label}
      </span>
      <span className={styles.value}>
        {placeholder && <span className={styles.placeholder}>{placeholder}</span>}
        <span className={styles.text}>{value}</span>
        {focused && <span className={styles.caret} />}
      </span>
      <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9.25" />
        <path d="m8.25 12.25 2.5 2.5 5-5.25" />
      </svg>
    </div>
  );
}

/**
 * Floating label: a sign-up card with two outlined text fields in the Material style. Full name is filled, its label
 * up in the border; Email is empty, its label resting inside. In the loop Email gets focus (an accent border and a
 * focus ring), the label floats up into a notch and shrinks, the caret blinks and an address types out, a check
 * confirms it, focus leaves and the field empties again.
 */
export function FloatingLabel() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const frame = useScript(playing, final);
  // Solid while keys come in, blinking while the field waits
  const typing = frame.focused && frame.typed > 0 && frame.typed < EMAIL.length;

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-typing={typing || undefined}
      data-paused={!playing || undefined}
      data-still={final || undefined}
    >
      <div className={styles.card}>
        <span className={styles.title}>Create your account</span>
        <Field label="Full name" value={NAME} />
        <Field
          label="Email"
          value={EMAIL.slice(0, frame.typed)}
          focused={frame.focused}
          placeholder="you@work.com"
          valid={frame.valid}
          dip={frame.dip}
        />
        <span className={styles.helper} data-inspect="floating-label-helper">
          We’ll email you a link.
        </span>
      </div>
    </div>
  );
}
