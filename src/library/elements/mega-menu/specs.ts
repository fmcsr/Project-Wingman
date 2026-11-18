import type { UiElementSpec } from '../../../catalog';

/** Parts of the Mega menu element, in the order they appear. `value` fields are the actual values from MegaMenu. */
export const megaMenuSpecs: UiElementSpec[] = [
  {
    id: 'mega-menu-trigger',
    name: 'Menu trigger',
    htmlTag: '<button aria-expanded="true">',
    variant: 'Products · open on hover',
    summary:
      'A link in the site’s header that opens a menu instead of a page. Pointing at it is enough; the chevron next to it says there’s more underneath.',
    aliases: ['nav link', 'top menu item', 'dropdown button', 'the word in the header'],
    concepts: [
      {
        kind: 'behavior',
        term: 'Open on hover',
        value: 'hover opens · click works too',
        plain:
          'The menu opens as soon as the pointer rests on the word, so people can skim the site’s sections without clicking. A click or a tap opens it as well.',
      },
      {
        kind: 'appearance',
        term: 'Chevron',
        value: '12px · rotate(180deg) when open',
        plain: 'The little arrow after the word hints that it opens something, and turns over while the menu is open.',
      },
      {
        kind: 'appearance',
        term: 'Active pill',
        value: { light: 'background: #eef1f5 · border-radius: 999px', dark: 'background: #1c2330 · border-radius: 999px' },
        plain: 'A soft rounded fill behind the open trigger shows which word the panel belongs to.',
      },
      {
        kind: 'behavior',
        term: 'aria-expanded',
        value: 'true while open',
        plain: 'Tells screen readers the menu is open; it flips back to false when the panel closes.',
      },
    ],
  },
  {
    id: 'mega-menu',
    name: 'Mega menu',
    htmlTag: '<div>',
    variant: 'Morphing dropdown · Products',
    summary:
      'A big dropdown panel that lays out a whole section of a site at once: groups of links with icons and short descriptions, a featured card and a row of links along the bottom.',
    aliases: ['dropdown menu', 'flyout menu', 'nav dropdown', 'mega dropdown', 'the big menu under the header'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Floating panel',
        value: 'border-radius: 12px · box-shadow: 0 50px 100px -20px',
        plain:
          'A white card that floats over the page with a long, soft shadow, so it reads as a layer on top rather than part of the page.',
      },
      {
        kind: 'appearance',
        term: 'Page curtain',
        value: {
          light: 'backdrop-filter: blur(3px) · rgb(255 255 255 / 0.6)',
          dark: 'backdrop-filter: blur(3px) · rgb(11 15 23 / 0.6)',
        },
        plain:
          'While a menu is open, the page under the header goes soft behind a light veil, so the eye stays on the panel.',
      },
      {
        kind: 'behavior',
        term: 'Morphing transition',
        value: 'width, height and position · 260ms',
        plain:
          'Moving from Products to Solutions doesn’t close one menu and open another: the same panel resizes and slides to fit the new content while the old content slides out and the new one in.',
      },
      {
        kind: 'behavior',
        term: 'Open and close',
        value: 'rotateX(-14deg) → 0 + fade · 250ms in, 180ms out',
        plain:
          'It swings down a little from its top edge as it fades in. It stays open while the pointer travels into the panel, and closes, a bit faster, once the pointer has left both.',
      },
    ],
  },
  {
    id: 'mega-menu-group',
    name: 'Link group',
    htmlTag: '<ul>',
    variant: 'Column with a heading · Payments, Revenue',
    summary:
      'A column of related links under a small heading. Grouping is what lets a mega menu hold a dozen links and still be read at a glance.',
    aliases: ['column', 'menu section', 'category', 'link list'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Column grid',
        value: 'grid-template-columns: 1fr 1fr 148px · gap: 20px',
        plain: 'Two equal columns of links with the featured card beside them, laid out on a grid so everything lines up.',
      },
      {
        kind: 'appearance',
        term: 'Eyebrow heading',
        value: '11px · 600 · uppercase · letter-spacing: 0.07em',
        plain: 'A tiny, spaced-out, gray heading that names the group without competing with the links under it.',
      },
    ],
  },
  {
    id: 'mega-menu-item',
    name: 'Menu item',
    htmlTag: '<a>',
    variant: 'Icon · title · one-line description',
    summary:
      'One link in the panel: an icon, the product’s name and a one-line description, so people know what they’ll find before they click.',
    aliases: ['menu link', 'nav item', 'product link', 'the line under the name'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Icon tile',
        value: { light: '30px · border-radius: 8px · #fdeee7', dark: '30px · border-radius: 8px · #33201a' },
        plain: 'A small rounded square tinted with the brand color holds each product’s icon, so the eye can scan the column.',
      },
      {
        kind: 'appearance',
        term: 'Title and description',
        value: '13.5px · 600 over 12.5px muted',
        plain: 'The name in bold and a short gray line under it that says what it does: “Hosted payment page”.',
      },
      {
        kind: 'appearance',
        term: 'Hit area',
        value: 'padding: 6px 8px · margin: 0 -8px',
        plain:
          'The whole row is the link, a little bigger than its text; the negative margin keeps the text lined up with the heading.',
      },
    ],
  },
  {
    id: 'mega-menu-featured',
    name: 'Featured card',
    htmlTag: '<a>',
    variant: 'New product promo · Instant payouts',
    summary:
      'A card at the side of the panel that promotes one thing: a new product, an event or a customer story. It changes more often than the links do.',
    aliases: ['promo card', 'highlight', 'spotlight', 'what’s new box'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Promo slot',
        value: '148px wide · border-radius: 10px',
        plain:
          'A narrow card set apart with a gray fill and a little picture of the product, so it doesn’t read as one more link.',
      },
      {
        kind: 'appearance',
        term: 'Label and call to action',
        value: '“New” · “Learn more →”',
        plain: 'A small colored label says why it’s there; the arrow link says what clicking does.',
      },
      {
        kind: 'behavior',
        term: 'Moves under on small screens',
        value: 'below 520px wide',
        plain: 'Where there’s no room beside the columns it becomes a wide strip under them, and on phones it’s left out.',
      },
    ],
  },
  {
    id: 'mega-menu-arrow',
    name: 'Arrow',
    htmlTag: '<span aria-hidden="true">',
    variant: 'Glides between triggers',
    summary:
      'The small point on the panel’s top edge that aims at the open trigger, tying the panel to the word that opened it.',
    aliases: ['caret', 'pointer', 'notch', 'nub', 'tooltip arrow'],
    concepts: [
      {
        kind: 'appearance',
        term: 'Rotated square',
        value: '12px · rotate(45deg)',
        plain:
          'A square turned on its corner, half tucked under the panel, so only a triangle shows. It shares the panel’s color and edge, so the two read as one shape.',
      },
      {
        kind: 'behavior',
        term: 'Glides with the panel',
        value: 'translate · 260ms',
        plain: 'When another trigger opens, the arrow slides across to it at the same pace as the panel’s morph.',
      },
    ],
  },
];
