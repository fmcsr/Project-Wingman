import type { ReactNode } from 'react';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  /** Bulunduğu alanın tüm genişliğini kaplasın mı (plan kartları gibi). */
  block?: boolean;
  children: ReactNode;
};

/** Buton görünümlü link. Sayfa içi bölümlere ya da ileride gelecek sayfalara gider. */
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
    <a className={className} href={href}>
      {children}
    </a>
  );
}
