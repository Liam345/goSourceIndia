"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, nav } from "@/content/site";
import { Container } from "@/components/ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);
  const headerContainerClassName = "max-w-[116rem]";

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-bone/85 backdrop-blur-md">
      <Container className={headerContainerClassName}>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            aria-label={`${company.name} home`}
          >
            <span className="font-display text-2xl text-indigo-deep">
              GoSource
            </span>
            <span className="font-display text-2xl text-clay">India</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.9375rem] font-medium transition-colors ${
                    active
                      ? "text-indigo-deep"
                      : "text-ink-soft hover:text-indigo-deep"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/enquiry"
              className="rounded-full bg-indigo-deep px-6 py-3 text-[0.9375rem] font-medium text-bone transition-colors hover:bg-indigo"
            >
              Request a quote
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-line-soft bg-bone md:hidden">
          <Container className={headerContainerClassName}>
            <nav className="flex flex-col py-4" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-line-soft py-3 text-sm text-ink-soft"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/enquiry"
                onClick={closeMenu}
                className="mt-4 rounded-full bg-indigo-deep px-5 py-3 text-center text-sm font-medium text-bone"
              >
                Request a quote
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
