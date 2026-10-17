import type { Brand } from "@/types";

type BrandLogoProps = {
  brand: Brand;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ brand, className = "", priority = false }: BrandLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brand.logo}
      alt={`لوگوی ${brand.name}`}
      className={`object-contain object-center ${className}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
