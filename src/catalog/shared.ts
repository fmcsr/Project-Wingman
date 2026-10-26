import type { UiElementSpec } from './types';

/* Elements every mobile example shares: the phone's own status bar and home indicator. */

export const statusBar: UiElementSpec = {
  id: 'status-bar',
  name: 'Status bar',
  variant: 'iOS',
  summary:
    'The thin strip at the very top with the time, signal, and battery. It belongs to the phone, not the app.',
  aliases: ['top bar', 'the clock and battery'],
  concepts: [
    {
      kind: 'behavior',
      term: 'Safe area',
      value: 'env(safe-area-inset-top)',
      plain: "The space reserved for the status bar and camera cutout, so the app's content isn't hidden under them.",
    },
  ],
};

export const homeIndicator: UiElementSpec = {
  id: 'home-indicator',
  name: 'Home indicator',
  variant: 'iOS',
  summary: 'The thin bar at the bottom of the screen. Swipe up on it to go home or switch apps.',
  aliases: ['home bar', 'the line at the bottom'],
  concepts: [
    {
      kind: 'behavior',
      term: 'System gesture',
      value: 'swipe up',
      plain: "A gesture owned by the phone itself — apps shouldn't put their own controls right on top of it.",
    },
  ],
};
