import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "soft";
type ButtonSize = "md" | "lg" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_28px_rgba(208,68,99,0.22)] hover:bg-brand-dark focus-visible:ring-brand/40",
  secondary:
    "bg-white text-ink border border-brand-muted hover:bg-cream focus-visible:ring-brand/30",
  ghost:
    "bg-transparent text-ink hover:bg-cream focus-visible:ring-brand/20",
  soft:
    "bg-blush text-brand-dark hover:bg-blush-deep focus-visible:ring-brand/30",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm rounded-xl",
  md: "min-h-12 px-5 text-sm rounded-xl",
  lg: "min-h-12 px-6 text-base rounded-xl sm:min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        "disabled:pointer-events-none disabled:opacity-50",
        "motion-safe:active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
