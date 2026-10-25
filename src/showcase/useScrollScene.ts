import { useCallback, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/** Pencere sabitlenince içerik kaymaya başlamadan önce ve sonunda serbest kalmadan önce kısa bir bekleme. */
const DWELL_RATIO = 0.12;
const DWELL_MAX = 120;
/** Pencere, sabitleneceği konuma bu mesafeden (ekran yüksekliğine oranla) itibaren büyüyerek oturur. */
const ENTER_RATIO = 0.6;
const ENTER_SCALE = 0.92;
/** Kaydırma çubuğunun, kaydırma durduktan sonra görünür kalma süresi. */
const THUMB_IDLE_MS = 900;
/** Klavyeyle seçilen öğe pencere kenarına yapışmasın. */
const REVEAL_MARGIN = 24;

type SceneRefs = {
  scene: RefObject<HTMLElement | null>;
  sticky: RefObject<HTMLElement | null>;
  frame: RefObject<HTMLElement | null>;
  viewport: RefObject<HTMLElement | null>;
  thumb: RefObject<HTMLElement | null>;
};

type Metrics = { overflow: number; dwell: number; stickyTop: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Apple'ın ürün sayfalarındaki gibi kaydırma: pencere ekrana sabitlenir, sayfa kaydırıldıkça içindeki site kayar.
 * Kullanıcı pencerenin içinde ayrıca kaydırmaz; sahne, içeriğin taşan kısmı kadar uzar ve sayfa kaydırması
 * bire bir içeriğe aktarılır. İçerik gerçekten kaydırıldığı için (overflow: hidden + scrollTop) sitedeki
 * yapışkan öğeler de çalışır. Klavyeyle seçilen öğeyi göstermek için sayfayı kaydıran bir `reveal` döndürür.
 */
export function useScrollScene({ scene, sticky, frame, viewport, thumb }: SceneRefs) {
  const metrics = useRef<Metrics>({ overflow: 0, dwell: 0, stickyTop: 0 });

  useEffect(() => {
    const sceneEl = scene.current;
    const stickyEl = sticky.current;
    const frameEl = frame.current;
    const viewportEl = viewport.current;
    const thumbEl = thumb.current;
    if (!sceneEl || !stickyEl || !frameEl || !viewportEl || !thumbEl) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let expected = 0;
    let lastTransform = '';
    let idleTimer = 0;

    const update = () => {
      const { overflow, dwell, stickyTop } = metrics.current;
      const scrolled = stickyTop - sceneEl.getBoundingClientRect().top;
      const progress = overflow > 0 ? clamp((scrolled - dwell) / overflow, 0, 1) : 0;
      const next = Math.round(progress * overflow);
      if (next !== expected) {
        expected = next;
        // Kaydırırken macOS'taki gibi ince bir kaydırma çubuğu belirir
        thumbEl.dataset.active = '';
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => delete thumbEl.dataset.active, THUMB_IDLE_MS);
      }
      // Odak gibi başka bir sebeple kayan içerik de sayfanın belirlediği konuma döner
      if (viewportEl.scrollTop !== expected) viewportEl.scrollTop = expected;
      thumbEl.style.setProperty('--progress', progress.toFixed(4));

      const enter = reducedMotion.matches ? 1 : clamp(1 + scrolled / (window.innerHeight * ENTER_RATIO), 0, 1);
      const eased = 1 - (1 - enter) ** 3;
      const transform = enter < 1 ? `scale(${(ENTER_SCALE + (1 - ENTER_SCALE) * eased).toFixed(4)})` : '';
      if (transform !== lastTransform) {
        lastTransform = transform;
        frameEl.style.transform = transform;
      }
    };

    const measure = () => {
      const overflow = Math.max(0, viewportEl.scrollHeight - viewportEl.clientHeight);
      // Az taşan içerikte (ör. panel) bekleme de kısa olur; pencere boşuna uzun süre sabit kalmasın
      const dwell = Math.round(Math.min(DWELL_MAX, window.innerHeight * DWELL_RATIO, overflow / 2));
      metrics.current = { overflow, dwell, stickyTop: parseFloat(getComputedStyle(stickyEl).top) || 0 };
      sceneEl.style.setProperty('--scene-extra', `${overflow + dwell * 2}px`);
      thumbEl.hidden = overflow === 0;
      thumbEl.style.setProperty('--ratio', (viewportEl.clientHeight / Math.max(viewportEl.scrollHeight, 1)).toFixed(4));
      update();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewportEl);
    if (viewportEl.firstElementChild) resizeObserver.observe(viewportEl.firstElementChild);
    // Yakalama aşamasında dinlenir: balon ve anahatlar konumlarını içerik kaydırıldıktan sonra hesaplasın
    window.addEventListener('scroll', update, { capture: true, passive: true });
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', update);
    return () => {
      window.clearTimeout(idleTimer);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', update);
    };
  }, [scene, sticky, frame, viewport, thumb]);

  return useCallback(
    (element: Element) => {
      const sceneEl = scene.current;
      const viewportEl = viewport.current;
      if (!sceneEl || !viewportEl) return;
      const { overflow, dwell, stickyTop } = metrics.current;
      const viewportRect = viewportEl.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      // Pencere yerine otururken ölçeklidir; ekran pikseli yerel piksele çevrilir
      const scale = viewportEl.offsetHeight > 0 ? viewportRect.height / viewportEl.offsetHeight : 1;
      const elementTop = (rect.top - viewportRect.top) / scale + viewportEl.scrollTop;
      const elementBottom = elementTop + rect.height / scale;
      let offset = viewportEl.scrollTop;
      if (elementTop < offset + REVEAL_MARGIN) offset = elementTop - REVEAL_MARGIN;
      else if (elementBottom > offset + viewportEl.clientHeight - REVEAL_MARGIN)
        offset = elementBottom - viewportEl.clientHeight + REVEAL_MARGIN;
      offset = clamp(offset, 0, overflow);

      const scrolled = stickyTop - sceneEl.getBoundingClientRect().top;
      const pinned = scrolled >= 0 && scrolled <= overflow + dwell * 2;
      if (pinned && Math.abs(offset - viewportEl.scrollTop) < 1) return;
      // İçeriğin bu konuma gelmesi için sayfanın kaydırılması gereken yer; html'deki scroll-behavior uygulanır
      window.scrollTo({ top: window.scrollY - scrolled + (overflow > 0 ? dwell + offset : 0) });
    },
    [scene, viewport],
  );
}
