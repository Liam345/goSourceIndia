import Link from "next/link";
import { company, contact, nav } from "@/content/site";
import { Container } from "@/components/ui";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bone-deep">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg text-indigo-deep">
                GoSource
              </span>
              <span className="font-display text-lg text-clay">India</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {company.tagline}.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-indigo-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/enquiry"
                  className="text-sm text-muted transition-colors hover:text-indigo-deep"
                >
                  Request a quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-indigo-deep"
                >
                  {contact.email}
                </a>
              </li>
              {contact.addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
