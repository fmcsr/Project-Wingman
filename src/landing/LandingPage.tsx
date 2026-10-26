import { useDocumentTitle } from '../router';
import { Examples } from './Examples';
import { Features } from './Features';
import { Hero } from './Hero';
import { Pricing } from './Pricing';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

/** The landing page: hero, examples, feature cards and pricing plans. */
export function LandingPage() {
  useDocumentTitle("Project Wingman · The PM's best friend for design");

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <Hero />
        <Examples />
        <Features />
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  );
}
