"use client";

import type { ButtonHTMLAttributes } from "react";

interface BouncyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "yellow" | "muted";
}

const VARIANT_CLASSES: Record<
  NonNullable<BouncyButtonProps["variant"]>,
  string
> = {
  primary: "bg-primary-container text-white",
  yellow: "bg-secondary-container text-on-secondary-container [--pill-shadow-color:#d4b125]",
  muted: "bg-surface-variant text-on-surface-variant",
};

export default function BouncyButton({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...props
}: BouncyButtonProps) {
  return (
    <button
      type={type}
      className={`bouncy-pill ${VARIANT_CLASSES[variant]} inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-headline font-bold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
