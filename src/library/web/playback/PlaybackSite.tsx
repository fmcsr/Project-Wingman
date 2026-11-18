import type { CSSProperties, ReactNode } from 'react';
import styles from './PlaybackSite.module.css';
import carving from './photos/carving.webp';
import closetShop from './photos/closet-shop.webp';
import dovetails from './photos/dovetails.webp';
import finishes from './photos/finishes.webp';
import frame from './photos/frame.webp';
import glueUp from './photos/glue-up.webp';
import hanne from './photos/hanne.webp';
import headboard from './photos/headboard.webp';
import kerf from './photos/kerf.webp';
import marco from './photos/marco.webp';
import ollie from './photos/ollie.webp';
import preview from './photos/preview.webp';
import routerSled from './photos/router-sled.webp';
import sawmill from './photos/sawmill.webp';
import shopLive from './photos/shop-live.webp';
import tableSaw from './photos/table-saw.webp';
import tamsin from './photos/tamsin.webp';
import tenYears from './photos/ten-years.webp';
import viewer from './photos/viewer.webp';
import wallDesk from './photos/wall-desk.webp';
import workbench from './photos/workbench.webp';

/** Line icons on a 24 × 24 grid; stroke color and width come from the stylesheet. */
const ICON = {
  menu: 'M3.5 6.5h17M3.5 12h17M3.5 17.5h17',
  search: 'M10.5 17.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM15.5 15.5l5 5',
  mic: 'M12 14.25a3 3 0 0 0 3-3V6.5a3 3 0 0 0-6 0v4.75a3 3 0 0 0 3 3zM6.25 11a5.75 5.75 0 0 0 11.5 0M12 16.75v3.75',
  plus: 'M12 5v14M5 12h14',
  bell: 'M12 3.75a5.25 5.25 0 0 0-5.25 5.25v4.5L4.75 16.5h14.5l-2-3V9A5.25 5.25 0 0 0 12 3.75zM9.75 19.5a2.35 2.35 0 0 0 4.5 0',
  thumbUp: 'M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 2.8 1.9L13 10h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7z',
  share: 'M14 5.5l6 5.75-6 5.75M20 11.25h-8.5A7.5 7.5 0 0 0 4 18.75v.5',
  download: 'M12 4.5V15M7.75 10.75L12 15l4.25-4.25M5 19.5h14',
  save: 'M7 3.75h10a1 1 0 0 1 1 1v15.5l-6-4.25-6 4.25V4.75a1 1 0 0 1 1-1z',
  sort: 'M4 6.5h16M4 12h11M4 17.5h6',
  pin: 'M9.5 3.5h5l-.8 5.2 3.3 3.3v1.5H7V12l3.3-3.3zM12 13.5V20',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  theater: 'M3.5 7.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z',
  window: 'M4.5 5.5h15A1.5 1.5 0 0 1 21 7v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V7a1.5 1.5 0 0 1 1.5-1.5z',
  fullscreen: 'M4 9V5h4M16 5h4v4M20 15v4h-4M8 19H4v-4',
};

/** Solid glyphs: the player's transport, the gear, the dots of the menus and the heart are filled shapes. */
const GLYPH = {
  pause: 'M6.5 5h4v14h-4zM13.5 5h4v14h-4z',
  play: 'M8 5.5v13l10.5-6.5z',
  next: 'M5.5 5.6v12.8l9.6-6.4zM16.6 5.6H19v12.8h-2.4z',
  speaker: 'M3.5 9.25h3.25L11.5 5v14l-4.75-4.25H3.5z',
  /* Eight square teeth around a hole (filled with the even-odd rule) */
  gear: 'M10.4 5.2l.3-2.5a9.4 9.4 0 0 1 2.6 0l.3 2.5a7 7 0 0 1 2.1.9l2-1.6a9.4 9.4 0 0 1 1.8 1.8l-1.6 2a7 7 0 0 1 .9 2.1l2.5.3a9.4 9.4 0 0 1 0 2.6l-2.5.3a7 7 0 0 1-.9 2.1l1.6 2a9.4 9.4 0 0 1-1.8 1.8l-2-1.6a7 7 0 0 1-2.1.9l-.3 2.5a9.4 9.4 0 0 1-2.6 0l-.3-2.5a7 7 0 0 1-2.1-.9l-2 1.6a9.4 9.4 0 0 1-1.8-1.8l1.6-2a7 7 0 0 1-.9-2.1l-2.5-.3a9.4 9.4 0 0 1 0-2.6l2.5-.3a7 7 0 0 1 .9-2.1l-1.6-2a9.4 9.4 0 0 1 1.8-1.8l2 1.6a7 7 0 0 1 2.1-.9zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  more: 'M5.5 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM18.5 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z',
  kebab: 'M12 3.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM12 16.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z',
  heart: 'M12 20.4l-1.2-1.1C6.2 15.2 3.2 12.4 3.2 8.9a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9c0 3.5-3 6.3-7.6 10.4z',
};

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Glyph({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.glyph} ${className}` : styles.glyph} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fillRule="evenodd" />
    </svg>
  );
}

/** A photo used as a picture of someone or something; the text next to it already says what it is. */
function Photo({ src, className }: { src: string; className?: string }) {
  return <img className={className ? `${styles.photo} ${className}` : styles.photo} src={src} alt="" draggable={false} />;
}

/** A check in a circle, cut out in the page color. Every verified name carries the same one. */
function Verified() {
  return (
    <svg className={styles.verified} viewBox="0 0 16 16" role="img" aria-label="Verified" data-inspect="verified-badge">
      <circle cx="8" cy="8" r="7" />
      <path d="M4.9 8.2l2.1 2.1 4.1-4.3" />
    </svg>
  );
}

/** Playback's logo: a lowercase p whose round bowl holds a play symbol, cut out of the cobalt. */
function Logo() {
  return (
    <a className={styles.logo} aria-label="Playback home">
      <svg className={styles.logoMark} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="4.5" width="4.6" height="18" rx="2.3" />
        <path fillRule="evenodd" d="M13.75 2.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zM11.9 7.35v7.3l5.7-3.65z" />
      </svg>
      <span className={styles.wordmark}>Playback</span>
    </a>
  );
}

/** The video: 18:36 long, playing at 4:12 and loaded up to 7:58, with the pointer resting on the bar at 15:50. */
const DURATION = 1116;
const CURRENT = 252;
const BUFFERED = 478;
const HOVER = 950;

const CHAPTERS = [
  { title: 'Intro', start: 0, end: 48 },
  { title: 'Choosing the walnut', start: 48, end: 185 },
  { title: 'Milling', start: 185, end: 400 },
  { title: 'Cutting the joinery', start: 400, end: 552 },
  { title: 'Glue-up in a tiny kitchen', start: 552, end: 750 },
  { title: 'Sanding and oil finish', start: 750, end: 965 },
  { title: 'The finished desk', start: 965, end: DURATION },
];

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
const chapterAt = (seconds: number) => CHAPTERS.find((chapter) => seconds < chapter.end) ?? CHAPTERS[CHAPTERS.length - 1];
/** Where a moment sits along the whole bar, as a percentage. */
const place = (seconds: number) => `${((seconds / DURATION) * 100).toFixed(2)}%`;

/** How much of a chapter lies before a moment, as a width: 0% before the chapter starts, 100% once it's over. */
function filled(moment: number, chapter: { start: number; end: number }) {
  const part = Math.min(Math.max((moment - chapter.start) / (chapter.end - chapter.start), 0), 1);
  return `${(part * 100).toFixed(2)}%`;
}

const NOW_PLAYING = chapterAt(CURRENT);
const UNDER_POINTER = chapterAt(HOVER);

const CHIPS = ['All', 'From Kerf & Kettle', 'Woodworking', 'Related', 'Recently uploaded', 'Watched'];

type Video = {
  title: string;
  channel: string;
  verified?: boolean;
  /** "612K views • 5 months ago", or "1.2K watching" for a stream that's on air. */
  meta: string;
  duration?: string;
  live?: boolean;
  /** Uploaded in the last few days. */
  isNew?: boolean;
  /** Already watched this far, in percent. */
  watched?: number;
  photo: string;
};

const UP_NEXT: Video[] = [
  {
    title: 'I built a fold-down wall desk for a 30 m² studio',
    channel: 'Kerf & Kettle',
    verified: true,
    meta: '612K views • 5 months ago',
    duration: '16:48',
    photo: wallDesk,
  },
  {
    title: 'Hand-cut dovetails for absolute beginners (no jig)',
    channel: 'The Patient Joiner',
    verified: true,
    meta: '1.3M views • 1 year ago',
    duration: '24:05',
    photo: dovetails,
  },
  {
    title: 'Sunday shop hangout: sharpening Q&A, bring your dull chisels',
    channel: 'Northside Woodshop',
    meta: '1.2K watching',
    live: true,
    photo: shopLive,
  },
  {
    title: 'My 4 m² closet workshop, fully organized',
    channel: 'Kerf & Kettle',
    verified: true,
    meta: '389K views • 8 months ago',
    duration: '9:31',
    watched: 64,
    photo: closetShop,
  },
  {
    title: 'We tested 5 food-safe oils on hand-carved spoons',
    channel: 'Finish Lab',
    meta: '208K views • 3 weeks ago',
    duration: '11:52',
    photo: finishes,
  },
  {
    title: 'The router sled I use instead of a jointer',
    channel: 'Kerf & Kettle',
    verified: true,
    meta: '187K views • 1 year ago',
    duration: '7:12',
    photo: routerSled,
  },
  {
    title: 'Restoring a 120-year-old carved headboard',
    channel: 'Second Life Furniture',
    meta: '94K views • 2 days ago',
    duration: '27:16',
    isNew: true,
    photo: headboard,
  },
  {
    title: 'Why your glue-ups keep failing (and the fix)',
    channel: 'The Patient Joiner',
    verified: true,
    meta: '541K views • 4 months ago',
    duration: '8:04',
    photo: glueUp,
  },
  {
    title: 'A day at a family sawmill in the mountains',
    channel: 'Larchwood Travels',
    verified: true,
    meta: '2.1M views • 3 years ago',
    duration: '32:18',
    photo: sawmill,
  },
  {
    title: 'Table saw habits that kept all ten fingers',
    channel: 'Northside Woodshop',
    meta: '77K views • 6 days ago',
    duration: '13:40',
    isNew: true,
    photo: tableSaw,
  },
  {
    title: 'What ten years of hand tools taught me',
    channel: 'Bramble Shed',
    meta: '1.1M views • 2 years ago',
    duration: '21:05',
    photo: tenYears,
  },
  {
    title: 'Carving a door panel with just three chisels',
    channel: 'Bramble Shed',
    meta: '318K views • 7 months ago',
    duration: '18:22',
    photo: carving,
  },
  {
    title: "I rebuilt my grandfather's workbench",
    channel: 'Kerf & Kettle',
    verified: true,
    meta: '233K views • 1 year ago',
    duration: '12:09',
    photo: workbench,
  },
];

type CommentData = {
  handle: string;
  photo: string;
  time: string;
  text: ReactNode;
  likes: string;
  /** Written by the channel itself: the handle sits in a gray pill. */
  byCreator?: boolean;
  pinned?: boolean;
  /** The creator loved this comment. */
  hearted?: boolean;
  replies?: number;
  /** The creator is among the replies: their face shows on the thread toggle. */
  creatorReplied?: boolean;
};

const COMMENTS: CommentData[] = [
  {
    handle: '@kerfandkettle',
    photo: kerf,
    time: '3 days ago',
    text: 'Cut list, tools and the exact oil are all in the description. And yes, both downstairs neighbors got a walnut cutting board.',
    likes: '2.4K',
    byCreator: true,
    pinned: true,
    replies: 86,
  },
  {
    handle: '@tamsin.makes',
    photo: tamsin,
    time: '2 days ago',
    text: 'The router sled for flattening without a jointer just saved me about 400 euros and a lot of floor space. Subscribed.',
    likes: '1.4K',
    hearted: true,
    replies: 12,
    creatorReplied: true,
  },
  {
    handle: '@oddjob_ollie',
    photo: ollie,
    time: '1 day ago',
    text: (
      <>
        The part at <a className={styles.stamp}>9:12</a> where the clamps come out of the kitchen drawer is the most
        relatable thing I’ve seen all week.
      </>
    ),
    likes: '863',
  },
  {
    handle: '@hanne.vos',
    photo: hanne,
    time: '19 hours ago',
    text: (
      <>
        What oil did you use? The color at <a className={styles.stamp}>15:30</a> is unreal.
      </>
    ),
    likes: '212',
    replies: 3,
  },
  {
    handle: '@marco.builds',
    photo: marco,
    time: '5 hours ago',
    text: 'Watched this twice. A glue-up in a kitchen that size deserves its own award.',
    likes: '98',
  },
];

function CommentItem({ comment }: { comment: CommentData }) {
  return (
    <div className={styles.comment} data-inspect="comment">
      <Photo src={comment.photo} className={styles.avatar} />
      <div className={styles.commentBody}>
        {comment.pinned && (
          <span className={styles.pinned}>
            <Icon d={ICON.pin} />
            Pinned by Kerf &amp; Kettle
          </span>
        )}
        <span className={styles.commentHead}>
          <span className={comment.byCreator ? `${styles.handle} ${styles.creatorHandle}` : styles.handle}>
            {comment.handle}
            {comment.byCreator && <Verified />}
          </span>
          <span className={styles.commentTime}>{comment.time}</span>
        </span>
        <p className={styles.commentText}>{comment.text}</p>
        <span className={styles.commentActions}>
          <span className={styles.vote} role="button" aria-label="Like this comment">
            <Icon d={ICON.thumbUp} />
          </span>
          <span className={styles.voteCount}>{comment.likes}</span>
          <span className={styles.vote} role="button" aria-label="Dislike this comment">
            <Icon d={ICON.thumbUp} className={styles.flip} />
          </span>
          {comment.hearted && (
            <span className={styles.creatorHeart} role="img" aria-label="Loved by Kerf & Kettle">
              <Photo src={kerf} className={styles.heartAvatar} />
              <Glyph d={GLYPH.heart} className={styles.heart} />
            </span>
          )}
          <span className={styles.reply} role="button">
            Reply
          </span>
        </span>
        {comment.replies && (
          <span className={styles.replies} role="button" aria-expanded="false">
            <Icon d={ICON.chevronDown} />
            {comment.creatorReplied && (
              <>
                <Photo src={kerf} className={styles.repliesAvatar} />
                <span>·</span>
              </>
            )}
            <span>
              {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
            </span>
          </span>
        )}
      </div>
      <span className={styles.menu} role="button" aria-label="Comment actions" aria-haspopup="menu">
        <Glyph d={GLYPH.kebab} />
      </span>
    </div>
  );
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div className={styles.card} data-inspect="up-next-item">
      <div className={styles.thumb}>
        <Photo src={video.photo} />
        {video.live ? (
          <span className={styles.live} data-inspect="live-badge">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="1.7" />
              <path d="M5.4 5.4a3.7 3.7 0 0 0 0 5.2M10.6 5.4a3.7 3.7 0 0 1 0 5.2M3.3 3.3a6.6 6.6 0 0 0 0 9.4M12.7 3.3a6.6 6.6 0 0 1 0 9.4" />
            </svg>
            Live
          </span>
        ) : (
          <span className={styles.duration}>{video.duration}</span>
        )}
        {video.watched && (
          <span className={styles.watched}>
            <span className={styles.watchedFill} style={{ width: `${video.watched}%` }} />
          </span>
        )}
      </div>
      <div className={styles.cardText}>
        <h4 className={styles.cardTitle}>{video.title}</h4>
        <span className={styles.cardChannel}>
          {video.channel}
          {video.verified && <Verified />}
        </span>
        <span className={styles.cardMeta}>{video.meta}</span>
        {video.isNew && <span className={styles.newBadge}>New</span>}
      </div>
      <span className={styles.menu} role="button" aria-label="Video actions" aria-haspopup="menu">
        <Glyph d={GLYPH.kebab} />
      </span>
    </div>
  );
}

/**
 * Library example: a video platform's watch page, laid out like YouTube's. The player is shown mid-hover, with its
 * controls up, captions on and a preview over the chapter-split progress bar; under it the title, the channel row with
 * the action pills, the description and the comments, with the up-next column beside it (under it on narrow screens).
 * Not interactive; for inspection only.
 */
export function PlaybackSite() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={styles.start}>
          <span className={styles.iconButton} role="button" aria-label="Menu">
            <Icon d={ICON.menu} />
          </span>
          <Logo />
        </div>

        <div className={styles.center} role="search" data-inspect="search-field">
          <span className={styles.searchBox}>
            <span className={styles.searchInput}>
              <span className={styles.placeholder}>Search</span>
            </span>
            <span className={styles.searchButton} role="button" aria-label="Search">
              <Icon d={ICON.search} />
            </span>
          </span>
          <span className={styles.voice} role="button" aria-label="Search with your voice">
            <Icon d={ICON.mic} />
          </span>
        </div>

        <div className={styles.end}>
          <span
            className={`${styles.iconButton} ${styles.searchToggle}`}
            role="button"
            aria-label="Search"
            data-inspect="search-field"
          >
            <Icon d={ICON.search} />
          </span>
          <span className={styles.create} role="button" aria-label="Create">
            <Icon d={ICON.plus} />
            <span className={styles.createLabel}>Create</span>
          </span>
          <span className={styles.iconButton} role="button" aria-label="Notifications, 9+ new">
            <Icon d={ICON.bell} />
            <span className={styles.count}>9+</span>
          </span>
          <Photo src={viewer} className={styles.me} />
        </div>
      </header>

      <div className={styles.watch}>
        <div className={styles.player} data-inspect="video-player">
          <Photo src={frame} className={styles.frame} />
          <span className={styles.scrim} />
          <p className={styles.caption}>
            <span>so the hand plane does the rest</span>
          </p>

          <div className={styles.scrubber}>
            <div
              className={styles.preview}
              style={{ '--at': place(HOVER) } as CSSProperties}
              data-inspect="chapter-preview"
            >
              <span className={styles.previewFrame}>
                <Photo src={preview} />
              </span>
              <span className={styles.previewChapter}>{UNDER_POINTER.title}</span>
              <span className={styles.previewTime}>{clock(HOVER)}</span>
            </div>

            <div
              className={styles.progress}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={DURATION}
              aria-valuenow={CURRENT}
              aria-valuetext={`${clock(CURRENT)} of ${clock(DURATION)}`}
              data-inspect="progress-bar"
            >
              {CHAPTERS.map((chapter) => (
                <span
                  key={chapter.title}
                  className={chapter === UNDER_POINTER ? `${styles.chapter} ${styles.chapterHovered}` : styles.chapter}
                  style={{ flexGrow: chapter.end - chapter.start }}
                >
                  <span className={styles.buffered} style={{ width: filled(BUFFERED, chapter) }} />
                  <span className={styles.played} style={{ width: filled(CURRENT, chapter) }} />
                </span>
              ))}
              <span className={styles.knob} style={{ left: place(CURRENT) }} />
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <span
                className={styles.control}
                role="button"
                aria-label="Pause (k)"
                aria-keyshortcuts="k"
                data-inspect="play-button"
              >
                <Glyph d={GLYPH.pause} />
              </span>
              <span className={`${styles.control} ${styles.next}`} role="button" aria-label="Next (Shift+N)">
                <Glyph d={GLYPH.next} />
              </span>
              <span className={styles.volume} data-inspect="volume-slider">
                <span className={styles.control} role="button" aria-label="Mute (m)">
                  <svg className={styles.glyph} viewBox="0 0 24 24" aria-hidden="true">
                    <path d={GLYPH.speaker} />
                    <path className={styles.speakerWaves} d="M15 9.25a3.75 3.75 0 0 1 0 5.5M17.75 6.5a7.5 7.5 0 0 1 0 11" />
                  </svg>
                </span>
                <span className={styles.volumeRail} role="slider" aria-label="Volume" aria-valuenow={70}>
                  <span className={styles.volumeLevel} />
                  <span className={styles.volumeKnob} />
                </span>
              </span>
              <span className={styles.time}>
                {clock(CURRENT)} / {clock(DURATION)}
              </span>
              <span className={styles.chapterName}>
                <span className={styles.chapterDot}>•</span>
                <span className={styles.chapterLabel}>{NOW_PLAYING.title}</span>
                <Icon d={ICON.chevronRight} />
              </span>
            </div>

            <div className={styles.controlGroup}>
              <span className={styles.autoplay} data-inspect="autoplay-toggle">
                <span className={styles.autoplayTrack} role="switch" aria-checked="true" aria-label="Autoplay">
                  <span className={styles.autoplayKnob}>
                    <Glyph d={GLYPH.play} />
                  </span>
                </span>
              </span>
              <span
                className={`${styles.control} ${styles.captions}`}
                role="button"
                aria-pressed="true"
                aria-label="Subtitles/closed captions (c)"
                data-inspect="captions-toggle"
              >
                <svg className={styles.glyph} viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    className={styles.ccScreen}
                    d="M5 5.5h14a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 16V8A2.5 2.5 0 0 1 5 5.5z"
                  />
                  <path className={styles.ccLetters} d="M10.6 10.2a2.4 2.4 0 1 0 0 3.6M16.9 10.2a2.4 2.4 0 1 0 0 3.6" />
                </svg>
              </span>
              <span
                className={styles.control}
                role="button"
                aria-haspopup="menu"
                aria-label="Settings"
                data-inspect="settings-button"
              >
                <Glyph d={GLYPH.gear} />
                <span className={styles.hd}>HD</span>
              </span>
              <span className={`${styles.control} ${styles.miniplayer}`} role="button" aria-label="Miniplayer (i)">
                <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                  <path d={ICON.window} />
                  <path d="M12.5 12h5.5v3.75h-5.5z" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className={`${styles.control} ${styles.theater}`} role="button" aria-label="Theater mode (t)">
                <Icon d={ICON.theater} />
              </span>
              <span className={styles.control} role="button" aria-label="Full screen (f)">
                <Icon d={ICON.fullscreen} />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.below}>
          <h2 className={styles.title}>Building a walnut desk in a small apartment (no workshop needed)</h2>

          <div className={styles.topRow}>
            <div className={styles.owner}>
              <Photo src={kerf} className={styles.ownerAvatar} />
              <span className={styles.ownerText}>
                <span className={styles.channelName}>
                  <span className={styles.channelLabel}>Kerf &amp; Kettle</span>
                  <Verified />
                </span>
                <span className={styles.subscribers}>184K subscribers</span>
              </span>
              <span className={styles.subscribe} role="button" data-inspect="subscribe-button">
                Subscribe
              </span>
            </div>

            <div className={styles.actions}>
              <span className={styles.likeGroup} data-inspect="like-dislike">
                <span className={styles.like} role="button" aria-pressed="true" aria-label="Like this video">
                  <Icon d={ICON.thumbUp} className={styles.liked} />
                  12K
                </span>
                <span className={styles.likeDivider} />
                <span className={styles.dislike} role="button" aria-pressed="false" aria-label="Dislike this video">
                  <Icon d={ICON.thumbUp} className={styles.flip} />
                </span>
              </span>
              <span className={styles.pill} role="button">
                <Icon d={ICON.share} />
                Share
              </span>
              <span className={`${styles.pill} ${styles.download}`} role="button">
                <Icon d={ICON.download} />
                Download
              </span>
              <span className={`${styles.pill} ${styles.save}`} role="button" aria-label="Save">
                <Icon d={ICON.save} />
                <span className={styles.saveLabel}>Save</span>
              </span>
              <span className={styles.round} role="button" aria-label="More actions" aria-haspopup="menu">
                <Glyph d={GLYPH.more} />
              </span>
            </div>
          </div>

          <div className={styles.description} role="button" aria-expanded="false" data-inspect="description">
            <p className={styles.descriptionInfo}>
              <span>248K views</span>
              <span>3 days ago</span>
              <span className={styles.tags}>
                <a className={styles.tag}>#woodworking</a>
                <a className={styles.tag}>#smallspaces</a>
                <a className={styles.tag}>#walnut</a>
              </span>
            </p>
            <div className={styles.descriptionBody}>
              <p className={styles.descriptionText}>
                Eleven evenings, one balcony and a very patient downstairs neighbor. This is how I milled, joined and
                finished a 140 cm walnut desktop in a 38 m² flat, with tools that all fit in one hallway closet.
                Everything I used is linked below, including the plans for the router sled. Chapters: 0:00 Intro · 0:48
                Choosing the walnut · 3:05 Milling · 6:40 Cutting the joinery · 9:12 Glue-up in a tiny
                kitchen · 12:30 Sanding and oil finish · 16:05 The finished desk
              </p>
              <span className={styles.more}>...more</span>
            </div>
          </div>
        </div>

        <section className={styles.comments}>
          <div className={styles.commentsHeader}>
            <h3 className={styles.commentsTitle}>1,284 Comments</h3>
            <span className={styles.sort} role="button" aria-haspopup="menu" data-inspect="sort-menu">
              <Icon d={ICON.sort} />
              Sort by
            </span>
          </div>

          <div className={styles.composer}>
            <Photo src={viewer} className={styles.avatar} />
            <span className={styles.composerField}>Add a comment...</span>
          </div>

          <div className={styles.commentList}>
            {COMMENTS.map((comment) => (
              <CommentItem key={comment.handle} comment={comment} />
            ))}
          </div>
        </section>

        <aside className={styles.side}>
          <div className={styles.chipBar} data-inspect="filter-chips">
            <div className={styles.chips}>
              {CHIPS.map((chip, index) => (
                <span key={chip} className={styles.chip} role="button" aria-pressed={index === 0}>
                  {chip}
                </span>
              ))}
            </div>
            <span className={styles.chipArrow}>
              <Icon d={ICON.chevronRight} />
            </span>
          </div>

          <div className={styles.list}>
            {UP_NEXT.map((video) => (
              <VideoCard key={video.title} video={video} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
