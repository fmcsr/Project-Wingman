import { useDocumentTitle } from '../router';
import { Examples } from './Examples';
import { Features } from './Features';
import { Hero } from './Hero';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { Support } from './Support';

/** The landing page: hero, before/after examples, feature cards and how to support Wingman. */
export function LandingPage() {
  useDocumentTitle("Project Wingman · The PM's best friend for design");

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <Hero />
        <Examples />
        <Features />
        <Support />
      </main>
      <SiteFooter />
    </div>
  );
}
