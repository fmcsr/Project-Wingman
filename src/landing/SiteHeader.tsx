import { useEffect, useState } from 'react';
import { BrandMark } from '../brand/BrandMark';
import { ButtonLink } from './ButtonLink';
import { SECTION_IDS, SECTION_LINKS, SIGN_IN_HREF } from './links';
import { ThemeToggle } from './ThemeToggle';
import styles from './SiteHeader.module.css';

/** Has the page been scrolled, and which section is in view? Drives the header's background and active link. */
function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      // The last section to cross a line in the top third of the screen counts as active
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { scrolled, active };
}

/**
 * Header: text links sitting on the page background, not a bar. Stays at the top while scrolling;
 * fully transparent at the very top, and as you scroll down, frosted glass softens the content behind it.
 */
export function SiteHeader() {
  const { scrolled, active } = useScrollState();

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#top" aria-label="Project Wingman, back to top">
          <BrandMark />
          <span>Project Wingman</span>
        </a>
        <nav className={styles.nav} aria-label="Main">
          {SECTION_LINKS.map((link) => (
            <a key={link.href} href={link.href} aria-current={active === link.href.slice(1) ? 'true' : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
          <ButtonLink href={SIGN_IN_HREF} size="sm">
            Sign in
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
