import { ButtonLink } from './ButtonLink';
import { SIGN_IN_HREF } from './links';
import { SectionHeader } from './SectionHeader';
import styles from './Pricing.module.css';

/** Prices and contents are placeholders; they will be finalized in the payments phase. */
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    description: 'Get a feel for the vocabulary.',
    features: ['3 sample projects', 'Hover explanations for 30 elements', 'Core glossary'],
    cta: 'Start free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    cadence: 'per month',
    description: 'For PMs who brief designers and AI tools every day.',
    features: [
      'Every project and 300+ elements',
      'Full glossary with live examples',
      'Prompt builder (coming soon)',
      'Copy-ready briefs for AI coding tools',
    ],
    cta: 'Get Pro',
    featured: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '$29',
    cadence: 'per seat / month',
    description: 'One shared vocabulary for the whole product team.',
    features: ['Everything in Pro', 'Shared prompt library', 'Team glossary and conventions', 'Priority support'],
    cta: 'Contact sales',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className={styles.section} aria-labelledby="pricing-title">
      <div className="container">
        <SectionHeader
          id="pricing-title"
          index="[03]"
          label="Pricing"
          title="Start free."
          muted="Upgrade when you're ready."
          description="Early-access pricing. Cancel anytime."
        />
        <ul className={styles.plans} role="list">
          {PLANS.map((plan) => (
            <li key={plan.id} className={plan.featured ? `${styles.plan} ${styles.featured}` : styles.plan}>
              <div className={styles.planTop}>
                <h3 className={styles.planName}>{plan.name}</h3>
                {plan.featured && <span className={styles.badge}>Most popular</span>}
              </div>
              <p className={styles.price}>
                <span className={styles.amount}>{plan.price}</span>
                <span className={styles.cadence}>{plan.cadence}</span>
              </p>
              <p className={styles.description}>{plan.description}</p>
              <ul className={styles.features} role="list">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink href={SIGN_IN_HREF} variant={plan.featured ? 'primary' : 'secondary'} block>
                {plan.cta}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
