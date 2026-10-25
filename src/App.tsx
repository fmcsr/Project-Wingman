import { catalog } from './catalog';
import { NavbarDemo } from './demos/NavbarDemo';
import { Inspectable } from './inspector/Inspectable';
import { BrowserFrame } from './showcase/BrowserFrame';
import { InteractionGuide } from './showcase/InteractionGuide';
import { SamplePage } from './showcase/SamplePage';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <div className={styles.brand}>
            <svg className={styles.brandMark} viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path
                d="M8 10l3.5 12L16 13l4.5 9L24 10"
                fill="none"
                stroke="#fff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            PM Wingman
          </div>
          <span className={styles.badge}>Prototip · Aşama 1</span>
        </div>
      </header>

      <main className={`${styles.container} ${styles.main}`}>
        <section className={styles.intro} aria-labelledby="intro-title">
          <p className={styles.eyebrow}>UI Vitrini</p>
          <h1 id="intro-title" className={styles.title}>
            Gördüğün arayüzü doğru terimlerle anlat.
          </h1>
          <p className={styles.lead}>
            “Arkası bulanık üst menü” dediğin şeyin teknik adı ne? Örnek sayfadaki navbar'ın üzerine gel, dokun ya
            da klavyeyle odaklan; adını ve arkasındaki CSS kavramlarını sade dille gör.
          </p>
        </section>

        <InteractionGuide />

        <BrowserFrame url="acme.app" label="Örnek sayfa — kaydırılabilir önizleme">
          <SamplePage
            navbar={
              <Inspectable spec={catalog.navbar}>
                <NavbarDemo />
              </Inspectable>
            }
          />
        </BrowserFrame>

        <p className={styles.tip}>
          İpucu: Örnek sayfayı kaydır. İçerik navbar'ın altından geçerken bulanıklaşır; bu etkiyi{' '}
          <code>backdrop-filter</code> sağlar.
        </p>
      </main>
    </div>
  );
}
