import styles from './StrideApp.module.css';
import pair from './photos/stride/rally-pair.webp';
import cobalt from './photos/stride/swatch-cobalt.webp';
import ember from './photos/stride/swatch-ember.webp';
import lagoon from './photos/stride/swatch-lagoon.webp';
import lime from './photos/stride/swatch-lime.webp';
import smoke from './photos/stride/swatch-smoke.webp';
import { StatusBar } from './StatusBar';

/** The same shoe in its five colorways; the page shows the first. */
const COLORWAYS = [
  { name: 'Black/Ember', photo: ember, selected: true },
  { name: 'Black/Lagoon', photo: lagoon },
  { name: 'Black/Lime', photo: lime },
  { name: 'Black/Cobalt', photo: cobalt },
  { name: 'Black/Smoke', photo: smoke },
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

const PHOTO_COUNT = 4;

/**
 * Example project [05]: a sneaker's product page in a shopping app, laid out like the Nike app's. A full-width photo
 * on a pale gray backdrop with page dots, then the name, the sale price, photo swatches of the other colors, a size
 * grid and the two stacked pill buttons. Nothing moves on its own.
 */
export function StrideApp() {
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

      <div className={styles.gallery} data-inspect="image-carousel">
        <img className={styles.photo} src={pair} alt="" draggable={false} />
        <span className={styles.badge} data-inspect="image-badge">
          {/* The Stride mark: two staggered steps */}
          <svg className={styles.mark} viewBox="0 0 24 24" width="11" height="11">
            <rect x="3.5" y="10" width="7" height="12.5" rx="3.5" transform="rotate(14 7 16.25)" />
            <rect x="13.5" y="1.5" width="7" height="12.5" rx="3.5" transform="rotate(14 17 7.75)" />
          </svg>
          Stride Pick
        </span>
        <span className={styles.dots} data-inspect="pagination-dots">
          {Array.from({ length: PHOTO_COUNT }, (_, index) => (
            <span key={index} className={index === 0 ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
          ))}
        </span>
      </div>

      <div className={styles.info}>
        <div data-inspect="product-title">
          <h3 className={styles.title}>Stride Rally Mid</h3>
          <p className={styles.category}>Men's Basketball Shoes</p>
        </div>

        <p className={styles.price} data-inspect="price-tag">
          <span>$97.97</span>
          <span className={styles.was}>$140</span>
          <span className={styles.off}>30% off</span>
        </p>

        <div className={styles.swatches} data-inspect="color-swatches">
          {COLORWAYS.map((colorway) => (
            <span
              key={colorway.name}
              className={colorway.selected ? `${styles.swatch} ${styles.swatchSelected}` : styles.swatch}
            >
              <img src={colorway.photo} alt="" draggable={false} />
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
