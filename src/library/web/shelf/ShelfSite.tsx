import styles from './ShelfSite.module.css';
import auraMaxPhoto from './photos/aura-max.webp';
import formPhoto from './photos/form.webp';
import haldenPhoto from './photos/halden-aero.webp';
import kestrelPhoto from './photos/kestrel-k50.webp';
import lumenPhoto from './photos/lumen-air.webp';
import marlowPhoto from './photos/marlow.webp';
import sonaraPhoto from './photos/sonara-q45.webp';
import voltaPhoto from './photos/volta-bass.webp';

/** Line icons on a 24px grid; stroke color and width come from the stylesheet. */
const ICONS = {
  menu: 'M4 6.5h16M4 12h16M4 17.5h16',
  pin: 'M12 20.75s-6.25-5.4-6.25-10.6a6.25 6.25 0 0 1 12.5 0c0 5.2-6.25 10.6-6.25 10.6zM12 12.1a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2z',
  search: 'M10.75 17.25a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5l4.25 4.25',
  globe:
    'M12 20.75a8.75 8.75 0 1 0 0-17.5 8.75 8.75 0 0 0 0 17.5zM3.75 9.25h16.5M3.75 14.75h16.5M12 3.25c-2.25 2.4-3.4 5.3-3.4 8.75s1.15 6.35 3.4 8.75M12 3.25c2.25 2.4 3.4 5.3 3.4 8.75s-1.15 6.35-3.4 8.75',
  cart: 'M2.75 4.25h2.4l2.15 10.4a1.5 1.5 0 0 0 1.47 1.2h8.36a1.5 1.5 0 0 0 1.46-1.14L20.25 8H5.9M9.25 20.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM17 20.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z',
  person: 'M12 11.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5zM4.75 20.25a7.25 7.25 0 0 1 14.5 0',
  chevronDown: 'M7 10l5 5 5-5',
  chevronLeft: 'M14.5 6l-6 6 6 6',
  chevronRight: 'M9.5 6l6 6-6 6',
  check: 'M5.5 12.5l4.25 4.25 8.75-9',
  info: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 11v5M12 7.75h.01',
  /** Two sliders: the filters button on small screens */
  sliders: 'M4 7.5h9M17 7.5h3M4 16.5h3M11 16.5h9M15 5.25v4.5M9 14.25v4.5',
  /** A four-pointed sparkle: the shopping assistant */
  sparkle: 'M12 3.5c.5 4.4 2.6 6.9 7 7.5-4.4.6-6.5 3.1-7 7.5-.5-4.4-2.6-6.9-7-7.5 4.4-.6 6.5-3.1 7-7.5z',
};

const STAR = 'M12 2.75l2.78 5.86 6.42.8-4.72 4.45 1.2 6.38L12 17.12l-5.68 3.12 1.2-6.38L2.8 9.41l6.42-.8z';

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** The small filled triangle that marks a menu in the header ("All ▾", "Account & Lists ▾"). */
function Caret() {
  return (
    <svg className={styles.caret} viewBox="0 0 10 6" aria-hidden="true">
      <path d="M0.5 0.5h9L5 5.5z" />
    </svg>
  );
}

/** Shelf's mark: two parcels on a shelf, in mint. The wordmark beside it is set in white. */
function ShelfLogo() {
  return (
    <span className={styles.logo} role="img" aria-label="Shelf">
      <svg className={styles.logoMark} viewBox="0 0 28 24" aria-hidden="true">
        <rect className={styles.logoBox} x="3.5" y="5" width="9" height="11" rx="1.75" />
        <rect className={styles.logoBoxBack} x="14.5" y="8.5" width="10" height="7.5" rx="1.75" />
        <path className={styles.logoShelf} d="M2 20.25h24" />
      </svg>
      <span className={styles.wordmark}>shelf</span>
    </span>
  );
}

function StarRow({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 24" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => (
        <path key={index} d={STAR} transform={`translate(${index * 24} 0)`} />
      ))}
    </svg>
  );
}

/** Five outlined stars with a filled copy on top, cut to the rating: 4.6 of 5 fills 92% of the row. */
function Stars({ rating, large }: { rating: number; large?: boolean }) {
  return (
    <span className={large ? `${styles.stars} ${styles.starsLarge}` : styles.stars}>
      <StarRow className={styles.starsOutline} />
      <span className={styles.starsFill} style={{ width: `${rating * 20}%` }}>
        <StarRow className={styles.starsSolid} />
      </span>
    </span>
  );
}

/** A square checkbox; the checked one is filled in Shelf's plum with a white tick. */
function Checkbox({ checked }: { checked?: boolean }) {
  return (
    <span className={styles.checkbox} role="checkbox" aria-checked={checked ?? false}>
      {checked && <Icon d={ICONS.check} />}
    </span>
  );
}

/** The price as the store sets it: a raised dollar sign and cents around the whole dollars. */
function Price({ amount }: { amount: string }) {
  const [dollars, cents] = amount.split('.');
  return (
    <span className={styles.price} aria-label={`$${amount}`}>
      <span className={styles.priceSmall}>$</span>
      <span className={styles.priceWhole}>{dollars}</span>
      <span className={styles.priceSmall}>{cents}</span>
    </span>
  );
}

/** Shelf Plus, the membership with free fast delivery: a mint tick and the word "plus". */
function PlusBadge() {
  return (
    <span className={styles.plus} role="img" aria-label="Shelf Plus">
      <Icon d={ICONS.check} className={styles.plusTick} />
      plus
    </span>
  );
}

type Product = {
  title: string;
  photo: string;
  alt: string;
  rating: number;
  reviews: string;
  bought?: string;
  price: string;
  /** The list price, struck through next to a lower price */
  list?: string;
  /** A limited-time deal shows a red badge above the price */
  deal?: boolean;
  badge?: 'best-seller' | 'pick';
  sponsored?: boolean;
  plus?: boolean;
  delivery: string;
  /** The delivery date, set in bold inside the delivery line */
  date: string;
  /** Text after the date, e.g. a minimum order */
  condition?: string;
  fastest?: string;
  colors?: string;
};

/** Results for "headphones" with two filters on, Free Shipping by Shelf and 4 stars & up: all ship free, all rate 4+. */
const PRODUCTS: Product[] = [
  {
    title: 'Fjell Form 2 Wireless Over-Ear Headphones with Adaptive Noise Cancelling, Wool-Blend Headband, 32-Hour Battery, Sand',
    photo: formPhoto,
    alt: 'Sand-colored wireless headphones with a gray fabric headband',
    rating: 4.4,
    reviews: '1,288',
    bought: '500+ bought in past month',
    price: '299.00',
    sponsored: true,
    plus: true,
    delivery: 'FREE delivery',
    date: 'Fri, Nov 21',
  },
  {
    title: 'Sonara Q45 Wireless Noise Cancelling Headphones, 30-Hour Battery, Multipoint Bluetooth, Black',
    photo: sonaraPhoto,
    alt: 'Black over-ear wireless headphones on a white desk',
    rating: 4.6,
    reviews: '18,204',
    bought: '10K+ bought in past month',
    price: '248.00',
    list: '349.99',
    deal: true,
    plus: true,
    delivery: 'FREE delivery',
    date: 'Tomorrow, Nov 18',
  },
  {
    title: 'Lumen Air Over-Ear Headphones with Spatial Audio, Active Noise Cancellation and Transparency Mode, Silver',
    photo: lumenPhoto,
    alt: 'Silver over-ear headphones with a white mesh headband',
    rating: 4.5,
    reviews: '6,912',
    bought: '2K+ bought in past month',
    price: '429.00',
    list: '549.00',
    delivery: 'FREE delivery',
    date: 'Thu, Nov 20',
    fastest: 'Wed, Nov 19',
  },
  {
    title: 'Volta Bass+ Wireless Headphones, Foldable Over-Ear, 60H Playtime, Deep Bass, Built-in Mic for Calls',
    photo: voltaPhoto,
    alt: 'Black foldable wireless headphones on white marble',
    rating: 4.3,
    reviews: '41,377',
    bought: '20K+ bought in past month',
    price: '29.99',
    badge: 'best-seller',
    plus: true,
    delivery: 'FREE delivery',
    date: 'Tomorrow, Nov 18',
  },
  {
    title: 'Kestrel K50 Wired Studio Headphones, Closed-Back, 50 mm Drivers, Foldable with 3 m Cable',
    photo: kestrelPhoto,
    alt: 'Gray wired studio headphones with a flat cable',
    rating: 4.6,
    reviews: '9,540',
    bought: '3K+ bought in past month',
    price: '49.99',
    badge: 'pick',
    delivery: 'FREE delivery',
    date: 'Wed, Nov 19',
  },
  {
    title: 'Aura Max Wireless Over-Ear Headphones, Active Noise Cancelling, 20-Hour Battery, Midnight',
    photo: auraMaxPhoto,
    alt: 'Black over-ear headphones with rounded ear cups and a mesh headband',
    rating: 4.7,
    reviews: '12,033',
    bought: '1K+ bought in past month',
    price: '399.00',
    delivery: 'FREE delivery',
    date: 'Thu, Nov 20',
    colors: '+3 other colors',
  },
  {
    title: 'Marlow Street On-Ear Wired Headphones with Inline Mic and Remote, Lightweight, Red',
    photo: marlowPhoto,
    alt: 'Red on-ear headphones with a flat red cable',
    rating: 4.1,
    reviews: '2,264',
    price: '34.99',
    sponsored: true,
    delivery: 'FREE delivery',
    date: 'Fri, Nov 21',
    condition: 'on $35 of items shipped by Shelf',
  },
  {
    title: 'Halden Aero ANC Headphones with Aluminum Ear Cups, Memory-Foam Cushions and Travel Case, Graphite',
    photo: haldenPhoto,
    alt: 'Graphite over-ear headphones lying on their side',
    rating: 4.2,
    reviews: '873',
    price: '189.99',
    list: '229.99',
    delivery: 'FREE delivery',
    date: 'Wed, Nov 19',
  },
];

const CATEGORIES = [
  "Today's Deals",
  'Shelf Plus',
  'Gift Cards',
  'Electronics',
  'Home & Kitchen',
  'Fashion',
  'Books',
  'Toys & Games',
  'Customer Service',
  'Sell',
];

const BRANDS = ['Sonara', 'Volta', 'Kestrel', 'Fjell', 'Lumen', 'Halden', 'Marlow'];

const CHECK_GROUPS: { title: string; options: string[] }[] = [
  { title: 'Headphones Form Factor', options: ['Over Ear', 'On Ear', 'In Ear', 'Open Ear'] },
  { title: 'Connectivity', options: ['Bluetooth', 'Wired', 'USB-C'] },
  { title: 'Noise Control', options: ['Active Noise Cancellation', 'Sound Isolation', 'None'] },
];

const PRICE_RANGES = ['Up to $50', '$50 to $100', '$100 to $200', '$200 to $300', '$300 & above'];

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Get to Know Us', links: ['Careers', 'About Shelf', 'Sustainability', 'Press Center'] },
  { title: 'Make Money with Us', links: ['Sell on Shelf', 'Become an Affiliate', 'Advertise Your Products', 'Ship with Shelf'] },
  { title: 'Shelf Plus', links: ['Join Shelf Plus', 'Fast, Free Delivery', 'Member Deals', 'Gift a Membership'] },
  { title: 'Let Us Help You', links: ['Your Account', 'Your Orders', 'Returns & Replacements', 'Help'] },
];

/** The badges a product can carry on its photo. */
function ProductBadge({ kind }: { kind: NonNullable<Product['badge']> }) {
  if (kind === 'best-seller') {
    return (
      <span className={`${styles.badge} ${styles.bestSeller}`} data-inspect="product-badge">
        Best Seller
      </span>
    );
  }
  return (
    <span className={`${styles.badge} ${styles.pick}`} data-inspect="product-badge">
      Shelf&rsquo;s <span className={styles.pickWord}>Pick</span>
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const off = product.list ? Math.round((1 - Number(product.price) / Number(product.list)) * 100) : 0;
  return (
    <li className={styles.card} data-inspect="product-card">
      <div className={styles.media}>
        <img className={styles.photo} src={product.photo} alt={product.alt} draggable={false} />
        {product.badge && <ProductBadge kind={product.badge} />}
      </div>
      <div className={styles.details}>
        {product.sponsored && (
          <span className={styles.sponsored} data-inspect="sponsored-label">
            Sponsored
            <Icon d={ICONS.info} />
          </span>
        )}
        <h3 className={styles.title} data-inspect="product-title">
          {product.title}
        </h3>
        <div className={styles.rating} data-inspect="star-rating">
          <span>{product.rating}</span>
          <span className={styles.ratingStars} role="img" aria-label={`${product.rating} out of 5 stars`}>
            <Stars rating={product.rating} />
            <Icon d={ICONS.chevronDown} className={styles.ratingChevron} />
          </span>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>
        {product.bought && (
          <p className={styles.bought} data-inspect="purchase-count">
            {product.bought}
          </p>
        )}
        {product.deal && (
          <span className={styles.deal} data-inspect="deal-badge">
            Limited time deal
          </span>
        )}
        <p className={styles.priceRow} data-inspect="price">
          {off > 0 && !product.deal && <span className={styles.off}>-{off}%</span>}
          <Price amount={product.price} />
          {product.list && (
            <span className={styles.list}>
              List: <s>${product.list}</s>
            </span>
          )}
        </p>
        {product.plus && <PlusBadge />}
        <p className={styles.delivery} data-inspect="delivery-promise">
          {product.delivery} <strong>{product.date}</strong>
          {product.condition && ` ${product.condition}`}
          {product.fastest && (
            <>
              <br />
              Or fastest delivery <strong>{product.fastest}</strong>
            </>
          )}
        </p>
        <span className={styles.addToCart} role="button" data-inspect="add-to-cart">
          Add to cart
        </span>
        {product.colors && <a className={styles.colors}>{product.colors}</a>}
      </div>
    </li>
  );
}

/**
 * Library example: an online store's search results, closely following Amazon's desktop results page for
 * "headphones": the dark header with the delivery location, search, account and cart, the category bar, the results
 * bar with sorting, filters on the left and a grid of product cards. Shelf's plum and mint, the brands, products and
 * prices are made up. Not interactive; for inspection only.
 */
export function ShelfSite() {
  return (
    <div className={styles.root}>
      <div className={styles.page}>
        <header>
          <div className={styles.belt}>
            <span className={styles.menuButton} role="button" aria-label="All departments">
              <Icon d={ICONS.menu} />
            </span>
            <a className={styles.home}>
              <ShelfLogo />
            </a>
            <span className={styles.deliver} role="button" data-inspect="delivery-location">
              <Icon d={ICONS.pin} className={styles.pin} />
              <span className={styles.twoLine}>
                <span className={styles.lineOne}>Deliver to Sam</span>
                <span className={styles.lineTwo}>Seattle 98103</span>
              </span>
            </span>
            <div className={styles.search} role="search" data-inspect="search-bar">
              <span className={styles.scope} role="button" aria-haspopup="listbox">
                All
                <Caret />
              </span>
              <span className={styles.field} role="searchbox">
                headphones
              </span>
              <span className={styles.searchButton} role="button" aria-label="Go">
                <Icon d={ICONS.search} />
              </span>
            </div>
            <span className={styles.language} role="button" aria-haspopup="menu">
              <Icon d={ICONS.globe} />
              EN
              <Caret />
            </span>
            <span className={styles.account} role="button" aria-haspopup="menu" data-inspect="account-menu">
              <Icon d={ICONS.person} className={styles.accountIcon} />
              <span className={styles.twoLine}>
                <span className={styles.lineOne}>Hello, Sam</span>
                <span className={styles.lineTwo}>
                  Account &amp; Lists
                  <Caret />
                </span>
              </span>
              <span className={styles.accountShort}>
                Sam
                <Icon d={ICONS.chevronRight} />
              </span>
            </span>
            <a className={`${styles.twoLine} ${styles.orders}`}>
              <span className={styles.lineOne}>Returns</span>
              <span className={styles.lineTwo}>&amp; Orders</span>
            </a>
            <a className={styles.cart} aria-label="Cart, 2 items" data-inspect="cart-button">
              <span className={styles.cartIcon}>
                <Icon d={ICONS.cart} />
                <span className={styles.cartCount}>2</span>
              </span>
              <span className={styles.cartLabel}>Cart</span>
            </a>
          </div>

          <nav className={styles.navMain} aria-label="Departments" data-inspect="category-nav">
            <span className={styles.allButton} role="button">
              <Icon d={ICONS.menu} />
              All
            </span>
            <span className={styles.assistant} role="button">
              <Icon d={ICONS.sparkle} />
              Ask Shelf
            </span>
            <ul className={styles.categories}>
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <a className={styles.category}>{category}</a>
                </li>
              ))}
            </ul>
            <a className={styles.promo}>Black Friday Week starts Nov 20</a>
          </nav>

          <span className={styles.deliverStrip} role="button" data-inspect="delivery-location">
            <Icon d={ICONS.pin} />
            Deliver to Sam - Seattle 98103
          </span>
        </header>

        <div className={styles.toolbar}>
          <p className={styles.resultCount}>
            1-8 of over 8,000 results for <span className={styles.query}>&ldquo;headphones&rdquo;</span>
          </p>
          <span className={styles.filtersButton} role="button" aria-label="Filters, 2 applied">
            <Icon d={ICONS.sliders} />
            Filters (2)
            <Icon d={ICONS.chevronDown} className={styles.buttonChevron} />
          </span>
          <span className={styles.sort} role="button" aria-haspopup="listbox" data-inspect="sort-dropdown">
            <span className={styles.sortLabel}>Sort by:</span>
            Featured
            <Icon d={ICONS.chevronDown} className={styles.buttonChevron} />
          </span>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Filters" data-inspect="filter-sidebar">
            <section data-inspect="checkbox-filter">
              <h4 className={styles.facetTitle}>Eligible for Free Shipping</h4>
              <span className={styles.option}>
                <Checkbox checked />
                Free Shipping by Shelf
              </span>
              <p className={styles.facetNote}>Get FREE Shipping on eligible orders shipped by Shelf</p>
            </section>

            <section>
              <h4 className={styles.facetTitle}>Delivery Day</h4>
              <span className={styles.option}>
                <Checkbox />
                Get It by Tomorrow
              </span>
            </section>

            <section>
              <h4 className={styles.facetTitle}>Customer Reviews</h4>
              <a className={styles.clear}>
                <Icon d={ICONS.chevronLeft} />
                Clear
              </a>
              <span className={`${styles.ratingOption} ${styles.ratingOn}`} role="radio" aria-checked="true">
                <Stars rating={4} large />
                <span>&amp; Up</span>
              </span>
            </section>

            <section data-inspect="checkbox-filter">
              <h4 className={styles.facetTitle}>Brands</h4>
              <ul className={styles.options}>
                {BRANDS.map((brand) => (
                  <li key={brand} className={styles.option}>
                    <Checkbox />
                    {brand}
                  </li>
                ))}
              </ul>
              <a className={styles.seeMore}>
                <Icon d={ICONS.chevronDown} />
                See more
              </a>
            </section>

            <section data-inspect="price-slider">
              <h4 className={styles.facetTitle}>Price</h4>
              <p className={styles.priceRange}>$10 – $500+</p>
              <div className={styles.sliderRow}>
                <span className={styles.slider}>
                  <span className={styles.track} />
                  <span
                    className={`${styles.thumb} ${styles.thumbMin}`}
                    role="slider"
                    aria-label="Minimum price"
                    aria-valuemin={10}
                    aria-valuemax={500}
                    aria-valuenow={10}
                  />
                  <span
                    className={`${styles.thumb} ${styles.thumbMax}`}
                    role="slider"
                    aria-label="Maximum price"
                    aria-valuemin={10}
                    aria-valuemax={500}
                    aria-valuenow={500}
                  />
                </span>
                <span className={styles.go} role="button">
                  Go
                </span>
              </div>
              <ul className={styles.ranges}>
                {PRICE_RANGES.map((range) => (
                  <li key={range}>
                    <a>{range}</a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className={styles.facetTitle}>Deals &amp; Discounts</h4>
              <ul className={styles.ranges}>
                <li>
                  <a>All Discounts</a>
                </li>
                <li>
                  <a>Today&rsquo;s Deals</a>
                </li>
              </ul>
            </section>

            {CHECK_GROUPS.map((group) => (
              <section key={group.title}>
                <h4 className={styles.facetTitle}>{group.title}</h4>
                <ul className={styles.options}>
                  {group.options.map((option) => (
                    <li key={option} className={styles.option}>
                      <Checkbox />
                      {option}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </aside>

          <main className={styles.results}>
            <div className={styles.resultsHead}>
              <h2 className={styles.resultsTitle}>Results</h2>
              <p className={styles.resultsNote}>Check each product page for other buying options.</p>
            </div>

            <ul className={styles.grid}>
              {PRODUCTS.map((product) => (
                <ProductCard key={product.title} product={product} />
              ))}
            </ul>

            <nav className={styles.pagination} aria-label="Pages" data-inspect="pagination">
              <a className={`${styles.pageStep} ${styles.pageOff}`} aria-disabled="true">
                <Icon d={ICONS.chevronLeft} />
                <span className={styles.pageStepLabel}>Previous</span>
              </a>
              <a className={`${styles.pageNumber} ${styles.pageCurrent}`} aria-current="page">
                1
              </a>
              <a className={styles.pageNumber}>2</a>
              <a className={styles.pageNumber}>3</a>
              <span className={styles.pageGap}>…</span>
              <a className={styles.pageNumber}>7</a>
              <a className={styles.pageStep}>
                <span className={styles.pageStepLabel}>Next</span>
                <Icon d={ICONS.chevronRight} />
              </a>
            </nav>
          </main>
        </div>

        <footer className={styles.footer}>
          <a className={styles.backToTop}>Back to top</a>
          <div className={styles.footerColumns}>
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className={styles.footerTitle}>{column.title}</h4>
                <ul className={styles.footerLinks}>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.footerBottom}>
            <ShelfLogo />
            <span>© 2026 Shelf.store, Inc. or its affiliates</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
