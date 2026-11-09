import { StatusBar } from '../../../demos/StatusBar';
import { useInspectActivity } from '../../../inspector/InspectActivity';
import styles from './FlickApp.module.css';
import cook from './photos/cook.webp';
import creator from './photos/creator.webp';

/** A heart with two round lobes. */
const HEART = 'M12 21l-1.4-1.3C5.6 15.3 2.5 12.4 2.5 8.6A5 5 0 0 1 12 6.5a5 5 0 0 1 9.5 2.1c0 3.8-3.1 6.7-8.1 11.1z';
const PLUS = 'M12 5v14M5 12h14';

/**
 * Library example: the For You feed of a short-video app, laid out like TikTok's. One vertical video fills the screen
 * above the tab bar, with the feed tabs, the action rail and the caption floating on it. The sound disc spins and the
 * sound's name scrolls on their own; both hold still while the example is inspected.
 */
export function FlickApp() {
  const exploring = useInspectActivity();

  return (
    <div className={styles.app}>
      <StatusBar className={styles.statusBar} />

      <header className={styles.topBar}>
        {/* LIVE: the word drawn in strokes inside a rounded screen */}
        <span className={styles.live} data-inspect="live-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
            <rect x="1.5" y="5" width="21" height="14" rx="3.5" />
            <path d="M5.2 9.2v5.6h1.6M9.35 9.2v5.6M11.95 9.2l1.3 5.6 1.3-5.6M18.85 9.2h-1.7v5.6h1.7M17.15 12h1.5" />
          </svg>
        </span>
        <span className={styles.feedTabs} data-inspect="feed-tabs">
          <span className={styles.feedTab}>Following</span>
          <span className={styles.feedDivider} />
          <span className={styles.feedTabActive}>For You</span>
        </span>
        <span className={styles.search} data-inspect="search-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
            <circle cx="10.5" cy="10.5" r="7" />
            <path d="M15.8 15.8L21 21" />
          </svg>
        </span>
      </header>

      <div className={styles.video} data-inspect="video">
        <img className={styles.frame} src={cook} alt="" draggable={false} />
      </div>

      <div className={styles.rail}>
        <span className={styles.creator} data-inspect="creator-avatar">
          <img className={styles.creatorPhoto} src={creator} alt="" draggable={false} />
          <span className={styles.follow}>
            <svg className={styles.icon} viewBox="0 0 24 24" width="9" height="9">
              <path d={PLUS} />
            </svg>
          </span>
        </span>
        <span className={styles.action} data-inspect="like-button">
          <svg className={`${styles.actionIcon} ${styles.liked}`} viewBox="0 0 24 24" width="24" height="24">
            <path d={HEART} />
          </svg>
          128.6K
        </span>
        <span className={styles.action} data-inspect="action-button">
          <svg className={styles.actionIcon} viewBox="0 0 24 24" width="24" height="24">
            <path
              fillRule="evenodd"
              d="M12 3.6c5.2 0 9.4 3.4 9.4 7.6s-4.2 7.6-9.4 7.6c-.9 0-1.8-.1-2.7-.3l-4.3 2.4c-.5.3-1.1-.2-.9-.7l1-3.3C3.9 15.5 2.6 13.5 2.6 11.2c0-4.2 4.2-7.6 9.4-7.6zM6.5 11.2a1.35 1.35 0 1 0 2.7 0 1.35 1.35 0 1 0-2.7 0zM10.65 11.2a1.35 1.35 0 1 0 2.7 0 1.35 1.35 0 1 0-2.7 0zM14.8 11.2a1.35 1.35 0 1 0 2.7 0 1.35 1.35 0 1 0-2.7 0z"
            />
          </svg>
          1,947
        </span>
        <span className={styles.action} data-inspect="action-button">
          <svg className={styles.actionIcon} viewBox="0 0 24 24" width="24" height="24">
            <path d="M7 3h10a2 2 0 0 1 2 2v15.2c0 .8-.9 1.3-1.6.8L12 16.6l-5.4 4.4c-.7.5-1.6 0-1.6-.8V5a2 2 0 0 1 2-2z" />
          </svg>
          12.3K
        </span>
        <span className={styles.action} data-inspect="action-button">
          <svg className={styles.actionIcon} viewBox="0 0 24 24" width="24" height="24">
            <path d="M13.6 4.9a.9.9 0 0 0-1.5.7v3.9C5.6 10.2 2.8 14.5 2.2 19.3c-.1.6.6.9 1 .4 2.3-2.9 5.3-4.3 8.9-4.3v4c0 .8.9 1.2 1.5.7l7.9-6.9a1 1 0 0 0 0-1.5z" />
          </svg>
          6,402
        </span>
        <span className={styles.disc} data-inspect="sound-disc" data-paused={exploring || undefined}>
          <img className={styles.discPhoto} src={creator} alt="" draggable={false} />
        </span>
      </div>

      <div className={styles.info}>
        <span className={styles.handle} data-inspect="creator-handle">
          lanternrow.wok
          <span className={styles.posted}>· 2d ago</span>
        </span>
        <div className={styles.caption} data-inspect="caption">
          <p className={styles.captionText}>
            <span className={styles.more}>
              … <b>more</b>
            </span>
            Last fireball before we close 🔥 <b>#streetfood</b> <b>#wokhei</b> <b>#noodles</b> <b>#nightmarket</b>{' '}
            <b>#lanternrow</b>
          </p>
        </div>
        <div className={styles.sound} data-inspect="sound-ticker">
          <svg className={`${styles.glyph} ${styles.note}`} viewBox="0 0 24 24" width="11" height="11">
            <path d="M8.5 6.4L20 4v11.9a2.6 2.6 0 1 1-1.8-2.5V7l-7.9 1.7v9.6a2.6 2.6 0 1 1-1.8-2.5z" />
          </svg>
          <span className={styles.tickerWindow}>
            <span className={styles.tickerTrack} data-paused={exploring || undefined}>
              <span>original sound - lanternrow.wok</span>
              <span>original sound - lanternrow.wok</span>
            </span>
          </span>
        </div>
      </div>

      {/* 0:14 of 0:37 played */}
      <div className={styles.progress} data-inspect="progress-bar">
        <span className={styles.progressTrack}>
          <span className={styles.progressFill} />
        </span>
      </div>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        <span className={`${styles.tab} ${styles.tabActive}`}>
          <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
            <path d="M3.8 10.2L12 3.6l8.2 6.6V19a2 2 0 0 1-2 2h-3.7v-5.6h-5V21H5.8a2 2 0 0 1-2-2z" />
          </svg>
          Home
        </span>
        <span className={styles.tab}>
          <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
            <circle cx="9" cy="8.5" r="3.4" />
            <path d="M3 19.5c.5-3.4 3-5.5 6-5.5s5.5 2.1 6 5.5M15.6 5.3a3.3 3.3 0 0 1 0 6.4M17.8 14.3c2 .7 3.1 2.5 3.4 5.2" />
          </svg>
          <span className={styles.newDot} />
          Friends
        </span>
        <span className={styles.create} data-inspect="create-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="11" height="11">
            <path d={PLUS} />
          </svg>
        </span>
        <span className={styles.tab}>
          <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
            <path d="M3.8 13.4l2.4-7.1A1.8 1.8 0 0 1 7.9 5h8.2a1.8 1.8 0 0 1 1.7 1.3l2.4 7.1v4.8a1.8 1.8 0 0 1-1.8 1.8H5.6a1.8 1.8 0 0 1-1.8-1.8z" />
            <path d="M3.8 13.4h4.6l1.4 2.4h4.4l1.4-2.4h4.6" />
          </svg>
          <span className={styles.badge}>7</span>
          Inbox
        </span>
        <span className={styles.tab}>
          <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
            <circle cx="12" cy="8.4" r="3.9" />
            <path d="M4.8 20.2c.7-3.8 3.6-6.1 7.2-6.1s6.5 2.3 7.2 6.1" />
          </svg>
          Profile
        </span>
      </nav>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
