import { Examples } from './landing/Examples';
import { Features } from './landing/Features';
import { Hero } from './landing/Hero';
import { Pricing } from './landing/Pricing';
import { SiteFooter } from './landing/SiteFooter';
import { SiteHeader } from './landing/SiteHeader';

/** Landing page: hero, examples, feature cards and plans. Signed-in areas come in a later phase. */
export function App() {
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
