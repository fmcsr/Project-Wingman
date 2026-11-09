import { ButtonLink } from './ButtonLink';
import { SIGN_UP_HREF, SPONSOR_HREF } from './links';
import { SectionHeader } from './SectionHeader';
import styles from './Support.module.css';

const ACCOUNT = [
  'The full library of apps and sites',
  'Every element named and explained',
  'The brief builder for AI coding tools',
  'New examples as they ship',
];

const SPONSOR = [
  'Any amount, one-time or monthly',
  'Paid through GitHub Sponsors',
  'Goes into new examples and keeps Wingman free',
];

function Check() {
  return (
    <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Wingman is free with an account; people who find it useful can sponsor it on GitHub. */
export function Support() {
  return (
    <section id="support" className={styles.section} aria-labelledby="support-title">
      <div className="container">
        <SectionHeader
          id="support-title"
          index="[03]"
          label="Support"
          title="Free for everyone."
          muted="Kept alive by sponsors."
          description="Create a free account to open the library and the brief builder. If Wingman saves you time, sponsoring it on GitHub keeps new examples coming."
        />
        <div className={styles.cards}>
          <article className={styles.card}>
            <h3 className={styles.cardName}>Free account</h3>
            <p className={styles.headline}>
              <span className={styles.amount}>$0</span>
              <span className={styles.note}>always</span>
            </p>
            <p className={styles.description}>Everything Wingman does, for everyone with an account.</p>
            <ul className={styles.list} role="list">
              {ACCOUNT.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={SIGN_UP_HREF} variant="primary" block>
              Create a free account
            </ButtonLink>
          </article>

          <article className={`${styles.card} ${styles.sponsor}`}>
            <h3 className={styles.cardName}>
              <svg className={styles.heart} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20.4l-1.2-1.1C6.2 15.2 3.2 12.4 3.2 8.9a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9c0 3.5-3 6.3-7.6 10.4z" />
              </svg>
              Sponsor on GitHub
            </h3>
            <p className={styles.headline}>
              <span className={styles.amount}>Any amount</span>
            </p>
            <p className={styles.description}>For people who find Wingman useful and want more of it.</p>
            <ul className={styles.list} role="list">
              {SPONSOR.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={SPONSOR_HREF} block external>
              Sponsor on GitHub
              <svg className={styles.external} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </ButtonLink>
          </article>
        </div>
      </div>
    </section>
  );
}
