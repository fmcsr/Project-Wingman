import { useEffect, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import { StatusIcons } from '../StatusIcons';
import beach from '../photos/beach.webp';
import nico from '../photos/nico.webp';
import styles from './DynamicIsland.module.css';

type Presentation = 'compact' | 'expanded';

/** The loop: each presentation rests this long before the island morphs into the next. */
const STEPS: { presentation: Presentation; ms: number }[] = [
  { presentation: 'compact', ms: 2800 },
  { presentation: 'expanded', ms: 4600 },
];

/** A side view of a car, in the style of SF Symbols' filled glyphs: the windows are cut out of the body. */
function CarGlyph({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M2.6 10.4c0-1.4.9-2.3 2.4-2.6l2.6-3.9C8.2 3 9 2.6 10 2.6h5.3c.9 0 1.7.4 2.3 1.1l2.6 3.6c1.5.3 2.3 1.2 2.3 2.7v1.6c0 .7-.5 1.2-1.2 1.2h-1a2.6 2.6 0 0 0-5.1 0H9.1a2.6 2.6 0 0 0-5.1 0h-.2c-.7 0-1.2-.5-1.2-1.2zm7.1-3.1h3V4.1h-2.2c-.4 0-.7.2-.9.5zm4.4 0h4.4l-1.6-2.4c-.3-.5-.8-.8-1.4-.8h-1.4z"
      />
      <circle cx="6.55" cy="13" r="1.9" />
      <circle cx="17.25" cy="13" r="1.9" />
    </svg>
  );
}

/**
 * The top of an iPhone screen over a beach wallpaper, with a ride on its way in the Dynamic Island. The loop: the
 * compact presentation rests (a car on the leading side, the ETA on the trailing side), then the black shape grows
 * with a spring into the expanded presentation and its regions fade in just after: the car and the ETA beside the
 * camera, the driver with the car and its plate below, and the route at the bottom, where the car moves on a little.
 * Then it shrinks back. The final state is the expanded presentation, where every region can be inspected.
 */
export function DynamicIsland() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setStep((current) => (current + 1) % STEPS.length), STEPS[step].ms);
    return () => window.clearTimeout(id);
  }, [step, playing]);

  const presentation: Presentation = final ? 'expanded' : STEPS[step].presentation;

  return (
    <div ref={ref} className={styles.tile} data-presentation={presentation}>
      <div className={styles.device}>
        <div className={styles.screen}>
          <span className={styles.wallpaper}>
            <img src={beach} alt="" />
          </span>

          <div className={styles.statusBar}>
            <span className={styles.time}>9:41</span>
            <StatusIcons className={styles.indicators} />
          </div>

          <div className={styles.island} data-inspect="dynamic-island">
            {/* Compact presentation: the two sides of the camera */}
            <CarGlyph className={styles.compactLeading} />
            <span className={styles.compactTrailing}>4 min</span>

            {/* Expanded presentation: four regions around and below the camera */}
            <div className={styles.expanded}>
              <span className={styles.leading} data-inspect="dynamic-island-expanded-leading">
                <CarGlyph className={styles.leadingCar} />
              </span>
              <span className={styles.trailing} data-inspect="dynamic-island-expanded-trailing">
                4<span className={styles.unit}>min</span>
              </span>
              <div className={styles.center} data-inspect="dynamic-island-expanded-center">
                <img className={styles.avatar} src={nico} alt="" />
                <span className={styles.driver}>
                  <span className={styles.driverName}>Nico</span>
                  <span className={styles.car}>Silver sedan · 4.9 ★</span>
                </span>
                <span className={styles.plate}>8LMK 203</span>
              </div>
              <div className={styles.bottom} data-inspect="dynamic-island-expanded-bottom">
                <span className={styles.route}>
                  <span className={styles.routeDone} />
                  <span className={styles.routeCar} />
                  <span className={styles.routeEnd} />
                </span>
                <span className={styles.routeCaption}>
                  <span>Pickup at 24 Alder St</span>
                  <span>Arrives 9:45</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
