import { Examples } from './landing/Examples';
import { Features } from './landing/Features';
import { Hero } from './landing/Hero';
import { Pricing } from './landing/Pricing';
import { SiteFooter } from './landing/SiteFooter';
import { SiteHeader } from './landing/SiteHeader';

/** Açılış sayfası: kapak, örnekler, değer kartları ve planlar. Giriş sonrası alanlar sonraki aşamada. */
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
