import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './MegaMenu.module.css';

/** Stroke icons on a 24px grid; color and width come from the stylesheet. */
const ICONS = {
  checkout: 'M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5zM3 10h18M7 15h3',
  terminal:
    'M7 2.5h10a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2zM8.5 6h7v4.5h-7zM9 14h.01M12 14h.01M15 14h.01M9 17.5h.01M12 17.5h.01M15 17.5h.01',
  payouts:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9M12 3C9.8 5.4 8.7 8.4 8.7 12s1.1 6.6 3.3 9',
  billing: 'M17 2.5l3 3-3 3M4 11.5v-1a5 5 0 0 1 5-5h11M7 21.5l-3-3 3-3M20 12.5v1a5 5 0 0 1-5 5H4',
  invoicing: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4',
  tax: 'M18.5 5.5l-13 13M7.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  startups:
    'M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1zM12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2zM9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5',
  enterprises:
    'M6 21.5V4.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17M6 12H4a2 2 0 0 0-2 2v7.5h20V11a2 2 0 0 0-2-2h-2M10 6.5h4M10 10.5h4M10 14.5h4M10 18.5h4',
  platforms:
    'M3.5 9.5 5 4h14l1.5 5.5M3.5 9.5a2.8 2.8 0 0 0 5.67 0 2.8 2.8 0 0 0 5.66 0 2.8 2.8 0 0 0 5.67 0M5 12.5V20h14v-7.5M10 20v-4.5h4V20',
  saas: 'M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z',
  pricing:
    'M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4zM7.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z',
  integrations: 'M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z',
  docs: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20',
  stories: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 9h8M8 13h5',
  partners:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  chevron: 'M6 9l6 6 6-6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
};

function Icon({ d, className = styles.icon }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

type Item = { title: string; description: string; icon: string };
type Group = { heading: string; items: Item[] };
type FooterLink = { label: string; icon: string };

/** What the Products and Solutions panels hold: groups of links with icons and one-line descriptions. */
const PRODUCTS: Group[] = [
  {
    heading: 'Payments',
    items: [
      { title: 'Checkout', description: 'Payment pages', icon: ICONS.checkout },
      { title: 'Terminal', description: 'In-person sales', icon: ICONS.terminal },
      { title: 'Payouts', description: 'Pay out globally', icon: ICONS.payouts },
    ],
  },
  {
    heading: 'Revenue',
    items: [
      { title: 'Billing', description: 'Subscriptions', icon: ICONS.billing },
      { title: 'Invoicing', description: 'Online invoices', icon: ICONS.invoicing },
      { title: 'Tax', description: 'Sales tax, VAT', icon: ICONS.tax },
    ],
  },
];

const SOLUTIONS: Group[] = [
  {
    heading: 'By stage',
    items: [
      { title: 'Startups', description: 'Launch in a day', icon: ICONS.startups },
      { title: 'Enterprises', description: 'One global platform', icon: ICONS.enterprises },
    ],
  },
  {
    heading: 'By model',
    items: [
      { title: 'Marketplaces', description: 'Pay out every seller', icon: ICONS.platforms },
      { title: 'SaaS', description: 'Seats and usage', icon: ICONS.saas },
    ],
  },
];

const PRODUCTS_FOOTER: FooterLink[] = [
  { label: 'Pricing', icon: ICONS.pricing },
  { label: 'Integrations', icon: ICONS.integrations },
  { label: 'Docs', icon: ICONS.docs },
];

const SOLUTIONS_FOOTER: FooterLink[] = [
  { label: 'Customer stories', icon: ICONS.stories },
  { label: 'Partners', icon: ICONS.partners },
];

type Menu = 'products' | 'solutions';

/** Where the pointer is: on one of the two triggers, or out on the page below the panel. */
type Spot = Menu | 'away';

/**
 * One beat of the loop: which panel's content shows, whether the dropdown is open, where the pointer is and how long
 * the beat lasts. The menu changes a beat after the pointer arrives, as hover intent would have it.
 */
type Step = { menu: Menu; open: boolean; pointer: Spot; ms: number };

/**
 * Products is open under the pointer. The pointer slides over to Solutions and the same panel morphs into Solutions:
 * narrower, shorter and further right, the arrow gliding along. The pointer leaves down across the page and the
 * dropdown closes; while it's closed the panel goes back to Products' shape out of sight, and the pointer comes back
 * up to open it again.
 */
const STEPS: Step[] = [
  { menu: 'products', open: true, pointer: 'products', ms: 2300 },
  { menu: 'products', open: true, pointer: 'solutions', ms: 300 },
  { menu: 'solutions', open: true, pointer: 'solutions', ms: 2300 },
  { menu: 'solutions', open: true, pointer: 'away', ms: 420 },
  { menu: 'solutions', open: false, pointer: 'away', ms: 700 },
  { menu: 'products', open: false, pointer: 'away', ms: 900 },
  { menu: 'products', open: false, pointer: 'products', ms: 520 },
];

/** Reduced motion: Products open under the pointer. */
const FINAL = 0;

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

/**
 * Keeps the geometry the dropdown follows in CSS variables on the site: each trigger's center (--products-x, …) and
 * each panel's size (--products-w, --products-h, …), measured again whenever the tile or a panel changes size. The
 * transitions only switch on once the first values are in, so the panel doesn't grow from nothing on load.
 */
function useMenuGeometry(site: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const node = site.current;
    if (!node) return;
    const measure = () => {
      const box = node.getBoundingClientRect();
      for (const trigger of node.querySelectorAll<HTMLElement>('[data-trigger]')) {
        const r = trigger.getBoundingClientRect();
        node.style.setProperty(`--${trigger.dataset.trigger}-x`, `${r.left - box.left + r.width / 2}px`);
      }
      for (const panel of node.querySelectorAll<HTMLElement>('[data-content]')) {
        node.style.setProperty(`--${panel.dataset.content}-w`, `${panel.offsetWidth}px`);
        node.style.setProperty(`--${panel.dataset.content}-h`, `${panel.offsetHeight}px`);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    for (const part of node.querySelectorAll('[data-trigger], [data-content]')) observer.observe(part);
    const frame = requestAnimationFrame(() => node.setAttribute('data-ready', ''));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [site]);
}

function Trigger({ menu, label, open }: { menu?: Menu; label: string; open: boolean }) {
  return (
    <span
      className={styles.trigger}
      data-trigger={menu}
      data-open={open || undefined}
      role="button"
      aria-expanded={open}
      data-inspect="mega-menu-trigger"
    >
      {label}
      <Icon d={ICONS.chevron} className={styles.chevron} />
    </span>
  );
}

function Groups({ groups }: { groups: Group[] }) {
  return groups.map((group) => (
    <div key={group.heading} className={styles.group} role="group" data-inspect="mega-menu-group">
      <span className={styles.heading}>{group.heading}</span>
      {group.items.map((item) => (
        <a key={item.title} className={styles.item} data-inspect="mega-menu-item">
          <span className={styles.itemIcon}>
            <Icon d={item.icon} />
          </span>
          <span className={styles.itemTitle}>{item.title}</span>
          <span className={styles.itemText}>{item.description}</span>
        </a>
      ))}
    </div>
  ));
}

function Footer({ links }: { links: FooterLink[] }) {
  return (
    <div className={styles.footer}>
      {links.map((link) => (
        <a key={link.label} className={styles.footerLink}>
          <Icon d={link.icon} />
          {link.label}
        </a>
      ))}
    </div>
  );
}

/**
 * Mega menu: a payments company's marketing site with its header (our own logo; Products, Solutions, Developers,
 * Pricing) and the big dropdown under it. Products lays out two columns of links, each with an icon and a one-line
 * description, a featured card at the side and a row of links along the bottom; a small arrow points up at the open
 * trigger. The loop: the pointer slides from Products to Solutions and the panel morphs into the new content,
 * resizing and sliding while the arrow glides; the pointer leaves, the dropdown closes, and it opens again.
 */
export function MegaMenu() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const site = useRef<HTMLDivElement>(null);
  useMenuGeometry(site);
  const open = (menu: Menu) => step.open && step.menu === menu;

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-menu={step.menu}
      data-open={step.open || undefined}
      data-pointer={step.pointer}
    >
      <div ref={site} className={styles.site}>
        <header className={styles.header}>
          <span className={styles.logo}>
            <svg className={styles.mark} viewBox="0 0 24 24">
              <path d="M5.2 3h10.6l-3.4 8.4H1.8zM11.6 12.6h10.6L18.8 21H8.2z" />
            </svg>
            <span className={styles.wordmark}>basalt</span>
          </span>
          <nav className={styles.nav}>
            <Trigger menu="products" label="Products" open={open('products')} />
            <Trigger menu="solutions" label="Solutions" open={open('solutions')} />
            <span className={styles.developers}>
              <Trigger label="Developers" open={false} />
            </span>
            <a className={styles.link}>Pricing</a>
          </nav>
          <a className={styles.signIn}>
            Sign in
            <Icon d={ICONS.chevron} className={styles.signInChevron} />
          </a>
        </header>

        {/* The page under the menu: the hero, which the open panel covers */}
        <div className={styles.hero}>
          <h2 className={styles.headline}>Move money at the speed of your business</h2>
          <p className={styles.lead}>
            Accept payments in 135 currencies, then run billing, tax and payouts from one dashboard.
          </p>
          <span className={styles.ctas}>
            <a className={styles.primary}>
              Start now
              <Icon d={ICONS.chevron} className={styles.ctaChevron} />
            </a>
            <a className={styles.secondary}>
              Contact sales
              <Icon d={ICONS.chevron} className={styles.ctaChevron} />
            </a>
          </span>
          {/* The product shot under the hero, cut off by the tile's bottom edge */}
          <div className={styles.preview}>
            <span className={styles.previewHead}>
              Gross volume
              <span className={styles.previewBadge}>+12.4%</span>
            </span>
            <span className={styles.previewFigure}>$48,203.12</span>
            <svg className={styles.chart} viewBox="0 0 300 80" preserveAspectRatio="none">
              <path d="M0 64C18 62 28 55 46 56S76 47 96 49 126 34 146 38 178 27 198 29 228 17 248 20 282 9 300 7" />
            </svg>
          </div>
        </div>

        {/* Blurs the page while a menu is open, so the eye stays on the panel */}
        <div className={styles.curtain} />

        <div className={styles.dropdown}>
          <span className={styles.arrow} data-inspect="mega-menu-arrow" />
          <div className={styles.panel} data-inspect="mega-menu">
            <div className={styles.content} data-content="products" data-shown={step.menu === 'products' || undefined}>
              <div className={styles.columns}>
                <Groups groups={PRODUCTS} />
                <a className={styles.featured} data-inspect="mega-menu-featured">
                  <span className={styles.featuredArt}>
                    <span className={styles.payout}>
                      <span className={styles.payoutCheck}>
                        <Icon d={ICONS.check} />
                      </span>
                      <span className={styles.payoutText}>
                        <span className={styles.payoutTitle}>Payout sent</span>
                        <span className={styles.payoutAmount}>$12,480.00</span>
                      </span>
                    </span>
                  </span>
                  <span className={styles.featuredLabel}>New</span>
                  <span className={styles.featuredTitle}>Instant payouts</span>
                  <span className={styles.featuredText}>Funds in your bank in minutes.</span>
                  <span className={styles.featuredLink}>
                    Learn more
                    <Icon d={ICONS.arrow} />
                  </span>
                </a>
              </div>
              <Footer links={PRODUCTS_FOOTER} />
            </div>

            <div className={styles.content} data-content="solutions" data-shown={step.menu === 'solutions' || undefined}>
              <div className={styles.columns}>
                <Groups groups={SOLUTIONS} />
              </div>
              <Footer links={SOLUTIONS_FOOTER} />
            </div>
          </div>
        </div>

        <svg className={styles.pointer} viewBox="0 0 14 20" aria-hidden="true">
          <path d="M1.2 1.2v15.2l4-3.7 2.7 6 2.6-1.1-2.6-5.9h5.4z" />
        </svg>
      </div>
    </div>
  );
}
