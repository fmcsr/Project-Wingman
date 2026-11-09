import { StatusBar } from '../../../demos/StatusBar';
import cover from './photos/cover.webp';
import styles from './TempoApp.module.css';

/** A share arrow rising out of an open box. */
const SHARE = 'M8.5 9.5H7a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7.5a2 2 0 0 0-2-2h-1.5M12 3v11M8.5 6.5L12 3l3.5 3.5';

/**
 * Library example: a music player's Now Playing screen, laid out like Spotify's. A square cover sits under the top
 * bar, the screen takes its color from the cover, the controls are white, and a lyrics card peeks from below.
 * Not interactive; for inspection only. Nothing moves on its own.
 */
export function TempoApp() {
  return (
    <div className={styles.app}>
      <StatusBar />

      <header className={styles.header}>
        <span className={styles.headerButton} data-inspect="collapse-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
            <path d="M4.5 8.5l7.5 7.5 7.5-7.5" />
          </svg>
        </span>
        <span className={styles.context} data-inspect="player-context">
          <span className={styles.overline}>Playing from playlist</span>
          <span className={styles.contextTitle}>Late Night Drive</span>
        </span>
        <span className={styles.headerButton} data-inspect="more-button">
          <svg className={styles.glyph} viewBox="0 0 24 24" width="20" height="20">
            <circle cx="5" cy="12" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="19" cy="12" r="1.6" />
          </svg>
        </span>
      </header>

      <div className={styles.cover} data-inspect="album-artwork">
        <img className={styles.coverPhoto} src={cover} alt="" draggable={false} />
      </div>

      <div className={styles.trackRow}>
        <div className={styles.trackInfo} data-inspect="track-info">
          <p className={styles.title}>Neon Overpass</p>
          <p className={styles.artist}>Juno Hale</p>
        </div>
        <span className={styles.save} data-inspect="like-button">
          <svg viewBox="0 0 24 24" width="21" height="21">
            <circle className={styles.saveDisc} cx="12" cy="12" r="12" />
            <path className={styles.saveCheck} d="M7 12.4l3.4 3.3L17 9" />
          </svg>
        </span>
      </div>

      {/* 1:21 of 3:45 played: the fill and the thumb both sit at 36% */}
      <div className={styles.scrubber} data-inspect="scrubber">
        <div className={styles.bar}>
          <span className={styles.rail}>
            <span className={styles.played} />
          </span>
          <span className={styles.thumb} />
        </div>
        <div className={styles.times}>
          <span>1:21</span>
          <span>-2:24</span>
        </div>
      </div>

      <div className={styles.transport} data-inspect="transport-controls">
        <span className={styles.toggle} data-inspect="mode-toggle">
          <svg className={styles.icon} viewBox="0 0 24 24" width="22" height="22">
            <path d="M3 7h3.2c2 0 3.3.9 4.4 2.6l2.8 4.8c1.1 1.7 2.4 2.6 4.4 2.6H20M3 17h3.2c1.4 0 2.5-.5 3.4-1.3M13.9 8.3c.9-.8 2-1.3 3.5-1.3H20M17.5 4.5L20 7l-2.5 2.5M17.5 14.5L20 17l-2.5 2.5" />
          </svg>
        </span>
        <span className={styles.skip}>
          <svg className={styles.glyph} viewBox="0 0 24 24" width="27" height="27">
            <path d="M5 4.5h2.4v15H5zM19.5 5.2v13.6a.7.7 0 0 1-1.1.6L8.6 12.6a.7.7 0 0 1 0-1.2l9.8-6.8a.7.7 0 0 1 1.1.6z" />
          </svg>
        </span>
        <span className={styles.play} data-inspect="play-pause-button">
          <svg className={styles.glyph} viewBox="0 0 24 24" width="20" height="20">
            <rect x="6" y="4.5" width="4.2" height="15" rx="1" />
            <rect x="13.8" y="4.5" width="4.2" height="15" rx="1" />
          </svg>
        </span>
        <span className={styles.skip}>
          <svg className={styles.glyph} viewBox="0 0 24 24" width="27" height="27">
            <path d="M16.6 4.5H19v15h-2.4zM4.5 5.2v13.6a.7.7 0 0 0 1.1.6l9.8-6.8a.7.7 0 0 0 0-1.2L5.6 4.6a.7.7 0 0 0-1.1.6z" />
          </svg>
        </span>
        <span className={`${styles.toggle} ${styles.toggleOn}`} data-inspect="mode-toggle">
          <svg className={styles.icon} viewBox="0 0 24 24" width="22" height="22">
            <path d="M10.5 18H7a3.5 3.5 0 0 1-3.5-3.5v-5A3.5 3.5 0 0 1 7 6h10a3.5 3.5 0 0 1 3.5 3.5v5A3.5 3.5 0 0 1 17 18h-3.5M16 15.5L13.5 18l2.5 2.5" />
          </svg>
        </span>
      </div>

      <div className={styles.actions}>
        <span className={styles.device} data-inspect="output-device">
          <svg className={styles.icon} viewBox="0 0 24 24" width="15" height="15">
            <path d="M4 16v-4a8 8 0 0 1 16 0v4M4 15.5h2.5a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM20 15.5h-2.5a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1z" />
          </svg>
          Ava’s Earbuds
        </span>
        <span className={styles.actionButton} data-inspect="share-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16">
            <path d={SHARE} />
          </svg>
        </span>
        <span className={styles.actionButton} data-inspect="queue-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16">
            <rect x="4" y="3.5" width="16" height="6" rx="1.5" />
            <path d="M4 14h16M4 19.5h16" />
          </svg>
        </span>
      </div>

      <div className={styles.lyrics} data-inspect="lyrics-sheet">
        <span className={styles.lyricsTitle}>Lyrics</span>
        <span className={styles.cardButton}>
          <svg className={styles.icon} viewBox="0 0 24 24" width="11" height="11">
            <path d={SHARE} />
          </svg>
        </span>
        <span className={styles.cardButton}>
          <svg className={styles.icon} viewBox="0 0 24 24" width="11" height="11">
            <path d="M14 4h6v6M10 20H4v-6M20 4l-6 6M4 20l6-6" />
          </svg>
        </span>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
