import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, navigate } from '../router';
import { AuthLayout } from './AuthLayout';
import { Divider, Field, FormStatus, GoogleButton, statusFrom, SubmitButton } from './FormParts';
import type { FormStatusMessage } from './FormParts';
import { signInWithGoogle, signUp } from './session';
import styles from './AuthForm.module.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

type Errors = { name?: string; email?: string; password?: string };

export function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<FormStatusMessage | null>(null);
  const [busy, setBusy] = useState<'form' | 'google' | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    const nextErrors: Errors = {
      name: name.trim() ? undefined : 'Enter your name.',
      email: EMAIL_PATTERN.test(email.trim()) ? undefined : 'Enter a valid email address.',
      password: password.length >= MIN_PASSWORD_LENGTH ? undefined : `Use at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
    setErrors(nextErrors);
    setStatus(null);
    if (nextErrors.name || nextErrors.email || nextErrors.password) return;
    setBusy('form');
    try {
      await signUp({ name: name.trim(), email: email.trim(), password });
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
      title="Sign up"
      heading="Create your account."
      lead="Learn the names behind every interface. Free to start."
      footer={
        <>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </>
      }
    >
      <form className={styles.form} onSubmit={submit} noValidate>
        <Field
          label="Name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />
        <Field
          label="Email"
          type="email"
          autoComplete="email"
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
          autoComplete="new-password"
          revealable
          hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        {status && <FormStatus {...status} />}
        <SubmitButton busy={busy === 'form'} busyLabel="Creating your account…">
          Create account
        </SubmitButton>
        <Divider />
        <GoogleButton busy={busy === 'google'} onClick={continueWithGoogle} />
      </form>
    </AuthLayout>
  );
}
