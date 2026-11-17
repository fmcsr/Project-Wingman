import { StatusBar } from '../../../demos/StatusBar';
import styles from './RemedyApp.module.css';
import castell from './photos/castell.webp';
import sethna from './photos/sethna.webp';

const STAR = 'M12 2.8l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3-4.6-4.4 6.3-.8z';
/** A map pin with a round hole (even-odd fill) */
const PIN =
  'M12 21.6s-7.2-6.4-7.2-12a7.2 7.2 0 0 1 14.4 0c0 5.6-7.2 12-7.2 12zM12 6.9a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2z';
/** In-network: a solid shield; the white check is drawn on top of it */
const SHIELD = 'M12 2.6l7.6 3v5.7c0 4.7-3.2 8.5-7.6 10-4.4-1.5-7.6-5.3-7.6-10V5.6z';
const CHECK = 'M5 12.6l4.4 4.4L19 7.4';

const INFO = (
  <svg className={styles.info} viewBox="0 0 24 24" width="9" height="9">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5" />
    <circle className={styles.infoDot} cx="12" cy="7.6" r="1.3" />
  </svg>
);

/** Days with nothing open are grouped into one gray tile; the strip runs on past the right edge. */
const DAYS = [
  { day: 'Today – Wed', date: 'Nov 17 – 18', count: 'No appts', off: true },
  { day: 'Thu', date: 'Nov 19', count: '9 appts', selected: true },
  { day: 'Fri', date: 'Nov 20', count: '4 appts' },
  { day: 'Sat', date: 'Nov 21', count: '2 appts' },
];

/** Thursday's nine openings: seven fit, More shows the last two (3:30 and 4:15 PM). */
const SLOTS = ['8:30 AM', '9:15 AM', '10:00 AM', '10:45 AM', '11:30 AM', '1:15 PM', '2:00 PM'];
const PICKED = '10:45 AM';

/**
 * Library example: a doctor-booking app's search results, laid out like Zocdoc's. A back button and Map over the
 * search pill (specialty, reason, neighborhood and insurance plan), a row of filter chips, then the doctors: a card
 * with the photo and its video-visit badge, name, specialty, rating with an award badge, distance and the in-network
 * line, a strip of days with Thursday picked, its open times with one chosen and the Book button. A sponsored
 * doctor follows under the tab bar.
 */
export function RemedyApp() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <StatusBar />

        <div className={styles.navRow}>
          <span className={styles.back} data-inspect="back-button">
            <svg viewBox="0 0 24 24" width="17" height="17">
              <path d="M15 4.5 7.5 12l7.5 7.5" />
            </svg>
          </span>
          <span className={styles.map} data-inspect="map-button">
            Map
          </span>
        </div>

        <span className={styles.search} data-inspect="search-bar">
          <svg className={styles.searchIcon} viewBox="0 0 24 24" width="15" height="15">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.3 15.3 20 20" />
          </svg>
          <span className={styles.searchText}>
            <span className={styles.searchTitle}>Dermatologist · Acne</span>
            <span className={styles.searchHint}>Park Slope, Brooklyn · Kestrel PPO</span>
          </span>
        </span>

        <div className={styles.chips} data-inspect="filter-chips">
          {/* The count is the two chips that are on */}
          <span className={styles.chip} data-inspect="filter-button">
            Filters · 2
          </span>
          <span className={styles.chipOn}>
            <svg viewBox="0 0 24 24" width="8" height="8">
              <path d={CHECK} />
            </svg>
            In-network
          </span>
          <span className={styles.chipOn}>
            <svg viewBox="0 0 24 24" width="8" height="8">
              <path d={CHECK} />
            </svg>
            This week
          </span>
          <span className={styles.chip}>Video visits</span>
          <span className={styles.chip}>Top rated</span>
        </div>
      </header>

      {/* The results run on under the tab bar */}
      <div className={styles.results}>
        <article className={styles.card} data-inspect="doctor-card">
          <div className={styles.profile}>
            <span className={styles.photo} data-inspect="avatar">
              <img className={styles.photoImage} src={castell} alt="" draggable={false} />
              <span className={styles.videoBadge} data-inspect="video-badge">
                <svg viewBox="0 0 24 24" width="10" height="10">
                  <rect x="2.5" y="6.5" width="13" height="11" rx="2.6" />
                  <path d="M15.5 10.4 21 7.2v9.6l-5.5-3.2z" />
                </svg>
              </span>
            </span>
            <span className={styles.who}>
              <h3 className={styles.name}>Dr. Elena Castell, MD</h3>
              <span className={styles.specialty}>Dermatologist</span>
            </span>
          </div>

          <div className={styles.facts}>
            <p className={styles.fact}>
              <span className={styles.rating} data-inspect="rating">
                <svg className={styles.star} viewBox="0 0 24 24" width="11" height="11">
                  <path d={STAR} />
                </svg>
                <b>4.91</b> · 318 reviews
              </span>
              <span className={styles.award} data-inspect="award-badge">
                {/* The Remedy mark: a capsule, one half filled */}
                <svg className={styles.mark} viewBox="0 0 24 24" width="10" height="10">
                  <g transform="rotate(-45 12 12)">
                    <rect x="2.5" y="7.2" width="19" height="9.6" rx="4.8" />
                    <path className={styles.markFill} d="M12 7.2h4.7a4.8 4.8 0 0 1 0 9.6H12z" />
                  </g>
                </svg>
                Patients’ pick
                {INFO}
              </span>
            </p>
            <p className={styles.fact} data-inspect="distance">
              <svg className={styles.pin} viewBox="0 0 24 24" width="11" height="11">
                <path d={PIN} />
              </svg>
              0.6 mi · 7th Ave &amp; 9th St, Brooklyn
            </p>
            <p className={styles.fact} data-inspect="in-network-badge">
              <svg className={styles.shield} viewBox="0 0 24 24" width="11" height="11">
                <path d={SHIELD} />
                <path className={styles.shieldCheck} d="M8.4 12.1l2.6 2.6 4.6-4.9" />
              </svg>
              In-network · Kestrel PPO
            </p>
          </div>

          <div className={styles.days} data-inspect="date-strip">
            {DAYS.map((d) => (
              <span key={d.date} className={d.off ? styles.dayOff : d.selected ? styles.dayPicked : styles.day}>
                <span>{d.day}</span>
                <span>{d.date}</span>
                <span className={styles.dayCount}>{d.count}</span>
              </span>
            ))}
          </div>

          <div className={styles.slots} data-inspect="time-slots">
            {SLOTS.map((time) => (
              <span key={time} className={time === PICKED ? styles.slotPicked : styles.slot}>
                {time}
              </span>
            ))}
            <span className={styles.slot}>More</span>
          </div>

          <span className={styles.book} data-inspect="book-button">
            Book Thu, Nov 19 at 10:45 AM
          </span>
        </article>

        {/* The next doctor, a paid placement; the tab bar covers the rest of the card */}
        <article className={styles.card} data-inspect="doctor-card">
          <div className={styles.profile}>
            <span className={styles.photo} data-inspect="avatar">
              <img className={styles.photoImage} src={sethna} alt="" draggable={false} />
            </span>
            <span className={styles.who}>
              <span className={styles.sponsored} data-inspect="sponsored-label">
                Sponsored
                {INFO}
              </span>
              <h3 className={styles.name}>Dr. Kabir Sethna, DO</h3>
              <span className={styles.specialty}>Dermatologist</span>
            </span>
          </div>
        </article>
      </div>

      <nav className={styles.tabBar} data-inspect="tab-bar">
        <span className={styles.tabActive}>
          <svg className={styles.tabIcon} viewBox="0 0 24 24" width="19" height="19">
            <path d="M3.4 10.6 12 3.6l8.6 7V20a1 1 0 0 1-1 1h-5.1v-6.2h-5V21H4.4a1 1 0 0 1-1-1z" />
          </svg>
          Home
        </span>
        <span className={styles.tab}>
          <svg className={styles.tabIcon} viewBox="0 0 24 24" width="19" height="19">
            <rect x="3.5" y="5" width="17" height="15.5" rx="2.6" />
            <path d="M3.5 9.8h17M8 3v4M16 3v4M8.5 14.6l2.3 2.2 4.7-4.6" />
          </svg>
          Visits
        </span>
        <span className={styles.tab}>
          <svg className={styles.tabIcon} viewBox="0 0 24 24" width="19" height="19">
            <rect x="2.5" y="5" width="19" height="14" rx="2.6" />
            <circle cx="8.4" cy="10.6" r="2" />
            <path d="M5.5 15.6c.6-1.5 1.6-2.2 2.9-2.2s2.3.7 2.9 2.2M14 10.2h4.5M14 13.8h3" />
          </svg>
          Insurance
        </span>
        <span className={styles.tab}>
          <svg className={styles.tabIcon} viewBox="0 0 24 24" width="19" height="19">
            <circle cx="12" cy="8.4" r="3.9" />
            <path d="M4.6 20.5c1.2-3.8 4-5.8 7.4-5.8s6.2 2 7.4 5.8" />
          </svg>
          Profile
        </span>
      </nav>
      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
