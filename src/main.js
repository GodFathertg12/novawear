import './style.css'
import heroImg from './assets/hero.png'

const CART_KEY = 'novawear-cart'
const EMAIL_KEY = 'novawear-newsletter-email'

const products = [
  {
    id: 'cloudstep-runner',
    tag: 'Top Rated',
    name: 'Cloudstep Runner',
    price: 128,
    accent: 'Sunrise Coral',
    category: 'Daily',
    rating: '4.9',
    reviews: 412,
    description: 'Featherlight knit uppers with everyday cushioning built for long city days.',
    sizes: ['38', '39', '40', '41', '42', '43'],
  },
  {
    id: 'nova-court',
    tag: 'New Favorite',
    name: 'Nova Court',
    price: 94,
    accent: 'Sandstone / Bone',
    category: 'Daily',
    rating: '4.8',
    reviews: 268,
    description: 'A clean retro profile with soft lining and a durable outsole for repeat wear.',
    sizes: ['39', '40', '41', '42', '43', '44'],
  },
  {
    id: 'pulse-trail-low',
    tag: 'Editor Pick',
    name: 'Pulse Trail Low',
    price: 142,
    accent: 'Forest Mist',
    category: 'Training',
    rating: '4.9',
    reviews: 301,
    description: 'Trail-inspired grip and water-resistant panels in a streamlined street-ready silhouette.',
    sizes: ['40', '41', '42', '43', '44', '45'],
  },
  {
    id: 'afterglow-slide',
    tag: 'Almost Gone',
    name: 'Afterglow Slide',
    price: 68,
    accent: 'Rose Clay',
    category: 'Recovery',
    rating: '4.7',
    reviews: 192,
    description: 'Minimal slip-ons with molded comfort and a plush footbed for quick daily styling.',
    sizes: ['38', '39', '40', '41', '42'],
  },
]

const collections = [
  {
    title: 'Daily sneakers',
    subtitle: 'For commuting, coffee runs, and casual weekends.',
  },
  {
    title: 'Training ready',
    subtitle: 'Breathable support for motion-heavy days and lighter workouts.',
  },
  {
    title: 'Slides + recovery',
    subtitle: 'Easy comfort pairs that still feel put together.',
  },
]

const reviews = [
  {
    quote:
      'The fit felt broken-in right away. I wore them on a work trip and never packed a backup pair.',
    name: 'Maya O.',
    meta: 'Verified buyer, Lagos',
  },
  {
    quote:
      'They look premium without trying too hard. The color palette makes styling ridiculously easy.',
    name: 'Jordan K.',
    meta: 'Verified buyer, London',
  },
  {
    quote:
      'This is one of the few brands that actually delivers comfort and a clean silhouette at once.',
    name: 'Teni A.',
    meta: 'Verified buyer, Toronto',
  },
]

const faqs = [
  {
    question: 'Do you ship internationally?',
    answer: 'Yes. NovaWear ships worldwide, with delivery windows and duties shown at checkout.',
  },
  {
    question: 'How do sizing and exchanges work?',
    answer: 'Each product includes a fit recommendation, and exchanges are free within 30 days.',
  },
  {
    question: 'What makes this brand feel premium?',
    answer:
      'Material choice, restrained color stories, and comfort-led shaping keep the product elevated and wearable.',
  },
]

const state = {
  filter: 'All',
  cart: loadCart(),
  selectedProductId: null,
  newsletterEmail: loadNewsletterEmail(),
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const app = document.querySelector('#app')

function escapeAttr(value) {
  return String(value).replace(/"/g, '&quot;')
}

function loadCart() {
  try {
    const stored = window.localStorage.getItem(CART_KEY)
    const parsed = stored ? JSON.parse(stored) : null

    if (Array.isArray(parsed) && parsed.length) {
      return parsed.filter((id) => products.some((product) => product.id === id))
    }
  } catch {}

  return [products[0].id]
}

function saveCart() {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(state.cart))
  } catch {}
}

function loadNewsletterEmail() {
  try {
    return window.localStorage.getItem(EMAIL_KEY) || ''
  } catch {
    return ''
  }
}

function saveNewsletterEmail(email) {
  try {
    window.localStorage.setItem(EMAIL_KEY, email)
  } catch {}
}

function cartItems() {
  return state.cart.map((id) => products.find((product) => product.id === id)).filter(Boolean)
}

function cartSubtotal() {
  return cartItems().reduce((sum, product) => sum + product.price, 0)
}

function selectedProduct() {
  return products.find((product) => product.id === state.selectedProductId) || null
}

function renderFilters() {
  const filters = ['All', 'Daily', 'Training', 'Recovery']

  return filters
    .map(
      (filter) => `
        <button
          class="filter-chip${state.filter === filter ? ' is-active' : ''}"
          type="button"
          data-filter="${escapeAttr(filter)}"
          aria-pressed="${state.filter === filter}"
        >
          ${filter}
        </button>
      `,
    )
    .join('')
}

function renderProductCards() {
  return products
    .filter((product) => state.filter === 'All' || product.category === state.filter)
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-card__art" aria-hidden="true">
            <span class="product-card__badge">${product.tag}</span>
            <div class="product-card__orb"></div>
            <div class="product-card__shoe"></div>
          </div>
          <div class="product-card__body">
            <div class="product-card__meta">
              <p class="eyebrow">${product.accent}</p>
              <p class="price">${currency.format(product.price)}</p>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-card__stats">
              <span>${product.category}</span>
              <span>${product.rating}/5 rating</span>
              <span>${product.reviews} reviews</span>
            </div>
            <div class="size-row" aria-label="Available sizes">
              ${product.sizes
                .slice(0, 4)
                .map((size) => `<span class="size-pill">${size}</span>`)
                .join('')}
            </div>
            <div class="product-card__actions">
              <button class="shop-button" type="button" data-add-cart="${product.id}">
                Add to cart
              </button>
              <button class="ghost-button" type="button" data-quick-view="${product.id}">
                Quick view
              </button>
            </div>
          </div>
        </article>
      `,
    )
    .join('')
}

function renderCollections() {
  return collections
    .map(
      (collection, index) => `
        <article class="category-card category-card--${index + 1}">
          <p class="eyebrow">Shop by lifestyle</p>
          <h3>${collection.title}</h3>
          <p>${collection.subtitle}</p>
          <a href="#best-sellers">Explore picks</a>
        </article>
      `,
    )
    .join('')
}

function renderReviews() {
  return reviews
    .map(
      (review) => `
        <article class="review-card">
          <p class="stars" aria-label="Five star review">5/5 rated</p>
          <p class="review-copy">"${review.quote}"</p>
          <p class="review-author">${review.name}</p>
          <p class="review-meta">${review.meta}</p>
        </article>
      `,
    )
    .join('')
}

function renderFaqs() {
  return faqs
    .map(
      (faq) => `
        <details class="faq-item">
          <summary>${faq.question}</summary>
          <p>${faq.answer}</p>
        </details>
      `,
    )
    .join('')
}

function renderCart() {
  const items = cartItems()

  if (!items.length) {
    return `
      <div class="cart-empty">
        <p class="eyebrow">Cart preview</p>
        <h3>Your curated picks will appear here.</h3>
        <p>Add a pair to show how the mini-checkout experience works.</p>
      </div>
    `
  }

  return `
    <div class="cart-panel__list">
      ${items
        .map(
          (product) => `
            <article class="cart-item">
              <div class="cart-item__thumb" aria-hidden="true"></div>
              <div>
                <p class="cart-item__name">${product.name}</p>
                <p class="cart-item__meta">${product.accent}</p>
              </div>
              <div class="cart-item__side">
                <p>${currency.format(product.price)}</p>
                <button type="button" class="cart-remove" data-remove-cart="${product.id}">
                  Remove
                </button>
              </div>
            </article>
          `,
        )
        .join('')}
    </div>
    <div class="cart-summary">
      <div>
        <span>Subtotal</span>
        <strong>${currency.format(cartSubtotal())}</strong>
      </div>
      <p>Shipping, taxes, and discounts are calculated at checkout.</p>
      <button class="button button--primary" type="button">Proceed to checkout</button>
    </div>
  `
}

function renderQuickView() {
  const product = selectedProduct()

  if (!product) {
    return ''
  }

  return `
    <div class="modal-backdrop" data-close-modal="true">
      <section
        class="quick-view-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <button class="modal-close" type="button" data-close-modal="true" aria-label="Close quick view">
          Close
        </button>
        <div class="quick-view-modal__art" aria-hidden="true">
          <span class="product-card__badge">${product.tag}</span>
          <div class="product-card__orb"></div>
          <div class="product-card__shoe"></div>
        </div>
        <div class="quick-view-modal__body">
          <p class="eyebrow">${product.accent}</p>
          <h2 id="quick-view-title">${product.name}</h2>
          <p class="quick-view-price">${currency.format(product.price)}</p>
          <p>${product.description}</p>
          <div class="product-card__stats">
            <span>${product.category}</span>
            <span>${product.rating}/5 rating</span>
            <span>${product.reviews} reviews</span>
          </div>
          <div class="quick-view-sizes">
            <p class="quick-view-label">Available sizes</p>
            <div class="size-row">
              ${product.sizes.map((size) => `<span class="size-pill">${size}</span>`).join('')}
            </div>
          </div>
          <div class="quick-view-actions">
            <button class="button button--primary" type="button" data-add-cart="${product.id}">
              Add to cart
            </button>
            <button class="ghost-button" type="button" data-close-modal="true">
              Continue browsing
            </button>
          </div>
        </div>
      </section>
    </div>
  `
}

function renderNewsletterNote() {
  if (state.newsletterEmail) {
    return `Thanks, ${state.newsletterEmail}. You're on the list for early access and restock alerts.`
  }

  return 'By subscribing, you agree to receive product and launch updates from NovaWear.'
}

function renderApp() {
  app.innerHTML = `
    <div class="announcement-bar">
      Free exchanges within 30 days. New summer drop ships worldwide.
    </div>

    <main class="page-shell">
      <header class="site-header">
        <a class="brand" href="#featured" aria-label="NovaWear home">
          <span class="brand__mark">N</span>
          <span>NovaWear</span>
        </a>

        <nav class="site-nav" aria-label="Primary">
          <a href="#featured">Featured</a>
          <a href="#best-sellers">Best Sellers</a>
          <a href="#experience">Experience</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div class="header-actions">
          <a class="text-link" href="#newsletter">Newsletter</a>
          <a class="cart-pill" href="#cart-preview" aria-label="Cart preview">
            Cart <span>${state.cart.length}</span>
          </a>
        </div>
      </header>

      <section class="hero-section" id="featured">
        <div class="hero-copy">
          <p class="eyebrow">NovaWear Spring / Summer</p>
          <h1>Movement-first essentials that feel premium enough to sell.</h1>
          <p class="hero-text">
            A conversion-minded storefront concept for a modern footwear brand, blending clean
            merchandising, trust-building content, and a lightweight checkout preview.
          </p>
          <div class="hero-actions">
            <a class="button button--primary" href="#best-sellers">Shop best sellers</a>
            <a class="button button--ghost" href="#experience">Why shoppers convert</a>
          </div>
          <div class="hero-metrics" aria-label="Brand highlights">
            <article>
              <strong>4.9/5</strong>
              <span>Average rating across top pairs</span>
            </article>
            <article>
              <strong>48 hrs</strong>
              <span>Dispatch time on in-stock items</span>
            </article>
            <article>
              <strong>12k+</strong>
              <span>Customers styling NovaWear weekly</span>
            </article>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="hero-glow"></div>
          <img src="${heroImg}" alt="" class="hero-image" width="480" height="480" />
          <div class="hero-note hero-note--top">Free shipping over $120</div>
          <div class="hero-note hero-note--bottom">New colors added weekly</div>
        </div>
      </section>

      <section class="feature-band" id="experience">
        <article>
          <p class="eyebrow">Storefront strategy</p>
          <h2>Built to look polished, feel trustworthy, and guide a customer to checkout.</h2>
        </article>
        <article>
          <strong>Comfort-first design</strong>
          <p>Soft structure, stable cushioning, and wear-all-day support across the line.</p>
        </article>
        <article>
          <strong>Merchandising clarity</strong>
          <p>Structured product cards, visible ratings, sizes, and pricing reduce hesitation fast.</p>
        </article>
        <article>
          <strong>Trust signals</strong>
          <p>Reviews, shipping reassurance, FAQ coverage, and newsletter capture close the loop.</p>
        </article>
      </section>

      <section class="category-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Collections</p>
            <h2>Shop by the way your week actually moves.</h2>
          </div>
          <a class="section-link" href="#best-sellers">See trending pairs</a>
        </div>
        <div class="category-grid">
          ${renderCollections()}
        </div>
      </section>

      <section class="commerce-stage">
        <section class="best-sellers" id="best-sellers">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Best Sellers</p>
              <h2>The pairs customers keep coming back for.</h2>
            </div>
            <a class="section-link" href="#newsletter">Get launch alerts</a>
          </div>

          <div class="filter-row" role="toolbar" aria-label="Product filters">
            ${renderFilters()}
          </div>

          <div class="product-grid">
            ${renderProductCards()}
          </div>
        </section>

        <aside class="cart-panel" id="cart-preview">
          <div class="cart-panel__head">
            <div>
              <p class="eyebrow">Mini checkout</p>
              <h3>Cart preview</h3>
            </div>
            <span class="cart-count">${state.cart.length} items</span>
          </div>
          ${renderCart()}
        </aside>
      </section>

      <section class="editorial-grid">
        <article class="editorial-card editorial-card--wide">
          <p class="eyebrow">Why it works</p>
          <h2>Materials that feel soft on day one but hold their shape over time.</h2>
          <p>
            Every pair is designed around breathable structure, balanced cushioning, and a finish
            that looks elevated with denim, tailoring, or lounge staples.
          </p>
          <a class="text-link" href="#newsletter">Get launch updates</a>
        </article>
        <article class="editorial-card editorial-card--accent">
          <p class="eyebrow">Shipping + care</p>
          <h3>Fast dispatch, easy exchanges, and straightforward care guidance with every order.</h3>
        </article>
        <article class="editorial-card">
          <p class="eyebrow">Customer promise</p>
          <h3>No over-designed gimmicks, just versatile pairs you reach for constantly.</h3>
        </article>
      </section>

      <section class="reviews-section" id="reviews">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Reviews</p>
            <h2>Proof the comfort is not just marketing copy.</h2>
          </div>
          <a class="section-link" href="#faq">Read store FAQ</a>
        </div>
        <div class="review-grid">
          ${renderReviews()}
        </div>
      </section>

      <section class="faq-section" id="faq">
        <div class="section-heading">
          <div>
            <p class="eyebrow">FAQ</p>
            <h2>Answering the questions buyers ask before they commit.</h2>
          </div>
        </div>
        <div class="faq-grid">
          ${renderFaqs()}
        </div>
      </section>

      <section class="newsletter-section" id="newsletter">
        <div>
          <p class="eyebrow">Stay close</p>
          <h2>Early access to limited colors, restocks, and styling edits.</h2>
        </div>
        <form class="newsletter-form" id="newsletter-form">
          <label class="sr-only" for="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            required
            value="${escapeAttr(state.newsletterEmail)}"
          />
          <button class="button button--primary" type="submit">Join newsletter</button>
        </form>
        <p class="newsletter-note${state.newsletterEmail ? ' newsletter-note--success' : ''}" id="newsletter-note">
          ${renderNewsletterNote()}
        </p>
      </section>

      <footer class="site-footer">
        <div>
          <a class="brand brand--footer" href="#featured">
            <span class="brand__mark">N</span>
            <span>NovaWear</span>
          </a>
          <p class="footer-copy">
            Elevated everyday footwear for movement, ease, and repeat wear.
          </p>
        </div>
        <div class="footer-links">
          <a href="#best-sellers">Shop</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <a href="#newsletter">Newsletter</a>
        </div>
      </footer>
    </main>

    ${renderQuickView()}
  `

  bindEvents()
}

function closeModal() {
  state.selectedProductId = null
  renderApp()
}

function openModal(productId) {
  state.selectedProductId = productId
  renderApp()
  app.querySelector('.modal-close')?.focus()
}

function bindEvents() {
  app.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter
      renderApp()
    })
  })

  app.querySelectorAll('[data-add-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      state.cart = [...state.cart, button.dataset.addCart]
      saveCart()
      renderApp()
      document.querySelector('#cart-preview')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  })

  app.querySelectorAll('[data-remove-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = state.cart.indexOf(button.dataset.removeCart)
      if (index !== -1) {
        const next = [...state.cart]
        next.splice(index, 1)
        state.cart = next
        saveCart()
        renderApp()
      }
    })
  })

  app.querySelectorAll('[data-quick-view]').forEach((button) => {
    button.addEventListener('click', () => {
      openModal(button.dataset.quickView)
    })
  })

  app.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event.currentTarget === event.target || button.classList.contains('modal-close')) {
        closeModal()
      }
    })
  })

  app.querySelector('#newsletter-form')?.addEventListener('submit', (event) => {
    event.preventDefault()

    const input = app.querySelector('#email')

    if (input) {
      state.newsletterEmail = input.value.trim()
      saveNewsletterEmail(state.newsletterEmail)
      renderApp()
    }
  })
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.selectedProductId) {
    closeModal()
  }
})

renderApp()
