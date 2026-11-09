import { showcaseSpecs } from '../catalog';
import type { UiElementSpec } from '../catalog';
import { AcmeSite } from '../demos/AcmeSite';
import { MuseApp } from '../demos/MuseApp';
import { OrbitDashboard } from '../demos/OrbitDashboard';
import { StrideApp } from '../demos/StrideApp';
import { WaveApp } from '../demos/WaveApp';
import type { LibraryExample } from './types';

/** The original examples share one catalog; each gets exactly the elements it shows, in the order they appear. */
function pick(...ids: string[]): UiElementSpec[] {
  return ids.map((id) => {
    const spec = showcaseSpecs.find((candidate) => candidate.id === id);
    if (!spec) throw new Error(`[library] no description for "${id}"`);
    return spec;
  });
}

/** The five examples on the landing page, also part of the library. */
export const wave: LibraryExample = {
  id: 'wave',
  platform: 'mobile',
  name: 'Wave',
  kind: 'Habit tracker',
  category: 'Health',
  inspiredBy: ['Streaks', 'Gentler Streak', 'Apple Fitness'],
  description:
    "A habit tracker's Today screen: a Day/Week segmented control, a summary card with a segmented progress ring, streak counts, habit rows with week dots and round check buttons, and a floating glass tab bar beside an add button.",
  Component: WaveApp,
  specs: pick(
    'status-bar',
    'large-title',
    'avatar',
    'day-week-switcher',
    'today-summary',
    'progress-ring',
    'streak-count',
    'list-section-header',
    'list-row',
    'habit-icon',
    'streak-dots',
    'habit-check',
    'tab-bar',
    'fab',
    'home-indicator',
  ),
};

export const muse: LibraryExample = {
  id: 'muse',
  platform: 'mobile',
  name: 'Muse',
  kind: 'AI assistant',
  category: 'AI',
  inspiredBy: ['ChatGPT', 'Claude', 'Perplexity'],
  description:
    'An AI chat mid-conversation: Liquid Glass buttons and a model menu up top, a sent bubble, then a formatted answer with a reasoning line, a citation, a table and a checklist, message actions, follow-up chips and a composer with a voice button.',
  Component: MuseApp,
  specs: pick(
    'status-bar',
    'liquid-glass-navbar',
    'icon-button',
    'menu-button',
    'dropdown-menu',
    'chat-bubble',
    'reasoning-disclosure',
    'formatted-answer',
    'citation-chip',
    'answer-table',
    'checklist',
    'message-actions',
    'suggestion-chips',
    'composer',
    'voice-button',
    'home-indicator',
  ),
};

export const stride: LibraryExample = {
  id: 'stride',
  platform: 'mobile',
  name: 'Stride',
  kind: 'Shopping',
  category: 'Commerce',
  inspiredBy: ['Nike'],
  description:
    'A sneaker product page: a navigation bar, a full-width photo on a gray backdrop with a badge and page dots, a sale price, photo color swatches, a size grid with sold-out sizes, and stacked Add to Bag and Favorite pill buttons.',
  Component: StrideApp,
  specs: pick(
    'status-bar',
    'navigation-bar',
    'back-button',
    'share-button',
    'search-button',
    'image-carousel',
    'image-badge',
    'pagination-dots',
    'product-title',
    'price-tag',
    'color-swatches',
    'size-chips',
    'size-guide',
    'add-to-bag',
    'favorite-button',
    'home-indicator',
  ),
};

export const acme: LibraryExample = {
  id: 'acme',
  platform: 'web',
  name: 'Acme',
  kind: 'Marketing site',
  category: 'Marketing',
  inspiredBy: ['Linear', 'Vercel', 'Notion'],
  description:
    'A SaaS landing page: a frosted sticky navbar, a hero with a product screenshot, a logo cloud, feature cards and a CTA banner.',
  url: 'acme.app',
  Component: AcmeSite,
  specs: pick(
    'navbar',
    'logo',
    'nav-link',
    'button-cta',
    'hamburger-menu',
    'badge',
    'hero-heading',
    'button-primary',
    'button-secondary',
    'product-shot',
    'logo-cloud',
    'feature-card',
    'cta-banner',
  ),
};

export const orbit: LibraryExample = {
  id: 'orbit',
  platform: 'web',
  name: 'Orbit',
  kind: 'Analytics dashboard',
  category: 'Analytics',
  inspiredBy: ['Stripe Dashboard', 'Vercel Analytics', 'Linear'],
  description:
    'A revenue dashboard mid-launch: a workspace switcher, a date range with a compare switch, KPI cards with sparklines, an annotated chart with a hover tooltip, bar-list breakdowns and a payments table.',
  url: 'app.orbit.io',
  Component: OrbitDashboard,
  specs: pick(
    'sidebar',
    'workspace-switcher',
    'nav-link',
    'search-field',
    'avatar',
    'date-range-picker',
    'compare-toggle',
    'segmented-control',
    'stat-card',
    'delta-badge',
    'sparkline',
    'area-chart',
    'chart-annotation',
    'chart-tooltip',
    'bar-list',
    'data-table',
    'status-pill',
  ),
};
