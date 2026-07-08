import * as React from "react";
import { clsx } from "clsx";

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <button
      className={clsx(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-sienna/40 disabled:opacity-50",
        variant === "primary" && "bg-ink text-paper hover:bg-ink/90 dark:bg-paper dark:text-ink",
        variant === "secondary" &&
          "border border-border bg-surface text-ink hover:bg-paper dark:border-white/10 dark:bg-nightSurface dark:text-paper",
        variant === "ghost" &&
          "text-muted hover:bg-ink/5 dark:text-white/70 dark:hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={clsx(
        "rounded-lg border border-border bg-surface p-5 shadow-[0_20px_60px_rgba(23,20,18,0.06)] dark:border-white/10 dark:bg-nightSurface",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted dark:border-white/10 dark:text-white/70",
        className,
      )}
      {...props}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="h-11 w-full rounded-md border border-border bg-white px-3 text-sm outline-none transition placeholder:text-muted focus:border-sienna focus:ring-2 focus:ring-sienna/15 dark:border-white/10 dark:bg-nightSurface"
      {...props}
    />
  );
}

export function Sheet({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-t-xl border border-border bg-surface p-6 shadow-2xl dark:border-white/10 dark:bg-nightSurface",
        className,
      )}
      {...props}
    />
  );
}
