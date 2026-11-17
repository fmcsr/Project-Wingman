import type { ReactNode } from 'react';
import { StatusBar } from '../../../demos/StatusBar';
import styles from './NestApp.module.css';
import aFrame from './photos/a-frame.webp';
import lakeLodge from './photos/lake-lodge.webp';

const HEART =
  'M12 20.6s-8.2-4.7-8.2-10.9C3.8 6.8 5.9 4.6 8.6 4.6c1.6 0 2.7.7 3.4 1.9.7-1.2 1.8-1.9 3.4-1.9 2.7 0 4.8 2.2 4.8 5.1 0 6.2-8.2 10.9-8.2 10.9z';

const MAGNIFIER = (
  <>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.3 15.3 20 20" />
  </>
);

/** More categories than fit: the row runs past the right edge, where the last one is cut off. */
const CATEGORIES: { label: string; active?: boolean; icon: ReactNode }[] = [
  {
    label: 'Cabins',
    active: true,
    icon: <path d="M12 3.5 3.5 20.5h17zM8.6 20.5l3.4-7 3.4 7M2.5 20.5h19" />,
  },
  {
    label: 'Lakefront',
    icon: (
      <>
        <path d="M5 13V8.5L9.5 5 14 8.5V13M8 13v-2.5h3V13" />
        <path d="M2.5 16.5c1.6-1 3.2-1 4.8 0s3.2 1 4.7 0 3.2-1 4.7 0 3.2 1 4.8 0M2.5 20.5c1.6-1 3.2-1 4.8 0s3.2 1 4.7 0 3.2-1 4.7 0 3.2 1 4.8 0" />
      </>
    ),
  },
  {
    label: 'Hot tubs',
    icon: (
      <>
        <path d="M3.5 12.5h17v2.5a5 5 0 0 1-5 5h-7a5 5 0 0 1-5-5z" />
        <path d="M8.5 9.5c-1-1.2 1-2.3 0-3.5M12 9.5c-1-1.2 1-2.3 0-3.5M15.5 9.5c-1-1.2 1-2.3 0-3.5" />
      </>
    ),
  },
  {
    label: 'Tiny homes',
    icon: <path d="M6 20.5v-8L12 7l6 5.5v8zM4 14l8-7.5 8 7.5M10.3 20.5v-4h3.4v4" />,
  },
  {
    label: 'Treehouses',
    icon: (
      <>
        <path d="M12 2.8a5.2 5.2 0 0 1 5.2 5.2 4 4 0 0 1-2.2 3.6H9a4 4 0 0 1-2.2-3.6A5.2 5.2 0 0 1 12 2.8z" />
        <path d="M12 11.6v9M8.5 14.5h7v3.5h-7zM7.5 20.5h9" />
      </>
    ),
  },
  {
    label: 'Mountain views',
    icon: <path d="M2.5 19.5 9 9l3.6 5.6L15 11l6.5 8.5zM7.2 12l1.8 1.3 1.7-1.2" />,
  },
];

const TABS: { label: string; active?: boolean; dot?: boolean; icon: ReactNode }[] = [
  { label: 'Explore', active: true, icon: MAGNIFIER },
  { label: 'Wishlists', icon: <path d={HEART} /> },
  {
    // Trips wears the Nest mark: two eggs in a nest
    label: 'Trips',
    icon: (
      <path d="M6.9 12.3c-.1-.4-.1-.8-.1-1.3 0-2.2 1.1-3.9 2.5-3.9s2.5 1.7 2.5 3.9c0 .5 0 .9-.1 1.3M12.4 12.3c-.1-.4-.1-.8-.1-1.3 0-2.2 1.1-3.9 2.5-3.9s2.5 1.7 2.5 3.9c0 .5 0 .9-.1 1.3M2.5 12.5h19M4 12.5c.4 4.2 3.8 6.8 8 6.8s7.6-2.6 8-6.8M6.2 15.9c3.8.9 7.8.9 11.6 0" />
    ),
  },
  {
    label: 'Messages',
    dot: true,
    icon: <path d="M4 6.8C4 5.8 4.8 5 5.8 5h12.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H11l-4.5 3.5V17h-.7c-1 0-1.8-.8-1.8-1.8z" />,
  },
  {
    label: 'Profile',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.6" />
        <circle cx="12" cy="10.2" r="3.1" />
        <path d="M6.4 18.3c1.2-2 3.2-3.1 5.6-3.1s4.4 1.1 5.6 3.1" />
      </>
    ),
  },
];

/**
 * Library example: a home-rental app's Explore screen, laid out like Airbnb's. The search pill with the filter
 * button, a row of category tabs, then the feed: a listing card with its photo carousel (badge, heart and dots), its
 * title and rating, three gray lines and the price. The next listing, already saved, passes under the floating Map
 * button and the tab bar.
 */
export function NestApp() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <StatusBar />

        <div className={styles.searchRow}>
          <span className={styles.search} data-inspect="search-bar">
            <svg className={styles.searchIcon} viewBox="0 0 24 24" width="15" height="15">
              {MAGNIFIER}
            </svg>
            <span className={styles.searchText}>
              <span className={styles.searchTitle}>Where to next?</span>
              <span className={styles.searchHint}>Anywhere · Any week · Add guests</span>
            </span>
          </span>
          <span className={styles.filter} data-inspect="filter-button">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M3.5 7.5h9M17.5 7.5h3M3.5 16.5h3M11.5 16.5h9" />
              <circle cx="15" cy="7.5" r="2.4" />
              <circle cx="9" cy="16.5" r="2.4" />
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
              <svg viewBox="0 0 24 24" width="19" height="19">
                {category.icon}
              </svg>
              {category.label}
            </span>
          ))}
        </div>
      </header>

      {/* The feed runs on under the Map button and the tab bar */}
      <div className={styles.feed}>
        <article className={styles.listing} data-inspect="listing-card">
          <div className={styles.photo} data-inspect="photo-carousel">
            <img className={styles.photoImage} src={aFrame} alt="" draggable={false} />
            <span className={styles.badge} data-inspect="listing-badge">
              Guest pick
            </span>
            <span className={styles.heart} data-inspect="favorite-button">
              <svg viewBox="0 0 24 24" width="17" height="17">
                <path d={HEART} />
              </svg>
            </span>
            {/* Five dots for nine photos: the shrinking last dot says more follow */}
            <span className={styles.dots} data-inspect="pagination-dots">
              <span className={styles.dotActive} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dotEdge} />
            </span>
          </div>

          <div className={styles.titleRow}>
            <h3 className={styles.title}>Cabin in Phoenicia</h3>
            <span className={styles.rating} data-inspect="rating">
              <svg viewBox="0 0 24 24" width="9" height="9">
                <path d="M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3-4.6-4.4 6.3-.8z" />
              </svg>
              4.96 (212)
            </span>
          </div>
          <div className={styles.details} data-inspect="listing-details">
            <p className={styles.detail}>Black A-frame with a fire pit under string lights</p>
            <p className={styles.detail}>2 beds · 1 bath</p>
            <p className={styles.detail}>Nov 21 – 23</p>
          </div>
          <p className={styles.price} data-inspect="price">
            <s className={styles.was}>$486</s> <span className={styles.total}>$412</span>{' '}
            <span className={styles.per}>for 2 nights</span>
          </p>
        </article>

        {/* The next listing, already on a wishlist, slides under the Map button */}
        <article className={styles.listing} data-inspect="listing-card">
          <div className={styles.photo} data-inspect="photo-carousel">
            <img className={styles.photoImage} src={lakeLodge} alt="" draggable={false} />
            <span className={`${styles.heart} ${styles.saved}`} data-inspect="favorite-button">
              <svg viewBox="0 0 24 24" width="17" height="17">
                <path d={HEART} />
              </svg>
            </span>
          </div>
        </article>
      </div>

      <span className={styles.mapButton} data-inspect="map-button">
        Map
        <svg viewBox="0 0 24 24" width="12" height="12">
          <path d="M3 5.6 8.6 3.5v15L3 20.5zM10.1 3.5l3.8 1.6v15.4l-3.8-1.6zM15.4 5.1 21 3v15l-5.6 2.1z" />
        </svg>
      </span>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        {TABS.map((tab) => (
          <span key={tab.label} className={tab.active ? styles.tabActive : styles.tab}>
            <span className={styles.tabIcon}>
              <svg viewBox="0 0 24 24" width="19" height="19">
                {tab.icon}
              </svg>
              {tab.dot && <span className={styles.tabDot} data-inspect="notification-dot" />}
            </span>
            {tab.label}
          </span>
        ))}
      </nav>
      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
