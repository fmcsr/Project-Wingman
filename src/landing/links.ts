/** Section links shared by the header and the footer. */
export const SECTION_LINKS = [
  { href: '#examples', label: 'Examples' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
];

/** Section ids (used by the header to track which section is in view). */
export const SECTION_IDS = SECTION_LINKS.map((link) => link.href.slice(1));

/** App pages linked from the landing page (see App.tsx). */
export const SIGN_IN_HREF = '/sign-in';
export const SIGN_UP_HREF = '/sign-up';
export const WORKSPACE_HREF = '/app';
