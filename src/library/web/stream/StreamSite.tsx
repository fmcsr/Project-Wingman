import styles from './StreamSite.module.css';

/** Line icons on a 24 × 24 grid; stroke color and width come from the stylesheet. */
const ICON = {
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4.2-4.2',
  bell: 'M18 16v-5a6 6 0 0 0-12 0v5l-2 2h16zM10 21h4',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7.5h.01',
  muted: 'M4 9h4l5-4v14l-5-4H4zM16.5 9.5l5 5M21.5 9.5l-5 5',
  chevronRight: 'M9 5l7 7-7 7',
  chevronDown: 'M6 9l6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  thumbUp: 'M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 2.8 1.9L13 10h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7',
};

/** The play triangle is a filled shape, unlike the line icons. */
const PLAY = 'M7 4.5v15l13-7.5z';

function Icon({ d, className = styles.icon }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

function PlayIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d={PLAY} />
    </svg>
  );
}

const NAV = ['Home', 'Series', 'Films', 'My List'];
const GENRES = ['All', 'Sci-fi', 'Drama', 'Comedy', 'Thrillers', 'Documentaries', 'Anime', 'Reality', 'Kids & family'];

const CONTINUE = [
  { title: 'Deep Signal', label: 'S2:E4 · 18m left', progress: 62, art: styles.artSignal },
  { title: 'The Glass Orchard', label: 'S1:E7 · 31m left', progress: 34, art: styles.artOrchard },
  { title: 'Low Tide', label: '1h 12m left', progress: 41, art: styles.artTide },
  { title: 'Paper Lanterns', label: 'S3:E2 · 9m left', progress: 86, art: styles.artLanterns },
  { title: 'Northbound', label: 'S1:E1 · 44m left', progress: 12, art: styles.artNorth },
  { title: 'Static Bloom', label: 'S1:E5 · 27m left', progress: 48, art: styles.artBloom },
];

const TOP_10 = [
  { title: 'Deep Signal', art: styles.artSignal },
  { title: 'Ironbark', art: styles.artIronbark },
  { title: 'The Quiet Year', art: styles.artQuiet },
  { title: 'Verdict', art: styles.artVerdict },
  { title: 'Saltwater Kings', art: styles.artSalt },
  { title: 'Paper Lanterns', art: styles.artLanterns },
];

/** The second tile is shown mid-hover: its preview card is drawn over it, outside the clipped row. */
const TRENDING = [
  { title: 'Afterglow', art: styles.artAfterglow, isNew: true },
  { title: 'Halflight', art: styles.artHalflight },
  { title: 'Coldwater', art: styles.artCold },
  { title: 'Ninefold', art: styles.artNinefold },
  { title: 'Sundial', art: styles.artSundial },
  { title: 'Wildcard', art: styles.artWild },
];

/** The arrow at the row's right edge; there's no left one yet, since nothing has scrolled out of view. */
function RowArrow() {
  return (
    <span className={styles.rowArrow}>
      <Icon d={ICON.chevronRight} className={styles.rowChevron} />
    </span>
  );
}

/**
 * A streaming service's home screen, dark by design: a transparent navbar over a billboard with a title
 * treatment, genre chips, and rows of thumbnails (resume progress, a Top 10 with big numerals, and one tile
 * shown in its expanded hover state). Not interactive; for inspection only.
 */
export function StreamSite() {
  return (
    <div className={styles.page}>
      <div className={styles.screen}>
        <nav className={styles.navbar} data-inspect="navbar">
          <a className={styles.logo}>stream</a>
          <ul className={styles.links}>
            {NAV.map((label, index) => (
              <li key={label}>
                <a className={styles.navLink} aria-current={index === 0 ? 'page' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a className={styles.browse}>
            Browse
            <span className={styles.caret} />
          </a>
          <div className={styles.tools}>
            <span className={styles.toolIcon}>
              <Icon d={ICON.search} />
            </span>
            <span
              className={styles.bell}
              role="button"
              aria-label="Notifications, 3 new"
              data-inspect="notification-badge"
            >
              <Icon d={ICON.bell} />
              <span className={styles.count}>3</span>
            </span>
            <span className={styles.profile} data-inspect="profile-menu">
              <span className={styles.avatar}>
                <svg className={styles.face} viewBox="0 0 32 32">
                  <circle cx="11" cy="13" r="2" />
                  <circle cx="21" cy="13" r="2" />
                  <path d="M10 20c3 3.2 9 3.2 12 0" />
                </svg>
              </span>
              <span className={styles.caret} />
            </span>
          </div>
        </nav>

        <section className={styles.billboard} data-inspect="billboard">
          <span className={styles.stars} />
          <span className={styles.planet} />
          <span className={styles.vignette} />

          <div className={styles.billboardContent}>
            <div className={styles.titleBlock} data-inspect="title-treatment">
              <span className={styles.original}>
                <span className={styles.originalMark}>S</span>
                Original series
              </span>
              <h2 className={styles.titleTreatment}>
                <span className={styles.titleTop}>Deep</span>
                <span className={styles.titleMain}>Signal</span>
              </h2>
            </div>

            <p className={styles.meta}>
              <span className={styles.rating} data-inspect="maturity-rating">
                16+
              </span>
              <span>2026 · 3 Seasons · Sci-fi</span>
            </p>

            <p className={styles.description} data-inspect="line-clamp">
              When a deep-space relay station picks up a distress call from a ship that vanished forty years ago,
              chief engineer Mara Okafor has to decide who to trust: the crew that sent it, the company that buried
              it, or the voice in the signal that seems to know her name.
            </p>

            <div className={styles.actions}>
              <span className={styles.play} data-inspect="button-play">
                <PlayIcon className={styles.playIcon} />
                Play
              </span>
              <span className={styles.moreInfo} data-inspect="button-more-info">
                <Icon d={ICON.info} className={styles.infoIcon} />
                More info
              </span>
            </div>
          </div>

          <span
            className={styles.mute}
            role="button"
            aria-pressed="true"
            aria-label="Mute"
            data-inspect="mute-toggle"
          >
            <Icon d={ICON.muted} />
          </span>
        </section>

        <div className={styles.rows}>
          <div className={styles.chips} data-inspect="genre-chips">
            {GENRES.map((genre, index) => (
              <span key={genre} className={styles.chip} aria-pressed={index === 0}>
                {genre}
              </span>
            ))}
          </div>

          <section className={styles.row} data-inspect="carousel">
            <h3 className={styles.rowTitle}>Continue watching for Maya</h3>
            <div className={styles.trackWrap}>
              <div className={styles.track}>
                {CONTINUE.map((show) => (
                  <div key={show.title} className={styles.tile}>
                    <div className={`${styles.art} ${show.art}`}>
                      <span className={`${styles.artTitle} ${styles.artTitleRaised}`}>{show.title}</span>
                      <span
                        className={styles.progress}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={show.progress}
                        data-inspect="progress-bar"
                      >
                        <span className={styles.progressTrack}>
                          <span className={styles.progressFill} style={{ width: `${show.progress}%` }} />
                        </span>
                      </span>
                    </div>
                    <p className={styles.episode}>{show.label}</p>
                  </div>
                ))}
              </div>
              <RowArrow />
            </div>
          </section>

          <section className={styles.row} data-inspect="carousel">
            <h3 className={styles.rowTitle}>Top 10 series today</h3>
            <div className={`${styles.trackWrap} ${styles.rankWrap}`}>
              <div className={styles.track}>
                {TOP_10.map((show, index) => (
                  <div key={show.title} className={styles.rankTile} data-inspect="top-10">
                    <span className={styles.rank}>{index + 1}</span>
                    <span className={`${styles.poster} ${show.art}`}>
                      <span className={styles.posterTitle}>{show.title}</span>
                    </span>
                  </div>
                ))}
              </div>
              <RowArrow />
            </div>
          </section>

          <section className={`${styles.row} ${styles.lastRow}`} data-inspect="carousel">
            <h3 className={styles.rowTitle}>Trending now</h3>
            <div className={styles.trackWrap}>
              <div className={styles.track}>
                {TRENDING.map((show) => (
                  <div key={show.title} className={styles.tile}>
                    <div className={`${styles.art} ${show.art}`}>
                      <span className={styles.artTitle}>{show.title}</span>
                      {show.isNew && (
                        <span className={styles.newBadge} data-inspect="new-badge">
                          New episode
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <RowArrow />

              <div className={styles.hoverCard} data-inspect="hover-card">
                <div className={`${styles.art} ${styles.cardArt} ${styles.artHalflight}`}>
                  <span className={styles.artTitle}>Halflight</span>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardActions}>
                    <span className={`${styles.circle} ${styles.circlePlay}`}>
                      <PlayIcon className={styles.circlePlayIcon} />
                    </span>
                    <span className={styles.circle}>
                      <Icon d={ICON.plus} />
                    </span>
                    <span className={styles.circle}>
                      <Icon d={ICON.thumbUp} />
                    </span>
                    <span className={`${styles.circle} ${styles.cardExpand}`}>
                      <Icon d={ICON.chevronDown} />
                    </span>
                  </div>
                  <div className={styles.cardMeta}>
                    <span className={styles.match}>97% match</span>
                    <span className={styles.rating} data-inspect="maturity-rating">
                      16+
                    </span>
                    <span>8 Episodes</span>
                    <span className={styles.hd}>HD</span>
                  </div>
                  <ul className={styles.tags}>
                    <li>Mind-bending</li>
                    <li>Dark</li>
                    <li>Space opera</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
