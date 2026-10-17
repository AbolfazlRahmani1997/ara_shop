import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "skincare",
    title: "مراقبت پوست",
    href: "/products?category=skincare",
    tone: "blush",
    description: "پاک‌سازی، آبرسانی و ضدآفتاب",
  },
  {
    id: "makeup",
    title: "آرایش صورت",
    href: "/products?category=makeup",
    tone: "cream",
    description: "رژ، ریمل، کرم‌پودر و بیشتر",
  },
  {
    id: "haircare",
    title: "مراقبت مو",
    href: "/products?category=haircare",
    tone: "rose",
    description: "شامپو، سرم و مراقبت تخصصی",
  },
  {
    id: "fragrance",
    title: "عطر و بدن",
    href: "/products?category=fragrance",
    tone: "sand",
    description: "عطر، بادی‌میست و مراقبت بدن",
  },
];
