import type { ComponentType } from 'react';
import { ActivityRings } from './ActivityRings';
import { BottomSheet } from './BottomSheet';
import { CalendarHeatmap } from './CalendarHeatmap';
import { CommandPalette } from './CommandPalette';
import { DragAndDrop } from './DragAndDrop';
import { DynamicIsland } from './DynamicIsland';
import { LiveCursors } from './LiveCursors';
import { MarkerClusters } from './MarkerClusters';
import { MentionMenu } from './MentionMenu';
import { OneTimeCode } from './OneTimeCode';
import { SkeletonScreen } from './SkeletonScreen';
import { SlideToConfirm } from './SlideToConfirm';
import { SwipeActions } from './SwipeActions';
import { ToastStack } from './ToastStack';
import { WheelPicker } from './WheelPicker';

/** How much of the grid a tile takes: one cell, two side by side, two stacked or a 2 × 2 block. */
export type TileSize = 'small' | 'wide' | 'tall' | 'big';

export type GalleryTile = {
  /** Also the id of the tile's main element (its `data-inspect`); its parts' ids start with it. */
  id: string;
  /** The element's name: the tile's caption, and its label for screen readers. */
  name: string;
  size: TileSize;
  /** The live element; its descriptions are in src/catalog/gallery/. */
  Component: ComponentType;
};

/**
 * The gallery's tiles in reading order. With these sizes the four-column grid fills seven rows with no gaps, and the
 * two-column grid fourteen (Gallery.module.css), so a change in sizes or order needs a new look at both.
 */
export const TILES: GalleryTile[] = [
  { id: 'dynamic-island', name: 'Dynamic Island', size: 'wide', Component: DynamicIsland },
  { id: 'command-palette', name: 'Command palette', size: 'big', Component: CommandPalette },
  { id: 'wheel-picker', name: 'Wheel picker', size: 'small', Component: WheelPicker },
  { id: 'activity-rings', name: 'Activity rings', size: 'small', Component: ActivityRings },
  { id: 'bottom-sheet', name: 'Bottom sheet', size: 'tall', Component: BottomSheet },
  { id: 'calendar-heatmap', name: 'Calendar heatmap', size: 'wide', Component: CalendarHeatmap },
  { id: 'one-time-code', name: 'One-time code field', size: 'small', Component: OneTimeCode },
  { id: 'slide-to-confirm', name: 'Slide to confirm', size: 'small', Component: SlideToConfirm },
  { id: 'swipe-actions', name: 'Swipe actions', size: 'wide', Component: SwipeActions },
  { id: 'marker-clusters', name: 'Marker clusters', size: 'big', Component: MarkerClusters },
  { id: 'live-cursors', name: 'Live cursors', size: 'wide', Component: LiveCursors },
  { id: 'mention-menu', name: 'Mention menu', size: 'small', Component: MentionMenu },
  { id: 'toast-stack', name: 'Toast stack', size: 'tall', Component: ToastStack },
  { id: 'drag-and-drop', name: 'Drag and drop', size: 'wide', Component: DragAndDrop },
  { id: 'skeleton-screen', name: 'Skeleton screen', size: 'small', Component: SkeletonScreen },
];
