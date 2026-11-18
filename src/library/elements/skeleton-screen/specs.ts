import type { UiElementSpec } from '../../../catalog';

/**
 * Parts of the Skeleton screen element, in the order they appear. `value` fields are the actual values from
 * SkeletonScreen.
 */
export const skeletonScreenSpecs: UiElementSpec[] = [
  {
    id: 'skeleton-screen',
    name: 'Skeleton screen',
    htmlTag: '<ul aria-busy="true">',
    variant: 'Activity feed · loads row by row',
    summary:
      'Gray shapes in the layout of the content on its way, shown instead of a spinner. You see what’s coming and where, and nothing jumps when it arrives.',
    aliases: [
      'skeleton loader',
      'loading placeholder',
      'ghost content',
      'content placeholder',
      'the gray boxes while it loads',
    ],
    concepts: [
      {
        kind: 'appearance',
        term: 'Placeholder fill',
        value: { light: 'background: #ececee', dark: 'background: #1f1f22' },
        plain:
          'One flat gray for every shape, a step off the page, so it reads as “not here yet” rather than as content.',
      },
      {
        kind: 'behavior',
        term: 'Shimmer',
        value: 'linear-gradient band · 1.5s linear infinite',
        plain:
          'A soft band of light sweeps left to right over all the shapes at once, the sign that something is still loading.',
      },
      {
        kind: 'behavior',
        term: 'Progressive loading',
        value: 'rows 550–700ms apart',
        plain: 'Rows don’t wait for each other: each swaps in as soon as its data is there, top to bottom.',
      },
      {
        kind: 'behavior',
        term: 'aria-busy',
        value: 'aria-busy="true"',
        plain: 'Tells screen readers the list is still loading, so they don’t read out empty shapes.',
      },
    ],
  },
  {
    id: 'skeleton-screen-avatar',
    name: 'Avatar placeholder',
    htmlTag: '<span>',
    variant: 'Circle · 36px',
    summary: 'A gray circle exactly where the profile picture will be.',
    aliases: ['circle placeholder', 'avatar skeleton', 'gray circle'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Same size as the photo',
        value: '36 × 36px · border-radius: 50%',
        plain: 'It matches the avatar to the pixel, so the photo drops into its place without moving anything.',
      },
      {
        kind: 'appearance',
        term: 'Shape hints',
        plain:
          'A circle for a person, a rounded square for a picture, bars for text: you can tell what’s coming before it’s there.',
      },
    ],
  },
  {
    id: 'skeleton-screen-line',
    name: 'Text placeholder',
    htmlTag: '<span>',
    variant: 'Bar · 9px',
    summary: 'A rounded bar standing in for a line of text: a short one for the name, a longer one for what they did.',
    aliases: ['text skeleton', 'gray line', 'placeholder line', 'loading bar'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Bar',
        value: 'height: 9px · fully rounded',
        plain:
          'Thinner than the text it replaces and centered on the same 18px line, so the text lands right where the bar was.',
      },
      {
        kind: 'appearance',
        term: 'Varied widths',
        value: '84–124px',
        plain:
          'Every bar has its own length, about that of the text it stands for, so the list doesn’t look like a barcode and the text lands where its bar was.',
      },
    ],
  },
  {
    id: 'skeleton-screen-image',
    name: 'Image placeholder',
    htmlTag: '<span>',
    variant: 'Rounded square · 40px',
    summary: 'A gray rounded square where the photo goes.',
    aliases: ['image skeleton', 'thumbnail placeholder', 'gray box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Same frame as the image',
        value: '40 × 40px · border-radius: 6px',
        plain: 'Sized and rounded like the thumbnail, so the picture fills it exactly.',
      },
      {
        kind: 'appearance',
        term: 'clip-path',
        value: 'inset(0 round 6px)',
        plain:
          'Each shape is cut out of one band of light that spans the whole list, so the shimmer passes over every shape at the same moment.',
      },
    ],
  },
  {
    id: 'skeleton-screen-item',
    name: 'Loaded row',
    htmlTag: '<li>',
    variant: 'Avatar · name · photo',
    summary:
      'A row whose content has arrived. It took over from its placeholder in the same spot, and nothing around it moved.',
    aliases: ['list item', 'loaded content', 'activity row', 'the real row'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Crossfade',
        value: 'opacity · 300ms',
        plain:
          'The placeholder fades out while the content fades in, in the same place, so the swap feels smooth instead of a pop.',
      },
      {
        kind: 'behavior',
        term: 'No layout shift',
        value: 'same cell, same sizes',
        plain: 'Placeholder and content share one spot at the same sizes, so nothing below jumps when a row loads.',
      },
    ],
  },
];
