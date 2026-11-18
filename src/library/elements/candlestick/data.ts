/**
 * A trading day of one-minute candles for a fictional stock, generated the same on every load: a slow climb with
 * pullbacks from about $212 at the 9:30 open. Each candle opens where the last one closed; its wicks reach a little
 * past its body; busier minutes (bigger moves) trade more shares. The live candle also gets the path its price
 * takes while it forms, a tick at a time, from its open to its close, touching its high and low on the way.
 */
export type Candle = { open: number; high: number; low: number; close: number; volume: number };

/** The candle that's live in the still picture (13:27, a rebound); each loop of the chart makes the next one live. */
export const LIVE = 237;
/** The regular session and after hours, 9:30 to 20:00: the history for a wide chart and some 390 loops after it. */
export const COUNT = 630;
/** Ticks per candle: the live candle's price moves this many times before the next one opens. */
export const TICKS = 12;
/** The previous day's close, which today's change is measured from. */
export const PREVIOUS_CLOSE = 211.42;

/** A small seeded pseudo-random generator (mulberry32): the same chart on every load. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cents = (value: number) => Math.round(value * 100) / 100;

function generate() {
  const random = seeded(11);
  const normal = () => (random() + random() + random() + random() - 2) * 1.2;
  const candles: Candle[] = [];
  let price = 212.1;
  for (let i = 0; i < COUNT; i++) {
    // The price leans toward a line that climbs about 40 cents an hour, with a slow wave of pullbacks on top
    const target = 212 + i * 0.007 + Math.sin(i / 19) * 0.45;
    const move = (target - price) * 0.08 + normal() * 0.13;
    const open = cents(price);
    const close = cents(price + move);
    const high = cents(Math.max(open, close) + Math.abs(normal()) * 0.06 + 0.01);
    const low = cents(Math.min(open, close) - Math.abs(normal()) * 0.06 - 0.01);
    const volume = Math.round(5200 + Math.abs(move) * 95000 + random() ** 3 * 26000);
    candles.push({ open, high, low, close, volume });
    price = close;
  }
  return candles;
}

export const CANDLES = generate();

/**
 * The live candle's price at each tick, from its open (tick 0) to its close (the last): a drift from open to close
 * with some noise, reaching the high and the low at two of the ticks.
 */
function pathOf(candle: Candle, index: number) {
  const random = seeded(1000 + index);
  const [highAt, lowAt] = candle.close >= candle.open ? [9, 3] : [3, 9];
  return Array.from({ length: TICKS }, (_, tick) => {
    if (tick === 0) return candle.open;
    if (tick === TICKS - 1) return candle.close;
    if (tick === highAt) return candle.high;
    if (tick === lowAt) return candle.low;
    const drift = candle.open + ((candle.close - candle.open) * tick) / (TICKS - 1);
    const noise = (random() - 0.5) * (candle.high - candle.low) * 0.6;
    return cents(Math.min(candle.high, Math.max(candle.low, drift + noise)));
  });
}

/** A candle as it stands `tick` ticks into its minute: the high and low so far, the price now, the volume so far. */
export function formingAt(index: number, tick: number): Candle {
  const candle = CANDLES[index];
  const path = pathOf(candle, index).slice(0, tick + 1);
  return {
    open: candle.open,
    high: Math.max(...path),
    low: Math.min(...path),
    close: path[path.length - 1],
    volume: Math.round((candle.volume * (tick + 1)) / TICKS),
  };
}

/** The minute a candle opens, counted from the 9:30 open. */
export function timeOf(index: number) {
  const minutes = 9 * 60 + 30 + index;
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
}
