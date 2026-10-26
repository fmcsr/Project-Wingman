import type { ReactNode } from 'react';
import { StatusBar } from '../../../demos/StatusBar';
import styles from './NestApp.module.css';

const HEART =
  'M12 21s-7.5-4.6-9.6-9.1C.9 8.6 3.1 5 6.6 5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.5 0 5.7 3.6 4.2 6.9C19.5 16.4 12 21 12 21z';
const STAR = 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9z';
const BUBBLE =
  'M6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-7A2.5 2.5 0 0 1 6.5 4z';

const MAGNIFIER = (
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.4-4.4" />
  </>
);

/**
 * The listing's other photos sit side by side to the right of the first, out of view. Seven photos and five dots:
 * the smaller last dot says more follow.
 */
const MORE_PHOTOS = ['livingRoom', 'dock', 'bedroom', 'night', 'kitchen', 'trail'];

/** More categories than fit: the row runs past the right edge, where the last one is cut off. */
const CATEGORIES: { label: string; active?: boolean; icon: ReactNode }[] = [
  {
    label: 'Cabins',
    active: true,
    icon: <path d="M3 11.5L12 4l9 7.5M5.5 9.5V20h13V9.5M10 20v-5h4v5M16 6.8V4.5h2v4" />,
  },
  {
    label: 'Beachfront',
    icon: <path d="M12 4a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8zM12 12v6M3 20c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />,
  },
  { label: 'Tiny homes', icon: <path d="M7 12.5l5-4 5 4V19H7zM4 19h16M11 19v-3h2v3" /> },
  {
    label: 'Lakefront',
    icon: (
      <>
        <path d="M12 3.5l4 7H8zM12 10.5V13" />
        <path d="M3 16.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M3 20.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
      </>
    ),
  },
  {
    label: 'Treehouses',
    icon: <path d="M12 3a5 5 0 0 1 5 5 4 4 0 0 1-1 7.9H8A4 4 0 0 1 7 8a5 5 0 0 1 5-5zM12 16v5M10 11h4v3h-4z" />,
  },
  { label: 'Amazing views', icon: <path d="M3 19l6-9 4 5.5 2.5-3L21 19zM16.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /> },
];

const TABS: { label: string; active?: boolean; icon: ReactNode }[] = [
  { label: 'Explore', active: true, icon: MAGNIFIER },
  { label: 'Wishlists', icon: <path d={HEART} /> },
  {
    label: 'Trips',
    icon: (
      <>
        <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
        <path d="M9 7.5v-2A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5v2M3.5 12.5h17" />
      </>
    ),
  },
  { label: 'Inbox', icon: <path d={BUBBLE} /> },
  {
    label: 'Profile',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="10" r="3" />
        <path d="M6.2 18.4a6.5 6.5 0 0 1 11.6 0" />
      </>
    ),
  },
];

/**
 * Nest: the explore feed of a home-rental app, built from the patterns Airbnb, Booking.com and Vrbo share.
 * A search pill, scrolling category tabs, a listing card with a photo carousel, and a floating Map button.
 * Static and not interactive; for inspection only.
 */
export function NestApp() {
  return (
    <div className={styles.app}>
      <StatusBar />

      <div className={styles.searchRow}>
        <span className={styles.search} data-inspect="search-bar">
          <svg className={styles.searchIcon} viewBox="0 0 24 24" width="15" height="15">
            {MAGNIFIER}
          </svg>
          <span className={styles.searchText}>
            <span className={styles.searchTitle}>Where to?</span>
            <span className={styles.searchHint}>Anywhere · Any week · Add guests</span>
          </span>
        </span>
        <span className={styles.filter} data-inspect="filter-button">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
            <circle cx="15" cy="7" r="2" />
            <circle cx="9" cy="17" r="2" />
          </svg>
        </span>
      </div>

      <div className={styles.categories} data-inspect="category-tabs">
        {CATEGORIES.map((category) => (
          <span
            key={category.label}
            className={category.active ? styles.categoryActive : styles.category}
            data-inspect={category.active ? 'active-tab' : undefined}
          >
            <svg viewBox="0 0 24 24" width="22" height="22">
              {category.icon}
            </svg>
            {category.label}
          </span>
        ))}
      </div>

      {/* The feed runs on under the Map button and the tab bar */}
      <div className={styles.feed}>
        <article className={styles.listing} data-inspect="listing-card">
          <div className={styles.photo} data-inspect="photo-carousel">
            <div className={styles.track}>
              <span className={`${styles.slide} ${styles.dusk}`}>
                <span className={styles.ridge} />
                <span className={styles.pines} />
                <span className={styles.cabin} />
                <span className={styles.lake} />
              </span>
              {MORE_PHOTOS.map((photo) => (
                <span key={photo} className={`${styles.slide} ${styles[photo]}`} />
              ))}
            </div>
            <span className={styles.badge} data-inspect="listing-badge">
              Guest favorite
            </span>
            <span className={styles.heart} data-inspect="favorite-button">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d={HEART} />
              </svg>
            </span>
            <span className={styles.dots} data-inspect="pagination-dots">
              <span className={styles.dotActive} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dotEdge} />
            </span>
          </div>

          <div className={styles.titleRow}>
            <h3 className={styles.place}>Big Bear Lake, California</h3>
            <span className={styles.rating} data-inspect="rating">
              <svg viewBox="0 0 24 24" width="11" height="11">
                <path d={STAR} />
              </svg>
              4.92
            </span>
          </div>
          <p className={styles.detail}>84 miles away</p>
          <p className={styles.detail}>Nov 14 – 19</p>
          <p className={styles.price} data-inspect="price">
            <s className={styles.was}>$231</s> <span className={styles.now}>$184</span> night
          </p>
        </article>

        {/* The next listing peeks out under the Map button; this one is already saved */}
        <article className={styles.listing} data-inspect="listing-card">
          <div className={styles.photo} data-inspect="photo-carousel">
            <div className={styles.track}>
              <span className={`${styles.slide} ${styles.forest}`} />
            </div>
            <span className={`${styles.heart} ${styles.heartSaved}`} data-inspect="favorite-button">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d={HEART} />
              </svg>
            </span>
          </div>
        </article>
      </div>

      <span className={styles.mapButton} data-inspect="map-button">
        Map
        <svg viewBox="0 0 24 24" width="15" height="15">
          <path d="M9 4.5L3.5 6.5v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2zM9 4.5v13M15 6.5v13" />
        </svg>
      </span>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        {TABS.map((tab) => (
          <span key={tab.label} className={tab.active ? styles.tabActive : styles.tab}>
            <svg viewBox="0 0 24 24" width="22" height="22">
              {tab.icon}
            </svg>
            {tab.label}
          </span>
        ))}
      </nav>
      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
