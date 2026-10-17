export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white p-3">
      <div className="aspect-square animate-pulse rounded-[14px] bg-[linear-gradient(90deg,#f3ece9_25%,#faf6f4_37%,#f3ece9_63%)] bg-[length:400%_100%] motion-safe:[animation:shimmer_1.4s_ease_infinite]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-1/3 rounded bg-[#f3ece9]" />
        <div className="h-4 w-4/5 rounded bg-[#f3ece9]" />
        <div className="h-3 w-1/2 rounded bg-[#f3ece9]" />
        <div className="h-4 w-2/3 rounded bg-[#f3ece9]" />
        <div className="mt-2 h-10 rounded-xl bg-[#f3ece9]" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
