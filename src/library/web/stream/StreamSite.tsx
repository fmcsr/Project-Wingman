import type { CSSProperties, ReactNode } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './StreamSite.module.css';
import afterglowPhoto from './photos/afterglow.webp';
import breakersPhoto from './photos/breakers.webp';
import deepSignalPhoto from './photos/deep-signal.webp';
import detoursPhoto from './photos/detours.webp';
import elderwoodPhoto from './photos/elderwood.webp';
import fogboundPhoto from './photos/fogbound.webp';
import halflightPhoto from './photos/halflight.webp';
import hollowRockPhoto from './photos/hollow-rock.webp';
import lightyearsPhoto from './photos/lightyears.webp';
import mileZeroPhoto from './photos/mile-zero.webp';
import overclockPhoto from './photos/overclock.webp';
import paperBoatsPhoto from './photos/paper-boats.webp';
import pinecrestPhoto from './photos/pinecrest.webp';
import redGiantPhoto from './photos/red-giant.webp';
import squallLinePhoto from './photos/squall-line.webp';
import starbornPhoto from './photos/starborn.webp';
import theSwellPhoto from './photos/the-swell.webp';
import thousandLightsPhoto from './photos/thousand-lights.webp';
import timberlinePhoto from './photos/timberline.webp';
import undertowPhoto from './photos/undertow.webp';
import wildwoodPhoto from './photos/wildwood.webp';

/** Line icons on a 24px grid; stroke color and width come from the stylesheet. */
const ICONS = {
  search: 'M10.5 17.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM15.5 15.5l5 5',
  bell: 'M12 3.75a5.75 5.75 0 0 0-5.75 5.75v3.9L4.5 16.75h15l-1.75-3.35V9.5A5.75 5.75 0 0 0 12 3.75zM9.75 19.5a2.35 2.35 0 0 0 4.5 0',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7.5h.01',
  /** A speaker with a cross: the trailer plays without sound */
  muted: 'M3.75 9.25h3.5L12 5v14l-4.75-4.25h-3.5zM16 9.5l5 5M21 9.5l-5 5',
  plus: 'M12 5v14M5 12h14',
  thumbUp:
    'M7.5 10.5v9h-3v-9zM7.5 10.5l3.6-6.3a1.9 1.9 0 0 1 3.4 1.55l-.85 3.75h5.1a2 2 0 0 1 1.95 2.4l-1.25 6a2 2 0 0 1-1.95 1.6H7.5',
  chevronDown: 'M6.5 9.5l5.5 5.5 5.5-5.5',
  chevronRight: 'M9 5l7 7-7 7',
};

/** The play triangle is filled, with softened corners. */
const PLAY = 'M6.5 4.3v15.4a.8.8 0 0 0 1.2.68l12.6-7.7a.8.8 0 0 0 0-1.36L7.7 3.62a.8.8 0 0 0-1.2.68z';

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function PlayIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={PLAY} />
    </svg>
  );
}

/** Stream's mark: five rounded bars of different lengths that add up to a play arrow. */
function Mark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 3.5h3.5M4 8h9M4 12h15M4 16h9M4 20.5h3.5" />
    </svg>
  );
}

function Logo() {
  return (
    <a className={styles.logo} aria-label="Stream home">
      <Mark className={styles.logoMark} />
      <span className={styles.wordmark}>stream</span>
    </a>
  );
}

/** The amber corner badge on titles in today's Top 10. */
function TopTenBadge({ className }: { className: string }) {
  return (
    <span className={`${styles.topTen} ${className}`} role="img" aria-label="Top 10" data-inspect="top-10-badge">
      <span className={styles.topTenWord}>Top</span>
      <span className={styles.topTenNumber}>10</span>
    </span>
  );
}

/** How a show's title is set on its artwork, standing in for each show's own logo. */
type TitleStyle = 'serif' | 'condensed' | 'wide' | 'italic';

type Show = {
  title: string;
  photo: string;
  type: TitleStyle;
  /** A Stream original carries the mark in its corner */
  original?: boolean;
  /** In today's Top 10 */
  topTen?: boolean;
  /** Where portrait crops (posters, phones) center on the still */
  focus?: string;
};

const SHOWS = {
  halflight: { title: 'Halflight', photo: halflightPhoto, type: 'serif', original: true, topTen: true, focus: '62% 50%' },
  timberline: { title: 'Timberline', photo: timberlinePhoto, type: 'serif', topTen: true },
  deepSignal: { title: 'Deep Signal', photo: deepSignalPhoto, type: 'wide', original: true, topTen: true, focus: '35% 50%' },
  overclock: { title: 'Overclock', photo: overclockPhoto, type: 'condensed', original: true },
  thousandLights: { title: 'A Thousand Lights', photo: thousandLightsPhoto, type: 'italic', original: true, focus: '56% 50%' },
  undertow: { title: 'Undertow', photo: undertowPhoto, type: 'condensed' },
  mileZero: { title: 'Mile Zero', photo: mileZeroPhoto, type: 'wide' },
  breakers: { title: 'Breakers', photo: breakersPhoto, type: 'condensed', original: true, topTen: true, focus: '45% 50%' },
  fogbound: { title: 'Fogbound', photo: fogboundPhoto, type: 'serif', original: true, topTen: true, focus: '70% 50%' },
  hollowRock: { title: 'Hollow Rock', photo: hollowRockPhoto, type: 'wide', topTen: true, focus: '46% 50%' },
  redGiant: { title: 'Red Giant', photo: redGiantPhoto, type: 'condensed', original: true, focus: '50% 50%' },
  pinecrest: { title: 'Pinecrest', photo: pinecrestPhoto, type: 'italic', original: true },
  theSwell: { title: 'The Swell', photo: theSwellPhoto, type: 'condensed' },
  squallLine: { title: 'Squall Line', photo: squallLinePhoto, type: 'wide', original: true },
  detours: { title: 'Detours', photo: detoursPhoto, type: 'italic' },
  starborn: { title: 'Starborn', photo: starbornPhoto, type: 'wide', focus: '30% 50%' },
  wildwood: { title: 'Wildwood', photo: wildwoodPhoto, type: 'serif', original: true },
  paperBoats: { title: 'Paper Boats', photo: paperBoatsPhoto, type: 'italic' },
  afterglow: { title: 'Afterglow', photo: afterglowPhoto, type: 'wide', original: true },
  elderwood: { title: 'Elderwood', photo: elderwoodPhoto, type: 'serif', original: true },
  lightyears: { title: 'Lightyears', photo: lightyearsPhoto, type: 'wide', focus: '58% 50%' },
} satisfies Record<string, Show>;

/** Where Maya stopped: an episode, or the time left in a film. Shows in the order she last watched them. */
const CONTINUE: { show: Show; progress: number; label: string; badge?: string }[] = [
  { show: SHOWS.deepSignal, progress: 62, label: 'S2:E4' },
  { show: SHOWS.overclock, progress: 35, label: 'S1:E6', badge: 'New Episode' },
  { show: SHOWS.timberline, progress: 80, label: 'S3:E2' },
  { show: SHOWS.thousandLights, progress: 45, label: '52m left' },
  { show: SHOWS.undertow, progress: 20, label: 'S1:E3' },
  { show: SHOWS.mileZero, progress: 70, label: '31m left' },
];

const TOP_TEN: Show[] = [SHOWS.halflight, SHOWS.timberline, SHOWS.deepSignal, SHOWS.breakers, SHOWS.fogbound, SHOWS.hollowRock];

/** The second title is hovered: its preview card opens over it. */
const TRENDING: { show: Show; badge?: string }[] = [
  { show: SHOWS.redGiant, badge: 'Recently Added' },
  { show: SHOWS.pinecrest },
  { show: SHOWS.theSwell },
  { show: SHOWS.squallLine, badge: 'New Season' },
  { show: SHOWS.detours },
  { show: SHOWS.starborn },
];

const NEW_ON_STREAM: { show: Show; badge?: string }[] = [
  { show: SHOWS.wildwood, badge: 'Recently Added' },
  { show: SHOWS.breakers },
  { show: SHOWS.afterglow, badge: 'Recently Added' },
  { show: SHOWS.paperBoats },
  { show: SHOWS.elderwood },
  { show: SHOWS.lightyears },
];

const NAV = ['Home', 'Series', 'Films', 'New & Popular', 'My List', 'Browse by Languages'];

const FOOTER_LINKS = [
  'Audio Description',
  'Help Centre',
  'Gift Cards',
  'Media Centre',
  'Investor Relations',
  'Jobs',
  'Terms of Use',
  'Privacy',
  'Legal Notices',
  'Cookie Preferences',
  'Corporate Information',
  'Contact Us',
];

/** A title's artwork: the still, the mark on originals, the Top 10 corner badge and the title set like its logo. */
function Art({ show, className, children }: { show: Show; className?: string; children?: ReactNode }) {
  return (
    <div className={className ? `${styles.art} ${className}` : styles.art}>
      <img
        className={styles.still}
        src={show.photo}
        alt=""
        draggable={false}
        style={show.focus ? ({ '--focus': show.focus } as CSSProperties) : undefined}
      />
      {show.original && (
        <span className={styles.original} role="img" aria-label="Stream original" data-inspect="original-badge">
          <Mark className={styles.originalMark} />
        </span>
      )}
      {show.topTen && <TopTenBadge className={styles.cornerBadge} />}
      <span className={`${styles.showTitle} ${styles[show.type]}`}>{show.title}</span>
      {children}
    </div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <span className={styles.label} data-inspect="new-badge">
      {children}
    </span>
  );
}

/** The handle at a row's right edge pages it on; there's no left one yet, since nothing has scrolled out of view. */
function RowHandle() {
  return (
    <span className={styles.handle} role="button" aria-label="See more titles">
      <Icon d={ICONS.chevronRight} />
    </span>
  );
}

/**
 * The preview card over the hovered title: the artwork bigger, the actions, its rating and length, and three
 * words for its mood.
 */
function HoverCard({ show }: { show: Show }) {
  return (
    <div className={styles.hoverCard} data-inspect="hover-card">
      <Art show={show} className={styles.cardArt} />
      <div className={styles.cardInfo}>
        <div className={styles.cardActions}>
          <span className={`${styles.circle} ${styles.circlePlay}`} role="button" aria-label="Play">
            <PlayIcon className={styles.circlePlayIcon} />
          </span>
          <span className={styles.circle} role="button" aria-label="Add to My List">
            <Icon d={ICONS.plus} />
          </span>
          <span className={styles.circle} role="button" aria-label="I like this">
            <Icon d={ICONS.thumbUp} />
          </span>
          <span className={`${styles.circle} ${styles.circleMore}`} role="button" aria-label="More info">
            <Icon d={ICONS.chevronDown} />
          </span>
        </div>
        <p className={styles.cardMeta}>
          <span className={styles.maturityBox} data-inspect="maturity-rating">
            16+
          </span>
          <span>Limited Series</span>
          <span className={styles.hd}>HD</span>
        </p>
        <ul className={styles.moods}>
          <li>Slow-burn</li>
          <li>Small-town</li>
          <li>Mystery</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Library example: a streaming service's home page, closely following Netflix's: a transparent navbar over a
 * full-bleed billboard with the title, synopsis and Play / More Info, then rows of titles (Continue Watching with
 * resume bars, a Top 10 with big numerals, and a row with a title hovered). Stream's amber, every show and every
 * still are our own. Dark by design, in both themes. The billboard's still pushes in slowly, like the trailer playing
 * behind it, and holds while inspected. Not interactive; for inspection only.
 */
export function StreamSite() {
  const trailer = useDemoMotion<HTMLElement>(0.3);

  return (
    <div className={styles.root}>
      <div className={styles.page}>
        <header className={styles.navbar} data-inspect="navbar">
          <Logo />
          <ul className={styles.links}>
            {NAV.map((label, index) => (
              <li key={label}>
                <a className={styles.navLink} aria-current={index === 0 ? 'page' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <span className={styles.browse} role="button" aria-haspopup="menu">
            Browse
            <span className={styles.caret} />
          </span>
          <div className={styles.tools}>
            <span className={styles.tool} role="button" aria-label="Search">
              <Icon d={ICONS.search} />
            </span>
            <a className={styles.kids}>Kids</a>
            <span
              className={styles.bell}
              role="button"
              aria-label="Notifications, 3 new"
              data-inspect="notification-badge"
            >
              <Icon d={ICONS.bell} />
              <span className={styles.count}>3</span>
            </span>
            <span className={styles.profile} role="button" aria-haspopup="menu" data-inspect="profile-menu">
              <span className={styles.avatar} role="img" aria-label="Maya">
                <svg className={styles.face} viewBox="0 0 32 32" aria-hidden="true">
                  <circle cx="11" cy="13" r="2.1" />
                  <circle cx="21" cy="13" r="2.1" />
                  <path d="M9.5 19.5c3.2 3.6 9.8 3.6 13 0" />
                </svg>
              </span>
              <span className={styles.caret} />
            </span>
          </div>
        </header>

        <section
          ref={trailer.ref}
          className={styles.billboard}
          data-inspect="billboard"
          data-paused={!trailer.playing || undefined}
        >
          <img
            className={styles.backdrop}
            src={SHOWS.halflight.photo}
            alt="A lit bus shelter at dawn on an empty road in the fog, one man waiting on the bench"
            draggable={false}
          />
          <span className={styles.vignette} />

          <div className={styles.info}>
            <span className={styles.kicker}>
              <Mark className={styles.kickerMark} />
              Series
            </span>
            <h2 className={styles.titleTreatment} data-inspect="title-treatment">
              Halflight
            </h2>
            <p className={styles.rankLine}>
              <TopTenBadge className={styles.rankBadge} />
              #1 in Series Today
            </p>
            <p className={styles.synopsis} data-inspect="synopsis">
              Every night at 4:10, a stranger in a pressed suit waits at the last stop on Route 9 for a bus that stopped
              running thirty years ago. This season, the night dispatcher who hears him on her radio goes out to meet
              him.
            </p>
            <ul className={styles.heroMoods}>
              <li>Slow-burn</li>
              <li>Mysterious</li>
              <li>Drama</li>
            </ul>
            <div className={styles.actions}>
              <span className={styles.play} role="button" data-inspect="button-play">
                <PlayIcon className={styles.playIcon} />
                Play
              </span>
              <span className={styles.moreInfo} role="button" data-inspect="button-more-info">
                <Icon d={ICONS.info} className={styles.infoIcon} />
                More Info
              </span>
            </div>
          </div>

          <div className={styles.side}>
            <span className={styles.mute} role="button" aria-pressed="true" aria-label="Mute" data-inspect="mute-toggle">
              <Icon d={ICONS.muted} />
            </span>
            <span className={styles.maturity} data-inspect="maturity-rating">
              16+
            </span>
          </div>
        </section>

        <div className={styles.rows}>
          <section className={styles.row} data-inspect="carousel">
            <h3 className={styles.rowTitle}>Continue Watching for Maya</h3>
            <div className={styles.trackWrap}>
              <div className={styles.track}>
                {CONTINUE.map((item) => (
                  <div key={item.show.title} className={styles.tile}>
                    <Art show={item.show}>{item.badge && <Label>{item.badge}</Label>}</Art>
                    <span
                      className={styles.progress}
                      role="progressbar"
                      aria-label={`${item.show.title}, ${item.label}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={item.progress}
                      data-inspect="progress-bar"
                    >
                      <span className={styles.progressFill} style={{ width: `${item.progress}%` }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.row} data-inspect="carousel">
            <h3 className={styles.rowTitle}>Top 10 Series Today</h3>
            <div className={styles.trackWrap}>
              <ol className={styles.track}>
                {TOP_TEN.map((show, index) => (
                  <li key={show.title} className={styles.rankItem} data-inspect="top-10">
                    <span className={styles.rank} aria-hidden="true">
                      {index + 1}
                    </span>
                    <Art show={{ ...show, topTen: false }} className={styles.poster} />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className={styles.row} data-inspect="carousel">
            <div className={styles.rowHead}>
              <h3 className={styles.rowTitle}>Trending Now</h3>
              <span className={styles.explore} role="button" aria-label="Explore All">
                <Icon d={ICONS.chevronRight} />
              </span>
              <ol className={styles.pages} aria-label="Page 1 of 4">
                {[0, 1, 2, 3].map((page) => (
                  <li key={page} className={page === 0 ? styles.pageOn : undefined} />
                ))}
              </ol>
            </div>
            <div className={styles.trackWrap}>
              <div className={styles.track}>
                {TRENDING.map((item) => (
                  <div key={item.show.title} className={styles.tile}>
                    <Art show={item.show}>{item.badge && <Label>{item.badge}</Label>}</Art>
                  </div>
                ))}
              </div>
              <RowHandle />
              <HoverCard show={SHOWS.pinecrest} />
            </div>
          </section>

          <section className={styles.row} data-inspect="carousel">
            <h3 className={styles.rowTitle}>New on Stream</h3>
            <div className={styles.trackWrap}>
              <div className={styles.track}>
                {NEW_ON_STREAM.map((item) => (
                  <div key={item.show.title} className={styles.tile}>
                    <Art show={item.show}>{item.badge && <Label>{item.badge}</Label>}</Art>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <ul className={styles.footerLinks}>
            {FOOTER_LINKS.map((link) => (
              <li key={link}>
                <a>{link}</a>
              </li>
            ))}
          </ul>
          <span className={styles.serviceCode} role="button">
            Service Code
          </span>
          <p className={styles.copyright}>© 2026 Stream, Inc.</p>
        </footer>
      </div>
    </div>
  );
}
