import type { ReactNode } from 'react';
import styles from './SamplePage.module.css';

const LOGOS = ['Nova', 'Pulse', 'Orbit', 'Kite', 'Lumen'];

const FEATURES = [
  { title: 'Yol haritası', text: 'Çeyreklik planını sürükleyip bırakarak düzenle.', thumb: styles.thumbIndigo },
  { title: 'Geri bildirim', text: 'Kullanıcı isteklerini tek bir panoda topla.', thumb: styles.thumbPink },
  { title: 'Analitik', text: 'Hangi özelliğin işe yaradığını anında gör.', thumb: styles.thumbTeal },
];

type SamplePageProps = {
  /** Sayfanın üstüne yapışan navbar alanı. */
  navbar: ReactNode;
};

/**
 * Navbar'ın altından kayan örnek içerik. Renkli ve keskin kenarlı öğeler,
 * backdrop-filter bulanıklığının gözle görülmesi için seçildi.
 * İçerik dekoratif olduğu için ekran okuyuculardan ve sekme sırasından çıkarıldı.
 */
export function SamplePage({ navbar }: SamplePageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.navSlot}>{navbar}</div>

      <div aria-hidden="true" inert>
        <section className={styles.hero}>
          <span className={`${styles.shape} ${styles.shapeA}`} />
          <span className={`${styles.shape} ${styles.shapeB}`} />
          <span className={`${styles.shape} ${styles.shapeC}`} />
          <div className={styles.heroInner}>
            <p className={styles.badge}>Yeni · Yol haritası 2.0</p>
            <h2 className={styles.heroTitle}>Fikirden ürüne, tek bir yerden</h2>
            <p className={styles.heroText}>
              Planla, önceliklendir ve ekibinle aynı sayfada kal. Acme, ürün ekiplerinin ortak çalışma alanı.
            </p>
            <div className={styles.heroActions}>
              <span className={styles.primary}>Hemen başla</span>
              <span className={styles.secondary}>Demoyu izle</span>
            </div>
          </div>
        </section>

        <section className={styles.logos}>
          <p className={styles.logosLabel}>1.200’den fazla ürün ekibi Acme kullanıyor</p>
          <div className={styles.logoRow}>
            {LOGOS.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </section>

        <section className={styles.features}>
          {FEATURES.map((feature) => (
            <article key={feature.title} className={styles.card}>
              <div className={`${styles.thumb} ${feature.thumb}`}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardText}>{feature.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.banner}>
          <div>
            <p className={styles.bannerTitle}>Ekibini bugün davet et</p>
            <p className={styles.bannerText}>14 gün ücretsiz, kredi kartı gerekmez.</p>
          </div>
          <span className={styles.bannerCta}>Ücretsiz dene</span>
        </section>

        <footer className={styles.footer}>
          <span>© 2026 Acme</span>
          <span>Gizlilik · Koşullar</span>
        </footer>
      </div>
    </div>
  );
}
