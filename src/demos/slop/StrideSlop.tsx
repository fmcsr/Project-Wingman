import { StatusBar } from '../StatusBar';
import styles from './StrideSlop.module.css';

const SIZES = [
  { label: '7' },
  { label: '8' },
  { label: '9', selected: true },
  { label: '10' },
  { label: '11' },
];

const COLORS = [styles.colorViolet, styles.colorBlue, styles.colorOrange, styles.colorGreen];

/**
 * The AI slop version of Stride: what "Build a product page for a sneaker shop" tends to produce. A giant shoe emoji
 * on a violet-to-pink gradient, a "Hot Deal" badge, emoji stars, "Premium Quality" copy, gradient price and buttons.
 * A picture for comparison only: nothing is focusable or inspectable.
 */
export function StrideSlop() {
  return (
    <div className={styles.app}>
      <div className={styles.gallery}>
        <span className={`${styles.blob} ${styles.blobA}`} />
        <span className={`${styles.blob} ${styles.blobB}`} />
        <StatusBar className={styles.statusBar} />

        <div className={styles.topBar}>
          <span className={styles.roundButton}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </span>
          <span className={styles.topTitle}>Product Details</span>
          <span className={styles.roundButton}>
            🛒
            <span className={styles.badge}>3</span>
          </span>
        </div>

        <span className={styles.hotDeal}>🔥 HOT DEAL</span>
        <span className={styles.glow} />
        <span className={styles.shoe}>👟</span>
        <span className={`${styles.sparkle} ${styles.sparkleA}`}>✨</span>
        <span className={`${styles.sparkle} ${styles.sparkleB}`}>✨</span>
      </div>

      <div className={styles.details}>
        <div className={styles.chips}>
          <span className={styles.chip}>✨ Premium Quality</span>
          <span className={styles.chip}>🏆 Bestseller</span>
        </div>
        <h3 className={styles.title}>Stride Velocity Pro</h3>
        <p className={styles.rating}>
          ⭐⭐⭐⭐⭐ <span className={styles.score}>4.9</span>
          <span className={styles.reviews}>(10K+ reviews)</span>
        </p>
        <p className={styles.price}>
          <span className={styles.now}>$99.99</span>
          <span className={styles.was}>$169.99</span>
          <span className={styles.save}>−40% 🎉</span>
        </p>
        <p className={styles.description}>
          Experience ultimate comfort and style. Perfect for any occasion! 🚀
        </p>

        <div className={styles.labelRow}>
          <span className={styles.label}>Select Size 📏</span>
          <span className={styles.guide}>Size Guide</span>
        </div>
        <div className={styles.sizes}>
          {SIZES.map((size) => (
            <span key={size.label} className={size.selected ? styles.sizeSelected : styles.size}>
              {size.label}
            </span>
          ))}
        </div>

        <div className={styles.colorRow}>
          <span className={styles.label}>Color 🎨</span>
          <span className={styles.colors}>
            {COLORS.map((color, index) => (
              <span
                key={color}
                className={`${styles.color} ${color}${index === 0 ? ` ${styles.colorSelected}` : ''}`}
              />
            ))}
          </span>
        </div>
      </div>

      <div className={styles.buyBar}>
        <span className={styles.heart}>❤️</span>
        <span className={styles.addButton}>🛒 Add to Cart</span>
      </div>

      <span className={styles.homeIndicator} />
    </div>
  );
}
