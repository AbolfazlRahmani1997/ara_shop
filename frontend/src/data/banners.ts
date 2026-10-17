export type PromoBanner = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const promoBanners: PromoBanner[] = [
  {
    id: "skincare",
    title: "پوستی درخشان‌تر",
    description: "بهترین محصولات مراقبت پوست از برندهای معتبر جهانی",
    href: "/products?category=skincare",
    image: "/banners/skincare.png",
    imageAlt: "بنر مراقبت پوست آرا با محصولات La Roche-Posay، The Ordinary و CeraVe",
  },
  {
    id: "makeup",
    title: "آرایشی دلخواه تو",
    description: "رنگ‌ها، سبک‌ها و برندهای محبوب برای هر سلیقه",
    href: "/products?category=makeup",
    image: "/banners/makeup.png",
    imageAlt: "بنر آرایش صورت آرا با محصولات آرایشی منتخب",
  },
  {
    id: "new-arrivals",
    title: "جدیدترین‌ها در آرا",
    description: "محصولات تازه از برندهای مطرح جهانی",
    href: "/products?sort=newest",
    image: "/banners/new-arrivals.png",
    imageAlt: "بنر جدیدترین محصولات آرا با عطر Gabrielle Chanel",
  },
];
