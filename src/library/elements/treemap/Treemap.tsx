import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import { SECTORS } from './data';
import type { Company } from './data';
import styles from './Treemap.module.css';

type Box = { x: number; y: number; w: number; h: number };

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

/**
 * A squarified treemap (Bruls, Huizing and van Wijk): the values, largest first, fill the box in rows along its
 * shorter side, and a row takes one more value only while that keeps its boxes closer to squares.
 */
function squarify(values: number[], box: Box): Box[] {
  const scale = (box.w * box.h) / sum(values);
  const boxes: Box[] = [];
  let rest = { ...box };
  let row: number[] = [];

  const worst = (areas: number[], side: number) => {
    const total = sum(areas);
    return Math.max(
      ...areas.map((a) => Math.max((side * side * a) / (total * total), (total * total) / (side * side * a))),
    );
  };

  const place = (areas: number[]) => {
    const total = sum(areas);
    if (rest.w >= rest.h) {
      const w = total / rest.h;
      let y = rest.y;
      for (const area of areas) {
        boxes.push({ x: rest.x, y, w, h: area / w });
        y += area / w;
      }
      rest = { x: rest.x + w, y: rest.y, w: rest.w - w, h: rest.h };
    } else {
      const h = total / rest.w;
      let x = rest.x;
      for (const area of areas) {
        boxes.push({ x, y: rest.y, w: area / h, h });
        x += area / h;
      }
      rest = { x: rest.x, y: rest.y + h, w: rest.w, h: rest.h - h };
    }
  };

  for (const area of values.map((value) => value * scale)) {
    const side = Math.min(rest.w, rest.h);
    if (row.length === 0 || worst([...row, area], side) <= worst(row, side)) {
      row.push(area);
    } else {
      place(row);
      row = [area];
    }
  }
  if (row.length > 0) place(row);
  return boxes;
}

/** A box snapped to whole pixels, less `gap` on its right and bottom edges, so neighbors sit `gap` apart. */
function snap(box: Box, gap: number): Box {
  const x = Math.round(box.x);
  const y = Math.round(box.y);
  return { x, y, w: Math.round(box.x + box.w) - x - gap, h: Math.round(box.y + box.h) - y - gap };
}

/** Each company with its place in the data, which seeds its price ticks. */
const COMPANIES = SECTORS.flatMap((sector) => sector.companies);
const indexOf = (company: Company) => COMPANIES.indexOf(company);
const capOf = (companies: Company[]) => sum(companies.map((company) => company.cap));

/** A sector's label strip is 15px tall, sectors stand 2px apart and companies 1px. */
const HEADER = 15;
const SECTOR_GAP = 2;
const TILE_GAP = 1;

/*
 * Text is measured once per string at 100px, in the tile's font, and scaled: a ticker shows only where it fits, in
 * the largest size up to 30px that does, with the change under it at 60% when there's room for both.
 */
const FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const measured = new Map<string, number>();
let context: CanvasRenderingContext2D | null = null;

function textWidth(text: string, size: number, weight: number) {
  const key = `${weight} ${text}`;
  if (!measured.has(key)) {
    context ??= document.createElement('canvas').getContext('2d');
    if (context) context.font = `${weight} 100px ${FONT}`;
    measured.set(key, context ? context.measureText(text).width : text.length * 64);
  }
  return (measured.get(key)! * size) / 100;
}

const formatChange = (change: number) => `${change > 0 ? '+' : change < 0 ? '−' : ''}${Math.abs(change).toFixed(2)}%`;

type Label = { ticker: number; change?: number };

function labelFor(box: Box, ticker: string, change: string): Label | undefined {
  const fit = Math.min(30, ((box.w - 6) / textWidth(ticker, 100, 700)) * 100, (box.h - 4) * 0.52);
  if (fit < 9) return undefined;
  const size = Math.floor(fit * 2) / 2;
  const small = Math.max(9, Math.round(size * 1.2) / 2);
  const fits = box.h >= size * 1.1 + small * 1.25 + 6 && textWidth(change, small, 500) <= box.w - 6;
  return { ticker: size, change: fits ? small : undefined };
}

type Tile = Box & { company: Company; label?: Label };
type SectorBox = Box & { name: string; header: boolean; tiles: Tile[] };

/** The map for a picture `width` × `height` px: sectors by their total value, then each one's companies inside it. */
function layout(width: number, height: number): SectorBox[] {
  const sectors = [...SECTORS].sort((a, b) => capOf(b.companies) - capOf(a.companies));
  const boxes = squarify(
    sectors.map((sector) => capOf(sector.companies)),
    { x: 0, y: 0, w: width + SECTOR_GAP, h: height + SECTOR_GAP },
  );
  return sectors.map((sector, index) => {
    const box = snap(boxes[index], SECTOR_GAP);
    // A sector too small for its label strip shows its companies only
    const header = box.h >= 48 && textWidth(sector.name.toUpperCase(), 10, 700) * 1.08 + 8 <= box.w;
    const top = header ? HEADER : 0;
    const companies = [...sector.companies].sort((a, b) => b.cap - a.cap);
    const tiles = squarify(
      companies.map((company) => company.cap),
      { x: 0, y: top, w: box.w + TILE_GAP, h: box.h - top + TILE_GAP },
    ).map((tile, i) => {
      const snapped = snap(tile, TILE_GAP);
      const company = companies[i];
      return { ...snapped, company, label: labelFor(snapped, company.ticker, formatChange(company.change)) };
    });
    return { ...box, name: sector.name, header, tiles };
  });
}

/*
 * The diverging scale: a cool gray at 0%, deepening to red at −3% and to green at +3%, mixed in OKLab between the
 * legend's seven stops so a small tick shifts a tile's color only a little.
 */
const STOPS: [number, number, number, number][] = [
  [-3, 0.6, 0.2, 24],
  [-2, 0.51, 0.16, 22],
  [-1, 0.42, 0.1, 19],
  [0, 0.36, 0.018, 260],
  [1, 0.43, 0.09, 155],
  [2, 0.53, 0.13, 152],
  [3, 0.62, 0.16, 150],
];
const LAB = STOPS.map(([, l, c, h]) => [l, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)]);

function colorOf(change: number) {
  const t = Math.min(Math.max(change, -3), 3) + 3;
  const i = Math.min(Math.floor(t), 5);
  const [a, b] = [LAB[i], LAB[i + 1]];
  const mix = a.map((value, k) => value + (b[k] - value) * (t - i));
  return `oklab(${mix[0].toFixed(3)} ${mix[1].toFixed(4)} ${mix[2].toFixed(4)})`;
}

const LEGEND = STOPS.map(([change, l, c, h]) => ({
  label: `${change > 0 ? '+' : change < 0 ? '−' : ''}${Math.abs(change)}%`,
  color: `oklch(${l} ${c} ${h})`,
}));

/*
 * Prices tick: on each beat of the loop a third of the companies get a new price, a few hundredths of a percent to
 * a quarter point away from where they opened the loop, so their colors shift a little. The drift runs once round a
 * slow wave per loop and starts from zero, so the still picture is the market as listed.
 */
const BEATS = 9;
const WAVES = COMPANIES.map((_, i) => ({ size: 0.06 + ((i * 37) % 23) / 100, phase: ((i * 53) % 29) / 4.6 }));

function changeAt(company: Company, beat: number) {
  const i = indexOf(company);
  const last = beat - ((beat + i) % 3);
  if (last <= 0) return company.change;
  const { size, phase } = WAVES[i];
  const drift = size * (Math.sin((2 * Math.PI * last) / BEATS + phase) - Math.sin(phase));
  return Math.round((company.change + drift) * 100) / 100;
}

/** The price that goes with a change: today's open price stays put, so the two always agree. */
const priceAt = (company: Company, change: number) => (company.price / (1 + company.change / 100)) * (1 + change / 100);

/**
 * One beat of the loop: the company under the pointer, whether its tooltip shows (not while the pointer travels),
 * and how long the beat lasts. Each beat is also a price tick.
 */
type Step = { target: string; shown: boolean; ms: number };

/** The pointer rests on a chip maker that's up, a drug maker that's down and a payments network, two ticks each. */
const STEPS: Step[] = ['CRQT', 'MRDN', 'PYLN'].flatMap((target) => [
  { target, shown: false, ms: 700 },
  { target, shown: true, ms: 1500 },
  { target, shown: true, ms: 1500 },
]);

/** The still picture: the tooltip on the chip maker, the market as listed. */
const FINAL = { step: STEPS[1], beat: 0 };

function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : { step: STEPS[index], beat: index };
}

/** The size of an element, kept up to date (0 × 0 until it's measured). */
function useSize(element: HTMLElement | null) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!element) return;
    const observer = new ResizeObserver(() => setSize({ width: element.offsetWidth, height: element.offsetHeight }));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return size;
}

/** Where the pointer rests on a tile, in the map: a little right of the middle, just under the tile's label. */
function pointerOn(sector: SectorBox, tile: Tile) {
  const label = tile.label ? (tile.label.ticker + (tile.label.change ?? 0)) * 1.1 : 0;
  return {
    x: sector.x + tile.x + Math.round(tile.w * 0.65),
    y: sector.y + tile.y + Math.round(tile.h / 2 + label / 2 + 3),
  };
}

/** The tooltip's size in px (fixed in the CSS), for keeping it inside the map. */
const TIP = { width: 176, height: 74 };

const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

/**
 * Where the tooltip goes, 4px inside the map at least: below and right of the pointer, or left of it near the right
 * edge. Near the bottom it moves above the tile, or beside it when there's no room there either, so it never covers
 * the label of the tile it describes.
 */
function tooltipAt(pointer: { x: number; y: number }, sector: SectorBox, tile: Tile, width: number, height: number) {
  const box = { x: sector.x + tile.x, y: sector.y + tile.y, w: tile.w, h: tile.h };
  const x = pointer.x + 14 + TIP.width <= width - 4 ? pointer.x + 14 : pointer.x - 10 - TIP.width;
  if (pointer.y + 18 + TIP.height <= height - 4) return { x: clamp(x, 4, width - 4 - TIP.width), y: pointer.y + 18 };
  if (box.y - 6 - TIP.height >= 4) return { x: clamp(x, 4, width - 4 - TIP.width), y: box.y - 6 - TIP.height };
  const beside = box.x + box.w + 8 + TIP.width <= width - 4 ? box.x + box.w + 8 : box.x - 8 - TIP.width;
  return {
    x: clamp(beside, 4, width - 4 - TIP.width),
    y: clamp(pointer.y - TIP.height / 2, 4, height - 4 - TIP.height),
  };
}

/**
 * Treemap: a stock market map. Sectors are blocks sized by their companies' total market value, each with its name
 * on a strip along the top; inside, every company is a tile sized by its own market value and colored by today's
 * change on a red–gray–green scale, with its ticker and change where they fit. In the loop the pointer rests on one
 * tile after another, which lights up with a tooltip of the company, its price and its change, while prices tick
 * and colors shift a little.
 */
export function Treemap() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const { step, beat } = useSteps(playing, final);
  const [map, setMap] = useState<HTMLDivElement | null>(null);
  const { width, height } = useSize(map);
  const sectors = useMemo(() => (width > 0 ? layout(width, height) : []), [width, height]);

  // The company under the pointer, where the pointer rests on its tile (just under its label, which stays readable)
  // and where its tooltip goes
  const hovered = sectors.flatMap((sector) =>
    sector.tiles.filter((tile) => tile.company.ticker === step.target).map((tile) => ({ sector, tile })),
  )[0];
  const pointer = hovered ? pointerOn(hovered.sector, hovered.tile) : { x: 0, y: 0 };
  const tip = hovered ? tooltipAt(pointer, hovered.sector, hovered.tile, width, height) : pointer;
  const change = hovered ? changeAt(hovered.tile.company, beat) : 0;

  return (
    <div ref={ref} className={styles.tile}>
      <div ref={setMap} className={styles.map} data-inspect="treemap">
        {sectors.map((sector) => (
          <div
            key={sector.name}
            className={styles.sector}
            style={{ left: sector.x, top: sector.y, width: sector.w, height: sector.h }}
            data-inspect="treemap-sector"
          >
            {sector.header && <span className={styles.sectorName}>{sector.name}</span>}
            {sector.tiles.map((tile) => {
              const now = changeAt(tile.company, beat);
              return (
                <div
                  key={tile.company.ticker}
                  className={styles.company}
                  style={{ left: tile.x, top: tile.y, width: tile.w, height: tile.h, background: colorOf(now) }}
                  data-active={(step.shown && tile.company.ticker === step.target) || undefined}
                  data-inspect="treemap-tile"
                >
                  {tile.label && (
                    <span className={styles.label} data-inspect="treemap-label">
                      <span className={styles.ticker} style={{ fontSize: tile.label.ticker }}>
                        {tile.company.ticker}
                      </span>
                      {tile.label.change !== undefined && (
                        <span className={styles.change} style={{ fontSize: tile.label.change }}>
                          {formatChange(now)}
                        </span>
                      )}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {hovered && (
          <>
            <div
              className={styles.tooltip}
              style={{ transform: `translate(${tip.x}px, ${tip.y}px)` }}
              data-shown={step.shown || undefined}
              data-inspect="treemap-tooltip"
            >
              <span className={styles.tipSector}>{hovered.sector.name}</span>
              <span className={styles.tipCompany}>
                <span className={styles.tipTicker}>{hovered.tile.company.ticker}</span>
                <span className={styles.tipName}>{hovered.tile.company.name}</span>
              </span>
              <span className={styles.tipQuote}>
                <span className={styles.tipPrice}>{priceAt(hovered.tile.company, change).toFixed(2)}</span>
                <span className={styles.tipChange} data-down={change < 0 || undefined}>
                  {formatChange(change)}
                </span>
              </span>
            </div>
            <svg
              className={styles.pointer}
              style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }}
              viewBox="0 0 20 24"
              aria-hidden="true"
            >
              <path d="M3 2.5v16.2l4.1-4 2.7 6.3 2.9-1.2-2.7-6.3h5.8z" />
            </svg>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.caption}>Size: market cap · Color: 1-day change</span>
        <span className={styles.legend} data-inspect="treemap-legend">
          {LEGEND.map((stop) => (
            <span key={stop.label} style={{ background: stop.color } as CSSProperties}>
              {stop.label}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
