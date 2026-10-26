import { StatusBar } from '../../../demos/StatusBar';
import styles from './LoopApp.module.css';

/**
 * A flat portrait drawn with gradients (face, hair, shoulders, backdrop) that stands in for a profile photo.
 * Like real photos, portraits keep their colors in both themes.
 */
function portrait(skin: string, hair: string, shirt: string, backdrop: string) {
  return [
    `radial-gradient(circle at 50% 40%, ${skin} 0 21%, transparent 22%)`,
    `radial-gradient(circle at 50% 33%, ${hair} 0 27%, transparent 28%)`,
    `radial-gradient(ellipse 58% 42% at 50% 100%, ${shirt} 0 98%, transparent 100%)`,
    backdrop,
  ].join(', ');
}

const PHOTOS = {
  you: portrait('#f1c7a3', '#3b2a20', '#2f6fdb', 'linear-gradient(160deg, #cfe4ff, #8fb8f0)'),
  maya: portrait('#e8b48f', '#1f1a17', '#e85d75', 'linear-gradient(160deg, #ffe0c2, #ffb38a)'),
  dev: portrait('#c68b5e', '#14110f', '#2f9e77', 'linear-gradient(160deg, #d9f2e6, #9fd8bd)'),
  lena: portrait('#f3d2b8', '#c9974f', '#6b5bd6', 'linear-gradient(160deg, #e6e0ff, #bdb2f5)'),
  omar: portrait('#a8714a', '#1b1410', '#f2a33a', 'linear-gradient(160deg, #fff1cc, #ffd37a)'),
  kai: portrait('#e0ab84', '#191513', '#334155', 'linear-gradient(160deg, #d6e4f0, #9db4cc)'),
};

/** Unseen stories come first; seen ones move to the end of the row, as in the real apps. */
const STORIES = [
  { name: 'maya.k', photo: PHOTOS.maya },
  { name: 'dev.patel', photo: PHOTOS.dev },
  { name: 'lena.travels', photo: PHOTOS.lena, seen: true },
  { name: 'omar.builds', photo: PHOTOS.omar, seen: true },
];

/**
 * Library example: a social home feed. Stories with gradient rings above one carousel post, with its
 * header, action bar, like count, clamped caption and comments link, and a tab bar that ends in your avatar.
 */
export function LoopApp() {
  return (
    <div className={styles.app}>
      <StatusBar />

      <header className={styles.appBar}>
        <span className={styles.wordmark} data-inspect="wordmark">
          Loop
        </span>
        <span className={styles.appActions}>
          <span className={styles.headerIcon} data-inspect="activity-button">
            <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 20.5s-7.4-4.5-9.4-9C1.1 8.2 3.3 4.6 6.8 4.6c2.1 0 3.5 1.1 4.3 2.5.8-1.4 2.2-2.5 4.3-2.5 3.5 0 5.7 3.6 4.2 6.9-2 4.5-9.6 9-9.6 9z" />
            </svg>
            <span className={styles.newDot} />
          </span>
          <span className={styles.headerIcon} data-inspect="messages-button">
            <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 3.8c-4.7 0-8.5 3.3-8.5 7.4 0 2.3 1.2 4.4 3.1 5.7l-.6 3.3 3.4-1.7c.8.2 1.7.3 2.6.3 4.7 0 8.5-3.3 8.5-7.4S16.7 3.8 12 3.8zM8.5 10.2h7M8.5 13.4h4.5" />
            </svg>
            <span className={styles.count}>3</span>
          </span>
        </span>
      </header>

      <div className={styles.stories}>
        <span className={styles.story}>
          <span className={styles.own} data-inspect="add-story">
            <span className={styles.storyPhoto} style={{ background: PHOTOS.you }} />
            <span className={styles.plus}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="12" height="12">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </span>
          <span className={styles.ownName}>Your story</span>
        </span>
        {STORIES.map((story) => (
          <span key={story.name} className={styles.story}>
            <span className={story.seen ? styles.ringSeen : styles.ring} data-inspect="story-ring">
              <span className={styles.storyPhoto} style={{ background: story.photo }} />
            </span>
            <span className={styles.storyName}>{story.name}</span>
          </span>
        ))}
      </div>

      <article>
        <header className={styles.postHeader} data-inspect="post-header">
          <span className={styles.postAvatar} style={{ background: PHOTOS.kai }} />
          <span className={styles.byline}>
            <span className={styles.author}>
              kai.nakamura
              <svg className={styles.verified} viewBox="0 0 24 24" width="14" height="14" data-inspect="verified-badge">
                <path d="M12 3.8A2.4 2.4 0 0 1 17.8 6.2A2.4 2.4 0 0 1 20.2 12A2.4 2.4 0 0 1 17.8 17.8A2.4 2.4 0 0 1 12 20.2A2.4 2.4 0 0 1 6.2 17.8A2.4 2.4 0 0 1 3.8 12A2.4 2.4 0 0 1 6.2 6.2A2.4 2.4 0 0 1 12 3.8Z" />
                <path className={styles.verifiedCheck} d="M8.6 12.2l2.3 2.3 4.6-4.8" />
              </svg>
              <span className={styles.age}>2h</span>
            </span>
            <span className={styles.place}>Lofoten, Norway</span>
          </span>
          <span className={styles.more} data-inspect="more-button">
            <svg className={styles.dotsIcon} viewBox="0 0 24 24" width="20" height="20">
              <circle cx="5" cy="12" r="1.7" />
              <circle cx="12" cy="12" r="1.7" />
              <circle cx="19" cy="12" r="1.7" />
            </svg>
          </span>
        </header>

        <div className={styles.carousel} data-inspect="photo-carousel">
          <span className={styles.counter}>1/3</span>
          <span className={styles.dots}>
            <span className={styles.dotActive} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </span>
        </div>

        <div className={styles.actions} data-inspect="action-bar">
          <svg className={styles.liked} viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 20.5s-7.4-4.5-9.4-9C1.1 8.2 3.3 4.6 6.8 4.6c2.1 0 3.5 1.1 4.3 2.5.8-1.4 2.2-2.5 4.3-2.5 3.5 0 5.7 3.6 4.2 6.9-2 4.5-9.6 9-9.6 9z" />
          </svg>
          <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24">
            <path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.5l-4.7 1.4 1.4-4.6a8.4 8.4 0 1 1 15.6-4.3z" />
          </svg>
          <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24">
            <path d="M21.5 3 2.5 10.3l7.3 2.9 3 7.8zM21.5 3 9.8 13.2" />
          </svg>
          <svg className={`${styles.icon} ${styles.save}`} viewBox="0 0 24 24" width="24" height="24">
            <path d="M6 3.5h12v17l-6-4.6-6 4.6z" />
          </svg>
        </div>

        <p className={styles.likes} data-inspect="like-count">
          <span className={styles.facepile}>
            <span className={styles.face} style={{ background: PHOTOS.maya }} />
            <span className={styles.face} style={{ background: PHOTOS.dev }} />
          </span>
          <span>
            Liked by <b>maya.k</b> and <b>2,481 others</b>
          </span>
        </p>

        <p className={styles.caption} data-inspect="caption">
          <b>kai.nakamura</b> First light over Reine. Hiked up at 3 a.m. with a thermos and zero regrets, and the fog
          lifted for exactly four minutes. Worth every step.
          <span className={styles.captionMore}>… more</span>
        </p>

        <span className={styles.comments} data-inspect="comments-link">
          View all 84 comments
        </span>
      </article>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        <svg className={styles.tabActive} viewBox="0 0 24 24" width="24" height="24">
          <path d="M3.5 10.4 12 3.5l8.5 6.9V20a1 1 0 0 1-1 1h-5v-6.2h-5V21h-5a1 1 0 0 1-1-1z" />
        </svg>
        <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24">
          <path d="M10.8 18.1a7.3 7.3 0 1 0 0-14.6 7.3 7.3 0 0 0 0 14.6zM16.2 16.2 20.5 20.5" />
        </svg>
        <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <path d="M3.5 8.5h17M8.8 3.5l2.4 5M14.3 3.5l2.4 5M10.4 12v5.2l4.4-2.6z" />
        </svg>
        <span className={styles.tabAvatar} style={{ background: PHOTOS.you }} />
      </nav>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
