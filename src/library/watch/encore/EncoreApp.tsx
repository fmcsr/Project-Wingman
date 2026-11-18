import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion, useEvery } from '../../../demos/motion';
import desertSky from './photos/desert-sky.webp';
import lanterns from './photos/lanterns.webp';
import streetlights from './photos/streetlights.webp';
import styles from './EncoreApp.module.css';

/**
 * The queue, played in turn, each song with its own cover and so its own color. `length` is in seconds; `marquee`
 * marks a title too long for its line, which scrolls instead of being cut.
 */
const TRACKS = [
  { title: 'Streetlights After the Rain', artist: 'Juno Vale', art: streetlights, length: 221, marquee: true },
  { title: 'Paper Lanterns', artist: 'Mira Sol', art: lanterns, length: 194 },
  { title: 'Halfway to the Desert Stars', artist: 'The Quiet Hours', art: desertSky, length: 247, marquee: true },
];

/**
 * The loop, in one-second ticks: the ring advances every tick, the Digital Crown turns the volume during ticks 3 to
 * 5 (the indicator shows, steps twice and fades), and at tick 9 the next track starts.
 */
const TICKS = 12;
const CROWN_FROM = 3;
const CROWN_UNTIL = 6;
const SKIP_AT = 9;
/** Volume before the crown turns and after each of its two steps; it goes up one loop and back down the next. */
const VOLUME = [0.5, 0.56, 0.62];

/** Where the loop is: the tick, how many loops have run, the song playing and how far into it, in seconds. */
type Playback = { tick: number; loop: number; track: number; elapsed: number };

/** The loop starts 1:32 into the first song. */
const START: Playback = { tick: 0, loop: 0, track: 0, elapsed: 92 };
/** The still picture: the same moment a second after the crown's second step, with the volume indicator out. */
const FINAL: Playback = { ...START, tick: CROWN_FROM + 1 };

/** One second on: the song plays on, or the next one starts from the top. */
function advance({ tick, loop, track, elapsed }: Playback): Playback {
  const nextTick = (tick + 1) % TICKS;
  if (nextTick === SKIP_AT) return { tick: nextTick, loop, track: (track + 1) % TRACKS.length, elapsed: 0 };
  return {
    tick: nextTick,
    loop: nextTick === 0 ? loop + 1 : loop,
    track,
    elapsed: Math.min(elapsed + 1, TRACKS[track].length),
  };
}

/** The volume at this tick: up through the steps in even loops, down in odd ones. */
function volumeAt({ tick, loop }: Playback) {
  const steps = Math.max(0, Math.min(tick - CROWN_FROM + 1, VOLUME.length - 1));
  return loop % 2 === 0 ? VOLUME[steps] : VOLUME[VOLUME.length - 1 - steps];
}

/** Previous and next: two solid triangles each, pointing the way they skip. */
function SkipGlyph({ forward }: { forward?: boolean }) {
  return (
    <svg
      className={styles.skipGlyph}
      viewBox="0 0 32 20"
      width="30"
      height="19"
      data-forward={forward ? '' : undefined}
    >
      <path d="M15 3 3.5 10 15 17zM28 3 16.5 10 28 17z" />
    </svg>
  );
}

/**
 * Library example: a song playing on the wrist, laid out like the Now Playing screen on Apple Watch. The background
 * is tinted by the album art, which also sits small in the top-left corner by the time. The title (scrolling as a
 * marquee when it's too long) and the artist, then previous, play/pause with a ring that fills as the song plays, and
 * next; along the bottom, the audio output (AirPlay), volume and more buttons. The ring advances every second; now and
 * then the Digital Crown turns the volume and its indicator shows by the crown; once a loop the next song starts and
 * the art, the background and the title change. It holds while inspected. Not interactive; for inspection only.
 */
export function EncoreApp() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const [playback, setPlayback] = useState(START);
  useEvery(1000, playing, () => setPlayback(advance));
  const shown = final ? FINAL : playback;
  const track = TRACKS[shown.track];
  const crown = shown.tick >= CROWN_FROM && shown.tick < CROWN_UNTIL;

  return (
    <div
      ref={ref}
      className={styles.app}
      data-paused={playing ? undefined : ''}
      data-final={final ? '' : undefined}
      data-skipping={shown.tick === SKIP_AT ? '' : undefined}
      data-crown={crown ? '' : undefined}
      style={{ '--volume': volumeAt(shown) } as CSSProperties}
    >
      <div className={styles.backdrop} data-inspect="artwork-background">
        {TRACKS.map((item, index) => (
          <img
            key={item.title}
            className={styles.backdropImage}
            src={item.art}
            alt=""
            draggable={false}
            data-current={index === shown.track ? '' : undefined}
          />
        ))}
      </div>

      <div className={styles.top}>
        <span className={styles.art} data-inspect="album-art">
          {TRACKS.map((item, index) => (
            <img
              key={item.title}
              className={styles.artImage}
              src={item.art}
              alt=""
              draggable={false}
              data-current={index === shown.track ? '' : undefined}
            />
          ))}
        </span>
        <time className={styles.clock} dateTime="21:47">
          9:47
        </time>
      </div>

      {/* Keyed by track, so a new song's title fades in and its marquee starts from the beginning */}
      <div key={track.title} className={styles.info}>
        <span className={styles.title} data-inspect="track-title" data-marquee={track.marquee ? '' : undefined}>
          <span className={styles.marquee}>
            <span className={styles.titleText}>{track.title}</span>
            {track.marquee && <span className={styles.titleText}>{track.title}</span>}
          </span>
        </span>
        <span className={styles.artist} data-inspect="artist">
          {track.artist}
        </span>
      </div>

      <div className={styles.controls}>
        <span className={styles.skip} data-inspect="skip-button">
          <SkipGlyph />
        </span>
        <span className={styles.play} data-inspect="play-pause">
          <svg className={styles.ring} viewBox="0 0 66 66" width="66" height="66" data-inspect="progress-ring">
            <circle className={styles.track} cx="33" cy="33" r="31.5" />
            <circle
              className={styles.progress}
              cx="33"
              cy="33"
              r="31.5"
              pathLength={100}
              strokeDasharray={`${((shown.elapsed / track.length) * 100).toFixed(2)} 100`}
            />
          </svg>
          <span className={styles.playButton}>
            <svg className={styles.pauseGlyph} viewBox="0 0 16 20" width="16" height="20">
              <rect x="1" y="1" width="5" height="18" rx="1.5" />
              <rect x="10" y="1" width="5" height="18" rx="1.5" />
            </svg>
          </span>
        </span>
        <span className={`${styles.skip} ${styles.next}`} data-inspect="skip-button">
          <SkipGlyph forward />
        </span>
      </div>

      <div className={styles.bottom}>
        <span className={styles.round} data-inspect="airplay">
          <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
            <path className={styles.line} d="M6 17A8.5 8.5 0 1 1 18 17M8.8 14.2a4.5 4.5 0 1 1 6.4 0" />
            <path d="M12 15.2 16.6 21H7.4z" />
          </svg>
        </span>
        <span className={styles.round} data-inspect="volume-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
            <path d="M3 9h3.4L11 5.2v13.6L6.4 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
            <path className={styles.line} d="M14.6 9.2a4 4 0 0 1 0 5.6M17.4 6.4a8 8 0 0 1 0 11.2" />
          </svg>
        </span>
        <span className={styles.round} data-inspect="more-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
            <circle cx="5.5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="18.5" cy="12" r="2" />
          </svg>
        </span>
      </div>

      <span className={styles.volume} data-inspect="volume-indicator">
        <span className={styles.level} />
      </span>
    </div>
  );
}
