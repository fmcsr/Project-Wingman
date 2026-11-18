import { useEffect, useLayoutEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import { CANDLES, COUNT, LIVE, PREVIOUS_CLOSE, TICKS, formingAt, timeOf } from './data';
import type { Candle } from './data';
import styles from './Candlestick.module.css';

type Size = { width: number; height: number };

/** The size of an element, kept up to date (0 × 0 until it's measured). */
function useSize(element: HTMLElement | null) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!element) return;
    const observer = new ResizeObserver(() => setSize({ width: element.offsetWidth, height: element.offsetHeight }));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return size;
}

/**
 * One beat of the loop, 800ms each: how far the live candle has formed, the candle the crosshair is on (counted back
 * from the live one) and whether it shows. The twelfth beat closes the candle, and the next one opens.
 */
type Beat = { tick: number; cross: number; shown: boolean };

/**
 * The live candle ticks all the way; meanwhile the crosshair comes in on one candle, moves to another and leaves.
 * Away, it waits where it will come in next, so it's never seen jumping.
 */
const BEATS: Beat[] = Array.from({ length: TICKS }, (_, tick) => ({
  tick,
  cross: tick < 5 ? 9 : 4,
  shown: tick >= 2 && tick <= 7,
}));
const BEAT_MS = 800;

/** The still picture: the minute about to close, the crosshair on a candle four minutes back. */
const FINAL = { loop: 0, beat: { tick: TICKS - 1, cross: 4, shown: true } };

/** Steps through the beats while `playing`; after the last one the next candle opens. */
function useBeats(playing: boolean, final: boolean) {
  const [state, setState] = useState({ loop: 0, index: 0 });

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(
      () =>
        setState(({ loop, index }) =>
          index === BEATS.length - 1 ? { loop: (loop + 1) % (COUNT - LIVE), index: 0 } : { loop, index: index + 1 },
        ),
      BEAT_MS,
    );
    return () => window.clearTimeout(id);
  }, [state, playing]);

  return final ? FINAL : { loop: state.loop, beat: BEATS[state.index] };
}

/** Prices to two decimals. */
const price = (value: number) => value.toFixed(2);

/** The price axis step: the smallest round step that keeps its labels at least 24px apart. */
function stepFor(range: number, height: number) {
  return [0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5].find((step) => (step / range) * height >= 24) ?? 10;
}

/** A 1px line's position, on the middle of a pixel so it stays sharp. */
const crisp = (value: number) => Math.round(value - 0.5) + 0.5;

/**
 * Candlestick chart: a stock's one-minute price chart, as trading platforms draw it. Every minute is a candle, its
 * body from the open to the close (green when it closed higher, red when lower) and its wicks reaching the high and
 * the low; a volume histogram runs along the bottom and the price axis on the right carries the live price's label.
 * In the loop the live candle ticks as the price moves and a new one opens every minute, shifting the chart left,
 * while the crosshair comes in to inspect one candle and then another, its tooltip listing open, high, low and close.
 */
export function Candlestick() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const { loop, beat } = useBeats(playing, final);
  const [plot, setPlot] = useState<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<HTMLDivElement | null>(null);
  const { width, height } = useSize(plot);
  const tip = useSize(tooltip);

  // Candles 7px wide and 10px apart (5 and 8 on a narrow chart), each on the middle of a pixel so its wick is sharp,
  // the live one two and a half pitches in from the axis; each new candle shifts the chart a pitch to the left, at
  // once, as trading platforms do
  const pitch = width < 470 ? 8 : 10;
  const body = pitch - 3;
  const live = LIVE + loop;
  const liveX = crisp(width - 2.5 * pitch);
  const count = Math.ceil(liveX / pitch) + 2;
  const first = Math.max(0, live - count);
  const indexes = Array.from({ length: live - first + 1 }, (_, i) => first + i);
  const candleAt = (index: number): Candle => (index === live ? formingAt(index, beat.tick) : CANDLES[index]);
  const xOf = (index: number) => liveX - (live - index) * pitch;

  // The price scale fits the visible candles, the live one at its full range, so ticking never rescales it. Prices
  // keep below a 30px band for the legend and above most of the volume, which takes the bottom 20%.
  const lows = indexes.map((index) => CANDLES[index].low);
  const highs = indexes.map((index) => CANDLES[index].high);
  const [low, high] = [Math.min(...lows), Math.max(...highs)];
  const top = 30;
  const bottom = height * 0.78;
  const pad = (high - low) * 0.06;
  const yOf = (value: number) => top + ((high + pad - value) / (high - low + 2 * pad)) * (bottom - top);
  const step = stepFor(high - low + 2 * pad, bottom - top);
  const ticks: number[] = [];
  for (let k = Math.ceil((low - pad) / step); k * step <= high + pad; k++) ticks.push(Math.round(k * step * 100) / 100);

  const maxVolume = Math.max(...indexes.map((index) => CANDLES[index].volume));
  const volumeOf = (volume: number) => (volume / maxVolume) * height * 0.2;

  const now = candleAt(live);
  const up = now.close >= now.open;
  const change = now.close - PREVIOUS_CLOSE;
  // The crosshair snaps to the middle of its candle and sits at its close. Its tooltip goes 12px off it on the
  // roomier side, at the top of the prices or at their bottom, whichever covers less of the candles beside it.
  const crossIndex = live - beat.cross;
  const crossed = CANDLES[crossIndex];
  const crossX = xOf(crossIndex);
  const crossY = crisp(yOf(crossed.close));
  const tipX = crossX > width / 2 ? crossX - 12 - tip.width : crossX + 12;
  const beside = indexes.filter((index) => xOf(index) + pitch >= tipX && xOf(index) - pitch <= tipX + tip.width);
  const highest = Math.min(...beside.map((index) => yOf(candleAt(index).high)));
  const lowest = Math.max(...beside.map((index) => yOf(candleAt(index).low)));
  const [above, below] = [top - 4, bottom - tip.height];
  const tipY = above + tip.height - highest <= lowest - below ? above : below;
  // A round price whose label a tag would cover hides, as on trading platforms, rather than peek out between tags
  const covered = (y: number) => Math.abs(y - yOf(now.close)) < 16 || (beat.shown && Math.abs(y - crossY) < 16);
  // Time labels every quarter hour, where they fit whole
  const quarters = indexes.filter((index) => (index + 30) % 15 === 0 && xOf(index) > 20 && xOf(index) < width - 20);

  return (
    <div ref={ref} className={styles.tile}>
      <div className={styles.chart} data-inspect="candlestick">
        <div ref={setPlot} className={styles.plot}>
          {width > 0 && (
            <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
              {ticks.map((value) => (
                <line
                  key={value}
                  className={styles.grid}
                  x1="0"
                  x2={width}
                  y1={crisp(yOf(value))}
                  y2={crisp(yOf(value))}
                />
              ))}
              {quarters.map((index) => (
                <line key={index} className={styles.grid} x1={xOf(index)} x2={xOf(index)} y1="0" y2={height} />
              ))}

              <g className={styles.volume} data-inspect="candlestick-volume">
                {indexes.map((index) => {
                  const candle = candleAt(index);
                  const h = volumeOf(candle.volume);
                  return (
                    <rect
                      key={index}
                      x={xOf(index) - body / 2}
                      y={Math.round(height - h)}
                      width={body}
                      height={height - Math.round(height - h)}
                      data-up={candle.close >= candle.open || undefined}
                    />
                  );
                })}
              </g>

              {indexes.map((index) => {
                const candle = candleAt(index);
                const x = xOf(index);
                // The body snaps to whole pixels, at least 1px tall for a candle that closed where it opened
                const [open, close] = [Math.round(yOf(candle.open)), Math.round(yOf(candle.close))];
                return (
                  <g key={index} className={styles.candle} data-up={candle.close >= candle.open || undefined}>
                    <g data-inspect="candlestick-wick">
                      <line className={styles.wick} x1={x} x2={x} y1={yOf(candle.high)} y2={yOf(candle.low)} />
                      <line className={styles.wickHit} x1={x} x2={x} y1={yOf(candle.high)} y2={yOf(candle.low)} />
                    </g>
                    <rect
                      className={styles.body}
                      x={x - body / 2}
                      y={Math.min(open, close)}
                      width={body}
                      height={Math.max(1, Math.abs(close - open))}
                      data-inspect="candlestick-body"
                    />
                  </g>
                );
              })}

              {/* The live price across the chart, dotted in the live candle's color */}
              <line
                className={styles.priceLine}
                x1="0"
                x2={width}
                y1={crisp(yOf(now.close))}
                y2={crisp(yOf(now.close))}
                data-up={up || undefined}
              />
            </svg>
          )}

          <span className={styles.legend}>
            <b>HLDN</b>
            <span className={styles.interval}>1m</span>
            <span className={styles.last}>{price(now.close)}</span>
            <span className={styles.change} data-up={change >= 0 || undefined}>
              {change >= 0 ? '+' : '−'}
              {price(Math.abs(change))} ({change >= 0 ? '+' : '−'}
              {((Math.abs(change) / PREVIOUS_CLOSE) * 100).toFixed(2)}%)
            </span>
          </span>

          <div
            ref={setTooltip}
            className={styles.tooltip}
            style={{ transform: `translate(${Math.round(tipX)}px, ${Math.round(tipY)}px)` }}
            data-shown={beat.shown || undefined}
            data-inspect="candlestick-tooltip"
          >
            <span>O</span>
            <b>{price(crossed.open)}</b>
            <span>H</span>
            <b>{price(crossed.high)}</b>
            <span>L</span>
            <b>{price(crossed.low)}</b>
            <span>C</span>
            <b>{price(crossed.close)}</b>
          </div>
        </div>

        {/* The price axis: round prices and the live price's tag */}
        <div className={styles.axis}>
          {height > 0 &&
            ticks.map((value) => (
              <span
                key={value}
                className={styles.tick}
                style={{ transform: `translateY(${yOf(value)}px)` }}
                data-covered={covered(yOf(value)) || undefined}
              >
                {price(value)}
              </span>
            ))}
          {height > 0 && (
            <span
              className={styles.priceTag}
              style={{ transform: `translateY(${yOf(now.close)}px)` }}
              data-up={up || undefined}
              data-inspect="candlestick-price"
            >
              {price(now.close)}
            </span>
          )}
        </div>

        <div className={styles.times}>
          {quarters.map((index) => (
            <span key={index} className={styles.time} style={{ transform: `translateX(${xOf(index)}px)` }}>
              {timeOf(index)}
            </span>
          ))}
        </div>

        {/* The crosshair: a dashed line down and one across the plot, with its time and price on the axes */}
        {height > 0 && (
          <div className={styles.crosshair} data-shown={beat.shown || undefined} data-inspect="candlestick-crosshair">
            <span className={styles.crossDown} style={{ height, transform: `translateX(${crossX}px)` }} />
            <span className={styles.crossAcross} style={{ width, transform: `translateY(${crossY}px)` }} />
            <span className={styles.crossPrice} style={{ transform: `translate(${width}px, ${crossY}px)` }}>
              {price(crossed.close)}
            </span>
            <span className={styles.crossTime} style={{ transform: `translate(${crossX}px, ${height}px)` }}>
              {timeOf(crossIndex)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
