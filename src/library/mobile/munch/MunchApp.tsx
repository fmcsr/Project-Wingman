import { StatusBar } from '../../../demos/StatusBar';
import styles from './MunchApp.module.css';
import dumplings from './photos/dumplings.webp';
import store from './photos/store.webp';

const CLOSE = 'M5.5 5.5l13 13M18.5 5.5l-13 13';
/* An open tray with an arrow leaving it upward */
const SHARE = 'M12 14.5V3.8M8.3 7.4L12 3.7l3.7 3.7M8.6 10.2H6.8a1.3 1.3 0 0 0-1.3 1.3v7.2A1.3 1.3 0 0 0 6.8 20h10.4a1.3 1.3 0 0 0 1.3-1.3v-7.2a1.3 1.3 0 0 0-1.3-1.3h-1.8';
const MINUS = 'M6 12h12';
const PLUS = 'M12 6v12M6 12h12';
const CHECK = 'M6.5 12.5l3.6 3.6 7.4-7.8';

type Choice = { name: string; price?: string; on?: boolean };

const SIZES: Choice[] = [
  { name: '6 pieces', on: true },
  { name: '12 pieces', price: '+$6.50' },
];

/* $13.50 for six, plus $1.00 of chili crisp: the $14.50 on the button. The last extra has scrolled under the footer */
const EXTRAS: Choice[] = [
  { name: 'Chili crisp', price: '+$1.00', on: true },
  { name: 'Pickled cucumbers', price: '+$1.50' },
  { name: 'Black vinegar dip', price: '+$0.75' },
];

function ChoiceText({ name, price }: Choice) {
  return (
    <span className={styles.optionText}>
      <span className={styles.optionName}>{name}</span>
      {price && <span className={styles.delta}>{price}</span>}
    </span>
  );
}

/**
 * Library example: one dish's options in a food delivery app, laid out like Uber Eats' item sheet. The sheet covers
 * nearly the whole store page, which shows dimmed above it. Not interactive; for inspection only.
 */
export function MunchApp() {
  return (
    <div className={styles.app}>
      <StatusBar className={styles.statusBar} />

      {/* The store page behind the sheet; its ::after draws the scrim */}
      <div className={styles.page} data-inspect="scrim">
        <img className={styles.storePhoto} src={store} alt="" draggable={false} />
      </div>

      <div className={styles.sheet} data-inspect="bottom-sheet">
        <div className={styles.content}>
          <div className={styles.photo} data-inspect="hero-image">
            <img className={styles.photoImage} src={dumplings} alt="" draggable={false} />
            <span className={`${styles.round} ${styles.close}`} data-inspect="close-button">
              <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
                <path d={CLOSE} />
              </svg>
            </span>
            <span className={`${styles.round} ${styles.share}`} data-inspect="share-button">
              <svg className={styles.icon} viewBox="0 0 24 24" width="17" height="17">
                <path d={SHARE} />
              </svg>
            </span>
          </div>

          {/* Name, then the base price with a tag, and the quantity across from them */}
          <div className={styles.item} data-inspect="item-header">
            <h3 className={styles.title}>Pork &amp; chive dumplings</h3>
            <div className={styles.priceRow}>
              <span className={styles.price}>$13.50</span>
              <span className={styles.tag} data-inspect="popular-badge">
                #1 most ordered
              </span>
              <span className={styles.stepper} data-inspect="quantity-stepper">
                <span className={styles.stepOff}>
                  <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14">
                    <path d={MINUS} />
                  </svg>
                </span>
                <span className={styles.count}>1</span>
                <span className={styles.step}>
                  <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14">
                    <path d={PLUS} />
                  </svg>
                </span>
              </span>
            </div>
          </div>

          <div className={styles.group} data-inspect="option-group">
            <div className={styles.groupHead}>
              <h4 className={styles.groupTitle}>Choose a size</h4>
              <p className={styles.rule}>
                <span className={styles.required} data-inspect="required-badge">
                  <svg className={styles.icon} viewBox="0 0 24 24" width="11" height="11">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M8 12.4l2.7 2.7 5.3-5.6" />
                  </svg>
                  Required
                </span>
                • Choose 1
              </p>
            </div>
            {SIZES.map((size) => (
              <div key={size.name} className={styles.option} data-inspect="radio-option">
                <ChoiceText {...size} />
                <span className={size.on ? styles.radioOn : styles.radio} />
              </div>
            ))}
          </div>

          <div className={styles.group} data-inspect="option-group">
            <div className={styles.groupHead}>
              <h4 className={styles.groupTitle}>Add extras</h4>
              <p className={styles.rule}>Optional • Choose up to 3</p>
            </div>
            {EXTRAS.map((extra) => (
              <div key={extra.name} className={styles.option} data-inspect="checkbox-option">
                <ChoiceText {...extra} />
                <span className={extra.on ? styles.checkboxOn : styles.checkbox}>
                  {extra.on && (
                    <svg className={styles.icon} viewBox="0 0 24 24" width="11" height="11">
                      <path d={CHECK} />
                    </svg>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.addButton} data-inspect="add-button">
            Add 1 to order • $14.50
          </span>
        </div>
      </div>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
