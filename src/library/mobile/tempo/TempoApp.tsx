import { StatusBar } from '../../../demos/StatusBar';
import { useInspectActivity } from '../../../inspector/InspectActivity';
import styles from './TempoApp.module.css';

/** A symmetric heart: two arcs on top that curve down to a point. */
const HEART = 'M12 20.4l-1.2-1.1C6.2 15.2 3.2 12.4 3.2 8.9a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9c0 3.5-3 6.3-7.6 10.4z';
const SPEAKER = 'M4 9.5h3l4.5-3.8v12.6L7 14.5H4z';

/**
 * Library example: a music player's Now Playing screen, built from the patterns of Spotify and Apple Music.
 * Not interactive; for inspection only. The equalizer in the header bounces on its own and holds still while the
 * example is inspected.
 */
export function TempoApp() {
  const exploring = useInspectActivity();

  return (
    <div className={styles.app}>
      <StatusBar />

      <header className={styles.header}>
        <span className={styles.iconButton} data-inspect="collapse-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <span className={styles.context} data-inspect="player-context">
          <span className={styles.overline}>
            <span
              className={styles.equalizer}
              data-inspect="playing-indicator"
              data-paused={exploring || undefined}
            >
              <span />
              <span />
              <span />
            </span>
            Playing from playlist
          </span>
          <span className={styles.contextTitle}>Late Night Drive</span>
        </span>
        <span className={styles.iconButton} data-inspect="more-button">
          <svg className={styles.glyph} viewBox="0 0 24 24" width="22" height="22">
            <circle cx="5" cy="12" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="19" cy="12" r="1.8" />
          </svg>
        </span>
      </header>

      <div className={styles.artwork} data-inspect="album-artwork">
        <span className={styles.sun} />
        <span className={styles.ground} />
        <span className={styles.coverTitle}>Afterglow</span>
      </div>

      <div className={styles.trackRow}>
        <div className={styles.trackInfo} data-inspect="track-info">
          <h3 className={styles.title}>Neon Overpass</h3>
          <p className={styles.artist}>Juno Hale</p>
        </div>
        <span className={styles.like} data-inspect="like-button">
          <svg className={styles.glyph} viewBox="0 0 24 24" width="24" height="24">
            <path d={HEART} />
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
          <span>−2:24</span>
        </div>
      </div>

      <div className={styles.transport} data-inspect="transport-controls">
        <span className={styles.mode} data-inspect="mode-toggle">
          <svg className={styles.icon} viewBox="0 0 24 24" width="22" height="22">
            <path d="M3 7h3.2c2 0 3.3.9 4.4 2.6l2.8 4.8c1.1 1.7 2.4 2.6 4.4 2.6H20M3 17h3.2c1.4 0 2.5-.5 3.4-1.3M13.9 8.3c.9-.8 2-1.3 3.5-1.3H20M17.5 4.5L20 7l-2.5 2.5M17.5 14.5L20 17l-2.5 2.5" />
          </svg>
        </span>
        <span className={styles.control}>
          <svg className={styles.glyph} viewBox="0 0 24 24" width="26" height="26">
            <path d="M5.5 5h2.2v14H5.5zM19 5.6v12.8a.6.6 0 0 1-.9.5L9 12.5a.6.6 0 0 1 0-1l9.1-6.4a.6.6 0 0 1 .9.5z" />
          </svg>
        </span>
        <span className={styles.play} data-inspect="play-pause-button">
          <svg className={styles.glyph} viewBox="0 0 24 24" width="24" height="24">
            <rect x="6.5" y="5" width="3.8" height="14" rx="1.2" />
            <rect x="13.7" y="5" width="3.8" height="14" rx="1.2" />
          </svg>
        </span>
        <span className={styles.control}>
          <svg className={styles.glyph} viewBox="0 0 24 24" width="26" height="26">
            <path d="M16.3 5h2.2v14h-2.2zM5 5.6v12.8a.6.6 0 0 0 .9.5L15 12.5a.6.6 0 0 0 0-1L5.9 5.1a.6.6 0 0 0-.9.5z" />
          </svg>
        </span>
        <span className={styles.modeOn} data-inspect="mode-toggle">
          <svg className={styles.icon} viewBox="0 0 24 24" width="22" height="22">
            <path d="M17 3.5l3 3-3 3M4 11.5V10a3.5 3.5 0 0 1 3.5-3.5H20M7 20.5l-3-3 3-3M20 12.5V14a3.5 3.5 0 0 1-3.5 3.5H4" />
          </svg>
        </span>
      </div>

      <div className={styles.volume} data-inspect="volume-slider">
        <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16">
          <path d={SPEAKER} />
        </svg>
        <span className={styles.volumeRail}>
          <span className={styles.volumeLevel} />
        </span>
        <svg className={styles.icon} viewBox="0 0 24 24" width="16" height="16">
          <path d={`${SPEAKER}M15 9a4 4 0 0 1 0 6M17.8 6.2a8 8 0 0 1 0 11.6`} />
        </svg>
      </div>

      <div className={styles.deviceRow}>
        <span className={styles.device} data-inspect="output-device">
          <svg className={styles.icon} viewBox="0 0 24 24" width="15" height="15">
            <path d="M4 16v-4a8 8 0 0 1 16 0v4M4 15.5h2.5a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM20 15.5h-2.5a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1z" />
          </svg>
          Ava’s Earbuds
        </span>
      </div>

      <div className={styles.lyrics} data-inspect="lyrics-sheet">
        <span className={styles.grabber} />
        <span className={styles.lyricsTitle}>Lyrics</span>
        <svg className={`${styles.icon} ${styles.lyricsChevron}`} viewBox="0 0 24 24" width="16" height="16">
          <path d="M6 15l6-6 6 6" />
        </svg>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
