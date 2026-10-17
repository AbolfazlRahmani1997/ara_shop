import { NextResponse } from "next/server";
import type {
  BeautyAssistantRequest,
  BeautyAssistantResponse,
  SkinTypeId,
} from "@/types";
import { products } from "@/data/products";

const skinMap: Record<string, SkinTypeId> = {
  چرب: "oily",
  خشک: "dry",
  مختلط: "combination",
  حساس: "sensitive",
  عادی: "normal",
};

export async function POST(request: Request) {
  let body: BeautyAssistantRequest;

  try {
    body = (await request.json()) as BeautyAssistantRequest;
  } catch {
    return NextResponse.json(
      { message: "بدنه درخواست نامعتبر است." },
      { status: 400 },
    );
  }

  if (
    !body.skinType ||
    !Array.isArray(body.concerns) ||
    typeof body.budget !== "number"
  ) {
    return NextResponse.json(
      { message: "فیلدهای ضروری ناقص هستند." },
      { status: 400 },
    );
  }

  // TODO: connect to real recommendation engine / LLM service
  let pool = products.filter((product) => product.inStock);
  const mappedSkin = skinMap[body.skinType] ?? (body.skinType as SkinTypeId);

  if (body.category) {
    const byCategory = pool.filter(
      (product) => product.category === body.category,
    );
    if (byCategory.length > 0) pool = byCategory;
  }

  pool = pool.filter((product) => product.price <= body.budget);
  if (pool.length === 0) {
    pool = products.filter((product) => product.inStock).slice(0, 6);
  }

  const scored = pool
    .map((product) => {
      let score = product.rating + product.salesCount / 1000;
      if (product.skinTypes.includes(mappedSkin)) score += 2;
      for (const concern of body.concerns) {
        if (
          product.tags.some((tag) => concern.includes(tag)) ||
          product.description.includes(concern)
        ) {
          score += 1;
        }
      }
      return { product, score };
    })
    .sort((a, b) => b.score - a.score);

  const recommended = scored.slice(0, 3).map((item) => item.product);

  const response: BeautyAssistantResponse = {
    message: `برای پوست ${body.skinType} و دغدغه‌های «${body.concerns.join("، ")}»، این گزینه‌ها می‌توانند نقطه شروع خوبی باشند.`,
    recommendedProductIds: recommended.map((product) => product.id),
  };

  return NextResponse.json(response);
}
