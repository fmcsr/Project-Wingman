import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import { BaseMap, fits, project, viewOf } from './MarkerClustersMap';
import type { Point, View } from './MarkerClustersMap';
import styles from './MarkerClusters.module.css';
import aFrame from '../photos/a-frame.webp';

/** A cluster stands in for `count` stays; a price marker is a single stay. */
type Pin = { at: Point; count?: number; price?: number };

/** The loop zooms in 2× on the 48 cluster, so it stays where it is while everything else moves away from it. */
const ZOOM = 2;
const FOCUS: Point = [520, 250];

/** At the starting zoom: the clusters and single stays around the one the loop opens. */
const OVERVIEW: Pin[] = [
  { count: 230, at: [420, 150] },
  { count: 12, at: [575, 410] },
  { count: 7, at: [500, 440] },
  { count: 96, at: [215, 330] },
  { count: 31, at: [740, 80] },
  { count: 64, at: [860, 400] },
  { count: 15, at: [66, 196] },
  { count: 5, at: [735, 470] },
  { price: 189, at: [628, 172] },
  { price: 129, at: [275, 470] },
  { price: 254, at: [905, 250] },
  { price: 76, at: [70, 420] },
  { price: 310, at: [960, 380] },
];

/**
 * What the 48 splits into zoomed in, and where each lands: 21 + 14 + 9 + four single stays. They fit the smallest
 * tile around the picked cabin's card, clear of the zoom controls.
 */
const CHILDREN: Pin[] = [
  { count: 21, at: [618, 150] },
  { count: 14, at: [622, 290] },
  { count: 9, at: [380, 410] },
  { price: 142, at: [482, 330] },
  { price: 98, at: [560, 420] },
  { price: 186, at: [452, 432] },
  { price: 215, at: [365, 200] },
];
const PICKED = CHILDREN[3];

/** Further out, zoomed in, the neighbors' clusters have split too; a wider tile shows them at its sides. */
const NEARBY: Pin[] = [
  { count: 18, at: [176, 168] },
  { count: 8, at: [300, 165] },
  { count: 11, at: [692, 128] },
  { count: 6, at: [862, 330] },
  { price: 164, at: [296, 300] },
  { price: 121, at: [850, 212] },
  { price: 275, at: [900, 452] },
  { price: 97, at: [110, 300] },
];

/**
 * One moment of the loop and how long it lasts. `hold` moments wait while the tile is inspected or out of view; the
 * short beats in between always finish, so the map never stops halfway through a zoom.
 */
type Scene = { zoom: number; split: boolean; picked: boolean; press?: 'cluster' | 'out'; ms: number; hold?: boolean };

/**
 * A click on the 48 cluster zooms the map in on it (600 ms); near the end of the zoom it splits into smaller clusters
 * and single stays, which move out from its center to their places. One gets picked and its card opens. Then the
 * card closes, the zoom-out button takes the map back out, the stays gather back into the cluster on the way, and it
 * rests.
 */
const SCENES: Scene[] = [
  { zoom: 1, split: false, picked: false, ms: 2200, hold: true },
  { zoom: 1, split: false, picked: false, press: 'cluster', ms: 180 },
  { zoom: ZOOM, split: false, picked: false, ms: 420 },
  { zoom: ZOOM, split: true, picked: false, ms: 1100 },
  { zoom: ZOOM, split: true, picked: true, ms: 3800, hold: true },
  { zoom: ZOOM, split: true, picked: false, ms: 450 },
  { zoom: ZOOM, split: true, picked: false, press: 'out', ms: 160 },
  { zoom: 1, split: false, picked: false, ms: 1100 },
];

/** The still picture: zoomed in, split, the cabin's card open. */
const FINAL: Scene = { zoom: ZOOM, split: true, picked: true, ms: 0 };

function useScenes(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);
  const held = final || (SCENES[index].hold === true && !playing);

  useEffect(() => {
    if (held) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % SCENES.length), SCENES[index].ms);
    return () => window.clearTimeout(id);
  }, [index, held]);

  return final ? FINAL : SCENES[index];
}

/** The part of the map the tile shows, kept up to date (null until it's measured). */
function useView(element: HTMLElement | null) {
  const [view, setView] = useState<View | null>(null);
  useLayoutEffect(() => {
    if (!element) return;
    const observer = new ResizeObserver(() => setView(viewOf(element.offsetWidth, element.offsetHeight)));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return view;
}

/** Cluster sizes step up with the count, as on most clustering maps. */
const sizeOf = (count: number) => (count < 10 ? 28 : count < 50 ? 34 : count < 100 ? 38 : 44);

/** About how far a marker reaches either side of its place (a cluster's halo may run off the edge). */
function reachOf(pin: Pin) {
  if (pin.count === undefined) return [13 + String(pin.price).length * 3.8, 13] as const;
  return [sizeOf(pin.count) / 2, sizeOf(pin.count) / 2] as const;
}

type MarkerProps = {
  pin: Pin;
  /** Where it shows now, in px on the map. */
  at: Point;
  shown?: boolean;
  scale?: number;
  picked?: boolean;
  /** How it moves: with the map's zoom, or out of and back into its cluster. */
  motion: 'zoom' | 'split';
};

/** A cluster (a circle with its count and a soft halo) or a price marker (a pill with the nightly price). */
function Marker({ pin, at, shown = true, scale = 1, picked = false, motion }: MarkerProps) {
  const style = {
    transform: `translate(${at[0]}px, ${at[1]}px) translate(-50%, -50%) scale(${scale})`,
    '--size': pin.count === undefined ? undefined : `${sizeOf(pin.count)}px`,
  } as CSSProperties;
  return pin.count === undefined ? (
    <span
      className={styles.price}
      style={style}
      data-motion={motion}
      data-hidden={!shown || undefined}
      data-picked={picked || undefined}
      data-inspect="marker-clusters-marker"
    >
      ${pin.price}
    </span>
  ) : (
    <span
      className={styles.cluster}
      style={style}
      data-motion={motion}
      data-hidden={!shown || undefined}
      data-inspect="marker-clusters"
    >
      {pin.count}
    </span>
  );
}

/**
 * Marker clusters on a rentals map: nearby stays gather into circles with a count, sized by how many they hold, with
 * single stays as price markers. In the loop a click on a cluster zooms the map in on it; the cluster splits into
 * smaller clusters and price markers that move out to their places, one is picked and its card pops up. Then the map
 * zooms back out and the markers merge again. Markers keep their size while the map scales, and the ones the tile's
 * edge would cut fade out.
 */
export function MarkerClusters() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const scene = useScenes(playing, final);
  const [tile, setTile] = useState<HTMLDivElement | null>(null);
  const tileRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref(node);
      setTile(node);
    },
    [ref],
  );
  const view = useView(tile);
  const inView = (pin: Pin, at: Point) => fits(at, ...reachOf(pin), view);

  return (
    <div ref={tileRef} className={styles.tile} data-zoomed={scene.zoom > 1 || undefined}>
      <div className={styles.stage}>
        <BaseMap zoom={scene.zoom} focus={FOCUS} view={view} />

        {OVERVIEW.map((pin) => {
          const at = project(pin.at, scene.zoom, FOCUS);
          return <Marker key={pin.at.join()} pin={pin} at={at} shown={inView(pin, at)} motion="zoom" />;
        })}
        {NEARBY.map((pin) => (
          <Marker key={pin.at.join()} pin={pin} at={pin.at} shown={scene.split && inView(pin, pin.at)} motion="split" />
        ))}
        <Marker
          pin={{ count: 48, at: FOCUS }}
          at={FOCUS}
          shown={!scene.split}
          scale={scene.press === 'cluster' ? 0.9 : scene.split ? 1.25 : 1}
          motion="split"
        />
        {CHILDREN.map((pin) => (
          <Marker
            key={pin.at.join()}
            pin={pin}
            at={scene.split ? pin.at : FOCUS}
            shown={scene.split}
            scale={scene.split ? (pin === PICKED && scene.picked ? 1.08 : 1) : 0.5}
            picked={pin === PICKED && scene.picked}
            motion="split"
          />
        ))}

        <div
          className={styles.callout}
          style={{ transform: `translate(${PICKED.at[0]}px, ${PICKED.at[1]}px)` }}
          data-hidden={!scene.picked || undefined}
        >
          <div className={styles.card} data-inspect="marker-clusters-callout">
            <span className={styles.photo}>
              <img src={aFrame} alt="" />
              <span className={styles.photoButton} data-side="left">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 7l10 10M17 7 7 17" />
                </svg>
              </span>
              <span className={styles.photoButton} data-side="right">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 19.5s-7.5-4.4-7.5-9.6A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.3c0 5.2-7.5 9.6-7.5 9.6z" />
                </svg>
              </span>
              <span className={styles.dots}>
                {[0, 1, 2, 3, 4].map((dot) => (
                  <span key={dot} data-current={dot === 0 || undefined} />
                ))}
              </span>
            </span>
            <span className={styles.details}>
              <span className={styles.title}>Cabin in Larch Hollow</span>
              <span className={styles.meta}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" />
                </svg>
                4.92 (128) · A-frame
              </span>
              <span className={styles.cost}>
                <strong>$142</strong> night
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.zoom} data-inspect="marker-clusters-zoom">
        <span className={styles.zoomButton}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 6v12M6 12h12" />
          </svg>
        </span>
        <span className={styles.zoomButton} data-pressed={scene.press === 'out' || undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 12h12" />
          </svg>
        </span>
      </div>

      <span className={styles.attribution}>
        Map data ©2026
        <span className={styles.scale}>200 m</span>
      </span>
    </div>
  );
}
