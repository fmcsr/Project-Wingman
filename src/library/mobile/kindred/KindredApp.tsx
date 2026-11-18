import type { ReactNode } from 'react';
import { StatusBar } from '../../../demos/StatusBar';
import styles from './KindredApp.module.css';
import beach from './photos/beach.webp';
import liv from './photos/liv.webp';

/** A heart with two round lobes that meet in a point: the like button and the Likes tab. */
const HEART =
  'M12 20.3l-1.3-1.2C6 14.9 2.9 12.1 2.9 8.6A4.7 4.7 0 0 1 7.6 3.9c1.7 0 3.3.8 4.4 2.1a5.8 5.8 0 0 1 4.4-2.1 4.7 4.7 0 0 1 4.7 4.7c0 3.5-3.1 6.3-7.8 10.5z';

/** Liv's interests. The one you list too is marked as shared and filled in with the brand color. */
const INTERESTS = [{ label: 'Hiking', shared: true }, { label: 'Bouldering' }, { label: 'Film photos' }];

const TABS: { label: string; active?: boolean; count?: string; dot?: boolean; icon: ReactNode }[] = [
  {
    label: 'Discover',
    active: true,
    // Two profile cards, the front one tilted the way a card leaves the stack; only the front one fills in
    icon: (
      <>
        <rect
          className={styles.outline}
          x="3.4"
          y="6.6"
          width="10.4"
          height="13.6"
          rx="2.4"
          transform="rotate(-9 8.6 13.4)"
        />
        <rect x="9.9" y="3.6" width="10.4" height="13.6" rx="2.4" transform="rotate(9 15.1 10.4)" />
      </>
    ),
  },
  {
    label: 'Explore',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.6" />
        <path d="M15.4 8.6l-1.9 4.9-4.9 1.9 1.9-4.9z" />
      </>
    ),
  },
  { label: 'Likes', count: '12', icon: <path d={HEART} /> },
  {
    label: 'Chats',
    dot: true,
    icon: (
      <path d="M20.2 11.3c0 4.1-3.7 7.3-8.2 7.3-1 0-2-.2-2.9-.5l-4.6 1.8 1.3-3.7a6.9 6.9 0 0 1-2-4.9C3.8 7.2 7.5 4 12 4s8.2 3.2 8.2 7.3z" />
    ),
  },
  {
    label: 'Profile',
    icon: (
      <>
        <circle cx="12" cy="8.2" r="3.7" />
        <path d="M4.9 20.1c.8-3.7 3.7-5.9 7.1-5.9s6.3 2.2 7.1 5.9z" />
      </>
    ),
  },
];

/**
 * Library example: a dating app's swipe screen, laid out like Tinder's. The top profile is a full-bleed photo card,
 * caught at the start of a swipe to the right, so its LIKE stamp shows and the next card peeks out behind it. The round
 * action buttons sit over the bottom of the photo, above a floating tab bar. Not interactive; for inspection only.
 */
export function KindredApp() {
  return (
    <div className={styles.app}>
      <StatusBar className={styles.statusBar} />

      <header className={styles.topBar} data-inspect="top-bar">
        {/* Wordmark: the name in heavy lowercase type; the dot on the i is the only spot of brand color */}
        <span className={styles.wordmark}>
          k<span className={styles.dotlessI}>ı</span>ndred
        </span>
        <span className={styles.filterButton} data-inspect="filter-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
            <path d="M3.5 7.5h9.2M18.4 7.5h2.1M3.5 16.5h2.1M11.3 16.5h9.2" />
            <circle cx="15.5" cy="7.5" r="2.7" />
            <circle cx="8.5" cy="16.5" r="2.7" />
          </svg>
        </span>
      </header>

      {/* The next profile waits right behind the top card, at full size; it shows where the top card has moved away */}
      <div className={styles.stack} data-inspect="card-stack">
        <div className={styles.nextCard}>
          <img className={styles.photo} src={beach} alt="" draggable={false} />
        </div>

        <article className={styles.card} data-inspect="profile-card">
          <img className={styles.photo} src={liv} alt="" draggable={false} />

          <span className={styles.segments} data-inspect="photo-segments">
            <span className={styles.segmentActive} />
            <span className={styles.segment} />
            <span className={styles.segment} />
            <span className={styles.segment} />
            <span className={styles.segment} />
          </span>

          <span className={styles.stamp} data-inspect="swipe-stamp">
            LIKE
          </span>

          <div className={styles.info}>
            <div className={styles.details} data-inspect="profile-details">
              <h3 className={styles.name}>
                Liv
                <span className={styles.age}>27</span>
                <svg
                  className={styles.verified}
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  data-inspect="verified-badge"
                >
                  <path
                    className={styles.seal}
                    d="M12 2.8l2.9 2.2 3.6.5.5 3.6 2.2 2.9-2.2 2.9-.5 3.6-3.6.5-2.9 2.2-2.9-2.2-3.6-.5-.5-3.6L2.8 12l2.2-2.9.5-3.6 3.6-.5z"
                  />
                  <path className={styles.check} d="M8.4 12.3l2.4 2.4 4.8-5" />
                </svg>
              </h3>
              <p className={styles.meta}>
                <svg className={styles.icon} viewBox="0 0 24 24" width="11" height="11">
                  <path d="M12 21.2s-6.8-5.8-6.8-11.4a6.8 6.8 0 0 1 13.6 0c0 5.6-6.8 11.4-6.8 11.4z" />
                  <circle cx="12" cy="9.8" r="2.4" />
                </svg>
                4 km away
              </p>
            </div>

            <span className={styles.infoButton} data-inspect="info-button">
              <svg className={styles.icon} viewBox="0 0 24 24" width="12" height="12">
                <path d="M12 3.6l7 7.6h-4.3v9.2H9.3v-9.2H5z" />
              </svg>
            </span>

            <ul className={styles.chips} data-inspect="interest-chips">
              {INTERESTS.map((interest) => (
                <li key={interest.label} className={interest.shared ? styles.chipShared : styles.chip}>
                  {interest.label}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      {/* Fixed to the screen, not to the card: the row stays put while the card moves */}
      <div className={styles.actions}>
        <span className={`${styles.round} ${styles.small}`} data-inspect="secondary-action">
          <svg className={`${styles.icon} ${styles.rewind}`} viewBox="0 0 24 24" width="21" height="21">
            <path d="M6.2 8.6a7.1 7.1 0 1 1-.9 6.1" />
            <path d="M5.4 3.9l.6 4.9 4.8-.8" />
          </svg>
        </span>
        <span className={`${styles.round} ${styles.big}`} data-inspect="pass-button">
          <svg className={`${styles.icon} ${styles.nope}`} viewBox="0 0 24 24" width="26" height="26">
            <path d="M5.4 5.4l13.2 13.2M18.6 5.4L5.4 18.6" />
          </svg>
        </span>
        <span className={`${styles.round} ${styles.small}`} data-inspect="secondary-action">
          <svg className={`${styles.glyph} ${styles.superLike}`} viewBox="0 0 24 24" width="23" height="23">
            <path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.9l-5.4 2.9 1.1-6.1-4.5-4.3 6.1-.8z" />
          </svg>
        </span>
        <span className={`${styles.round} ${styles.big}`} data-inspect="like-button">
          <svg className={`${styles.glyph} ${styles.like}`} viewBox="0 0 24 24" width="28" height="28">
            <path d={HEART} />
          </svg>
        </span>
        <span className={`${styles.round} ${styles.small}`} data-inspect="secondary-action">
          <svg className={`${styles.glyph} ${styles.boost}`} viewBox="0 0 24 24" width="21" height="21">
            <path d="M13.9 2.6L5 13.7h6l-1.3 7.7 9.2-11.6h-6.1z" />
          </svg>
        </span>
      </div>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        {TABS.map((tab) => (
          <span key={tab.label} className={tab.active ? styles.tabActive : styles.tab}>
            <span className={styles.tabIcon}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14">
                {tab.icon}
              </svg>
              {tab.count && <span className={styles.count}>{tab.count}</span>}
              {tab.dot && <span className={styles.dot} />}
            </span>
            {tab.label}
          </span>
        ))}
      </nav>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
