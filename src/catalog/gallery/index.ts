import type { UiElementSpec } from '../types';
import { dataGallery } from './data';
import { iosGallery } from './ios';
import { microGallery } from './micro';
import { productivityGallery } from './productivity';

/**
 * Elements in the landing page's gallery, one list for all fifteen tiles (each tile is its own example, and they
 * share it as the five examples share showcaseSpecs). Ids start with their tile's id, so they stay unique.
 */
export const gallerySpecs: UiElementSpec[] = [...iosGallery, ...productivityGallery, ...dataGallery, ...microGallery];
