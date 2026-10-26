import type { ReactNode } from 'react';
import styles from './ShelfSite.module.css';

const STAR = 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9z';

type Facet = {
  title: string;
  options: { label: string; count: number; checked?: boolean }[];
  /** Long lists show the top options and fold the rest behind a link. */
  more?: string;
};

const FACETS: Facet[] = [
  {
    title: 'Type',
    options: [
      { label: 'Over-ear', count: 148, checked: true },
      { label: 'On-ear', count: 62 },
      { label: 'In-ear', count: 201 },
      { label: 'Sport', count: 37 },
    ],
  },
  {
    title: 'Brand',
    options: [
      { label: 'Sonara', count: 64 },
      { label: 'Arc Audio', count: 41 },
      { label: 'Kestrel', count: 38 },
      { label: 'Volta', count: 29 },
    ],
    more: 'Show 12 more',
  },
];

const COLORS = [
  { name: 'Black', value: '#18181b', checked: true },
  { name: 'White', value: '#fafafa', checked: true },
  { name: 'Silver', value: '#a1a1aa' },
  { name: 'Navy', value: '#1e3a8a' },
  { name: 'Sage', value: '#84a98c' },
  { name: 'Rose', value: '#e8a1a8' },
];

const APPLIED = ['Over-ear', '$50 – $250', '4★ & up', 'Black', 'White'];

type Product = {
  title: string;
  color: 'black' | 'white';
  rating: number;
  reviews: string;
  price: string;
  was?: string;
  badge?: string;
  delivery: string;
  saved?: boolean;
};

const PRODUCTS: Product[] = [
  {
    title: 'Sonara Q45 Wireless Noise Cancelling Over-Ear Headphones, 40-Hour Battery',
    color: 'black',
    rating: 4.6,
    reviews: '12,408',
    price: '179.00',
    badge: 'Best seller',
    delivery: 'Tomorrow',
  },
  {
    title: 'Arc Audio Studio Pro Bluetooth Headphones with Adaptive ANC and Spatial Audio',
    color: 'white',
    rating: 4.4,
    reviews: '3,211',
    price: '149.99',
    was: '199.99',
    badge: '−25%',
    delivery: 'Tue, Oct 28',
    saved: true,
  },
  {
    title: 'Kestrel Aero 2 Lightweight Over-Ear Headphones, USB-C Fast Charging',
    color: 'black',
    rating: 4.3,
    reviews: '1,876',
    price: '89.99',
    delivery: 'Wed, Oct 29',
  },
  {
    title: 'Volta Bass+ Wireless Headphones with Deep Bass Mode and Foldable Design',
    color: 'white',
    rating: 4.1,
    reviews: '5,402',
    price: '69.99',
    was: '99.99',
    badge: '−30%',
    delivery: 'Tomorrow',
  },
  {
    title: 'Sonara Q30 Over-Ear Headphones, Hybrid Noise Cancelling, 30-Hour Battery',
    color: 'white',
    rating: 4.5,
    reviews: '8,930',
    price: '129.00',
    delivery: 'Tomorrow',
  },
  {
    title: 'Arc Audio Commute Wireless Headphones with Multipoint Bluetooth and Travel Case',
    color: 'black',
    rating: 4.2,
    reviews: '967',
    price: '119.99',
    delivery: 'Thu, Oct 30',
  },
  {
    title: 'Halden Reference Closed-Back Studio Monitor Headphones, Wired, 3 m Cable',
    color: 'black',
    rating: 4.7,
    reviews: '2,145',
    price: '99.00',
    badge: 'Best seller',
    delivery: 'Wed, Oct 29',
  },
  {
    title: 'Kestrel Aero Max Premium Noise Cancelling Headphones with Hard Case',
    color: 'white',
    rating: 4.4,
    reviews: '612',
    price: '229.00',
    delivery: 'Tue, Oct 28',
  },
];

function Icon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24">
      {children}
    </svg>
  );
}

function StarRow({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 24">
      {[0, 1, 2, 3, 4].map((index) => (
        <path key={index} d={STAR} transform={`translate(${index * 24} 0)`} />
      ))}
    </svg>
  );
}

/** Five gray stars with a gold copy on top, cut to the rating's width: 4.6 of 5 shows 92% of the gold row. */
function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} role="img" aria-label={`Rated ${rating} out of 5`}>
      <StarRow className={styles.starsEmpty} />
      <span className={styles.starsFill} style={{ width: `${Math.round(rating * 20)}%` }}>
        <StarRow className={styles.starsGold} />
      </span>
    </span>
  );
}

/** Price in the store's style: small raised dollar sign and cents around the whole dollars. */
function Price({ amount }: { amount: string }) {
  const [dollars, cents] = amount.split('.');
  return (
    <span className={styles.price}>
      <span className={styles.priceSmall}>$</span>
      {dollars}
      <span className={styles.priceSmall}>{cents}</span>
    </span>
  );
}

function Headphones({ color }: { color: Product['color'] }) {
  return (
    <svg className={`${styles.headphones} ${color === 'black' ? styles.black : styles.white}`} viewBox="0 0 120 120">
      <ellipse className={styles.shadow} cx="60" cy="104" rx="36" ry="4" />
      <path className={styles.band} d="M30 64V52a30 30 0 0 1 60 0v12" />
      <path className={styles.pad} d="M43 27a27 27 0 0 1 34 0" />
      <rect className={styles.cup} x="17" y="58" width="23" height="38" rx="11" />
      <rect className={styles.cup} x="80" y="58" width="23" height="38" rx="11" />
      <rect className={styles.cushion} x="35" y="62" width="9" height="30" rx="4.5" />
      <rect className={styles.cushion} x="76" y="62" width="9" height="30" rx="4.5" />
      <circle className={styles.detail} cx="28.5" cy="77" r="3" />
      <circle className={styles.detail} cx="91.5" cy="77" r="3" />
    </svg>
  );
}

/**
 * Online store category page: a promo strip, a sticky header with a scoped search, filters on the left and a grid of
 * product cards with sorting and pagination. Not interactive (links have no href); for inspection only.
 */
export function ShelfSite() {
  return (
    <div className={styles.page}>
      <div className={styles.promo} data-inspect="promo-strip">
        <Icon className={styles.promoIcon}>
          <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </Icon>
        <span>
          <strong>Free delivery</strong> on orders over $50
        </span>
        <span className={styles.promoExtra}>· Free 30-day returns</span>
        <a className={styles.promoLink}>Details</a>
      </div>

      <header className={styles.header}>
        <a className={styles.brand}>
          <span className={styles.mark}>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </span>
          Shelf
        </a>

        <div className={styles.search} data-inspect="search-bar">
          <span className={styles.scope}>
            All
            <Icon className={styles.scopeChevron}>
              <path d="M6 9l6 6 6-6" />
            </Icon>
          </span>
          <span className={styles.searchText}>Search Shelf</span>
          <span className={styles.searchButton}>
            <Icon>
              <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" />
            </Icon>
          </span>
        </div>

        <a className={styles.account}>
          <Icon className={styles.headerIcon}>
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />
          </Icon>
          <span className={styles.accountText}>
            <span className={styles.accountHello}>Hello, Sam</span>
            Account
          </span>
        </a>

        <a className={styles.cart} aria-label="Cart, 3 items" data-inspect="cart-button">
          <span className={styles.cartIcon}>
            <Icon className={styles.headerIcon}>
              <path d="M3 4h2l2.4 11h10.8L21 7H6.2M9.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </Icon>
            <span className={styles.cartBadge}>3</span>
          </span>
          <span className={styles.cartLabel}>Cart</span>
        </a>
      </header>

      <div className={styles.body}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <a>Electronics</a>
          <span className={styles.crumbSeparator}>›</span>
          <a>Audio</a>
          <span className={styles.crumbSeparator}>›</span>
          <span className={styles.crumbCurrent} aria-current="page">
            Headphones
          </span>
        </nav>
        <h2 className={styles.title}>Headphones</h2>

        <div className={styles.layout}>
          <aside className={styles.filters} data-inspect="filter-panel">
            <div className={styles.filtersHead}>
              <span className={styles.filtersTitle}>Filters</span>
              <a className={styles.clearAll}>Clear all</a>
            </div>

            {FACETS.map((facet) => (
              <section key={facet.title} className={styles.facet} data-inspect="checkbox-filter">
                <p className={styles.facetTitle}>{facet.title}</p>
                <ul className={styles.options}>
                  {facet.options.map((option) => (
                    <li key={option.label} className={styles.option}>
                      <span className={styles.checkbox} role="checkbox" aria-checked={Boolean(option.checked)}>
                        {option.checked && (
                          <Icon>
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </Icon>
                        )}
                      </span>
                      <span className={styles.optionLabel}>{option.label}</span>
                      <span className={styles.optionCount}>{option.count}</span>
                    </li>
                  ))}
                </ul>
                {facet.more && (
                  <a className={styles.showMore}>
                    {facet.more}
                    <Icon>
                      <path d="M6 9l6 6 6-6" />
                    </Icon>
                  </a>
                )}
              </section>
            ))}

            <section className={styles.facet} data-inspect="price-slider">
              <p className={styles.facetTitle}>Price</p>
              <div className={styles.slider}>
                <span className={styles.sliderRange} />
                <span
                  className={styles.thumb}
                  style={{ left: '10%' }}
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={500}
                  aria-valuenow={50}
                />
                <span
                  className={styles.thumb}
                  style={{ left: '50%' }}
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={500}
                  aria-valuenow={250}
                />
              </div>
              <div className={styles.priceFields}>
                <span className={styles.priceField}>
                  <span className={styles.fieldPrefix}>$</span>50
                </span>
                <span className={styles.priceDash}>–</span>
                <span className={styles.priceField}>
                  <span className={styles.fieldPrefix}>$</span>250
                </span>
              </div>
            </section>

            <section className={styles.facet} data-inspect="rating-filter">
              <p className={styles.facetTitle}>Customer rating</p>
              <ul className={styles.options}>
                {[4, 3, 2].map((stars) => (
                  <li
                    key={stars}
                    className={styles.ratingOption}
                    role="radio"
                    aria-checked={stars === 4}
                  >
                    <Stars rating={stars} />
                    <span>& up</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.facet}>
              <p className={styles.facetTitle}>Color</p>
              <div className={styles.swatches}>
                {COLORS.map((color) => (
                  <span
                    key={color.name}
                    className={styles.swatch}
                    style={{ background: color.value }}
                    role="checkbox"
                    aria-checked={Boolean(color.checked)}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </section>
          </aside>

          <main className={styles.results}>
            <div className={styles.toolbar}>
              <span className={styles.filtersButton} data-inspect="filter-panel">
                <Icon>
                  <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M16 4v4M10 10v4M18 16v4" />
                </Icon>
                Filters
                <span className={styles.filtersCount}>{APPLIED.length}</span>
              </span>
              <span className={styles.count}>
                <strong>1–24</strong> of 312 results
              </span>
              <span className={styles.sort} data-inspect="sort-dropdown">
                <span className={styles.sortLabel}>Sort by:</span>
                <strong>Featured</strong>
                <Icon className={styles.sortChevron}>
                  <path d="M6 9l6 6 6-6" />
                </Icon>
              </span>
              <span className={styles.viewToggle} data-inspect="view-toggle">
                <span className={styles.viewOption} aria-pressed="true" aria-label="Grid view">
                  <Icon>
                    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
                  </Icon>
                </span>
                <span className={styles.viewOption} aria-pressed="false" aria-label="List view">
                  <Icon>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </Icon>
                </span>
              </span>
            </div>

            <ul className={styles.chips} data-inspect="filter-chips">
              {APPLIED.map((filter) => (
                <li key={filter} className={styles.chip}>
                  {filter}
                  <Icon className={styles.chipRemove}>
                    <path d="M7 7l10 10M17 7L7 17" />
                  </Icon>
                </li>
              ))}
            </ul>

            <ul className={styles.grid}>
              {PRODUCTS.map((product) => (
                <li key={product.title} className={styles.card} data-inspect="product-card">
                  <div className={styles.media}>
                    <Headphones color={product.color} />
                    {product.badge && (
                      <span
                        className={product.was ? `${styles.badge} ${styles.badgeSale}` : styles.badge}
                        data-inspect="product-badge"
                      >
                        {product.badge}
                      </span>
                    )}
                    <span className={styles.wishlist} aria-pressed={Boolean(product.saved)}>
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 20.5s-7.5-4.6-9.6-9.1C.9 8.1 3.1 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.5 0 5.7 3.6 4.2 6.9-2.1 4.5-9.6 9.1-9.6 9.1z" />
                      </svg>
                    </span>
                  </div>
                  <p className={styles.productTitle} data-inspect="product-title">
                    {product.title}
                  </p>
                  <div className={styles.rating} data-inspect="star-rating">
                    <Stars rating={product.rating} />
                    <span className={styles.ratingValue}>{product.rating}</span>
                    <span className={styles.reviews}>({product.reviews})</span>
                  </div>
                  <p className={styles.priceRow} data-inspect="price">
                    <Price amount={product.price} />
                    {product.was && <s className={styles.was}>${product.was}</s>}
                  </p>
                  <p className={styles.delivery}>
                    Free delivery <strong>{product.delivery}</strong>
                  </p>
                  <span className={styles.addToCart}>Add to cart</span>
                </li>
              ))}
            </ul>

            <nav className={styles.pagination} aria-label="Pagination" data-inspect="pagination">
              <a className={styles.pageStep} aria-disabled="true">
                <Icon>
                  <path d="M15 6l-6 6 6 6" />
                </Icon>
                <span className={styles.pageStepLabel}>Previous</span>
              </a>
              <a className={styles.pageNumber} aria-current="page">
                1
              </a>
              <a className={styles.pageNumber}>2</a>
              <a className={styles.pageNumber}>3</a>
              <span className={styles.pageGap}>…</span>
              <a className={styles.pageNumber}>13</a>
              <a className={styles.pageStep}>
                <span className={styles.pageStepLabel}>Next</span>
                <Icon>
                  <path d="M9 6l6 6-6 6" />
                </Icon>
              </a>
            </nav>
          </main>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>© 2026 Shelf Retail, Inc.</span>
        <span>Conditions of use · Privacy · Help</span>
      </footer>
    </div>
  );
}
