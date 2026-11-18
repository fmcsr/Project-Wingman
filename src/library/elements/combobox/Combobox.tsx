import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './Combobox.module.css';

type Zone = { city: string; offset: string };

/** The time zones, by region and offset as they stand on November 18 (no daylight saving anywhere listed). */
const REGIONS: { name: string; zones: Zone[] }[] = [
  {
    name: 'Americas',
    zones: [
      { city: 'Los Angeles', offset: 'GMT−8' },
      { city: 'Denver', offset: 'GMT−7' },
      { city: 'Chicago', offset: 'GMT−6' },
      { city: 'Indianapolis', offset: 'GMT−5' },
      { city: 'New York', offset: 'GMT−5' },
      { city: 'São Paulo', offset: 'GMT−3' },
    ],
  },
  {
    name: 'Europe',
    zones: [
      { city: 'London', offset: 'GMT+0' },
      { city: 'Lisbon', offset: 'GMT+0' },
      { city: 'Paris', offset: 'GMT+1' },
      { city: 'Berlin', offset: 'GMT+1' },
      { city: 'Istanbul', offset: 'GMT+3' },
    ],
  },
  {
    name: 'Asia',
    zones: [
      { city: 'Dubai', offset: 'GMT+4' },
      { city: 'Tbilisi', offset: 'GMT+4' },
      { city: 'Kolkata', offset: 'GMT+5:30' },
      { city: 'Singapore', offset: 'GMT+8' },
      { city: 'Tokyo', offset: 'GMT+9' },
    ],
  },
];

/** Row heights in the list, as in Combobox.module.css: a group label and an option. */
const GROUP = 24;
const ROW = 32;

const ZONES = REGIONS.flatMap((region) => region.zones);
const labelOf = (city: string) => `${city} (${ZONES.find((zone) => zone.city === city)?.offset})`;

/** The regions with the zones whose city contains the query; a region with none drops out, label and all. */
function filter(query: string) {
  return REGIONS.map((region) => ({
    ...region,
    zones: region.zones.filter((zone) => zone.city.toLowerCase().includes(query)),
  })).filter((region) => region.zones.length > 0);
}

/** How far the whole list scrolls to show a city: its region's label at the top. */
function scrollTo(city: string) {
  let y = 0;
  for (const region of REGIONS) {
    if (region.zones.some((zone) => zone.city === city)) return y;
    y += GROUP + region.zones.length * ROW;
  }
  return 0;
}

/**
 * One beat of the loop: whether the list is open, what's typed, the current value (checked in the list), the
 * highlighted option and how long it lasts. `typing` keeps the caret solid; `chosen` flashes the row ↵ picks.
 */
type Step = {
  open: boolean;
  query: string;
  value: string;
  active?: string;
  typing?: boolean;
  chosen?: boolean;
  ms: number;
};

/**
 * The field says Indianapolis. It opens on the whole list, scrolled to Indianapolis with its check; "lis" types out
 * and the list narrows to one city per region, Indianapolis first. ↓ moves the highlight to Lisbon, ↵ picks it and
 * the list closes. Later it opens again on Lisbon, and "ind" takes it back to Indianapolis.
 */
const STEPS: Step[] = [
  { open: false, query: '', value: 'Indianapolis', ms: 1300 },
  { open: true, query: '', value: 'Indianapolis', active: 'Indianapolis', ms: 1000 },
  { open: true, query: 'l', value: 'Indianapolis', active: 'Los Angeles', typing: true, ms: 110 },
  { open: true, query: 'li', value: 'Indianapolis', active: 'Indianapolis', typing: true, ms: 110 },
  { open: true, query: 'lis', value: 'Indianapolis', active: 'Indianapolis', ms: 1100 },
  { open: true, query: 'lis', value: 'Indianapolis', active: 'Lisbon', ms: 1100 },
  { open: true, query: 'lis', value: 'Indianapolis', active: 'Lisbon', chosen: true, ms: 240 },
  { open: false, query: '', value: 'Lisbon', ms: 2000 },
  { open: true, query: '', value: 'Lisbon', active: 'Lisbon', ms: 1400 },
  { open: true, query: 'i', value: 'Lisbon', active: 'Chicago', typing: true, ms: 110 },
  { open: true, query: 'in', value: 'Lisbon', active: 'Indianapolis', typing: true, ms: 110 },
  { open: true, query: 'ind', value: 'Lisbon', active: 'Indianapolis', ms: 900 },
  { open: true, query: 'ind', value: 'Lisbon', active: 'Indianapolis', chosen: true, ms: 240 },
];

/** Reduced motion: "lis" typed, the highlight on Lisbon, the check still on Indianapolis. */
const FINAL = STEPS.findIndex((step) => step.query === 'lis' && step.active === 'Lisbon');

function useLoop(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (final || !playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing, final]);

  return STEPS[final ? FINAL : index];
}

/** The city with the letters that match the query in bold. */
function City({ city, query }: { city: string; query: string }) {
  const at = query ? city.toLowerCase().indexOf(query) : -1;
  if (at < 0) return <span className={styles.city}>{city}</span>;
  return (
    <span className={styles.city}>
      {city.slice(0, at)}
      <b className={styles.match} data-inspect="combobox-match">
        {city.slice(at, at + query.length)}
      </b>
      {city.slice(at + query.length)}
    </span>
  );
}

function Chevron() {
  return (
    <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 6.5 8 3.5l3 3M5 9.5l3 3 3-3" />
    </svg>
  );
}

/**
 * Combobox: the Time zone field of a settings form, a text input with a chevron that opens a list of time zones
 * grouped by region. Typing filters the list, bolding the letters that match; the highlighted option is the one ↵
 * picks, and a check marks the current value. The loop types "lis", moves down to Lisbon and picks it, then later
 * opens on Lisbon and goes back to Indianapolis.
 */
export function Combobox() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useLoop(playing, final);
  const regions = filter(step.query);
  // Opened without a query, the whole list shows, scrolled to the current value
  const scroll = step.query === '' ? scrollTo(step.value) : 0;

  return (
    <div
      ref={ref}
      className={styles.tile}
      data-open={step.open || undefined}
      data-typing={step.typing || undefined}
      data-chosen={step.chosen || undefined}
      data-paused={!playing || undefined}
      data-still={final || undefined}
    >
      <div className={styles.form}>
        <span className={styles.title}>Preferences</span>
        <span className={styles.description}>How dates and times appear for your team.</span>

        <span className={styles.fieldLabel}>Language</span>
        <span className={styles.select}>
          English (US)
          <Chevron />
        </span>

        <span className={styles.fieldLabel}>Time zone</span>
        <div className={styles.anchor}>
          <div className={styles.input} role="combobox" aria-expanded={step.open} data-inspect="combobox">
            {step.open && step.query === '' ? (
              // Opening selects the text, so the first key replaces it
              <span className={styles.selection}>{labelOf(step.value)}</span>
            ) : step.open ? (
              <span className={styles.query}>
                {step.query}
                <span className={styles.caret} />
              </span>
            ) : (
              labelOf(step.value)
            )}
            <Chevron />
          </div>

          <div className={styles.listbox} role="listbox" data-inspect="combobox-listbox">
            <div className={styles.scroller} style={{ '--scroll': `${-scroll}px` } as CSSProperties}>
              {regions.map((region) => (
                <div key={region.name} role="group" aria-label={region.name}>
                  <span className={styles.group} data-inspect="combobox-group">
                    {region.name}
                  </span>
                  {region.zones.map((zone) => {
                    const active = zone.city === step.active;
                    const selected = zone.city === step.value;
                    return (
                      <span
                        key={zone.city}
                        className={styles.option}
                        role="option"
                        aria-selected={active}
                        data-current={selected || undefined}
                        data-inspect={active ? 'combobox-option' : undefined}
                      >
                        <City city={zone.city} query={step.query} />
                        <span className={styles.offset}>{zone.offset}</span>
                        <span className={styles.checkSlot}>
                          {selected && (
                            <svg className={styles.check} viewBox="0 0 16 16" data-inspect="combobox-check">
                              <path d="m3.5 8.5 3 3 6-6.5" />
                            </svg>
                          )}
                        </span>
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className={styles.helper}>Used for reports and scheduled emails.</span>

        <span className={styles.fieldLabel}>Date format</span>
        <span className={styles.select}>
          Nov 18, 2026
          <Chevron />
        </span>

        <span className={`${styles.fieldLabel} ${styles.week}`}>Week starts on</span>
        <span className={`${styles.segmented} ${styles.week}`}>
          <span className={styles.segment} data-on="">
            Monday
          </span>
          <span className={styles.segment}>Sunday</span>
        </span>

        <span className={styles.actions}>
          <span className={styles.button}>Cancel</span>
          <span className={`${styles.button} ${styles.primary}`}>Save</span>
        </span>
      </div>
    </div>
  );
}
