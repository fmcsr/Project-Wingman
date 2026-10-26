import type { CSSProperties } from 'react';
import { StatusBar } from '../../../demos/StatusBar';
import styles from './HailApp.module.css';

/* The map is drawn 1:1 in screen pixels, so pins and callouts placed at these points sit exactly on the route. */
const PICKUP = { left: 88, top: 186 };
const DROPOFF = { left: 206, top: 92 };
const ROUTE = `M${PICKUP.left} ${PICKUP.top}H146V128H206V${DROPOFF.top}`;

/* City blocks between the streets (x and y ranges). Elm Ave (y 128) and the street at x 146 are wider. */
const BLOCK_XS = [[-5, 27], [33, 85], [91, 141], [151, 203], [209, 261], [267, 285]];
const BLOCK_YS = [[-5, 67], [73, 123], [133, 183], [189, 241], [247, 265]];
const PARK = { x: 151, y: 133, width: 52, height: 50 };
const BLOCKS = BLOCK_XS.flatMap(([x1, x2]) =>
  BLOCK_YS.map(([y1, y2]) => ({ x: x1, y: y1, width: x2 - x1, height: y2 - y1 })),
).filter((block) => block.x !== PARK.x || block.y !== PARK.y);

/* Nearby drivers: position on a street and the direction they're driving */
const VEHICLES = [
  { left: 40, top: 186, heading: '90deg' },
  { left: 264, top: 152, heading: '0deg' },
  { left: 118, top: 70, heading: '270deg' },
];

type CarShape = { paint: string; body: string; glass: string[]; wheels: [number, number]; radius: number };

/* Side views drawn in a 48 × 28 box: a hatchback, a sedan and an SUV */
const CARS: Record<'go' | 'comfort' | 'xl', CarShape> = {
  go: {
    paint: styles.carGo,
    body: 'M7.5 21.5h34a1.5 1.5 0 0 0 1.5-1.5v-3c0-1.3-.9-2.5-2.2-2.8l-6-1.4-4.4-4.4c-.8-.8-1.9-1.3-3-1.3h-8.2c-1.5 0-2.8.8-3.5 2.1L8.4 13.6C7 14.1 6 15.2 6 16.6V20a1.5 1.5 0 0 0 1.5 1.5z',
    glass: ['M11.4 12.9l4.9-2.9c.5-.5 1.1-.8 1.8-.8h5.3v3.7z', 'M24.8 9.2h2.5c.7 0 1.4.3 1.9.8l2.9 2.9h-7.3z'],
    wheels: [14, 35.5],
    radius: 4,
  },
  comfort: {
    paint: styles.carComfort,
    body: 'M5.5 21.5h38.5a1.5 1.5 0 0 0 1.5-1.5v-3.2c0-1.4-1-2.6-2.4-2.9l-6.6-1.4-5-4.6c-.8-.7-1.8-1.1-2.9-1.1h-9.1c-1.2 0-2.3.5-3.1 1.4l-4.4 4.6-6.4 1.2C4.9 14.3 4 15.4 4 16.7v3.3a1.5 1.5 0 0 0 1.5 1.5z',
    glass: ['M15.2 12.1L18 8.9c.4-.4.9-.6 1.4-.6h4.2v3.8z', 'M25 8.3h3.4c.6 0 1.2.2 1.6.6l3.6 3.2H25z'],
    wheels: [13, 36.5],
    radius: 4,
  },
  xl: {
    paint: styles.carXl,
    body: 'M4.5 21.5H44a1.5 1.5 0 0 0 1.5-1.5v-3.6c0-1.2-.8-2.3-2-2.6l-5.2-1.4-4.6-6.1c-.6-.8-1.5-1.3-2.5-1.3H9.6c-1.1 0-2.1.6-2.6 1.6l-2.8 4.8c-.8.9-1.2 2-1.2 3.2V20a1.5 1.5 0 0 0 1.5 1.5z',
    glass: ['M6.8 11.2l1.8-3.8c.3-.6.8-.9 1.4-.9H15v4.7z', 'M16.4 6.5H24v4.7h-7.6z', 'M25.4 6.5H31c.5 0 .9.2 1.2.6l3.2 4.1h-10z'],
    wheels: [12.5, 37],
    radius: 4.2,
  },
};

const RIDES = [
  { name: 'Hail Go', car: CARS.go, seats: 4, eta: '2 min away', fare: '$14.20' },
  { name: 'Hail Comfort', car: CARS.comfort, seats: 4, eta: '3 min away', fare: '$18.60', selected: true },
  { name: 'Hail XL', car: CARS.xl, seats: 6, eta: '6 min away', fare: '$26.40' },
];

function CarArt({ shape }: { shape: CarShape }) {
  return (
    <svg className={`${styles.car} ${shape.paint}`} viewBox="0 0 48 28">
      <path className={styles.carBody} d={shape.body} />
      {shape.glass.map((d) => (
        <path key={d} className={styles.carGlass} d={d} />
      ))}
      {shape.wheels.map((cx) => (
        <g key={cx}>
          <circle className={styles.carWheel} cx={cx} cy="21.5" r={shape.radius} />
          <circle className={styles.carHub} cx={cx} cy="21.5" r="1.6" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Library example: a ride-hailing app's "Choose a ride" step, built from the patterns of Uber, Lyft and Bolt.
 * Not interactive; for inspection only.
 */
export function HailApp() {
  return (
    <div className={styles.app}>
      <StatusBar className={styles.statusBar} />

      <div className={styles.mapArea} data-inspect="map-view">
        <svg className={styles.map} viewBox="0 0 280 260" width="280" height="260">
          <rect className={styles.streets} width="280" height="260" />
          {BLOCKS.map((block) => (
            <rect key={`${block.x},${block.y}`} className={styles.block} rx="3" {...block} />
          ))}
          <rect className={styles.park} rx="3" {...PARK} />
          <ellipse className={styles.water} cx="185" cy="168" rx="9" ry="6" />
          <path className={styles.water} d="M285 24C258 34 241 58 240 84c-1 26 17 44 45 52z" />
          <text className={styles.label} x="40" y="130.5">
            Elm Ave
          </text>
          <text className={`${styles.label} ${styles.parkLabel}`} x="177" y="152" textAnchor="middle">
            Linden Park
          </text>
          <text className={`${styles.label} ${styles.waterLabel}`} x="265" y="106" textAnchor="middle">
            Harbor
          </text>
          <g data-inspect="route-line">
            <path className={styles.routeCasing} d={ROUTE} />
            <path className={styles.routeLine} d={ROUTE} />
          </g>
        </svg>

        {VEHICLES.map((vehicle) => (
          <span
            key={`${vehicle.left},${vehicle.top}`}
            className={styles.vehicle}
            style={{ left: vehicle.left, top: vehicle.top, '--heading': vehicle.heading } as CSSProperties}
            data-inspect="vehicle-marker"
          />
        ))}

        <span className={`${styles.pin} ${styles.pickup}`} style={PICKUP} data-inspect="map-pin" />
        <span className={`${styles.pin} ${styles.dropoff}`} style={DROPOFF} data-inspect="map-pin" />
        <span className={`${styles.callout} ${styles.eta}`} style={PICKUP} data-inspect="map-callout">
          3 min
        </span>
        <span className={`${styles.callout} ${styles.destination}`} style={DROPOFF} data-inspect="map-callout">
          Harbor Station
        </span>
      </div>

      <span className={`${styles.floatButton} ${styles.back}`} data-inspect="back-button">
        <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
      </span>

      <div className={styles.sheet} data-inspect="bottom-sheet">
        <span className={`${styles.floatButton} ${styles.recenter}`} data-inspect="recenter-button">
          <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="12" r="6.5" />
            <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
            <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
          </svg>
        </span>
        <span className={styles.handle} data-inspect="drag-handle" />

        <h3 className={styles.title}>Choose a ride</h3>

        <div className={styles.options}>
          {RIDES.map((ride) => (
            <div
              key={ride.name}
              className={ride.selected ? styles.optionSelected : styles.option}
              data-inspect="ride-option"
            >
              <CarArt shape={ride.car} />
              <span className={styles.optionText}>
                <span className={styles.optionName}>{ride.name}</span>
                <span className={styles.optionMeta}>
                  <svg className={styles.glyph} viewBox="0 0 24 24" width="11" height="11">
                    <path d="M12 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 21a7.5 7.5 0 0 1 15 0z" />
                  </svg>
                  {ride.seats} · {ride.eta}
                </span>
              </span>
              <span className={styles.fare} data-inspect="fare">
                {ride.fare}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.payment} data-inspect="payment-row">
          <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20">
            <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
            <path d="M2.5 10h19M6 14.5h4" />
          </svg>
          <span className={styles.paymentLabel}>Visa •••• 4242</span>
          <svg className={`${styles.icon} ${styles.chevron}`} viewBox="0 0 24 24" width="16" height="16">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </div>

        <span className={styles.primary} data-inspect="primary-button">
          Choose Hail Comfort
        </span>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
