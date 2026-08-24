import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section className={`py-20 sm:py-28 ${className}`}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{lead}</p>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-deep";
  const variants = {
    primary: "bg-indigo-deep text-bone hover:bg-indigo",
    secondary:
      "border border-line bg-transparent text-ink hover:border-indigo-deep hover:text-indigo-deep",
    ghost: "text-indigo-deep hover:text-clay",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 ${className}`}
    >
      <path
        d="M3 8.5l3.2 3.2L13 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Bordered fact row — used for MOQ / lead time / compliance blocks. */
export function SpecList({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="divide-y divide-line-soft border-y border-line-soft">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <dt className="w-44 shrink-0 text-sm font-medium text-muted">
            {item.label}
          </dt>
          <dd className="text-sm leading-relaxed text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Placeholder for photography. Swap these for real factory and product photos
 * as soon as you have them — stock imagery is the fastest way to look like a
 * broker rather than a producer.
 */
export function ImagePlaceholder({
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`${ratio} ${className} flex items-center justify-center overflow-hidden rounded-lg border border-line bg-bone-deep`}
    >
      <div className="px-6 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="mx-auto h-7 w-7 text-line"
        >
          <path
            d="M3 5.5A1.5 1.5 0 014.5 4h15A1.5 1.5 0 0121 5.5v13a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5v-13z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M3 16l5-4 4 3 3.5-3L21 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-2 text-xs font-medium tracking-wide text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}
