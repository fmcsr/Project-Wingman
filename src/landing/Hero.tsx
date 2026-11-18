import { HorizonLines } from '../brand/HorizonLines';
import { ButtonLink } from './ButtonLink';
import { SIGN_UP_HREF } from './links';
import styles from './Hero.module.css';

/** Hero: bracketed label, one-line promise, two actions; in the background, rays converging on a single line. */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HorizonLines />
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>[ Project Wingman ]</p>
        <h1 id="hero-title" className={styles.title}>
          Every PM needs a wingman.
        </h1>
        <p className={styles.lead}>
          Learn the real names behind every interface, and brief your AI coding tools like a designer would.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="#examples" size="lg">
            See examples
          </ButtonLink>
          <ButtonLink href={SIGN_UP_HREF} variant="primary" size="lg">
            Get started free
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
