import type {
  Product,
  ProductQueryParams,
  ProductQueryResult,
  ProductSort,
} from "@/types";
import { products as allProducts } from "@/data/products";

function sortProducts(list: Product[], sort?: ProductSort | string) {
  const next = [...list];
  switch (sort) {
    case "newest":
      return next.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "price_asc":
    case "price-asc":
      return next.sort((a, b) => a.price - b.price);
    case "price_desc":
    case "price-desc":
      return next.sort((a, b) => b.price - a.price);
    case "discount":
      return next.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
    case "rating":
      return next.sort((a, b) => b.rating - a.rating);
    case "popular":
    default:
      return next.sort((a, b) => b.salesCount - a.salesCount);
  }
}

export function queryProducts(
  params: ProductQueryParams = {},
): ProductQueryResult {
  let list = [...allProducts];

  if (params.q) {
    const q = params.q.toLowerCase();
    list = list.filter((product) =>
      [product.title, product.brand, product.description, ...product.tags]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }

  if (params.category) {
    list = list.filter((product) => product.category === params.category);
  }

  if (params.subcategory) {
    list = list.filter((product) => product.subcategory === params.subcategory);
  }

  if (params.brand) {
    const brands = params.brand.split(",").filter(Boolean);
    if (brands.length) {
      list = list.filter((product) => brands.includes(product.brandId));
    }
  }

  if (params.skinType) {
    const skins = params.skinType.split(",").filter(Boolean);
    if (skins.length) {
      list = list.filter((product) =>
        skins.some((skin) => product.skinTypes.includes(skin as never)),
      );
    }
  }

  if (params.feature) {
    const features = params.feature.split(",").filter(Boolean);
    if (features.length) {
      list = list.filter((product) =>
        features.some((feature) =>
          product.features.includes(feature as never),
        ),
      );
    }
  }

  if (typeof params.minPrice === "number") {
    list = list.filter((product) => product.price >= params.minPrice!);
  }

  if (typeof params.maxPrice === "number") {
    list = list.filter((product) => product.price <= params.maxPrice!);
  }

  list = sortProducts(list, params.sort);

  const page = Math.max(1, params.page ?? 1);
  const limit = Math.max(1, params.limit ?? 12);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);

  return { items, total, page, limit, totalPages };
}

export async function getProducts(
  params: ProductQueryParams = {},
): Promise<ProductQueryResult> {
  // TODO: replace with GET /api/v1/products
  await new Promise((resolve) => setTimeout(resolve, 180));
  return queryProducts(params);
}

export function getBrandCounts(category?: string) {
  const source = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;
  const counts = new Map<string, number>();
  for (const product of source) {
    counts.set(product.brandId, (counts.get(product.brandId) ?? 0) + 1);
  }
  return counts;
}

export function getSubcategoryCounts(category?: string) {
  const source = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;
  const counts = new Map<string, number>();
  for (const product of source) {
    counts.set(
      product.subcategory,
      (counts.get(product.subcategory) ?? 0) + 1,
    );
  }
  return counts;
}
