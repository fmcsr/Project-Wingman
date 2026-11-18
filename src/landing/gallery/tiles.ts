import type { LibraryExample } from '../../library/types';
import { activityRings } from '../../library/elements/activity-rings';
import { bottomSheet } from '../../library/elements/bottom-sheet';
import { calendarHeatmap } from '../../library/elements/calendar-heatmap';
import { commandPalette } from '../../library/elements/command-palette';
import { dragAndDrop } from '../../library/elements/drag-and-drop';
import { dynamicIsland } from '../../library/elements/dynamic-island';
import { liveCursors } from '../../library/elements/live-cursors';
import { markerClusters } from '../../library/elements/marker-clusters';
import { mentionMenu } from '../../library/elements/mention-menu';
import { oneTimeCode } from '../../library/elements/one-time-code';
import { skeletonScreen } from '../../library/elements/skeleton-screen';
import { slideToConfirm } from '../../library/elements/slide-to-confirm';
import { swipeActions } from '../../library/elements/swipe-actions';
import { toastStack } from '../../library/elements/toast-stack';
import { wheelPicker } from '../../library/elements/wheel-picker';

/**
 * The fifteen library elements the landing page's gallery shows, in reading order. With their sizes the four-column
 * grid fills seven rows with no gaps, and the two-column grid fourteen, so a change in sizes or order needs a new look
 * at both.
 */
export const TILES: LibraryExample[] = [
  dynamicIsland,
  commandPalette,
  wheelPicker,
  activityRings,
  bottomSheet,
  calendarHeatmap,
  oneTimeCode,
  slideToConfirm,
  swipeActions,
  markerClusters,
  liveCursors,
  mentionMenu,
  toastStack,
  dragAndDrop,
  skeletonScreen,
];
