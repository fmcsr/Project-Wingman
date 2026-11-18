import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Marker clusters element, in the order they appear. `value` fields are the actual values from
 * MarkerClusters.
 */
export const markerClustersSpecs: UiElementSpec[] = [
  {
    id: 'marker-clusters',
    name: 'Marker cluster',
    htmlTag: '<button>',
    variant: 'Count · sized by count · soft halo',
    summary:
      'A circle with a number that stands in for that many markers, where they are too close together to show one by one. Click it or zoom in, and it splits into smaller clusters and single markers.',
    aliases: ['cluster', 'grouped pins', 'the circles with numbers', 'pin cluster', 'bubble with a count'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Sized by count',
        value: '28 · 34 · 38 · 44px (up to 9 · 49 · 99 · more)',
        plain: 'Bigger groups get bigger circles, so you see where the stays are before reading a single number.',
      },
      {
        kind: 'appearance',
        term: 'Halo',
        value: '0 0 0 4px accent 30% · 0 0 0 9px accent 13%',
        plain: 'Two soft rings in the same color lift the circle off the busy map and make it look tappable.',
      },
      {
        kind: 'behavior',
        term: 'Split on zoom',
        value: '48 → 21 + 14 + 9 + 4 · 450ms ease-out',
        plain:
          'Zoom in and the cluster breaks apart: its parts move out from its center to where they are, and the numbers still add up.',
      },
      {
        kind: 'behavior',
        term: 'Click to zoom',
        value: '2× · 600ms cubic-bezier(0.45, 0, 0.2, 1)',
        plain: 'Clicking a cluster zooms the map in on it, far enough that its markers can be told apart.',
      },
    ],
  },
  {
    id: 'marker-clusters-marker',
    name: 'Price marker',
    htmlTag: '<button>',
    variant: 'Pill · the picked one inverted',
    summary:
      'A single stay on the map, shown by its price per night on a small pill instead of a pin. The one you pick turns dark and opens its card.',
    aliases: ['price pin', 'price tag', 'map pin', 'marker', 'price bubble'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Price pill',
        value: { light: '#fff · 12.5px bold · radius: 13px', dark: '#2b2d31 · 12.5px bold · radius: 13px' },
        plain: 'The price is the marker, so stays can be compared without opening any of them.',
      },
      {
        kind: 'appearance',
        term: 'Selected state',
        value: { light: 'background: #222 · scale(1.08)', dark: 'background: #f2f2f2 · scale(1.08)' },
        plain: "The picked marker swaps its colors and grows a little, so it's clear which one the card belongs to.",
      },
      {
        kind: 'behavior',
        term: 'Fixed screen size',
        value: 'not scaled with the map',
        plain: 'Markers sit on top of the map and keep their size while it zooms; only their places move.',
      },
    ],
  },
  {
    id: 'marker-clusters-callout',
    name: 'Map callout',
    htmlTag: '<div role="dialog">',
    variant: 'Listing card · photo, name, rating, price',
    summary:
      'A small card that pops up over the picked marker with the essentials (a photo, the name, the rating and the price), so you can decide without leaving the map.',
    aliases: ['info window', 'popup', 'map card', 'preview card', 'marker card'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Anchored card',
        value: 'width: 176px · border-radius: 12px · 0 8px 24px shadow',
        plain: 'It floats just above its marker and belongs to the map, so it moves with the marker.',
      },
      {
        kind: 'appearance',
        term: 'Photo with page dots',
        value: 'object-fit: cover · 108px tall',
        plain:
          'The photo fills the top. The dots say there are more photos to swipe through, and the heart saves the stay.',
      },
      {
        kind: 'behavior',
        term: 'Pop-in',
        value: 'scale(0.94) → 1 + fade · 220ms',
        plain: 'It grows out of its marker as it fades in, and shrinks back into it when it closes.',
      },
    ],
  },
  {
    id: 'marker-clusters-zoom',
    name: 'Zoom controls',
    htmlTag: '<div role="group">',
    variant: '+ / − · bottom right',
    summary:
      'Two stacked buttons in a corner of the map: plus zooms in, minus zooms out, for anyone without a scroll wheel or a pinch.',
    aliases: ['zoom buttons', 'plus and minus', 'map controls', 'zoom in and out'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Stacked buttons',
        value: '32 × 32px · border-radius: 8px · hairline between',
        plain: 'One white block holds both buttons, split by a thin line, the way most web maps draw them.',
      },
      {
        kind: 'appearance',
        term: 'Floating control',
        value: '0 1px 4px rgb(0 0 0 / 0.3)',
        plain: 'A small shadow lifts the controls off the map, so they never read as part of it.',
      },
      {
        kind: 'behavior',
        term: 'Pressed state',
        value: { light: 'background: #e9e9e9', dark: 'background: #3c3d41' },
        plain: "A button darkens while it's pressed; here minus takes the map back out.",
      },
    ],
  },
  {
    id: 'marker-clusters-map',
    name: 'Base map',
    htmlTag: '<canvas>',
    variant: 'Vector map · light style',
    summary:
      'The map under the markers: land, water, parks, roads and place names, in quiet colors so the markers stand out.',
    aliases: ['map', 'map tiles', 'background map', 'basemap', 'street map'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Road hierarchy',
        value: {
          light: 'expressway #fbd27b · arterial #fff 5px · street #fff 2.4px',
          dark: 'expressway #7a6339 · arterial #474c53 5px · street #34383e 2.4px',
        },
        plain:
          "The bigger the road, the wider it's drawn, each over a slightly darker casing, and the expressway is yellow: the city's layout reads at a glance.",
      },
      {
        kind: 'appearance',
        term: 'Muted palette',
        value: {
          light: 'land #f2efe9 · water #a6cff2 · park #cbe6bf',
          dark: 'land #212428 · water #1b2d43 · park #1f3628',
        },
        plain: 'Soft, low-contrast colors keep the map in the background; the only strong color is the markers.',
      },
      {
        kind: 'appearance',
        term: 'Label halo',
        value: '10px · 3px outline in the color underneath',
        plain: 'Each name has a thin outline in the color under it, so it stays readable over roads, parks and water.',
      },
      {
        kind: 'behavior',
        term: 'Vector zoom',
        value: 'scale 2× · roads and names keep their size',
        plain:
          'Zooming in scales the shapes, while roads stay about as wide and names stay the same size; the minor streets appear, as on a vector web map.',
      },
    ],
  },
];
