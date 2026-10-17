import type { MagazineArticle } from "@/types";

export const articles: MagazineArticle[] = [
  {
    id: "1",
    slug: "ai-skin-routine",
    title: "چطور با AI روتین پوستی بسازی؟",
    excerpt:
      "راهنمای قدم‌به‌قدم برای تشخیص نوع پوست و ساخت روتین صبح و شب متناسب با نیاز تو.",
    category: "روتین پوستی",
    readMinutes: 6,
    coverTone: "bg-[#f6e4e2]",
  },
  {
    id: "2",
    slug: "sunscreen-guide",
    title: "ضدآفتاب درست را چطور انتخاب کنیم؟",
    excerpt:
      "تفاوت بافت‌ها، SPF و فیلترها برای پوست چرب، خشک و حساس را ساده توضیح می‌دهیم.",
    category: "مراقبت پوست",
    readMinutes: 5,
    coverTone: "bg-[#eef5f0]",
  },
  {
    id: "3",
    slug: "clean-makeup-base",
    title: "زیرسازی تمیز برای آرایش ماندگار",
    excerpt:
      "از پاک‌سازی تا پرایمر؛ نکاتی برای پوست صاف‌تر و آرایشی که دیرتر می‌ریزد.",
    category: "آرایش",
    readMinutes: 4,
    coverTone: "bg-[#f7f1ee]",
  },
  {
    id: "4",
    slug: "fragrance-layering",
    title: "لایه‌بندی عطر مثل حرفه‌ای‌ها",
    excerpt:
      "چطور نت‌های گلی، چوبی و تازه را با هم ترکیب کنی تا رایحه مخصوص خودت بسازی.",
    category: "عطر",
    readMinutes: 7,
    coverTone: "bg-[#f3ebe4]",
  },
];

export function getArticleBySlug(slug: string): MagazineArticle | undefined {
  return articles.find((article) => article.slug === slug);
}
