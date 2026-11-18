import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import { LINE, NODE_W, REVENUE, layout } from './layout';
import type { NodeId, PlacedLink, PlacedNode } from './layout';
import styles from './Sankey.module.css';

const money = (value: number) => `$${value.toFixed(1)}B`;

/** The two paths the loop walks: the biggest stream down to net income, and services into research. */
const PATHS: Record<'profit' | 'research', [NodeId, NodeId][]> = {
  profit: [
    ['subscriptions', 'revenue'],
    ['revenue', 'gross'],
    ['gross', 'operating'],
    ['operating', 'net'],
  ],
  research: [
    ['services', 'revenue'],
    ['revenue', 'gross'],
    ['gross', 'rnd'],
  ],
};

/**
 * One beat of the loop: the path being walked, how many of its flows are lit so far, whether the diagram rests (no
 * highlight, the tooltip hidden where it waits for the next flow) and how long the beat lasts.
 */
type Step = { path: keyof typeof PATHS; lit: number; rest?: boolean; ms: number };

/**
 * The highlight walks from a stream down to net income a flow at a time while the rest of the diagram fades, holds on
 * the whole path and lets go; then it walks from services into research. The tooltip fades out where it is before
 * it moves to where the next walk starts, so it's never seen jumping.
 */
const STEPS: Step[] = [
  { path: 'profit', lit: 1, rest: true, ms: 900 },
  { path: 'profit', lit: 1, ms: 650 },
  { path: 'profit', lit: 2, ms: 650 },
  { path: 'profit', lit: 3, ms: 650 },
  { path: 'profit', lit: 4, ms: 2600 },
  { path: 'profit', lit: 4, rest: true, ms: 250 },
  { path: 'research', lit: 1, rest: true, ms: 550 },
  { path: 'research', lit: 1, ms: 650 },
  { path: 'research', lit: 2, ms: 650 },
  { path: 'research', lit: 3, ms: 2400 },
  { path: 'research', lit: 3, rest: true, ms: 250 },
];

/** The still picture: the path to net income, lit all the way. */
const FINAL: Step = { path: 'profit', lit: 4, ms: 0 };

function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : STEPS[index];
}

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

/** A node's name and value: under each other, or the value after the name on one line. */
function Label({ node, off }: { node: PlacedNode; off: boolean }) {
  const { x, y, anchor, lines } = node.label;
  return (
    <text
      className={styles.label}
      x={x}
      y={y}
      textAnchor={anchor}
      data-off={off || undefined}
      data-inspect="sankey-label"
    >
      {lines === 2 ? (
        <>
          <tspan className={styles.name} x={x} y={y - LINE / 2}>
            {node.name}
          </tspan>
          <tspan className={styles.value} x={x} y={y + LINE / 2}>
            {money(node.value)}
          </tspan>
        </>
      ) : (
        <>
          <tspan className={styles.name}>{node.name}</tspan>
          <tspan className={styles.value} dx="4">
            {money(node.value)}
          </tspan>
        </>
      )}
    </text>
  );
}

const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

/**
 * Where the tooltip goes: centered on the middle of its flow, over the band itself, so it covers the flow it
 * describes rather than a label. It keeps clear of the labels beside the flow's two nodes, left of the source and
 * right of the target (on a flow too short for both, the target's label wins), and of the labels above the nodes.
 */
function tipPlace(link: PlacedLink, nodes: PlacedNode[], top: number, box: Size, tip: Size) {
  const source = nodes.find((node) => node.id === link.source)!;
  const target = nodes.find((node) => node.id === link.target)!;
  let x = link.mid.x - tip.width / 2;
  if (source.label.anchor === 'end') x = Math.max(x, source.x - 2);
  if (target.label.x > target.x + NODE_W) x = Math.min(x, target.x + NODE_W + 2 - tip.width);
  return {
    x: Math.round(clamp(x, 4, box.width - 4 - tip.width)),
    y: Math.round(clamp(link.mid.y - tip.height / 2, top, box.height - 4 - tip.height)),
  };
}

/**
 * Sankey diagram: a quarter's income statement as flows of money. Three revenue streams pour into revenue, which
 * splits into the cost of revenue and gross profit; gross profit pays for R&D, sales and marketing and G&A and leaves
 * operating profit, which ends as net income after tax. Every flow is as thick as its amount, profit in green and
 * costs in red. In the loop a highlight walks one path a flow at a time while the others fade, with a tooltip of the
 * amount, then a second path.
 */
export function Sankey() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);
  const [chart, setChart] = useState<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<HTMLDivElement | null>(null);
  const { width, height } = useSize(chart);
  const tip = useSize(tooltip);
  const diagram = useMemo(() => (width > 0 ? layout(width, height) : undefined), [width, height]);

  // The walked path's flows that are in the diagram (a narrow one leaves out the streams), how many are lit, and the
  // flow the tooltip is on
  const path = PATHS[step.path].flatMap(([source, target]) =>
    (diagram?.links ?? []).filter((link) => link.source === source && link.target === target),
  );
  const lit = step.rest ? 0 : Math.min(step.lit, path.length);
  const current = path[Math.min(step.lit, path.length) - 1];
  const place =
    current && diagram ? tipPlace(current, diagram.nodes, diagram.top, { width, height }, tip) : { x: 0, y: 0 };
  const onPath = new Set(path.slice(0, lit).flatMap((link) => [link.source, link.target]));

  return (
    <div ref={ref} className={styles.tile}>
      <div ref={setChart} className={styles.chart}>
        {diagram && (
          <svg
            className={styles.diagram}
            viewBox={`0 0 ${width} ${height}`}
            data-walking={lit > 0 || undefined}
            data-inspect="sankey"
            aria-hidden="true"
          >
            <g className={styles.links}>
              {diagram.links.map((link) => (
                <path
                  key={`${link.source}-${link.target}`}
                  className={styles.link}
                  d={link.d}
                  data-kind={link.kind}
                  data-inspect="sankey-link"
                />
              ))}
            </g>
            {/* The walked path, drawn again over the faded flows */}
            <g className={styles.path} data-inspect="sankey-path">
              {path.map((link, index) => (
                <path
                  key={`${link.source}-${link.target}`}
                  className={styles.link}
                  d={link.d}
                  data-kind={link.kind}
                  data-lit={index < lit || undefined}
                />
              ))}
            </g>
            {diagram.nodes.map((node) => (
              <rect
                key={node.id}
                className={styles.node}
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={node.h}
                rx="1"
                data-kind={node.kind}
                data-off={(lit > 0 && !onPath.has(node.id)) || undefined}
                data-inspect="sankey-node"
              />
            ))}
            {diagram.nodes.map((node) => (
              <Label key={node.id} node={node} off={lit > 0 && !onPath.has(node.id)} />
            ))}
          </svg>
        )}

        <div
          ref={setTooltip}
          className={styles.tooltip}
          style={{ transform: `translate(${place.x}px, ${place.y}px)` }}
          data-shown={lit > 0 || undefined}
          data-inspect="sankey-tooltip"
        >
          {current && (
            <>
              <span className={styles.figure}>{money(current.value)}</span>
              <span className={styles.share}>{Math.round((current.value / REVENUE) * 100)}% of revenue</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
