import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { company } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gosourceindia.com"), // TODO: your real domain
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s — ${company.name}`,
  },
  description:
    "Sourcing partner for soft furnishings, floor coverings, apparel and handicrafts from India. Vetted factory network, floor-level quality control and export coordination.",
  keywords: [
    "India sourcing agent",
    "home textiles supplier India",
    "rug supplier India",
    "apparel sourcing India",
    "handicrafts sourcing India",
    "soft furnishings exporter",
    "private label manufacturing India",
  ],
  openGraph: {
    type: "website",
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description: company.positioning,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-indigo-deep focus:px-4 focus:py-2 focus:text-bone"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
