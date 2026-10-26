import { useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { AuthError } from './session';
import styles from './AuthForm.module.css';

export type FormStatusMessage = { message: string; tone: 'error' | 'info' };

/** Turns a failed attempt into a form message: red for the user's input, neutral when we're not ready yet. */
export function statusFrom(error: unknown): FormStatusMessage {
  if (error instanceof AuthError) return { message: error.message, tone: error.kind === 'invalid' ? 'error' : 'info' };
  return { message: 'Something went wrong. Please try again.', tone: 'error' };
}

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string;
  /** Shown under the field and marks it invalid. */
  error?: string;
  /** Help text under the field, e.g. password rules; the error replaces it. */
  hint?: string;
  /** Adds a show/hide button (password fields). */
  revealable?: boolean;
};

/** A labeled input whose error or hint is read out by screen readers. */
export function Field({ label, error, hint, revealable = false, type = 'text', ...input }: FieldProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const note = error ?? hint;
  const noteId = note ? `${id}-note` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.control}>
        <input
          id={id}
          type={revealable && revealed ? 'text' : type}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={noteId}
          data-revealable={revealable || undefined}
          {...input}
        />
        {revealable && (
          <button
            type="button"
            className={styles.reveal}
            aria-label="Show password"
            aria-pressed={revealed}
            onClick={() => setRevealed((value) => !value)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {revealed && <path d="M4 4l16 16" />}
            </svg>
          </button>
        )}
      </div>
      {note && (
        <p id={noteId} className={error ? styles.error : styles.hint}>
          {note}
        </p>
      )}
    </div>
  );
}

export function FormStatus({ message, tone }: FormStatusMessage) {
  return (
    <p className={styles.status} data-tone={tone} role="alert">
      {message}
    </p>
  );
}

type BusyButtonProps = { busy: boolean; busyLabel: string; children: ReactNode };

/**
 * The form's main button. While busy it stays focusable (aria-disabled instead of disabled), so keyboard
 * focus isn't lost; the form ignores repeat submits.
 */
export function SubmitButton({ busy, busyLabel, children }: BusyButtonProps) {
  return (
    <button type="submit" className={styles.submit} aria-disabled={busy || undefined}>
      {busy ? busyLabel : children}
    </button>
  );
}

export function Divider() {
  return (
    <p className={styles.divider}>
      <span>or</span>
    </p>
  );
}

/** "Continue with Google" in Google's own button colors, with the four-color G. */
export function GoogleButton({ busy, onClick }: { busy: boolean; onClick: () => void }) {
  return (
    <button type="button" className={styles.google} onClick={onClick} aria-disabled={busy || undefined}>
      <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
      </svg>
      <span>{busy ? 'Connecting…' : 'Continue with Google'}</span>
    </button>
  );
}
