import { useSyncExternalStore } from 'react';
import { devAccountUser } from './devAccount';

export type User = {
  name: string;
  email: string;
  /** How the user signed in. */
  provider: 'password' | 'google' | 'dev';
};

/**
 * A failed sign-in or sign-up, with a message to show on the form. `invalid` is the user's input (wrong
 * password); `unavailable` is on our side (a feature that isn't connected yet).
 */
export class AuthError extends Error {
  constructor(
    message: string,
    readonly kind: 'invalid' | 'unavailable',
  ) {
    super(message);
  }
}

/** The signed-in user is kept under this key, so a reload doesn't sign you out. */
const SESSION_KEY = 'pw-session';
const listeners = new Set<() => void>();

function readSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

let current = readSession();

function setSession(user: User | null) {
  current = user;
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage may be disabled in a private window; the session then lasts until the tab closes
  }
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Signing in or out in another tab updates this one too
  const onStorage = (event: StorageEvent) => {
    if (event.key !== SESSION_KEY) return;
    current = readSession();
    callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}

/** The signed-in user, or null. */
export function useUser() {
  return useSyncExternalStore(subscribe, () => current, () => null);
}

/*
 * There's no auth backend yet. These functions already have the shape a real provider (Supabase, Firebase,
 * Clerk…) will need, so the pages won't change when one is connected. The short wait stands in for the network.
 */
const wait = () => new Promise((resolve) => setTimeout(resolve, 450));

export async function signInWithPassword(identifier: string, password: string): Promise<User> {
  await wait();
  // TODO(before launch): remove the dev account (see devAccount.ts and README → Before going live)
  const devUser = import.meta.env.DEV ? devAccountUser(identifier, password) : null;
  if (devUser) {
    console.warn('[auth] Signed in with the dev account. Remove it before launch (README → Before going live).');
    setSession(devUser);
    return devUser;
  }
  throw new AuthError("That email and password don't match an account.", 'invalid');
}

export async function signInWithGoogle(): Promise<User> {
  await wait();
  throw new AuthError("Google sign-in isn't connected yet.", 'unavailable');
}

export async function signUp(_details: { name: string; email: string; password: string }): Promise<User> {
  await wait();
  throw new AuthError("Sign-ups aren't open yet.", 'unavailable');
}

export function signOut() {
  setSession(null);
}
