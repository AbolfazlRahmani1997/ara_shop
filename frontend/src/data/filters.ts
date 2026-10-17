import type { SubcategoryId } from "@/types";

export type Subcategory = {
  id: SubcategoryId;
  title: string;
  category: "skincare" | "makeup" | "haircare" | "fragrance";
};

export const skincareSubcategories: Subcategory[] = [
  { id: "cleanser", title: "پاک‌کننده", category: "skincare" },
  { id: "toner", title: "تونر", category: "skincare" },
  { id: "moisturizer", title: "مرطوب‌کننده", category: "skincare" },
  { id: "sunscreen", title: "ضد آفتاب", category: "skincare" },
  { id: "serum", title: "سرم", category: "skincare" },
  { id: "eye-cream", title: "کرم دور چشم", category: "skincare" },
  { id: "acne", title: "ضدجوش", category: "skincare" },
];

export const skinTypeOptions = [
  { id: "dry", label: "خشک" },
  { id: "oily", label: "چرب" },
  { id: "combination", label: "مختلط" },
  { id: "sensitive", label: "حساس" },
  { id: "normal", label: "عادی" },
] as const;

export const featureOptions = [
  { id: "paraben-free", label: "بدون پارابن" },
  { id: "vegan", label: "وگان" },
  { id: "hypoallergenic", label: "ضد حساسیت" },
  { id: "high-volume", label: "حجم بالا" },
  { id: "brightening", label: "روشن‌کننده" },
] as const;

export const sortOptions = [
  { id: "popular", label: "پرفروش‌ترین" },
  { id: "newest", label: "جدیدترین" },
  { id: "price_asc", label: "ارزان‌ترین" },
  { id: "price_desc", label: "گران‌ترین" },
  { id: "discount", label: "بیشترین تخفیف" },
  { id: "rating", label: "بیشترین امتیاز" },
] as const;

export const categoryHeroCopy: Record<
  string,
  { title: string; subtitle: string }
> = {
  skincare: {
    title: "مراقبت از پوست",
    subtitle: "پوستی سالم‌تر، درخشان‌تر، با اعتماد به نفس بیشتر",
  },
  makeup: {
    title: "آرایش صورت",
    subtitle: "رنگ‌ها و بافت‌هایی برای هر سلیقه و مناسبت",
  },
  haircare: {
    title: "مراقبت مو",
    subtitle: "موهایی سالم‌تر، براق‌تر و مراقبت‌شده",
  },
  fragrance: {
    title: "عطر و بدن",
    subtitle: "رایحه‌ها و مراقبت بدن برای حس تازگی هرروزه",
  },
  default: {
    title: "محصولات آرا",
    subtitle: "زیبایی، متناسب با تو — انتخابی مطمئن از برندهای معتبر",
  },
};
