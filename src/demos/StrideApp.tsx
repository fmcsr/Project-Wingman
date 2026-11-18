import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion, useEvery } from './motion';
import styles from './StrideApp.module.css';
import pairCobalt from './photos/stride/rally-pair-cobalt.webp';
import pairLagoon from './photos/stride/rally-pair-lagoon.webp';
import pairLime from './photos/stride/rally-pair-lime.webp';
import pairSmoke from './photos/stride/rally-pair-smoke.webp';
import pair from './photos/stride/rally-pair.webp';
import cobalt from './photos/stride/swatch-cobalt.webp';
import ember from './photos/stride/swatch-ember.webp';
import lagoon from './photos/stride/swatch-lagoon.webp';
import lime from './photos/stride/swatch-lime.webp';
import smoke from './photos/stride/swatch-smoke.webp';
import { StatusBar } from './StatusBar';

/** The same shoe in its five colorways, each with a photo of the pair and a swatch. The page opens on the first. */
const COLORWAYS = [
  { name: 'Black/Ember', photo: pair, swatch: ember },
  { name: 'Black/Lagoon', photo: pairLagoon, swatch: lagoon },
  { name: 'Black/Lime', photo: pairLime, swatch: lime },
  { name: 'Black/Cobalt', photo: pairCobalt, swatch: cobalt },
  { name: 'Black/Smoke', photo: pairSmoke, swatch: smoke },
];

/** US men's sizes: 10 is picked, 7 and 11.5 are sold out. */
const SIZES = [
  { label: '7', soldOut: true },
  { label: '7.5' },
  { label: '8' },
  { label: '8.5' },
  { label: '9' },
  { label: '9.5' },
  { label: '10', selected: true },
  { label: '10.5' },
  { label: '11' },
  { label: '11.5', soldOut: true },
  { label: '12' },
  { label: '13' },
];

/** How long each photo stays before the carousel slides on to the next colorway. */
const SLIDE_MS = 5000;

/**
 * Where a photo sits relative to the one on screen, in photo widths: 0 on screen, 1 next in line on the right, -1 the
 * one before it on the left. The carousel loops, so the first photo comes after the last.
 */
function offsetOf(index: number, current: number) {
  const half = Math.floor(COLORWAYS.length / 2);
  return ((index - current + COLORWAYS.length + half) % COLORWAYS.length) - half;
}

/**
 * Example project [05]: a sneaker's product page in a shopping app, laid out like the Nike app's. A full-width photo
 * on a pale gray backdrop with page dots, then the name, the sale price, photo swatches of the other colors, a size
 * grid and the two stacked pill buttons. While it's in view, the carousel slides on to the next colorway every few
 * seconds and loops; the page dots, the colorway's name and the picker's ring follow it. It holds while any of them
 * is inspected.
 */
export function StrideApp() {
  const gallery = useDemoMotion<HTMLDivElement>();
  const title = useDemoMotion<HTMLDivElement>();
  const picker = useDemoMotion<HTMLDivElement>();
  const [current, setCurrent] = useState(0);
  useEvery(SLIDE_MS, gallery.playing && title.playing && picker.playing, () =>
    setCurrent((index) => (index + 1) % COLORWAYS.length),
  );
  // The other colorways' photos load once the carousel is about to need them; a still page shows only the first
  const loop = gallery.started && !gallery.final;

  return (
    <div className={styles.app}>
      <StatusBar className={styles.statusBar} />

      <header className={styles.navBar} data-inspect="navigation-bar">
        <span className={styles.back} data-inspect="back-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </span>
        <span className={styles.navTitle}>Stride Rally Mid</span>
        <span className={styles.navActions}>
          <span className={styles.navIcon} data-inspect="share-button">
            <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
              <path d="M12 14.5v-11M8 7.2l4-3.7 4 3.7" />
              <path d="M8.8 10H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1.8" />
            </svg>
          </span>
          <span className={styles.navIcon} data-inspect="search-button">
            <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.4 15.4l5.1 5.1" />
            </svg>
          </span>
        </span>
      </header>

      <div ref={gallery.ref} className={styles.gallery} data-inspect="image-carousel">
        {COLORWAYS.map((colorway, index) => {
          if (index > 0 && !loop) return null;
          const offset = offsetOf(index, current);
          return (
            <img
              key={colorway.name}
              className={styles.photo}
              src={colorway.photo}
              alt=""
              draggable={false}
              // Only the photo leaving and the one coming in slide; the others move round off screen
              data-moving={offset === 0 || offset === -1 || undefined}
              style={{ '--offset': offset } as CSSProperties}
            />
          );
        })}
        <span className={styles.badge} data-inspect="image-badge">
          {/* The Stride mark: two staggered steps */}
          <svg className={styles.mark} viewBox="0 0 24 24" width="11" height="11">
            <rect x="3.5" y="10" width="7" height="12.5" rx="3.5" transform="rotate(14 7 16.25)" />
            <rect x="13.5" y="1.5" width="7" height="12.5" rx="3.5" transform="rotate(14 17 7.75)" />
          </svg>
          Stride Pick
        </span>
        <span className={styles.dots} data-inspect="pagination-dots">
          {COLORWAYS.map((colorway, index) => (
            <span key={colorway.name} className={styles.dot} data-current={index === current || undefined} />
          ))}
        </span>
      </div>

      <div className={styles.info}>
        <div ref={title.ref} data-inspect="product-title">
          <h3 className={styles.title}>Stride Rally Mid</h3>
          <p className={styles.category}>
            Men's Basketball Shoes ·{' '}
            {/* Every name in one grid cell, so the line keeps its width as they cross-fade */}
            <span className={styles.colorway}>
              {COLORWAYS.map((colorway, index) => (
                <span key={colorway.name} data-current={index === current || undefined}>
                  {colorway.name}
                </span>
              ))}
            </span>
          </p>
        </div>

        <p className={styles.price} data-inspect="price-tag">
          <span>$97.97</span>
          <span className={styles.was}>$140</span>
          <span className={styles.off}>30% off</span>
        </p>

        <div ref={picker.ref} className={styles.swatches} data-inspect="color-swatches">
          {COLORWAYS.map((colorway, index) => (
            <span key={colorway.name} className={styles.swatch} data-selected={index === current || undefined}>
              <img src={colorway.swatch} alt="" draggable={false} />
            </span>
          ))}
        </div>

        <div className={styles.sizes} data-inspect="size-chips">
          <div className={styles.sizeHeader}>
            <span>Select Size</span>
            <span className={styles.sizeGuide} data-inspect="size-guide">
              Size Guide
            </span>
          </div>
          <div className={styles.sizeGrid}>
            {SIZES.map((size) => (
              <span
                key={size.label}
                className={size.selected ? styles.sizeSelected : size.soldOut ? styles.sizeSoldOut : styles.size}
              >
                {size.label}
              </span>
            ))}
          </div>
        </div>

        <span className={styles.addToBag} data-inspect="add-to-bag">
          Add to Bag
        </span>
        <span className={styles.favorite} data-inspect="favorite-button">
          Favorite
          <svg className={styles.icon} viewBox="0 0 24 24" width="13" height="13">
            <path d="M12 20s-7.6-4.7-9.3-9.4C1.6 7.4 3.6 4.5 6.7 4.5c2.2 0 3.7 1.3 5.3 3.2 1.6-1.9 3.1-3.2 5.3-3.2 3.1 0 5.1 2.9 4 6.1C19.6 15.3 12 20 12 20z" />
          </svg>
        </span>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
