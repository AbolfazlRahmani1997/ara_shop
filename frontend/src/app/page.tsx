import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductSection } from "@/components/ProductSection";
import { AIAssistant } from "@/components/AIAssistant";
import { BrandStrip } from "@/components/BrandStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductSection />
      <AIAssistant />
      <BrandStrip />
    </>
  );
}
