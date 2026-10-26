import type { User } from './session';

/*
 * TODO(before launch): delete this file, DevAccountNote.tsx and their uses (session.ts, SignInPage.tsx,
 * Workspace.tsx). Listed in README → Before going live.
 *
 * A development-only account, so the signed-in screens can be built before a real auth backend exists.
 * It works only in `npm run dev` (import.meta.env.DEV); production builds leave it out entirely.
 */
export const DEV_ACCOUNT = { identifier: 'fatih123', password: 'fatih123' } as const;

/** Letter case and spaces are ignored, so "Fatih 123" works too. */
const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase();

export function devAccountUser(identifier: string, password: string): User | null {
  if (normalize(identifier) !== DEV_ACCOUNT.identifier || normalize(password) !== DEV_ACCOUNT.password) return null;
  return { name: 'Fatih', email: DEV_ACCOUNT.identifier, provider: 'dev' };
}
