import { useId } from 'react';
import type { CSSProperties } from 'react';
import styles from './MarkerClusters.module.css';

/** A point on the map, in px from its top-left corner at the starting zoom. */
export type Point = readonly [number, number];

/** The part of the map the tile shows: its edges, in the map's px. */
export type View = { left: number; top: number; right: number; bottom: number };

/** The map is a fixed 1000 × 560 px area centered in the tile: a wider tile shows more of it, never a bigger one. */
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 560;

/** The part of the map a tile of this size shows. */
export function viewOf(width: number, height: number): View {
  return {
    left: (MAP_WIDTH - width) / 2,
    top: (MAP_HEIGHT - height) / 2,
    right: (MAP_WIDTH + width) / 2,
    bottom: (MAP_HEIGHT + height) / 2,
  };
}

/** The zoom controls and the attribution in the tile's bottom-right corner, with a little room around them. */
const CONTROLS = { width: 52, height: 101 };
const ATTRIBUTION = { width: 164, height: 19 };

/**
 * Whether a box this far either side of `center` is wholly in view, 4px in from the edges and clear of the controls
 * in the corner. Names and markers that would be cut off or covered fade out instead, so no text is ever cut.
 */
export function fits([x, y]: Point, halfWidth: number, halfHeight: number, view: View | null) {
  if (!view) return true;
  const inset = 4;
  const [left, right, top, bottom] = [x - halfWidth, x + halfWidth, y - halfHeight, y + halfHeight];
  const under = (corner: { width: number; height: number }) =>
    right > view.right - corner.width && bottom > view.bottom - corner.height;
  return (
    left >= view.left + inset &&
    right <= view.right - inset &&
    top >= view.top + inset &&
    bottom <= view.bottom - inset &&
    !under(CONTROLS) &&
    !under(ATTRIBUTION)
  );
}

/** Where `point` shows at `zoom`, when the map is scaled around `focus`. */
export function project([x, y]: Point, zoom: number, [fx, fy]: Point): Point {
  return [fx + (x - fx) * zoom, fy + (y - fy) * zoom];
}

const round = (n: number) => Math.round(n * 10) / 10;

/** A smooth curve through the points: a Catmull-Rom spline, drawn as cubic Béziers. */
function smooth(points: readonly Point[]) {
  let d = `M${points[0].join(' ')}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, p1, p2, p3] = [points[i - 1] ?? points[i], points[i], points[i + 1], points[i + 2] ?? points[i + 1]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6].map(round);
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6].map(round);
    d += `C${c1.join(' ')} ${c2.join(' ')} ${p2.join(' ')}`;
  }
  return d;
}

const shape = (points: readonly Point[]) => `M${points.map((point) => point.join(' ')).join('L')}Z`;

/**
 * A neighborhood's street grid: parallel streets both ways (`across` and `along`, as offsets from its origin), turned
 * by `angle` and clipped to its outline; the river and the parks are drawn over the ragged edges. `main` are the
 * offsets of the arterials that run through it, so the minor streets that show zoomed in fall between them all.
 */
type District = {
  id: string;
  outline: Point[];
  origin: Point;
  angle: number;
  across: number[];
  along: number[];
  main: { across: number[]; along: number[] };
};

const DISTRICTS: District[] = [
  {
    id: 'east',
    outline: [
      [330, -20],
      [600, -20],
      [600, 198],
      [1020, 182],
      [1020, 580],
      [330, 580],
    ],
    origin: [0, 0],
    angle: 0,
    across: [404, 496, 548, 652, 702, 752, 800, 852, 902, 952, 1000],
    along: [24, 68, 112, 156, 248, 346, 446, 494, 540],
    main: { across: [450, 600], along: [200, 298] },
  },
  {
    // North of Marlowe Ave the streets follow Harbor Blvd, which runs off at an angle
    id: 'harbor',
    outline: [
      [600, -20],
      [1020, -20],
      [1020, 182],
      [600, 198],
    ],
    origin: [600, 198],
    angle: -22,
    across: [46, 92, 138, 184, 230, 276, 322, 368, 414, 460],
    along: [-230, -184, -138, -92, -46, 46],
    main: { across: [0], along: [0] },
  },
  {
    id: 'west',
    outline: [
      [-20, -20],
      [284, -20],
      [302, 130],
      [346, 270],
      [350, 420],
      [356, 580],
      [-20, 580],
    ],
    origin: [170, 280],
    angle: -4,
    across: [-148, -104, -60, 46, 92, 138],
    along: [-262, -216, -170, -120, -10, 100, 220, 266],
    main: { across: [0], along: [-64, 54] },
  },
];

/** Lines at these offsets in a district's own turned frame, long enough to cross the whole map. */
function lines(across: number[], along: number[]) {
  const reach = 1200;
  return [...across.map((x) => `M${x} ${-reach}V${reach}`), ...along.map((y) => `M${-reach} ${y}H${reach}`)].join('');
}

/** Halfway between each pair of neighboring streets (minor streets and arterials alike), where blocks are wide. */
function between(offsets: number[]) {
  const sorted = [...offsets].sort((a, b) => a - b);
  return sorted.slice(1).flatMap((offset, index) => {
    const previous = sorted[index];
    return offset - previous > 40 ? [(offset + previous) / 2] : [];
  });
}

const STREETS = DISTRICTS.map((district) => lines(district.across, district.along));
const MINOR_STREETS = DISTRICTS.map(({ across, along, main }) =>
  lines(between([...across, ...main.across]), between([...along, ...main.along])),
);

/** The water, the parks and the bigger roads, smooth curves through these points. */
const RIVER: Point[] = [
  [282, -20],
  [291, 60],
  [302, 130],
  [324, 200],
  [346, 270],
  [356, 340],
  [348, 410],
  [352, 480],
  [368, 580],
];

const PARKS: Point[][] = [
  // Larch Park
  [
    [634, 212],
    [772, 206],
    [777, 283],
    [702, 287],
    [638, 289],
  ],
  // Along the river, north of Fulton St and south of the expressway
  [
    [340, 230],
    [398, 225],
    [404, 288],
    [358, 294],
  ],
  [
    [344, 432],
    [396, 425],
    [394, 506],
    [348, 510],
  ],
  // Wren Green
  [
    [96, 250],
    [150, 246],
    [153, 293],
    [99, 297],
  ],
  // A square downtown, and a green in Larch Hollow
  [
    [470, 118],
    [497, 117],
    [498, 146],
    [471, 147],
  ],
  [
    [554, 213],
    [592, 211],
    [594, 246],
    [556, 248],
  ],
];

const ARTERIALS: Point[][] = [
  // Marlowe Ave
  [
    [-20, 226],
    [150, 220],
    [324, 206],
    [450, 200],
    [600, 198],
    [800, 190],
    [1020, 182],
  ],
  // Ferry St, which crosses the river and goes on as Fulton St
  [
    [-26, 348],
    [200, 333],
    [333, 323],
    [380, 306],
    [450, 300],
    [600, 297],
    [800, 292],
    [1020, 287],
  ],
  // Alder Way
  [
    [450, -20],
    [451, 200],
    [449, 300],
    [446, 394],
    [442, 580],
  ],
  // Juniper St
  [
    [598, -20],
    [600, 198],
    [602, 297],
    [604, 373],
    [608, 580],
  ],
  // Harbor Blvd
  [
    [600, 198],
    [1020, 28],
  ],
  // Mill Rd
  [
    [148, -39],
    [192, 599],
  ],
];

const EXPRESSWAY: Point[] = [
  [-20, 452],
  [150, 449],
  [270, 437],
  [360, 418],
  [470, 394],
  [600, 373],
  [740, 352],
  [880, 322],
  [1020, 292],
];

type Label = {
  text: string;
  at: Point;
  kind: 'areaName' | 'roadName' | 'waterName' | 'parkName' | 'shield';
  /** Degrees, clockwise: road names follow their road. */
  angle?: number;
};

/** Neighborhood, road, water and park names. They keep their size at every zoom; only their places move. */
const LABELS: Label[] = [
  { text: 'OLD MILL', at: [118, 128], kind: 'areaName' },
  { text: 'MARKET DISTRICT', at: [525, 110], kind: 'areaName' },
  { text: 'LARCH HOLLOW', at: [540, 318], kind: 'areaName' },
  { text: 'THE FLATS', at: [560, 498], kind: 'areaName' },
  { text: 'NORTHGATE', at: [900, 140], kind: 'areaName' },
  { text: 'Marlowe Ave', at: [716, 191], kind: 'roadName', angle: -2.4 },
  { text: 'Fulton St', at: [870, 287], kind: 'roadName', angle: -1.4 },
  { text: 'Juniper St', at: [599, 124], kind: 'roadName', angle: 90 },
  { text: 'Juniper St', at: [602, 250], kind: 'roadName', angle: 90 },
  { text: 'Alder Way', at: [450, 262], kind: 'roadName', angle: 90 },
  { text: 'Harbor Blvd', at: [813, 112], kind: 'roadName', angle: -22 },
  { text: 'Mill Rd', at: [180, 420], kind: 'roadName', angle: 86 },
  { text: 'Wren River', at: [312, 148], kind: 'waterName', angle: 72 },
  { text: 'Larch Park', at: [706, 250], kind: 'parkName' },
  { text: '9', at: [690, 361], kind: 'shield' },
];

/** About how far a name reaches either side of its place, turned with it: px per letter, by kind. */
const LETTER: Record<Label['kind'], number> = { areaName: 7.3, roadName: 5.4, waterName: 6, parkName: 6, shield: 8 };

function reach({ text, kind, angle = 0 }: Label) {
  const [width, height] = [(text.length * LETTER[kind]) / 2 + 2, 7];
  const [cos, sin] = [Math.abs(Math.cos((angle * Math.PI) / 180)), Math.abs(Math.sin((angle * Math.PI) / 180))];
  return [width * cos + height * sin, width * sin + height * cos] as const;
}

type BaseMapProps = { zoom: number; focus: Point; view: View | null };

/**
 * The base map, in the light style of the big web maps (or their dark style): land, a river, parks, a street grid per
 * neighborhood, arterials and an expressway, each road a white or yellow line over a slightly wider, darker casing,
 * with the names on top. Zooming scales the map's shapes around `focus` but not its lines (they stay a set width, a
 * little wider zoomed in) or its names (they keep their size and move with their place), as on a vector web map;
 * zoomed in, the minor streets between the others show up too.
 */
export function BaseMap({ zoom, focus, view }: BaseMapProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const world = { transformOrigin: `${focus[0]}px ${focus[1]}px`, transform: `scale(${zoom})` };
  const grid = (paths: string[]) =>
    DISTRICTS.map((district, index) => (
      <g key={district.id} clipPath={`url(#${uid}-${district.id})`}>
        <path d={paths[index]} transform={`translate(${district.origin.join(' ')}) rotate(${district.angle})`} />
      </g>
    ));

  return (
    <svg
      className={styles.map}
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      data-inspect="marker-clusters-map"
    >
      <defs>
        {DISTRICTS.map((district) => (
          <clipPath key={district.id} id={`${uid}-${district.id}`}>
            <path d={shape(district.outline)} />
          </clipPath>
        ))}
      </defs>

      <g className={styles.world} style={world}>
        <rect className={styles.land} x={-MAP_WIDTH} y={-MAP_HEIGHT} width={MAP_WIDTH * 3} height={MAP_HEIGHT * 3} />
        <g className={styles.minor}>{grid(MINOR_STREETS)}</g>
        <g className={styles.streetCasing}>{grid(STREETS)}</g>
        <g className={styles.street}>{grid(STREETS)}</g>
        {PARKS.map((park, index) => (
          <path key={index} className={styles.park} d={shape(park)} />
        ))}
        <path className={styles.river} d={smooth(RIVER)} />
        {(['arterialCasing', 'arterial'] as const).map((layer) => (
          <g key={layer} className={styles[layer]}>
            {ARTERIALS.map((road, index) => (
              <path key={index} d={smooth(road)} />
            ))}
          </g>
        ))}
        <path className={styles.expresswayCasing} d={smooth(EXPRESSWAY)} />
        <path className={styles.expressway} d={smooth(EXPRESSWAY)} />
      </g>

      {LABELS.map((label) => {
        const at = project(label.at, zoom, focus);
        const style: CSSProperties = { transform: `translate(${at[0]}px, ${at[1]}px) rotate(${label.angle ?? 0}deg)` };
        const hidden = !fits(at, ...reach(label), view) || undefined;
        return label.kind === 'shield' ? (
          <g key={label.at.join()} className={styles.shield} style={style} data-hidden={hidden}>
            <rect x="-8" y="-7.5" width="16" height="15" rx="4" />
            <text dy="0.35em">{label.text}</text>
          </g>
        ) : (
          <text key={label.at.join()} className={styles[label.kind]} style={style} data-hidden={hidden} dy="0.35em">
            {label.text}
          </text>
        );
      })}
    </svg>
  );
}
