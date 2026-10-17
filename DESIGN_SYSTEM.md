# ARA React — Visual Reference & Design System

## Brand
- Name: آرا
- Latin: ARA
- Product: Persian RTL beauty e-commerce + AI Beauty Assistant
- Personality: minimal, premium, warm, trustworthy, feminine but not overly decorative.

## Color system
Use CSS variables:
--bg: #FCFAF8
--surface: #FFFFFF
--surface-soft: #FBF0ED
--text: #191717
--muted: #756D6A
--primary: #D04463
--primary-dark: #B83250
--border: #EEE4DF
--success: #4E8A68

Do not use heavy gradients. Gradients are allowed only in large hero/AI promotional backgrounds.

## Typography
Persian-first UI. Prefer Vazirmatn or another high-quality Persian web font.
- Display: 56–76px desktop, 42–50px tablet, 36–44px mobile
- H2: 30–40px desktop, 26–32px tablet, 23–28px mobile
- Body: 15–18px desktop, 14–16px mobile
- Small: 11–13px
- Line-height for Persian body: around 1.9–2.1

## Layout
- Desktop content max-width: 1280–1360px
- Desktop side padding: 40–64px
- Tablet side padding: 24–32px
- Mobile side padding: 16–20px
- Border radius: 14–24px
- Shadows should be subtle and rare.

## Responsive breakpoints
- Mobile: <= 767px
- Tablet: 768–1199px
- Desktop: >= 1200px

## Home page
Order:
1. Header
2. Hero
3. Category cards
4. Recommended products
5. AI Beauty Assistant
6. Trusted brands
7. Service benefits
8. Footer

### Header
Desktop:
logo | nav | search | wishlist | cart | login
Mobile:
hamburger | centered logo | cart
Search becomes a full-width row under header.

### Hero
Desktop: 2-column layout.
Left/text side: eyebrow, headline, description, 2 CTAs, 3 trust signals.
Right/visual side: premium beauty image.
Do not place a large AI questionnaire card beside the hero on mobile.

Mobile:
- image and content stack
- one dominant CTA
- secondary CTA can be text/outline
- trust signals become 3 compact items
- hero must not exceed roughly 650–750px height.

### Categories
Desktop: 4 cards.
Mobile: horizontal scroll, 2.5–3 cards visible.
Use real imagery or clean product/category illustrations.

### Products
Desktop: 4 cards.
Tablet: 3 cards.
Mobile: 2 cards.
Card:
wishlist → image → brand → product name → rating → price → add-to-cart.

### AI Beauty Assistant
Desktop: split layout, phone mockup on one side, copy/CTA on the other.
Tablet: still split but tighter.
Mobile: stacked; phone smaller; copy below.
The AI section should feel important but visually lighter than the hero.

## Component states
### ProductCard
- default
- hover
- wishlist active
- out of stock
- discount
- loading skeleton

### Button
- primary
- secondary
- ghost
- disabled
- loading

### AI Assistant
States:
1. welcome
2. skin type
3. concerns
4. budget
5. category
6. loading/recommendations
7. result cards
8. retry / edit answers

## AI result
Show:
- short personalized explanation
- 3 recommended products
- reason for each recommendation
- price
- rating
- add to cart
- "تغییر پاسخ‌ها"

Never present medical diagnosis as fact.

## Product detail reference
Suggested layout:
breadcrumb
gallery | product information
brand
product name
rating/reviews
price
variant/shade
quantity
add to cart
authenticity/delivery benefits
description
ingredients
reviews
related products

Mobile:
gallery first, sticky bottom add-to-cart.

## Search
Desktop:
search bar + filter sidebar + product grid.
Mobile:
search bar + filter button + sort button + product grid.

## Accessibility
- RTL semantic HTML
- WCAG 2.2 AA principles
- minimum touch target 44x44px
- visible keyboard focus
- alt text
- do not rely on color alone
- respect prefers-reduced-motion
- avoid low contrast pink text on white

## Important visual rule
The design should feel spacious. Do not add cards, badges, gradients, icons or decorative elements unless they serve a clear hierarchy or interaction.
