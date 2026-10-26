import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, navigate } from '../router';
import { AuthLayout } from './AuthLayout';
import { DevAccountNote } from './DevAccountNote';
import { Divider, Field, FormStatus, GoogleButton, statusFrom, SubmitButton } from './FormParts';
import type { FormStatusMessage } from './FormParts';
import { signInWithGoogle, signInWithPassword } from './session';
import styles from './AuthForm.module.css';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<FormStatusMessage | null>(null);
  const [busy, setBusy] = useState<'password' | 'google' | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    const nextErrors = {
      email: email.trim() ? undefined : 'Enter your email.',
      password: password ? undefined : 'Enter your password.',
    };
    setErrors(nextErrors);
    setStatus(null);
    if (nextErrors.email || nextErrors.password) return;
    setBusy('password');
    try {
      await signInWithPassword(email, password);
      navigate('/app');
    } catch (error) {
      setStatus(statusFrom(error));
      setBusy(null);
    }
  };

  const continueWithGoogle = async () => {
    if (busy) return;
    setStatus(null);
    setBusy('google');
    try {
      await signInWithGoogle();
      navigate('/app');
    } catch (error) {
      setStatus(statusFrom(error));
      setBusy(null);
    }
  };

  return (
    <AuthLayout
      title="Sign in"
      heading="Welcome back."
      lead="Sign in to pick up where you left off."
      footer={
        <>
          Don't have an account? <Link href="/sign-up">Sign up</Link>
        </>
      }
      aside={
        // TODO(before launch): remove with the dev account
        import.meta.env.DEV ? (
          <DevAccountNote
            onFill={(identifier, devPassword) => {
              setEmail(identifier);
              setPassword(devPassword);
              setErrors({});
            }}
          />
        ) : null
      }
    >
      <form className={styles.form} onSubmit={submit} noValidate>
        <Field
          label="Email"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <Field
          label="Password"
          type="password"
          autoComplete="current-password"
          revealable
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        {status && <FormStatus {...status} />}
        <SubmitButton busy={busy === 'password'} busyLabel="Signing in…">
          Sign in
        </SubmitButton>
        <Divider />
        <GoogleButton busy={busy === 'google'} onClick={continueWithGoogle} />
      </form>
    </AuthLayout>
  );
}
