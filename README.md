# NovaWear

NovaWear is a premium e-commerce storefront concept built with Vite and vanilla JavaScript. The goal of the project is to present a portfolio-ready shopping experience with stronger merchandising, clearer trust signals, and lightweight commerce interactions.

## Highlights

- Editorial homepage structure with hero, collections, best sellers, reviews, FAQ, newsletter, and footer
- Interactive product filtering by category
- Mini-cart preview with add and remove actions
- Quick-view modal for richer product interaction
- Newsletter capture flow with local persistence for demo purposes
- Responsive layout tuned for desktop and mobile presentation

## Stack

- Vite
- Vanilla JavaScript
- CSS

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Demo notes

- The cart and newsletter are frontend demo flows only.
- Cart state and newsletter email are stored in `localStorage`.
- Product data and imagery are currently mocked for presentation purposes.

## Good next upgrades

- Replace placeholder product visuals with real branded product photography
- Connect the newsletter form to a real provider such as ConvertKit, Mailchimp, or a form backend
- Replace the mock checkout CTA with a real cart and checkout flow
- Add a dedicated product detail page and stronger analytics instrumentation
