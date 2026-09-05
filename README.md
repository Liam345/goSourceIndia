# GoSourceIndia

Buyer-facing site for GoSourceIndia — the landing point for cold email campaigns
targeting overseas buyers of soft furnishings, floor coverings, apparel and
handicrafts.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

---

## Before you send a single cold email

The site is complete and working, but it ships with **industry-typical
placeholders where your real business facts belong**. Buyers cross-check these
against what you say on a call, and a mismatch loses the deal faster than a
high price does.

Everything editable lives in one file: **`src/content/site.ts`**. Search it for
`TODO`. You should not need to touch any other file to change copy or numbers.

### The must-fix list

| What | Where | Why it matters |
|---|---|---|
| Contact email, phone, WhatsApp, address | `contact` in `site.ts` | Currently placeholders. A buyer who can't reach you doesn't try twice. |
| MOQs and lead times per category | `categories[].moq` / `.leadTime` | These are my industry defaults, **not your data**. |
| Certifications you can actually evidence | `certifications` | Only list what you can produce a valid scope certificate for on request. An unbacked claim ends the relationship. |
| Payment terms | `tradeTerms.paymentTerms` | Placeholder. |
| Your real founding story | `src/app/about/page.tsx` | Marked with a TODO. Specifics beat polish — buyers spot generic agency copy in two sentences. |
| Target markets line | bottom of `src/app/page.tsx` | Currently says EU/UK/US/Australia. |
| `metadataBase` domain | `src/app/layout.tsx` | Set to your real domain before deploying. |
| IE Code / GSTIN | `company` in `site.ts` | Export buyers look for these. |

### The hero

The headline is a fixed prefix (`We believe in`) plus a rotating second line,
with a three-cell media collage on the right. Both are configured in the `hero`
and `heroMedia` objects in `src/content/site.ts`.

**Rotating phrases** — keep them at or under ~22 characters so each sits on one
line at desktop width. The block reserves height for the longest phrase, which
is what stops the CTA below it jumping on every rotation; a long phrase
therefore leaves visible whitespace under the short ones.

**The collage carries the credibility.** Point each `src` at a file in
`/public`. Short silent video beats stills here by a wide margin — a moving
sewing line proves you have production in about two seconds, which is the
entire pitch. Keep clips 4–8 seconds, under ~2MB each, and add a `poster` frame
so nothing renders blank while loading.

Accessibility and motion are already handled: screen readers get one clean
static `h1` rather than a headline that rewrites itself every three seconds,
and the rotation freezes for anyone with `prefers-reduced-motion` set.

### Photography

Every image is currently a labelled placeholder (`ImagePlaceholder` in
`src/components/ui.tsx`). Replace them with **real photographs taken inside the
factories you work in** as soon as you have them. Stock imagery is the fastest
way to look like an agent who has never visited a floor — the exact opposite of
the site's whole positioning.

---

## Wiring up enquiries

The RFQ form posts to `src/app/api/rfq/route.ts`. Delivery is pluggable so you
can go live before committing to a CRM.

**Right now, with no email provider configured, enquiries are only written to
the server console.** In production that means a real buyer's RFQ lands in a
serverless log you are not watching. Configure this before launch — it is the
most expensive bug this site can have.

Create `.env.local` (see `.env.example`):

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
RFQ_TO_EMAIL=rfq@yourdomain.com
RFQ_FROM_EMAIL=enquiries@yourdomain.com   # must be a domain verified in Resend
```

Sign up at [resend.com](https://resend.com), verify your sending domain, and
paste the key. Free tier covers early volume comfortably.

Swapping to another provider (Postmark, SES, a CRM webhook) means changing one
`fetch` call in `route.ts` — the validation, honeypot and formatting stay.

### Form behaviour

- Required: name, company, email, country, category, product description
- Optional: phone, quantity, target price, delivery date, notes
- Honeypot field catches bots; they get a silent `200` so they don't learn
- `/enquiry?category=apparel` pre-selects a category — the category page CTAs
  use this, and it's useful for campaign-specific links in cold email

---

## Structure

```
src/
  content/site.ts          ← all business facts live here. Start here.
  app/
    page.tsx               home
    products/              index + [slug] category pages (statically generated)
    capabilities/          hidden future route for QC, compliance, certifications, trade terms
    process/               detailed sourcing process page
    about/                 hidden future route for story + positioning vs agents and single factories
    enquiry/               RFQ form
    api/rfq/route.ts       form handler
  components/
    ui.tsx                 Container, Section, buttons, SpecList, placeholders
    SiteHeader.tsx         sticky nav with mobile menu
    SiteFooter.tsx
    RfqForm.tsx            client form with validation and success state
```

Adding a category = adding one object to the `categories` array in `site.ts`.
The products index, the category page, the footer and the enquiry dropdown all
pick it up automatically.

Hidden future route: `/capabilities` still exists in the app for future
reference, but it is intentionally removed from public navigation and returns
the not-found page on direct visits.

Hidden future route: `/about` still exists in the app for future reference, but
it is intentionally removed from public navigation.

The `/process` route is a live page for the detailed GoSourceIndia sourcing
process. It is linked from the main navigation.

Detailed product capability pages also exist at `/products/[slug]`, generated
from `categories` in `site.ts`. They are kept for future reference, but the
Products listing is currently designed as a range overview and does not display
the “View capability” links.

---

## Deploying

Vercel is the path of least resistance:

```bash
npx vercel
```

Set the env vars above in the Vercel dashboard. Point your domain at it.

**Before launch:** use a real domain-matched inbox (`you@gosourceindia.com`,
not Gmail) — cold email deliverability and buyer trust both depend on it. If
you're running outbound at volume, send from a *separate* domain to protect the
main one's reputation.

---

## Deliberate omissions

- **No CMS.** `site.ts` is faster to edit than any admin panel at this stage.
- **No buyer portal / order tracking.** Worth building once real orders exist,
  not before.
- **No file upload on the RFQ form.** Buyers are asked to reply to the
  confirmation email with tech packs instead — no storage to manage, and it
  starts an email thread with the buyer, which is what you actually want.
- **No blog or SEO content engine.** The strategy here is outbound. Content
  marketing is a slower second channel worth adding once outbound is working.
