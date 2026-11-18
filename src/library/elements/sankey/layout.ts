/**
 * The quarter behind the diagram, in billions of dollars: three revenue streams make $5.8B of revenue; $2.0B goes to
 * the cost of revenue and $3.8B is gross profit, which pays for research, sales and admin and leaves $1.4B of
 * operating profit; after $0.3B of tax, $1.1B is net income. Every node's flows in and out add up to its value.
 */
type Kind = 'revenue' | 'profit' | 'cost';
export type NodeId =
  | 'subscriptions'
  | 'services'
  | 'devices'
  | 'revenue'
  | 'gross'
  | 'cogs'
  | 'operating'
  | 'rnd'
  | 'sales'
  | 'admin'
  | 'net'
  | 'tax';

type NodeData = { id: NodeId; name: string; value: number; kind: Kind; column: number };

const NODES: NodeData[] = [
  { id: 'subscriptions', name: 'Subscriptions', value: 3.6, kind: 'revenue', column: 0 },
  { id: 'services', name: 'Services', value: 1.4, kind: 'revenue', column: 0 },
  { id: 'devices', name: 'Devices', value: 0.8, kind: 'revenue', column: 0 },
  { id: 'revenue', name: 'Revenue', value: 5.8, kind: 'revenue', column: 1 },
  { id: 'gross', name: 'Gross profit', value: 3.8, kind: 'profit', column: 2 },
  { id: 'cogs', name: 'Cost of revenue', value: 2.0, kind: 'cost', column: 2 },
  { id: 'operating', name: 'Operating profit', value: 1.4, kind: 'profit', column: 3 },
  { id: 'rnd', name: 'R&D', value: 1.1, kind: 'cost', column: 3 },
  { id: 'sales', name: 'Sales & marketing', value: 0.9, kind: 'cost', column: 3 },
  { id: 'admin', name: 'G&A', value: 0.4, kind: 'cost', column: 3 },
  { id: 'net', name: 'Net income', value: 1.1, kind: 'profit', column: 4 },
  { id: 'tax', name: 'Tax', value: 0.3, kind: 'cost', column: 4 },
];

/** The flows, each source's in the order they leave it from the top; a flow takes its target's color. */
const LINKS: [NodeId, NodeId][] = [
  ['subscriptions', 'revenue'],
  ['services', 'revenue'],
  ['devices', 'revenue'],
  ['revenue', 'gross'],
  ['revenue', 'cogs'],
  ['gross', 'operating'],
  ['gross', 'rnd'],
  ['gross', 'sales'],
  ['gross', 'admin'],
  ['operating', 'net'],
  ['operating', 'tax'],
];

export const REVENUE = 5.8;

/**
 * A node placed in the picture, with its label: the point the label hangs from (its block's vertical middle), which
 * side of that point it runs to, and whether the value goes under the name or after it.
 */
export type PlacedNode = NodeData & {
  x: number;
  y: number;
  h: number;
  label: { x: number; y: number; anchor: 'start' | 'end' | 'middle'; lines: 1 | 2 };
};
export type PlacedLink = {
  source: NodeId;
  target: NodeId;
  value: number;
  kind: Kind;
  d: string;
  /** The middle of the flow, halfway between its two nodes, and its thickness there. */
  mid: { x: number; y: number; h: number };
};

/** Node bars are 6px wide; labels sit 6px from them, in lines 13px apart. */
export const NODE_W = 6;
const LABEL_GAP = 6;
export const LINE = 13;

/**
 * Lays the diagram out for a picture `width` × `height` px. Profit runs along the top and costs drop away below it,
 * as income statement charts draw it: gross profit, operating profit and net income are top-aligned under a band
 * for their labels, the cost of revenue sits under gross profit, and the expenses fan out under operating profit.
 * Under 460px wide the streams are left out and the diagram starts at revenue, labeled above its left edge.
 */
export function layout(width: number, height: number) {
  const streams = width >= 460;
  const nodes = NODES.filter((node) => streams || node.column > 0);
  const top = 36;
  const bottom = height - 10;
  // Gross profit and the cost of revenue, 18px apart, fill the height between the label band and the bottom
  const gap = 18;
  const scale = (bottom - top - gap) / REVENUE;

  // Column x positions: room for the stream labels on the left (if any) and net income's on the right
  const left = streams ? 96 : 16;
  const right = width - (width >= 600 ? 92 : 76);
  const shares = streams ? [0, 0.2, 0.44, 0.74, 1] : [0, 0, 0.3, 0.64, 1];
  // The expenses fan out 10px apart, 8px in a narrow diagram where their labels come closer to the cost of revenue's
  const fan = streams ? 10 : 8;
  const xOf = (column: number) => Math.round(left + (right - left) * shares[column]);

  const y: Record<NodeId, number> = {
    subscriptions: top,
    services: top + 3.6 * scale + gap / 2,
    devices: top + 5 * scale + gap,
    revenue: top + gap / 2,
    gross: top,
    cogs: top + 3.8 * scale + gap,
    operating: top,
    rnd: top + 1.4 * scale + fan,
    sales: top + 2.5 * scale + 2 * fan,
    admin: top + 3.4 * scale + 3 * fan,
    net: top,
    tax: top + 1.1 * scale + 8,
  };

  const placed: PlacedNode[] = nodes.map((node) => {
    const x = xOf(node.column);
    const h = node.value * scale;
    const middle = y[node.id] + h / 2;
    const above = y[node.id] - 4 - LINE;
    const beside = { x: x + NODE_W + LABEL_GAP, y: middle, anchor: 'start' as const };
    let label: PlacedNode['label'];
    if (node.column === 0) {
      label = { x: x - LABEL_GAP, y: middle, anchor: 'end', lines: 2 };
    } else if (node.id === 'revenue') {
      label = streams
        ? { x: x + NODE_W / 2, y: above, anchor: 'middle', lines: 2 }
        : { x: x - 1, y: above, anchor: 'start', lines: 2 };
    } else if (node.id === 'gross' || node.id === 'operating') {
      label = { x: x - 1, y: above, anchor: 'start', lines: 2 };
    } else {
      label = { ...beside, lines: node.id === 'cogs' || node.id === 'net' ? 2 : 1 };
    }
    return { ...node, x, y: y[node.id], h, label };
  });

  // Each flow leaves its source and enters its target in order, stacked from the top of each node
  const out = new Map<NodeId, number>();
  const into = new Map<NodeId, number>();
  const links: PlacedLink[] = LINKS.filter(([source]) => placed.some((node) => node.id === source)).map(
    ([source, target]) => {
      const from = placed.find((node) => node.id === source)!;
      const to = placed.find((node) => node.id === target)!;
      const value = to.column === 1 ? from.value : to.value;
      const h = value * scale;
      const sy = from.y + (out.get(source) ?? 0);
      const ty = to.y + (into.get(target) ?? 0);
      out.set(source, (out.get(source) ?? 0) + h);
      into.set(target, (into.get(target) ?? 0) + h);
      const [x0, x1] = [from.x + NODE_W, to.x];
      const xm = (x0 + x1) / 2;
      const d =
        `M${x0} ${sy}C${xm} ${sy} ${xm} ${ty} ${x1} ${ty}` +
        `L${x1} ${ty + h}C${xm} ${ty + h} ${xm} ${sy + h} ${x0} ${sy + h}Z`;
      return { source, target, value, kind: to.kind, d, mid: { x: xm, y: (sy + ty + h) / 2, h } };
    },
  );

  return { nodes: placed, links, streams, top };
}
