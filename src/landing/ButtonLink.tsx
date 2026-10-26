import type { ReactNode } from 'react';
import { Link } from '../router';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  /** Whether it fills the full width of its container (as in the pricing plan cards). */
  block?: boolean;
  children: ReactNode;
};

/** A link styled as a button. Leads to in-page sections or to other pages of the app. */
export function ButtonLink({ href, variant = 'secondary', size = 'md', block = false, children }: ButtonLinkProps) {
  const className = [
    styles.button,
    styles[variant],
    size === 'sm' && styles.small,
    size === 'lg' && styles.large,
    block && styles.block,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
