import type { ReactNode } from 'react';
import { Link } from '../router';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  /** Whether it fills the full width of its container (as in the support cards). */
  block?: boolean;
  /** Another site (GitHub Sponsors, say): opens in a new tab. */
  external?: boolean;
  children: ReactNode;
};

/** A link styled as a button. Leads to in-page sections, to other pages of the app, or to another site. */
export function ButtonLink({
  href,
  variant = 'secondary',
  size = 'md',
  block = false,
  external = false,
  children,
}: ButtonLinkProps) {
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
    <Link className={className} href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
      {children}
    </Link>
  );
}
