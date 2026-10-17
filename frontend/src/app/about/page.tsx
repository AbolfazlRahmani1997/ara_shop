import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "درباره ما",
};

const faqs = [
  {
    q: "آیا محصولات اصل هستند؟",
    a: "بله؛ آرا روی اصالت کالا حساس است و محصولات از مسیرهای معتبر تأمین می‌شوند.",
  },
  {
    q: "دستیار زیبایی چطور کار می‌کند؟",
    a: "با چند سؤال درباره نوع پوست، دغدغه‌ها و بودجه، پیشنهاد محصول می‌دهد. این پیشنهاد جنبه آموزشی دارد.",
  },
  {
    q: "ارسال به سراسر ایران دارید؟",
    a: "بله؛ زمان تحویل بسته به شهر مقصد متفاوت است و در چک‌اوت نمایش داده می‌شود.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="ABOUT"
        title="درباره آرا"
        description="آرا یک فروشگاه زیبایی فارسی است که انتخاب محصول را با کمک هوش مصنوعی ساده‌تر می‌کند."
      />

      <section className="rounded-2xl border border-line bg-white p-6 leading-8 text-muted-strong">
        <p>
          مأموریت ما این است که زیبایی را متناسب با پوست، سبک زندگی و بودجه تو
          شخصی‌سازی کنیم؛ بدون شلوغی، بدون ادعاهای پزشکی اغراق‌آمیز.
        </p>
        <p className="mt-4">
          از مراقبت پوست تا آرایش و عطر، تمرکز آرا روی تجربه تمیز، اعتماد و
          پیشنهاد هوشمند است.
        </p>
        <Link href="/ai-assistant" className="mt-6 inline-block">
          <Button>شروع مشاوره رایگان</Button>
        </Link>
      </section>

      <section id="faq" className="mt-10">
        <h2 className="text-2xl font-extrabold text-ink">سوالات متداول</h2>
        <div className="mt-5 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border border-line bg-white p-4"
            >
              <summary className="cursor-pointer list-none font-bold text-ink">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-8 text-muted-strong">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-10 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-xl font-extrabold text-ink">تماس با ما</h2>
        <p className="mt-3 text-sm leading-8 text-muted-strong">
          ایمیل پشتیبانی: support@ara.beauty
          <br />
          ساعات پاسخگویی: ۹ تا ۱۸
        </p>
      </section>

      <section id="privacy" className="mt-8 text-sm leading-8 text-muted-strong">
        <h2 className="text-lg font-extrabold text-ink">حریم خصوصی</h2>
        <p className="mt-2">
          داده‌های مشاوره‌ای فقط برای پیشنهاد محصول استفاده می‌شوند و بدون رضایت
          تو به اشتراک گذاشته نمی‌شوند.
        </p>
      </section>

      <section id="terms" className="mt-8 text-sm leading-8 text-muted-strong">
        <h2 className="text-lg font-extrabold text-ink">شرایط استفاده</h2>
        <p className="mt-2">
          استفاده از فروشگاه به معنای پذیرش قوانین خرید، مرجوعی و اصالت کالاست.
        </p>
      </section>

      <section
        id="authenticity"
        className="mt-8 text-sm leading-8 text-muted-strong"
      >
        <h2 className="text-lg font-extrabold text-ink">ضمانت اصالت</h2>
        <p className="mt-2">
          در صورت اثبات غیر اصل بودن کالا، امکان مرجوعی و بازگشت وجه فراهم است.
        </p>
      </section>
    </div>
  );
}
