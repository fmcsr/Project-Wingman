import { gallerySpecs } from '../catalog';
import { InspectSurface } from '../inspector/InspectSurface';
import { InspectorLayerHost } from '../inspector/InspectorLayer';
import { InteractionGuide } from '../showcase/InteractionGuide';
import { TILES } from './gallery/tiles';
import { SectionHeader } from './SectionHeader';
import styles from './Gallery.module.css';

/**
 * The element gallery, right under the hero: fifteen elements from apps people use every day, each live in a tile of
 * a bento grid with its name under it. Every tile is an example of its own (one stop for the keyboard), so each part
 * of it can be named, summarized and explained, as in the examples further down. Balloons are drawn on one layer
 * over the whole grid, so they can reach past a tile's edge.
 */
export function Gallery() {
  return (
    <section id="elements" className={styles.section} aria-labelledby="elements-title">
      <div className="container">
        <SectionHeader
          id="elements-title"
          index="[01]"
          label="Elements"
          title="You've seen them."
          muted="Now name them."
          description="Fifteen elements from apps you use every day, working the way they do there. Each has a name your AI coding tool understands, and so does every part of it."
        />
        <InteractionGuide />
      </div>

      <div className={`container ${styles.stage}`}>
        <InspectorLayerHost className={styles.layer}>
          <ol className={styles.grid}>
            {TILES.map(({ id, name, size, Component }, index) => (
              <li key={id} className={styles.tile} data-size={size} data-tile={id}>
                <div className={styles.picture}>
                  <InspectSurface specs={gallerySpecs} label={name} fill>
                    <Component />
                  </InspectSurface>
                </div>
                <h3 className={styles.caption}>
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
    </section>
  );
}
