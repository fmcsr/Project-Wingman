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
  inspiredBy: ['Streaks', 'Apple Health'],
  description: 'Classic iOS building blocks: a large title, a progress ring, list rows with switches and a tab bar.',
  Component: WaveApp,
  specs: pick(
    'status-bar',
    'large-title',
    'avatar',
    'progress-ring',
    'filter-chips',
    'list-row',
    'toggle-switch',
    'fab',
    'tab-bar',
    'home-indicator',
  ),
};

export const muse: LibraryExample = {
  id: 'muse',
  platform: 'mobile',
  name: 'Muse',
  kind: 'AI assistant',
  category: 'AI',
  inspiredBy: ['ChatGPT', 'Claude', 'Gemini'],
  description: 'The Liquid Glass style: a floating glass navbar and dropdown, chat bubbles and a voice button.',
  Component: MuseApp,
  specs: pick(
    'status-bar',
    'liquid-glass-navbar',
    'menu-button',
    'dropdown-menu',
    'icon-button',
    'chat-bubble',
    'typing-indicator',
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
  inspiredBy: ['Nike', 'Zalando'],
  description: 'A product page with the elements PMs look up most: badges, swatches, size chips, a stepper and a toast.',
  Component: StrideApp,
  specs: pick(
    'status-bar',
    'image-carousel',
    'pagination-dots',
    'icon-button',
    'favorite-button',
    'badge-count',
    'discount-badge',
    'price-tag',
    'rating-stars',
    'color-swatches',
    'size-chips',
    'quantity-stepper',
    'sticky-cta',
    'toast',
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
  inspiredBy: ['Stripe Dashboard', 'Mixpanel'],
  description: 'A dashboard: sidebar navigation, stat cards with trend badges, an area chart and a data table.',
  url: 'app.orbit.io',
  Component: OrbitDashboard,
  specs: pick(
    'sidebar',
    'nav-link',
    'search-field',
    'avatar',
    'segmented-control',
    'stat-card',
    'delta-badge',
    'area-chart',
    'data-table',
    'status-pill',
  ),
};
