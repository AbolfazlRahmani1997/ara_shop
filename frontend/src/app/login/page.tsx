"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    // TODO: integrate auth API
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    router.push("/profile");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-16">
      <PageHeader
        eyebrow="ACCOUNT"
        title={mode === "login" ? "ورود" : "ثبت‌نام"}
        description="برای ذخیره علاقه‌مندی‌ها و پیگیری سفارش وارد شو."
      />

      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-white p-1 border border-line">
        <button
          type="button"
          className={`min-h-11 rounded-xl text-sm font-bold ${mode === "login" ? "bg-brand text-white" : "text-ink"}`}
          onClick={() => setMode("login")}
        >
          ورود
        </button>
        <button
          type="button"
          className={`min-h-11 rounded-xl text-sm font-bold ${mode === "register" ? "bg-brand text-white" : "text-ink"}`}
          onClick={() => setMode("register")}
        >
          ثبت‌نام
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-line bg-white p-5"
      >
        {mode === "register" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-medium">نام</span>
            <input
              required
              className="h-12 w-full rounded-xl border border-line bg-cream/40 px-3 outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        ) : null}
        <label className="block">
          <span className="mb-2 block text-sm font-medium">ایمیل یا موبایل</span>
          <input
            required
            className="h-12 w-full rounded-xl border border-line bg-cream/40 px-3 outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">رمز عبور</span>
          <input
            type="password"
            required
            className="h-12 w-full rounded-xl border border-line bg-cream/40 px-3 outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <Button fullWidth size="lg" disabled={loading}>
          {loading
            ? "لطفاً صبر کن..."
            : mode === "login"
              ? "ورود"
              : "ایجاد حساب"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        یا{" "}
        <Link href="/ai-assistant" className="text-brand">
          بدون ورود مشاوره را شروع کن
        </Link>
      </p>
    </div>
  );
}
