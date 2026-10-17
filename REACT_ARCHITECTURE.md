# ARA React Implementation Notes

## Stack
React + Vite + TypeScript + Tailwind CSS + React Router + Lucide React.

Do NOT use Next.js.

## Suggested structure
src/
  components/
    Header/
    Hero/
    CategoryGrid/
    ProductCard/
    ProductSection/
    AIAssistant/
    BrandStrip/
    ServiceBenefits/
    Footer/
  pages/
    Home/
    Product/
    Search/
    Cart/
    Checkout/
    Profile/
    AIAssistant/
  data/
    products.ts
    categories.ts
    brands.ts
  services/
    ai.ts
    products.ts
  types/
    product.ts
    ai.ts
  App.tsx
  main.tsx
  index.css

## Rules
- Use typed data arrays instead of repeating JSX.
- Build reusable components.
- Keep pages thin.
- No giant App.tsx.
- Use mock data initially.
- Keep AI API behind src/services/ai.ts.
- Keep product API behind src/services/products.ts.
- Make all components responsive.
- Preserve RTL at the document level.
