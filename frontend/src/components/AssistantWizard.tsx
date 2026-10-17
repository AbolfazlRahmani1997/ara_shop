"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { getProductById } from "@/data/products";
import type { BeautyAssistantResponse } from "@/types";

const skinTypes = ["چرب", "خشک", "مختلط", "حساس"] as const;
const concerns = [
  "آبرسانی",
  "جوش و منافذ",
  "یکنواختی رنگ پوست",
  "ضدپیری",
  "حساسیت و قرمزی",
] as const;
const budgets = [
  { label: "تا ۱ میلیون", value: 1_000_000 },
  { label: "تا ۲ میلیون", value: 2_000_000 },
  { label: "تا ۵ میلیون", value: 5_000_000 },
  { label: "بدون محدودیت", value: 20_000_000 },
] as const;
const categoryOptions = [
  { label: "مراقبت پوست", value: "skincare" },
  { label: "آرایش", value: "makeup" },
  { label: "عطر و بدن", value: "fragrance" },
  { label: "مراقبت مو", value: "haircare" },
] as const;

type Step =
  | "welcome"
  | "skin"
  | "concerns"
  | "budget"
  | "category"
  | "loading"
  | "results";

export function AssistantWizard() {
  const [step, setStep] = useState<Step>("welcome");
  const [skinType, setSkinType] = useState<string>("");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(2_000_000);
  const [category, setCategory] = useState<string>("skincare");
  const [result, setResult] = useState<BeautyAssistantResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recommended = useMemo(
    () =>
      (result?.recommendedProductIds ?? [])
        .map((id) => getProductById(id))
        .filter(Boolean),
    [result],
  );

  function toggleConcern(value: string) {
    setSelectedConcerns((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  function reset() {
    setStep("skin");
    setResult(null);
    setError(null);
  }

  async function fetchRecommendations() {
    setStep("loading");
    setError(null);
    try {
      // TODO: replace with real beauty-assistant service
      const response = await fetch("/api/beauty-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skinType,
          concerns: selectedConcerns,
          budget,
          category,
        }),
      });
      if (!response.ok) throw new Error("failed");
      const data = (await response.json()) as BeautyAssistantResponse;
      setResult(data);
      setStep("results");
    } catch {
      setError("مشاوره الان در دسترس نیست. دوباره تلاش کن.");
      setStep("category");
    }
  }

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        eyebrow="AI BEAUTY ASSISTANT"
        title="دستیار زیبایی آرا"
        description="چند سؤال کوتاه؛ پیشنهاد شخصی‌سازی‌شده. این راهنما جایگزین تشخیص پزشکی نیست."
      />

      <div className="rounded-[24px] border border-line bg-white p-5 sm:p-8">
        {step === "welcome" ? (
          <div className="text-center">
            <p className="text-sm leading-8 text-muted-strong">
              آماده‌ای روتین و محصولات مناسب پوستت را پیدا کنی؟
            </p>
            <Button
              size="lg"
              className="mt-6"
              onClick={() => setStep("skin")}
            >
              شروع مشاوره
              <Sparkles className="size-4" />
            </Button>
          </div>
        ) : null}

        {step === "skin" ? (
          <StepFrame title="نوع پوستت چیه؟" onBack={() => setStep("welcome")}>
            <OptionGrid
              options={skinTypes.map((item) => ({ label: item, value: item }))}
              value={skinType}
              onChange={setSkinType}
            />
            <Button
              className="mt-6"
              disabled={!skinType}
              onClick={() => setStep("concerns")}
            >
              ادامه
            </Button>
          </StepFrame>
        ) : null}

        {step === "concerns" ? (
          <StepFrame title="بیشتر چه دغدغه‌ای داری؟" onBack={() => setStep("skin")}>
            <div className="flex flex-wrap gap-2">
              {concerns.map((item) => {
                const active = selectedConcerns.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleConcern(item)}
                    className={`min-h-11 rounded-full px-4 text-sm ${active ? "bg-brand text-white" : "bg-cream text-ink"}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <Button
              className="mt-6"
              disabled={selectedConcerns.length === 0}
              onClick={() => setStep("budget")}
            >
              ادامه
            </Button>
          </StepFrame>
        ) : null}

        {step === "budget" ? (
          <StepFrame title="بودجه‌ات چقدره؟" onBack={() => setStep("concerns")}>
            <OptionGrid
              options={budgets.map((item) => ({
                label: item.label,
                value: String(item.value),
              }))}
              value={String(budget)}
              onChange={(value) => setBudget(Number(value))}
            />
            <Button className="mt-6" onClick={() => setStep("category")}>
              ادامه
            </Button>
          </StepFrame>
        ) : null}

        {step === "category" ? (
          <StepFrame title="بیشتر دنبال چی هستی؟" onBack={() => setStep("budget")}>
            <OptionGrid
              options={categoryOptions.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              value={category}
              onChange={setCategory}
            />
            {error ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            <Button className="mt-6" onClick={fetchRecommendations}>
              دریافت پیشنهاد
              <Sparkles className="size-4" />
            </Button>
          </StepFrame>
        ) : null}

        {step === "loading" ? (
          <div className="py-10 text-center">
            <p className="text-lg font-extrabold text-ink">
              در حال آماده‌سازی پیشنهادها...
            </p>
            <p className="mt-2 text-sm text-muted">چند لحظه صبر کن</p>
          </div>
        ) : null}

        {step === "results" && result ? (
          <div>
            <p className="text-sm leading-8 text-muted-strong">{result.message}</p>
            <p className="mt-2 text-xs text-muted">
              پیشنهادها جنبه آموزشی دارند و تشخیص پزشکی نیستند.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((product) =>
                product ? (
                  <ProductCard key={product.id} product={product} />
                ) : null,
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="secondary" onClick={reset}>
                تغییر پاسخ‌ها
              </Button>
              <Link href="/products">
                <Button variant="ghost">مشاهده فروشگاه</Button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StepFrame({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-ink"
      >
        <ArrowRight className="size-4" />
        برگشت
      </button>
      <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`min-h-12 rounded-xl border px-4 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
              active
                ? "border-brand bg-brand text-white"
                : "border-line bg-cream text-ink hover:bg-blush"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
