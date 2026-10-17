import Image from "next/image";
import Link from "next/link";
import { promoBanners } from "@/data/banners";

export function CategoryGrid() {
  return (
    <section className="bg-cream" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-[1360px] px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <h2 id="categories-heading" className="sr-only">
          دسته‌بندی‌ها و پیشنهادها
        </h2>

        <div className="flex items-stretch gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {promoBanners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="group relative block aspect-[644/355] w-[min(78vw,320px)] shrink-0 overflow-hidden rounded-[20px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:w-[min(60vw,420px)] md:w-auto motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_14px_30px_rgba(25,23,23,0.08)]"
            >
              <Image
                src={banner.image}
                alt={banner.imageAlt}
                width={644}
                height={355}
                className="absolute inset-0 size-full object-cover"
                sizes="(max-width: 768px) 78vw, 33vw"
              />
              <span className="sr-only">
                {banner.title}. {banner.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
