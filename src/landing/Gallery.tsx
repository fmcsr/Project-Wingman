import { InspectSurface } from '../inspector/InspectSurface';
import { InspectorLayerHost } from '../inspector/InspectorLayer';
import tiles from '../showcase/TileGrid.module.css';
import { TILES } from './gallery/tiles';
import styles from './Gallery.module.css';

/**
 * The examples' With Wingman tab: fifteen of the library's elements, from apps people use every day, each live in a
 * tile of a bento grid with its name under it. Every tile is an example of its own (one stop for the keyboard), so
 * each part of it can be named, summarized and explained. Balloons are drawn on one layer over the whole grid, so they
 * can reach past a tile's edge.
 */
export function Gallery() {
  return (
    <div className={`container ${styles.stage}`}>
      <InspectorLayerHost className={styles.layer}>
        <ol className={tiles.grid}>
          {TILES.map(({ id, name, size, specs, Component }, index) => (
            <li key={id} className={tiles.tile} data-size={size} data-tile={id}>
              <div className={tiles.picture}>
                <InspectSurface specs={specs} label={name} fill>
                  <Component />
                </InspectSurface>
              </div>
              <h3 className={tiles.caption}>
                <span className={styles.index} aria-hidden="true">
                  [{String(index + 1).padStart(2, '0')}]
                </span>
                <span className={styles.name}>{name}</span>
              </h3>
            </li>
          ))}
        </ol>
      </InspectorLayerHost>
    </div>
  );
}
