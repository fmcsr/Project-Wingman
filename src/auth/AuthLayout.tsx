import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { BrandMark } from '../brand/BrandMark';
import { HorizonLines } from '../brand/HorizonLines';
import { ThemeToggle } from '../landing/ThemeToggle';
import { Link, useDocumentTitle } from '../router';
import styles from './AuthLayout.module.css';

type AuthLayoutProps = {
  /** Page name for the tab title and the bracketed label, e.g. "Sign in". */
  title: string;
  heading: string;
  lead: string;
  /** Line under the card, e.g. "Don't have an account? Sign up". */
  footer: ReactNode;
  /** Extra content under the footer line (the dev account note). */
  aside?: ReactNode;
  children: ReactNode;
};

/** Frame for the sign-in and sign-up pages: a minimal header, the hero's line art behind, the form in a card. */
export function AuthLayout({ title, heading, lead, footer, aside, children }: AuthLayoutProps) {
  useDocumentTitle(`${title} · Project Wingman`);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Focus moves to the heading on arrival, so screen readers announce the new page
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), []);

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true">
        <HorizonLines />
      </div>
      <header className={`container ${styles.header}`}>
        <Link className={styles.brand} href="/" aria-label="Project Wingman, home">
          <BrandMark />
          <span>Project Wingman</span>
        </Link>
        <ThemeToggle />
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <p className={styles.kicker}>[ {title} ]</p>
          <h1 ref={headingRef} className={styles.heading} tabIndex={-1}>
            {heading}
          </h1>
          <p className={styles.lead}>{lead}</p>
          {children}
        </div>
        <p className={styles.footer}>{footer}</p>
        {aside}
      </main>
    </div>
  );
}
