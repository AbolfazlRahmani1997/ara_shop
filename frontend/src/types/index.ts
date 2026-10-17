export type CategoryId =
  | "skincare"
  | "makeup"
  | "haircare"
  | "fragrance";

export type SubcategoryId =
  | "cleanser"
  | "toner"
  | "moisturizer"
  | "sunscreen"
  | "serum"
  | "eye-cream"
  | "acne"
  | "makeup"
  | "haircare"
  | "fragrance";

export type SkinTypeId =
  | "dry"
  | "oily"
  | "combination"
  | "sensitive"
  | "normal";

export type ProductFeatureId =
  | "paraben-free"
  | "vegan"
  | "hypoallergenic"
  | "high-volume"
  | "brightening";

export type Category = {
  id: CategoryId;
  title: string;
  href: string;
  tone: "blush" | "cream" | "rose" | "sand";
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  brandId: string;
  title: string;
  name?: string;
  category: CategoryId;
  subcategory: SubcategoryId;
  rating: number;
  reviewCount: number;
  price: number;
  compareAtPrice?: number;
  discount?: number;
  imageLabel: string;
  image?: string;
  href: string;
  tags: string[];
  skinTypes: SkinTypeId[];
  features: ProductFeatureId[];
  salesCount: number;
  createdAt: string;
  inStock: boolean;
  description: string;
  ingredients: string[];
  benefits: string[];
};

export type Brand = {
  id: string;
  name: string;
  country: string;
  description: string;
  logo: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type MagazineArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  coverTone: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type BeautyAssistantRequest = {
  skinType: string;
  concerns: string[];
  budget: number;
  category?: string;
};

export type BeautyAssistantResponse = {
  message: string;
  recommendedProductIds: string[];
};

export type ProductSort =
  | "popular"
  | "newest"
  | "price_asc"
  | "price_desc"
  | "discount"
  | "rating";

export type ProductQueryParams = {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  brand?: string;
  skinType?: string;
  minPrice?: number;
  maxPrice?: number;
  feature?: string;
  sort?: ProductSort | string;
  q?: string;
};

export type ProductQueryResult = {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
