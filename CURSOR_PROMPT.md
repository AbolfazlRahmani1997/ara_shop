# Cursor Prompt — ARA Beauty Landing Page

You are a senior frontend engineer and UI/UX implementer.

Build the ARA Beauty Persian RTL landing page based on the attached reference UI.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Lucide React for icons
- No unnecessary UI libraries
- Fully responsive

## Brand
Name: آرا / ARA
Domain style: Persian beauty e-commerce
Visual direction: minimal luxury, warm cream + blush pink, lots of whitespace, soft borders, subtle shadows.

## Main goal
The landing page should convert visitors into users of the AI Beauty Assistant and buyers of beauty products.

## Sections
1. Sticky responsive header
   - ARA logo
   - Products
   - Brands
   - Skincare routine
   - Beauty magazine
   - Search
   - Wishlist
   - Cart
   - Login/Register
   - On mobile: hamburger + logo + cart

2. Hero
   - Eyebrow: AI POWERED BEAUTY
   - H1: «زیبایی، متناسب با تو»
   - Supporting copy
   - Primary CTA: «شروع مشاوره رایگان»
   - Secondary CTA: «مشاهده محصولات»
   - Trust signals: authentic products, fast delivery, secure payment
   - Elegant beauty visual
   - Do NOT overcrowd the hero with cards.

3. Categories
   - مراقبت پوست
   - آرایش صورت
   - مراقبت مو
   - عطر و بدن
   - Horizontal scroll on mobile.

4. Recommended products
   - 4-column desktop
   - 2-column mobile
   - Product image, brand, title, rating, price, add-to-cart
   - Heart/wishlist action
   - Clean cards with generous whitespace.

5. AI Beauty Assistant
   - Prominent but visually lighter than the hero.
   - Title: «دستیار زیبایی آرا»
   - Explain that it asks a few questions and recommends suitable products.
   - CTA: «شروع مشاوره رایگان»
   - Use a phone/chat mockup.
   - On mobile, stack content vertically.

6. Trusted brands
   - Horizontal brand strip.
   - Scrollable on mobile.

7. Footer / service benefits
   - Expert consultation
   - Authentic products
   - Fast delivery
   - Links and legal info.

## Responsive rules
Desktop >= 1200:
- Max content width around 1280–1360px.
- Spacious layout.
- Hero split layout.

Tablet 768–1199:
- Compact header.
- Hero becomes simpler.
- 2-column product grid.
- AI section remains 2-column where possible.

Mobile <= 767:
- RTL.
- Hamburger navigation.
- Hero becomes vertical.
- Only one dominant CTA.
- Categories horizontal scroll.
- Products 2 columns.
- AI section vertical.
- Brands horizontal scroll.
- Footer becomes accordion-style.
- No horizontal page overflow.
- Minimum touch target 44px.
- Avoid tiny text.
- Keep generous spacing.

## UX/accessibility
- Semantic HTML.
- Keyboard accessible controls.
- Visible focus states.
- Good color contrast.
- Alt text for meaningful images.
- Respect prefers-reduced-motion.
- Follow WCAG 2.2 AA principles.
- Use proper Persian RTL typography and punctuation.

## Code quality
- Componentize:
  Header
  Hero
  CategoryGrid
  ProductCard
  ProductSection
  AIAssistant
  BrandStrip
  Footer
- Keep product/category data in typed arrays.
- Avoid hardcoded repeated JSX.
- Use reusable Button and Card components where appropriate.
- No giant component.
- No fake backend logic.
- Add TODO comments where API integration will later happen.

## AI integration placeholder
Create a clean interface for:
POST /api/beauty-assistant

Request:
{
  skinType: string,
  concerns: string[],
  budget: number,
  category?: string
}

Response:
{
  message: string,
  recommendedProductIds: string[]
}

For now mock the API and keep the frontend ready for real integration.

## Important
Do not copy the reference image literally.
Recreate the layout system, hierarchy, spacing, responsiveness and visual language as real HTML/CSS/React components.

Before finishing:
- Run lint/typecheck.
- Check desktop 1440px.
- Check tablet 768px.
- Check mobile 375px.
- Fix all horizontal overflow.
- Make sure Persian RTL layout works correctly.
