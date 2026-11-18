import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import { StatusIcons } from '../StatusIcons';
import detours from '../photos/detours.webp';
import overclock from '../photos/overclock.webp';
import sawmill from '../photos/sawmill.webp';
import squallLine from '../photos/squall-line.webp';
import styles from './BottomSheet.module.css';

type Detent = 'small' | 'medium' | 'large';

/** The loop: the sheet rests at each detent, then springs to the next. */
const STEPS: Detent[] = ['medium', 'large', 'medium', 'small'];
const REST = 2500;

type Stock = {
  symbol: string;
  company: string;
  /** Today's prices, from the previous close to now. */
  day: number[];
};

/** The watchlist: each change is now against the previous close, the first price of the day. */
const STOCKS: Stock[] = [
  {
    symbol: 'LARK',
    company: 'Larkspur Software',
    day: [
      173.52, 174.1, 173.6, 175.2, 176.8, 176.1, 177.9, 179.4, 178.6, 180.2, 181.5, 180.7, 181.9, 183.1, 182.2, 182.9,
      182.4,
    ],
  },
  {
    symbol: 'KSTR',
    company: 'Kestrel Motors',
    day: [47.96, 47.7, 47.85, 47.2, 46.9, 47.1, 46.6, 46.3, 46.55, 46.2, 45.9, 46.1, 45.95, 46.3, 46.05, 46.12],
  },
  {
    symbol: 'HLCN',
    company: 'Halcyon Grid',
    day: [72.43, 72.6, 72.2, 72.5, 72.9, 72.7, 73.2, 72.95, 73.4, 73.1, 72.85, 73.15, 73.05],
  },
  {
    symbol: 'BWTR',
    company: 'Brightwater Health',
    day: [129.72, 129.9, 129.4, 129.6, 129.1, 128.8, 129.2, 128.6, 128.9, 128.5, 128.95, 128.77],
  },
  {
    symbol: 'QRRY',
    company: 'Quarry Labs',
    day: [21.11, 21.05, 21.2, 21.15, 21.3, 21.28, 21.42, 21.35, 21.5, 21.44, 21.56, 21.48],
  },
  {
    symbol: 'FRRO',
    company: 'Ferro Mining',
    day: [9.96, 9.99, 9.93, 9.95, 9.9, 9.87, 9.91, 9.85, 9.82, 9.86, 9.84],
  },
];

const STORIES = [
  {
    source: 'The Ledger',
    headline: 'Larkspur beats estimates as cloud sales jump 31%',
    age: '1h ago',
    photo: overclock,
  },
  {
    source: 'Market Wire',
    headline: 'Kestrel Motors recalls 42,000 SUVs over a battery sensor fault',
    age: '2h ago',
    photo: detours,
  },
  {
    source: 'Harbor Daily',
    headline: 'Storms shut three Gulf ports, lifting freight rates',
    age: '3h ago',
    photo: squallLine,
  },
  {
    source: 'Northline',
    headline: 'Lumber prices climb as builders race to beat the winter',
    age: '4h ago',
    photo: sawmill,
  },
];

/** The sparkline's drawing box (its viewBox), with a little room above and below the line. */
const SPARK = { width: 64, height: 28, inset: 2 };

/** The day's prices as a line across the box, and the height of the previous close for the dotted line. */
function sparkline(day: number[]) {
  const low = Math.min(...day);
  const high = Math.max(...day);
  const x = (index: number) => (index / (day.length - 1)) * SPARK.width;
  const y = (price: number) =>
    SPARK.inset + ((high - price) / (high - low)) * (SPARK.height - 2 * SPARK.inset);
  return {
    line: day.map((price, index) => `${index === 0 ? 'M' : 'L'}${x(index).toFixed(1)} ${y(price).toFixed(1)}`).join(''),
    close: y(day[0]).toFixed(1),
  };
}

/** The latest price and its change against the previous close, as the row shows them. */
function quote(day: number[]) {
  const close = day[0];
  const price = day[day.length - 1];
  const change = ((price - close) / close) * 100;
  return {
    price: price.toFixed(2),
    change: `${change >= 0 ? '+' : '−'}${Math.abs(change).toFixed(2)}%`,
    up: change >= 0,
  };
}

/**
 * A Stocks-style watchlist with a Business News sheet over it, on an iPhone screen (cropped to a phone's width on
 * wide pictures). The loop: the sheet rests at its medium detent, floating inset from the screen's edges, springs up
 * to the large detent, where it docks edge to edge while the watchlist dims and scales back, and returns; then it
 * drops to the small detent, where only its header shows, and comes back to medium. The final state is the medium
 * detent.
 */
export function BottomSheet() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setStep((current) => (current + 1) % STEPS.length), REST);
    return () => window.clearTimeout(id);
  }, [step, playing]);

  const detent = final ? 'medium' : STEPS[step];

  return (
    <div ref={ref} className={styles.tile} data-detent={detent}>
      <div className={styles.screen}>
        <div className={styles.app}>
          <div className={styles.appHeader}>
            <span>Stocks</span>
            <span className={styles.appDate}>November 18</span>
          </div>
          <ul className={styles.watchlist}>
            {STOCKS.map((stock, index) => {
              const { line, close } = sparkline(stock.day);
              const { price, change, up } = quote(stock.day);
              return (
                <li key={stock.symbol} className={styles.stock} data-trend={up ? 'up' : 'down'}>
                  <span className={styles.name}>
                    <span className={styles.symbol}>{stock.symbol}</span>
                    <span className={styles.company}>{stock.company}</span>
                  </span>
                  <svg
                    className={styles.sparkline}
                    viewBox={`0 0 ${SPARK.width} ${SPARK.height}`}
                    preserveAspectRatio="none"
                    data-inspect={index === 0 ? 'bottom-sheet-sparkline' : undefined}
                    aria-hidden="true"
                  >
                    <path className={styles.closeLine} d={`M0 ${close}H${SPARK.width}`} />
                    <path className={styles.dayLine} d={line} />
                  </svg>
                  <span className={styles.quote}>
                    <span className={styles.price}>{price}</span>
                    <span
                      className={styles.change}
                      data-inspect={index === 0 ? 'bottom-sheet-change-pill' : undefined}
                    >
                      {change}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          {/* Dims the watchlist while the sheet covers it */}
          <span className={styles.dim} />
        </div>

        <div className={styles.statusBar}>
          <span className={styles.time}>9:41</span>
          <span className={styles.island} />
          <StatusIcons className={styles.indicators} />
        </div>

        <div className={styles.sheet} data-inspect="bottom-sheet">
          <span className={styles.grabber} data-inspect="bottom-sheet-grabber" />
          <div className={styles.sheetHeader} data-inspect="bottom-sheet-header">
            <span className={styles.sheetTitle}>Business News</span>
            <span className={styles.sheetSubtitle}>Top stories for your watchlist</span>
          </div>
          <ul className={styles.stories}>
            {STORIES.map((story) => (
              <li key={story.source} className={styles.story}>
                <span className={styles.storyText}>
                  <span className={styles.source}>{story.source}</span>
                  <span className={styles.headline}>{story.headline}</span>
                  <span className={styles.age}>{story.age}</span>
                </span>
                <img className={styles.thumb} src={story.photo} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
