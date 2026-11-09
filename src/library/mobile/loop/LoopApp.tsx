import { StatusBar } from '../../../demos/StatusBar';
import styles from './LoopApp.module.css';
import alley from './photos/alley.webp';
import ines from './photos/ines.webp';
import liv from './photos/liv.webp';
import marco from './photos/marco.webp';
import theo from './photos/theo.webp';
import you from './photos/you.webp';

/** A heart with two round lobes: outlined in the top bar, filled in the action bar once a post is liked. */
const HEART =
  'M12 20.4c-.4 0-.8-.2-1.1-.4C6.4 16.4 2.8 13.2 2.8 8.9 2.8 6 5 3.6 7.9 3.6c1.7 0 3.2.9 4.1 2.3.9-1.4 2.4-2.3 4.1-2.3 2.9 0 5.1 2.4 5.1 5.3 0 4.3-3.6 7.5-8.1 11.1-.3.2-.7.4-1.1.4z';
/** A paper plane: "send". It opens your messages at the top and sends a post to someone under it. */
const PLANE = 'M21 3 10.2 13.8M21 3l-6.6 18-4.2-7.2L3 9.6z';

/** Unseen stories come first; seen ones move to the end of the row. The row runs on past the edge. */
const STORIES = [
  { handle: 'ines.abroad', photo: ines },
  { handle: 'theo.frames', photo: theo },
  { handle: 'liv.outdoors', photo: liv },
  { handle: 'marco_eats', photo: marco, seen: true },
];

/**
 * Library example: a photo-sharing home feed, laid out like Instagram's. The wordmark with the activity and
 * messages buttons, the stories row, then one carousel post: its header, the photo, the action bar with the
 * page dots, the likes, a one-line caption, the comments link and the time. A tab bar ends in your own photo.
 */
export function LoopApp() {
  return (
    <div className={styles.app}>
      <StatusBar />

      <header className={styles.topBar}>
        <span className={styles.brand} data-inspect="wordmark">
          {/* "loop" in round strokes, its two o's linked like a chain */}
          <svg className={styles.wordmark} viewBox="0 0 50 27" width="43" height="23">
            <path d="M3.6 2.2v16.6" />
            <circle cx="13.6" cy="13.2" r="5.5" />
            <circle cx="25.8" cy="13.2" r="5.5" />
            <circle cx="41.1" cy="13.2" r="5.5" />
            <path d="M35.6 8.2v16.4" />
          </svg>
          <svg className={styles.chevron} viewBox="0 0 24 24" width="9" height="9">
            <path d="M5 9l7 7 7-7" />
          </svg>
        </span>
        <span className={styles.topActions}>
          <span className={styles.topButton} data-inspect="activity-button">
            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
              <path d={HEART} />
            </svg>
            <span className={styles.dot} />
          </span>
          <span className={styles.topButton} data-inspect="messages-button">
            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
              <path d={PLANE} />
            </svg>
            <span className={styles.badge}>3</span>
          </span>
        </span>
      </header>

      <div className={styles.stories}>
        <span className={styles.story}>
          <span className={styles.own} data-inspect="add-story">
            <img className={styles.storyPhoto} src={you} alt="" draggable={false} />
            <span className={styles.plus}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="9" height="9">
                <path d="M12 4v16M4 12h16" />
              </svg>
            </span>
          </span>
          <span className={styles.storyName}>Your story</span>
        </span>
        {STORIES.map((story) => (
          <span key={story.handle} className={styles.story}>
            <span className={story.seen ? styles.ringSeen : styles.ring} data-inspect="story-ring">
              <img className={styles.storyPhoto} src={story.photo} alt="" draggable={false} />
            </span>
            <span className={styles.storyName}>{story.handle}</span>
          </span>
        ))}
      </div>

      <article>
        <header className={styles.postHeader} data-inspect="post-header">
          <span className={styles.postRing}>
            <img className={styles.postAvatar} src={ines} alt="" draggable={false} />
          </span>
          <span className={styles.byline}>
            <span className={styles.author}>ines.abroad</span>
            <span className={styles.place}>Trastevere, Rome</span>
          </span>
          <span className={styles.more} data-inspect="more-button">
            <svg className={styles.glyph} viewBox="0 0 24 24" width="16" height="16">
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </span>
        </header>

        <div className={styles.photo} data-inspect="photo-carousel">
          <img className={styles.photoImage} src={alley} alt="" draggable={false} />
          <span className={styles.counter}>1/4</span>
        </div>

        <div className={styles.actions} data-inspect="action-bar">
          <svg className={`${styles.actionIcon} ${styles.liked}`} viewBox="0 0 24 24" width="19" height="19">
            <path d={HEART} />
          </svg>
          <svg className={`${styles.icon} ${styles.actionIcon}`} viewBox="0 0 24 24" width="19" height="19">
            <path d="M20.6 11.6a8.6 8.6 0 0 1-12.4 7.7l-4.7 1.3 1.3-4.4a8.6 8.6 0 1 1 15.8-4.6z" />
          </svg>
          <svg className={`${styles.icon} ${styles.actionIcon}`} viewBox="0 0 24 24" width="19" height="19">
            <path d={PLANE} />
          </svg>
          {/* The page dots belong to the carousel above, so they explain themselves as part of it */}
          <span className={styles.dots} data-inspect="photo-carousel">
            <span className={`${styles.pageDot} ${styles.pageDotOn}`} />
            <span className={styles.pageDot} />
            <span className={styles.pageDot} />
            <span className={styles.pageDot} />
          </span>
          <svg className={`${styles.icon} ${styles.actionIcon} ${styles.save}`} viewBox="0 0 24 24" width="19" height="19">
            <path d="M18.6 20.8 12 15.9l-6.6 4.9V4.6c0-.9.7-1.6 1.6-1.6h10c.9 0 1.6.7 1.6 1.6z" />
          </svg>
        </div>

        <p className={styles.likes} data-inspect="like-count">
          <span className={styles.facepile}>
            <img className={styles.face} src={theo} alt="" draggable={false} />
            <img className={styles.face} src={liv} alt="" draggable={false} />
          </span>
          <span>
            Liked by <b>theo.frames</b> and <b>2,481 others</b>
          </span>
        </p>

        <p className={styles.caption} data-inspect="caption">
          <span className={styles.captionText}>
            <b>ines.abroad</b> Found the prettiest parking spot in Rome, and somehow neither scooter was mine. Day 3
            of walking everywhere and eating everything.
          </span>
          <span className={styles.captionMore}>more</span>
        </p>

        <span className={styles.comments} data-inspect="comments-link">
          View all 84 comments
        </span>

        <time className={styles.time} dateTime="2026-10-29T07:41" data-inspect="timestamp">
          2 hours ago
        </time>
      </article>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        <svg className={`${styles.tabIcon} ${styles.tabActive}`} viewBox="0 0 24 24" width="20" height="20">
          <path d="M3.2 10.4 12 3.3l8.8 7.1V20c0 .6-.4 1-1 1h-5.3v-5.9h-5V21H4.2c-.6 0-1-.4-1-1z" />
        </svg>
        <svg className={`${styles.icon} ${styles.tabIcon}`} viewBox="0 0 24 24" width="20" height="20">
          <circle cx="10.6" cy="10.6" r="7.1" />
          <path d="M15.8 15.8 21 21" />
        </svg>
        <svg className={`${styles.icon} ${styles.tabIcon}`} viewBox="0 0 24 24" width="20" height="20">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M12 7.8v8.4M7.8 12h8.4" />
        </svg>
        <svg className={`${styles.icon} ${styles.tabIcon}`} viewBox="0 0 24 24" width="20" height="20">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M10 8.6v6.8l5.6-3.4z" />
        </svg>
        <img className={styles.tabAvatar} src={you} alt="" draggable={false} />
      </nav>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
