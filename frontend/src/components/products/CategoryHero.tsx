import Image from "next/image";
import { categoryHeroCopy } from "@/data/filters";

type CategoryHeroProps = {
  category?: string;
};

export function CategoryHero({ category = "" }: CategoryHeroProps) {
  const copy = categoryHeroCopy[category] ?? categoryHeroCopy.default;
  const imageSrc =
    category === "makeup"
      ? "/banners/makeup.png"
      : category === "fragrance"
        ? "/banners/new-arrivals.png"
        : "/banners/skincare.png";

  return (
    <section className="relative mb-5 overflow-hidden rounded-[20px] border border-line bg-[linear-gradient(100deg,#fff,#f8f1ef)] sm:mb-6 sm:rounded-[24px]">
      <div className="grid min-h-[140px] grid-cols-[1.1fr_0.9fr] sm:min-h-[180px] lg:min-h-[220px]">
        <div className="flex flex-col justify-center px-4 py-5 sm:px-7 sm:py-6 lg:px-9">
          <h1 className="text-xl font-extrabold text-ink sm:text-3xl lg:text-[34px]">
            {copy.title}
          </h1>
          <p className="mt-2 max-w-md text-xs leading-6 text-muted-strong sm:mt-3 sm:text-sm sm:leading-7">
            {copy.subtitle}
          </p>
        </div>
        <div className="relative min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-left"
            sizes="(max-width: 768px) 45vw, 40vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#f8f1ef]/40" />
        </div>
      </div>
    </section>
  );
}
