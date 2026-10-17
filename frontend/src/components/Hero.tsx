import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="top"
      className="bg-cream"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-[1360px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        <div className="relative overflow-hidden rounded-[22px] sm:rounded-[28px]">
          <Image
            src="/banners/hero.png"
            alt="آرا بیوتی — زیبایی متناسب با تو؛ مشاوره هوشمند زیبایی"
            width={1967}
            height={422}
            priority
            className="h-auto w-full object-cover"
            sizes="(max-width: 1360px) 100vw, 1360px"
          />

          <Link
            href="/ai-assistant"
            className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-inset"
            aria-label="شروع مشاوره رایگان"
          >
            <span className="sr-only">شروع مشاوره رایگان</span>
          </Link>
        </div>

        <div className="sr-only">
          <p>AI POWERED BEAUTY</p>
          <h1 id="hero-heading">زیبایی، متناسب با تو</h1>
          <p>
            با کمک هوش مصنوعی آرا، محصولات مناسب نوع پوست، سبک زندگی و سلیقه‌ات را
            پیدا کن.
          </p>
          <ul>
            <li>محصولات اصل با ضمانت اصالت</li>
            <li>ارسال سریع به سراسر ایران</li>
            <li>پرداخت امن از درگاه‌های معتبر</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
