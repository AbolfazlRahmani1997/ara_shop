import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageClient } from "@/components/SearchPageClient";

export const metadata: Metadata = {
  title: "جستجو",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted">در حال بارگذاری...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
