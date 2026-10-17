# CURSOR MASTER PROMPT — ARA BEAUTY / REACT

Build the ARA Persian RTL beauty e-commerce landing page in the current React + Vite + TypeScript project.

IMPORTANT:
- Do NOT use Next.js.
- Use React components.
- Use Tailwind CSS.
- Use Lucide React for icons.
- Read all reference files and the visual screenshots before implementing.
- Recreate the visual system and hierarchy, not a literal screenshot.
- Keep the code production-ready and componentized.

## Product
ARA / آرا is a beauty e-commerce platform with an AI Beauty Assistant.

Primary conversion:
"شروع مشاوره رایگان"

Secondary conversion:
"مشاهده محصولات"

## Required sections
1. Header
2. Hero
3. Categories
4. Recommended Products
5. AI Beauty Assistant
6. Trusted Brands
7. Service Benefits
8. Footer

## Responsive behavior
Desktop >=1200:
- max-width 1280–1360
- 4 product columns
- split hero
- split AI section

Tablet 768–1199:
- 3 product columns where space allows
- simplified navigation
- compact hero
- compact AI section

Mobile <=767:
- hamburger + centered logo + cart
- search row below header
- hero stacked
- one primary CTA
- categories horizontal scroll
- products 2 columns
- AI section stacked
- brands horizontal scroll
- no horizontal page overflow
- touch targets >=44px

## Visual direction
Minimal luxury Persian beauty:
- warm cream background
- blush pink primary
- dark charcoal text
- white surfaces
- subtle borders
- very light shadows
- large whitespace
- no visual clutter

## AI Assistant
Create a real React flow with local state:
welcome → skin type → concerns → budget → category → loading → results.

Use mock recommendation data initially.

API-ready interface:
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

## Product data
Create typed mock products with:
id, brand, name, category, price, rating, image, tags, skinTypes.

## Quality checklist
- npm run build must pass
- no TypeScript errors
- no horizontal overflow
- RTL correct
- responsive at 1440, 1024, 768, 375
- keyboard navigation
- focus states
- accessible buttons
- lazy-load non-critical images
- avoid unnecessary dependencies

Before coding, inspect the reference files and produce the implementation directly; do not ask me to confirm obvious design decisions.
