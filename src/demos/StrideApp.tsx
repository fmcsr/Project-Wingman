import { useEffect, useState } from 'react';
import { useInspectActivity } from '../inspector/InspectActivity';
import { StatusBar } from './StatusBar';
import styles from './StrideApp.module.css';

const COLORS = [
  { name: 'Coral', value: '#f97360', selected: true },
  { name: 'Navy', value: '#1e3a8a' },
  { name: 'Sage', value: '#84a98c' },
  { name: 'Black', value: '#111111' },
];

const SIZES = [
  { label: '8' },
  { label: '9' },
  { label: '10', selected: true },
  { label: '11', soldOut: true },
  { label: '12' },
];

const STAR = 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9z';

/** Boştayken bildirimin (toast) kendi kendine gelip gitme aralığı. */
const TOAST_CYCLE_MS = 2800;

/**
 * Örnek proje [05]: bir alışveriş uygulamasının ürün sayfası. PM'lerin en sık adını aradığı öğeleri
 * (toast, sayı rozeti, sayfa noktaları, adet seçici, tükenmiş beden, sabit satın alma çubuğu) bir arada gösterir.
 * Toast boştayken gelip gider; örnek incelenirken görünür kalır.
 */
export function StrideApp() {
  const exploring = useInspectActivity();
  const [cycleToast, setCycleToast] = useState(false);

  useEffect(() => {
    if (exploring) return;
    // Hareketi azaltma açıksa toast görünür ve sabit durur
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCycleToast(true);
      return;
    }
    const timer = window.setInterval(() => setCycleToast((visible) => !visible), TOAST_CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [exploring]);

  const toastVisible = exploring || cycleToast;

  return (
    <div className={styles.app}>
      <div className={styles.gallery} data-inspect="image-carousel">
        <svg className={styles.shoe} viewBox="0 0 240 140">
          <ellipse cx="124" cy="128" rx="92" ry="6" fill="rgb(0 0 0 / 0.12)" />
          <path
            d="M30 100C31 80 38 62 54 54c12-6 24-2 34-9 9-7 18-11 29-9 14 3 22 13 35 21 19 12 45 20 62 28 9 4 14 9 14 15z"
            fill="#f97360"
          />
          <path d="M30 100c-1-14 1-28 9-39l7 4c-6 10-8 22-7 35z" fill="#e8553f" />
          <path d="M88 45c4-12 16-18 27-14l4 8c-10-2-18 2-22 10z" fill="#ffd8cf" />
          <path d="M72 100l26-36 11 5-23 31z" fill="#ffffff" opacity="0.9" />
          <path d="M186 80c19 5 35 12 42 20h-40z" fill="#ffd8cf" />
          <path d="M101 53l19-5M108 59l20-5M116 65l20-5" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M18 108c0-6 5-10 12-10h180c12 0 21 7 21 16v2c0 6-5 10-12 10H30c-7 0-12-5-12-12z"
            fill="#ffffff"
            stroke="#e7e2dc"
            strokeWidth="1.5"
          />
          <path d="M24 113h202" stroke="#f1ece6" strokeWidth="2" />
        </svg>
        <span className={styles.counter}>1 / 4</span>
        <span className={styles.dots} data-inspect="pagination-dots">
          <span className={styles.dotActive} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      </div>

      <StatusBar className={styles.statusBar} />

      <div className={styles.topBar}>
        <span className={styles.roundButton} data-inspect="icon-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </span>
        <span className={styles.topActions}>
          <span className={styles.roundButton} data-inspect="favorite-button">
            <svg className={styles.heart} viewBox="0 0 24 24" width="18" height="18">
              <path d="M12 21s-7.5-4.6-9.6-9.1C.9 8.6 3.1 5 6.6 5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.5 0 5.7 3.6 4.2 6.9C19.5 16.4 12 21 12 21z" />
            </svg>
          </span>
          <span className={styles.roundButton} data-inspect="icon-button">
            <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
              <path d="M6 8h12l-1 12H7zM9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className={styles.badge} data-inspect="badge-count">
              2
            </span>
          </span>
        </span>
      </div>

      <div className={styles.details}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>Stride Runner</h3>
          <span className={styles.discount} data-inspect="discount-badge">
            −20%
          </span>
        </div>
        <p className={styles.subtitle}>Men's road running shoe</p>

        <div className={styles.rating} data-inspect="rating-stars">
          <svg width="0" height="0" className={styles.defs}>
            <defs>
              <linearGradient id="stride-star-partial">
                <stop offset="80%" stopColor="#f59e0b" />
                <stop offset="80%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
          </svg>
          {[0, 1, 2, 3].map((index) => (
            <svg key={index} className={styles.star} viewBox="0 0 24 24">
              <path d={STAR} fill="#f59e0b" />
            </svg>
          ))}
          <svg className={styles.star} viewBox="0 0 24 24">
            <path d={STAR} fill="url(#stride-star-partial)" />
          </svg>
          <span className={styles.score}>4.8</span>
          <span className={styles.reviews}>(2,184)</span>
        </div>

        <p className={styles.price} data-inspect="price-tag">
          <span className={styles.now}>$128</span>
          <span className={styles.was}>$160</span>
        </p>

        <p className={styles.label}>Color · Coral</p>
        <div className={styles.swatches} data-inspect="color-swatches">
          {COLORS.map((color) => (
            <span
              key={color.name}
              className={color.selected ? `${styles.swatch} ${styles.swatchSelected}` : styles.swatch}
              style={{ background: color.value }}
            />
          ))}
        </div>

        <p className={styles.label}>Size (US)</p>
        <div className={styles.sizes} data-inspect="size-chips">
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

      <div className={styles.toast} data-inspect="toast" data-visible={toastVisible || undefined}>
        <svg className={`${styles.icon} ${styles.toastIcon}`} viewBox="0 0 24 24" width="16" height="16">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        Added to bag
        <span className={styles.toastAction}>View</span>
      </div>

      <div className={styles.buyBar} data-inspect="sticky-cta">
        <span className={styles.stepper} data-inspect="quantity-stepper">
          <span className={styles.stepButton}>−</span>
          <span className={styles.qty}>1</span>
          <span className={styles.stepButton}>+</span>
        </span>
        <span className={styles.addButton}>Add to bag · $128</span>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
