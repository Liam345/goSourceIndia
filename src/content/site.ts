/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH FOR EVERY BUSINESS FACT ON THE SITE.
 *
 * Edit this file and the whole site updates. You should not need to touch any
 * other file to change copy, numbers, MOQs, lead times, certifications or
 * contact details.
 *
 * ⚠️  NUMBERS MARKED `TODO` ARE INDUSTRY-TYPICAL PLACEHOLDERS, NOT YOUR DATA.
 *     Replace every one of them before you send a single cold email. Export
 *     buyers check these against what you say on a call, and a mismatch kills
 *     the deal faster than a high price.
 *
 * ⚠️  POSITIONING RULE: THE SITE MAKES NO CLAIM TO OWNING A FACTORY.
 *     Nothing here says "our own unit", "our lines", "we manufacture", or
 *     anything that implies GoSourceIndia owns production. The differentiator
 *     against a broker is instead: we choose the right factory, we are
 *     physically on the floor while the order runs, and one person stays
 *     accountable for it. Keep any copy you add on that side of the line.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const company = {
  name: "GoSourceIndia",
  tagline:
    "Sourcing partner for home textiles, floor coverings, apparel and handicrafts",
  // The one-sentence pitch. This is what lands in cold email and in the hero.
  positioning:
    "We are a sourcing partner in India, not a broker with an inbox. We select the factory, hold the spec through the run, inspect on the floor, and ship to your door.",
  foundedYear: 2026, // TODO: confirm
  legalName: "GoSourceIndia", // TODO: registered entity name for the footer
  ieCode: "", // TODO: Importer-Exporter Code — buyers look for this
  gstin: "", // TODO
};

export const contact = {
  email: "hello@gosourceindia.com", // TODO: use a real domain-matched inbox
  phone: "+91 00000 00000", // TODO
  whatsapp: "+910000000000", // TODO: digits only, used to build wa.me link
  addressLines: [
    "A-53, Sector 63",
    "Noida, Uttar Pradesh 201301",
    "India",
  ],
  // Where RFQ submissions get emailed. See src/app/api/rfq/route.ts
  rfqInbox: "rfq@gosourceindia.com", // TODO
};

/**
 * ── HERO ─────────────────────────────────────────────────────────────────────
 * Complete headline messages shown one at a time in the hero.
 *
 * Keep each message compact. The hero reserves height for the tallest message
 * so the CTA below it does not jump while the headline rotates.
 */
export const hero = {
  headlines: [
    ["We believe in", "India to the world."],
    ["The sourcing partner", "your brand deserves."],
    ["Your collection, made", "properly, on time."],
  ],
  /** ms each headline stays on screen. Unused while there is only one headline. */
  rotationInterval: 3200,
  /**
   * NOT SHOWN ON SCREEN. The visible headline is deliberately spare, but a
   * four-word claim is a poor <h1> for a screen reader or a search result —
   * neither can tell what this company does from "India to the world." This
   * sentence is appended to the visually-hidden <h1> so both get one clear
   * description of the business.
   */
  accessibleSummary: `${company.name} is a sourcing partner in India for soft furnishings, floor coverings, apparel and handicrafts.`,
  ctaLabel: "Talk to us",
};

/**
 * Hero collage — one tall cell on the left, two stacked on the right.
 *
 * Keep clips SHORT (4–8s), silent, and compressed hard. A heavy hero video
 * costs you more buyers than it convinces.
 */
export type HeroMediaItem = {
  /** Path under /public. Leave empty to render a labelled placeholder. */
  src?: string;
  /** "video" or "image" — inferred from extension when omitted. */
  kind?: "video" | "image";
  /** Shown in the placeholder, and used as the alt text / aria-label. */
  label: string;
  /** Poster image for video (recommended — avoids a blank frame on load). */
  poster?: string;
  /** Optional CSS object-position value for tighter crops. */
  objectPosition?: string;
};

export const heroMedia: { tall: HeroMediaItem; stacked: HeroMediaItem[] } = {
  tall: {
    src: "/hero/factory-line.mp4",
    label: "Indian textile workers at sewing machines",
    poster: "/hero/factory-line.jpg",
    objectPosition: "48% center",
  },
  stacked: [
    {
      src: "/hero/women-workers.mp4",
      label: "Indian women workers in garment production",
      poster: "/hero/women-workers.jpg",
      objectPosition: "center center",
    },
    {
      src: "/hero/design-tablet.mp4",
      label: "Design and spec development",
      poster: "/hero/design-tablet.jpg",
      objectPosition: "50% 62%",
    },
  ],
};

/**
 * Headline proof points. Export buyers scan these in the first 10 seconds.
 * Keep them true and specific — a real number beats a big number.
 */
export const proofPoints = [
  { value: "4", label: "inspection points", detail: "not one check at the end" },
  { value: "3", label: "product verticals", detail: "shared audits, one point of contact" },
  { value: "45–75", label: "days ex-factory", detail: "typical bulk lead time" }, // TODO
  { value: "10–15", label: "days to sample", detail: "from approved tech pack" }, // TODO
];

export const manufacturingStages = [
  {
    step: "1",
    title: "Design",
    body: "Tech packs, reference photos, construction notes and trims translated into a factory-ready brief.",
    visual: "design",
  },
  {
    step: "2",
    title: "Merchandising",
    body: "Vendor shortlisting, sample follow-up, quote comparison and timeline control through one accountable contact.",
    visual: "merchandising",
  },
  {
    step: "3",
    title: "Fabric sourcing",
    body: "Mill selection, swatch development, GSM checks, dye lots and compliance scope confirmed before bulk begins.",
    visual: "fabric",
  },
  {
    step: "4",
    title: "Production",
    body: "Raw material booked, line allocated and floor updates shared while the order is still correctable.",
    visual: "production",
  },
  {
    step: "5",
    title: "Quality control",
    body: "In-line checks, measurement review, packing inspection and third-party coordination where required.",
    visual: "quality",
  },
  {
    step: "6",
    title: "Global shipping",
    body: "Carton marks, consolidation, freight coordination and export documents prepared against your Incoterm.",
    visual: "shipping",
  },
] as const;

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  /** Longer positioning paragraph for the category page hero. */
  intro: string;
  /** What you actually make. Be specific — buyers search by product type. */
  products: string[];
  /** Materials, constructions, techniques. This is what proves you know the trade. */
  capabilities: { heading: string; items: string[] }[];
  /** Sourcing clusters you work with. Named regions build credibility fast. */
  clusters: { name: string; note: string }[];
  moq: string;
  leadTime: string;
  /** Category-specific compliance. Toys differ completely from textiles. */
  compliance: string[];
  /** true = headline pillar, false = secondary capability */
  isPillar: boolean;
};

export const categories: Category[] = [
  {
    slug: "soft-furnishings",
    name: "Soft Furnishings & Home Textiles",
    shortName: "Soft Furnishings",
    summary:
      "Bed linen, table linen, cushions and throws in cotton, linen and blended constructions.",
    intro:
      "Home textiles are the deepest part of India's export base, and the part where design flexibility and low MOQs matter most. We work with mills and made-up units that can hold a consistent hand-feel across repeat orders — the single thing buyers change supplier over.",
    products: [
      "Bed linen — sheet sets, duvet covers, pillow shams",
      "Table linen — runners, placemats, napkins, tablecloths",
      "Cushion covers and floor cushions",
      "Throws, quilts and bedspreads",
      "Kitchen linen — aprons, tea towels, oven mitts",
      "Curtains and window treatments",
    ],
    capabilities: [
      {
        heading: "Fabrics",
        items: [
          "Cotton — percale, sateen, poplin, waffle, seersucker",
          "Linen and cotton-linen blends",
          "Organic cotton (GOTS certified supply chain)",
          "Recycled and GRS-certified constructions",
        ],
      },
      {
        heading: "Surface & technique",
        items: [
          "Screen printing, digital printing, hand block printing",
          "Yarn-dyed stripes, checks and dobby",
          "Machine and hand embroidery",
          "Quilting, appliqué, fringing and hand-finished edges",
        ],
      },
      {
        heading: "Finishing",
        items: [
          "Enzyme wash, stone wash, garment wash",
          "Custom labelling, hangtags and retail-ready packing",
          "Barcode and EAN application to buyer spec",
        ],
      },
    ],
    clusters: [
      { name: "Karur & Erode", note: "table and kitchen linen, yarn-dyed wovens" },
      { name: "Panipat", note: "throws, quilts, bedspreads and made-ups" },
      { name: "Jaipur", note: "hand block print, quilting and craft finishes" },
    ],
    moq: "300–500 pcs per design", // TODO
    leadTime: "50–70 days ex-factory after sample approval", // TODO
    compliance: [
      "OEKO-TEX Standard 100",
      "GOTS (organic lines)",
      "GRS (recycled lines)",
      "amfori BSCI / SMETA social audit",
    ],
    isPillar: true,
  },
  {
    slug: "floor-coverings",
    name: "Floor Coverings",
    shortName: "Floor Coverings",
    summary:
      "Hand-tufted and flatweave rugs, bath mats and door mats in wool, cotton, jute and PET.",
    intro:
      "Rugs and mats are a construction-led category — the buyer is buying a pile height, a weight per square metre and a backing that will not delaminate. We quote against construction specs, not photographs, and we sample against the actual yarn you will receive in bulk.",
    products: [
      "Hand-tufted rugs",
      "Hand-knotted rugs",
      "Flatweave rugs and dhurries",
      "Shaggy and high-pile rugs",
      "Bath mats and bath rug sets",
      "Door mats and entrance mats",
      "Runners and round rugs",
    ],
    capabilities: [
      {
        heading: "Constructions",
        items: [
          "Hand-tufted — cut pile, loop pile, cut-and-loop, carved",
          "Hand-knotted — knot counts to buyer specification",
          "Flatweave, panja and pit-loom dhurries",
          "Tufted and woven bath mats with anti-slip backing",
        ],
      },
      {
        heading: "Fibres",
        items: [
          "New Zealand and Indian wool",
          "Cotton and cotton chenille",
          "Jute, hemp and natural fibre blends",
          "Recycled PET and viscose blends",
        ],
      },
      {
        heading: "Specification control",
        items: [
          "Pile height and GSM held to agreed tolerance",
          "Latex and canvas backing options",
          "Colour matching to Pantone TCX or buyer swatch",
          "Custom sizes and shapes",
        ],
      },
    ],
    clusters: [
      { name: "Bhadohi & Mirzapur", note: "hand-knotted and hand-tufted rugs" },
      { name: "Panipat", note: "flatweave, bath mats and cotton floor coverings" },
      { name: "Jaipur", note: "designer hand-knotted and wool-viscose blends" },
    ],
    moq: "50–100 pcs per design per size", // TODO
    leadTime: "60–90 days ex-factory after sample approval", // TODO
    compliance: [
      "OEKO-TEX Standard 100",
      "GoodWeave (child-labour-free certification)",
      "amfori BSCI / SMETA social audit",
      "CA TB117 flammability (US programmes)",
    ],
    isPillar: true,
  },
  {
    slug: "apparel",
    name: "Apparel — Women's, Men's & Kids",
    shortName: "Apparel",
    summary:
      "Knits and wovens across womenswear, menswear and kidswear, from vetted units in India's largest apparel clusters.",
    intro:
      "Apparel has the most ways to go wrong between an approved sample and a shipped carton — a line rebalanced without telling anyone, a fabric lot substituted, a measurement drifting across a run. We place each programme in the cluster built for it, hold the spec through production, and check the work on the floor rather than reading an inspection report after the fact.",
    products: [
      "Womenswear — dresses, blouses, tops, co-ord sets, skirts",
      "Menswear — shirts, t-shirts, polos, bottoms, loungewear",
      "Kidswear — infant sets, dresses, tees, sleepwear",
      "Knitwear — jersey, rib, interlock, fleece",
      "Wovens — cotton, viscose, linen, blended shirting",
      "Sustainable capsules — organic, recycled and BCI cotton",
    ],
    capabilities: [
      {
        heading: "Product development",
        items: [
          "Tech pack interpretation and spec sheet development",
          "Pattern making and grading to buyer size charts",
          "Fit sample, PP sample, size set and shipment sample protocol",
          "Trend and design support for own-label programmes",
        ],
      },
      {
        heading: "Production",
        items: [
          "Knit and woven lines",
          "Printing — screen, digital, all-over, placement",
          "Embroidery, sequin work and hand embellishment",
          "Garment dyeing and washing",
        ],
      },
      {
        heading: "Quality",
        items: [
          "In-line inspection at cutting, sewing and finishing",
          "Final random inspection to AQL 2.5 / 4.0",
          "Fabric inspection to 4-point system",
          "Third-party inspection coordination (SGS, Bureau Veritas, Intertek)",
        ],
      },
    ],
    clusters: [
      { name: "Tirupur", note: "cotton knitwear and jersey programmes" },
      { name: "Delhi NCR — Noida & Gurgaon", note: "woven ladieswear and embellishment" },
      { name: "Jaipur", note: "printed and hand-worked womenswear" },
      { name: "Ludhiana", note: "winterwear and heavy knits" },
    ],
    moq: "300–500 pcs per style per colour", // TODO
    leadTime: "45–75 days ex-factory after PP sample approval", // TODO
    compliance: [
      "OEKO-TEX Standard 100",
      "GOTS / OCS (organic programmes)",
      "GRS / RCS (recycled programmes)",
      "amfori BSCI, SMETA, WRAP, SA8000",
      "CPSIA and EN 14682 (childrenswear cord & drawstring safety)",
    ],
    isPillar: true,
  },
  {
    slug: "handicrafts",
    name: "Handicrafts & Lifestyle",
    shortName: "Handicrafts",
    summary:
      "Handmade home decor, lighting, furniture, tableware and lifestyle pieces across wood, metal, cane, ceramic, glass and natural fibres.",
    intro:
      "Handicrafts are not a single factory category. The right production base depends on material, finish, hand process, packing tolerance and buyer safety requirement. We work with verified units and artisan-led production bases that can make handmade lifestyle products with export discipline.",
    products: [
      "Lamp shades and lighting accessories",
      "Accent furniture and small furniture",
      "Home decor and decorative accessories",
      "Wall decor, mirrors and frames",
      "Baskets, storage and natural fibre products",
      "Tableware, serveware and kitchen accessories",
      "Planters, vases and garden decor",
      "Candle holders, lanterns and festive decor",
      "Gift items and seasonal collections",
    ],
    capabilities: [
      {
        heading: "Materials",
        items: [
          "Wood, mango wood, acacia and engineered wood",
          "Iron, brass, aluminium and mixed-metal constructions",
          "Cane, bamboo, rattan, jute, seagrass and water hyacinth",
          "Ceramic, terracotta, stone, glass and recycled material options",
        ],
      },
      {
        heading: "Techniques",
        items: [
          "Hand carving, turning, weaving and assembly",
          "Metal casting, hammering, welding and powder coating",
          "Hand painting, enamel work, polishing and distressed finishes",
          "Mixed-material development for lifestyle and decor ranges",
        ],
      },
      {
        heading: "Export control",
        items: [
          "Finish matching against buyer reference or approved sample",
          "Drop-test and export packing review for fragile goods",
          "Moisture, odour, sharp-edge and surface-finish checks",
          "Retail labelling, barcode and carton-mark coordination",
        ],
      },
    ],
    clusters: [
      { name: "Moradabad", note: "metalware, lighting, decor and mixed-material products" },
      { name: "Saharanpur", note: "wood carving, boxes, trays and decorative woodware" },
      { name: "Jodhpur", note: "furniture, iron-wood decor and lifestyle accessories" },
      { name: "Jaipur", note: "blue pottery, block-printed decor, jewellery and craft finishes" },
      { name: "Khurja & Firozabad", note: "ceramics, glassware and decorative accents" },
    ],
    moq: "Quoted by material, size and finish", // TODO
    leadTime: "Quoted after sample and packing review", // TODO
    compliance: [
      "Factory social audit where required",
      "FSC or recycled claims only with valid documentation",
      "REACH / Prop 65 review for buyer-specific programmes",
      "Drop-test and transit packing standards for fragile products",
    ],
    isPillar: true,
  },
  {
    slug: "toys",
    name: "Toys",
    shortName: "Toys",
    summary:
      "Soft toys, wooden toys and educational play in a fully tested, compliance-first supply chain.",
    intro:
      "Toys sit under a different regulatory regime to textiles, and we treat it that way. Every programme is quoted with third-party testing built into the timeline and the price — EN 71 for the EU, ASTM F963 and CPSIA for the US. We take on toy enquiries where the buyer wants that compliance rigour, and we say so plainly when a product is better placed elsewhere.",
    products: [
      "Soft toys and plush",
      "Wooden toys and stacking play",
      "Educational and Montessori-style play sets",
      "Fabric books and sensory toys",
      "Doll and puppet ranges",
    ],
    capabilities: [
      {
        heading: "Materials",
        items: [
          "Cotton, plush and recycled fill",
          "Sustainably sourced hardwood",
          "Non-toxic, child-safe colourants and lacquers",
        ],
      },
      {
        heading: "Compliance-first process",
        items: [
          "Testing scope agreed before sampling begins",
          "Third-party lab testing on pre-production samples",
          "Age-grading and warning label compliance",
          "Full technical file and Declaration of Conformity",
        ],
      },
    ],
    clusters: [
      { name: "Channapatna", note: "traditional lacquered wooden toys" },
      { name: "Delhi NCR", note: "soft toys and plush" },
    ],
    moq: "500–1,000 pcs per design", // TODO
    leadTime: "70–100 days including lab testing", // TODO
    compliance: [
      "EN 71-1, EN 71-2, EN 71-3 (EU)",
      "ASTM F963 and CPSIA (US)",
      "CE marking and Declaration of Conformity",
      "Phthalate and heavy metal testing",
    ],
    isPillar: false,
  },
];

export const pillarCategories = categories.filter((c) => c.isPillar);
export const secondaryCategories = categories.filter((c) => !c.isPillar);

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export const factoryNetwork = {
  eyebrow: "Offline strength, online access",
  title: "A factory network built cluster by cluster.",
  lead:
    "We map the production clusters behind each category, then match your brief to a factory that can meet your product requirements, timeline and compliance standard.",
  clusters: [
    { name: "Ludhiana", left: "43%", top: "17%", labelSide: "left" },
    { name: "Panipat", left: "49%", top: "25%", labelSide: "right" },
    { name: "Noida", left: "54%", top: "35%", labelSide: "left" },
    { name: "Moradabad", left: "60%", top: "32%", labelSide: "right" },
    { name: "Jaipur", left: "35%", top: "42%", labelSide: "left" },
    { name: "Bhadohi", left: "59%", top: "50%", labelSide: "right" },
    { name: "Kolkata", left: "72%", top: "56%", labelSide: "right" },
    { name: "Bengaluru", left: "47%", top: "75%", labelSide: "left" },
    { name: "Karur", left: "55%", top: "79%", labelSide: "right" },
    { name: "Tirupur", left: "51%", top: "85%", labelSide: "left" },
  ],
} as const;

export const curatedProducts = {
  eyebrow: "Trending",
  title: "Curated products for your brand",
  groups: [
    {
      id: "soft-home",
      label: "Soft-Home",
      featureVisual: "softHomeFeature",
      items: [
        { label: "Floor coverings", visual: "floorCoverings" },
        { label: "Home Linen", visual: "homeLinen" },
        { label: "Table Linen", visual: "tableLinen" },
        { label: "Bed Linen", visual: "bedLinen" },
      ],
    },
    {
      id: "apparel",
      label: "Apparel",
      featureVisual: "apparelFeature",
      items: [
        { label: "Kids", visual: "kids" },
        { label: "Men", visual: "men" },
        { label: "Women", visual: "women" },
      ],
    },
  ],
} as const;

export const workingProcess = {
  eyebrow: "How it works",
  title: "The GoSourceIndia process, end to end.",
  lead:
    "A buyer should not have to chase factories, guess what is happening on the floor, or manage five disconnected suppliers. This is the practical sequence we follow from first enquiry to shipment.",
  steps: [
    {
      step: "01",
      label: "Simple enquiry process",
      title: "Start with what you already have",
      body:
        "You do not need a perfect tech pack to start. Share the product information you have, and we turn it into a factory-ready enquiry.",
      details: [
        "Send a tech pack, sketch, reference photo, sample image or product idea.",
        "Share the quantity range, target market, delivery window and any compliance requirement.",
        "We clarify missing details before the enquiry is placed with a factory.",
      ],
      visual: "brief",
    },
    {
      step: "02",
      label: "Factory match and costing",
      title: "Place the product in the right cluster",
      body:
        "The same product can be quoted very differently depending on where it is made. We match the requirement to the cluster and factory type that genuinely fits it.",
      details: [
        "We map the product by category, material, technique, finish and order size.",
        "Only verified factories are considered for the programme.",
        "You get a practical view of sample path, likely costing inputs and what needs to be confirmed next.",
      ],
      visual: "factory",
    },
    {
      step: "03",
      label: "Sample and pre-production",
      title: "Make the sample path clear",
      body:
        "Before bulk production starts, the product needs a clear sample, material and construction trail. This is where most later confusion is removed.",
      details: [
        "Fabric, yarn, backing, trims, finishes and packaging inputs are checked against the brief.",
        "Samples are reviewed for measurement, hand-feel, finish and workmanship.",
        "Bulk notes are agreed before the order moves into production.",
      ],
      visual: "sample",
    },
    {
      step: "04",
      label: "Production followed closely",
      title: "Stay close while the order is running",
      body:
        "The most useful checks happen while the order is still in progress, not after the cartons are packed.",
      details: [
        "Material booking, cutting, stitching, finishing and packing are tracked through the run.",
        "Updates come from the floor while the work is still correctable.",
        "If something starts drifting, it is raised early with the next practical action.",
      ],
      visual: "production",
    },
    {
      step: "05",
      label: "Checked and shipped",
      title: "Finish the order properly",
      body:
        "The final stage is about getting the goods checked, packed, documented and dispatched without loose ends.",
      details: [
        "Measurements, workmanship, labels, packing and carton details are checked before dispatch.",
        "Third-party inspection can be coordinated when the buyer programme requires it.",
        "Shipment documents and logistics coordination are handled through final dispatch.",
      ],
      visual: "shipping",
    },
  ],
} as const;

/**
 * The service model. This is the section that separates you from a broker who
 * forwards emails to three factories and marks up the reply.
 */
export const process = [
  {
    step: "01",
    title: "Enquiry & costing",
    body: "Send a tech pack, a sketch or a reference photo. We review the product, see where it can be made well, and come back with a practical next step.",
    turnaround: "Initial review",
  },
  {
    step: "02",
    title: "Sampling",
    body: "We develop against your spec and courier samples with a full spec sheet. Revisions are expected and included — we sample until the fit and hand-feel are signed off.",
    turnaround: "10–15 days", // TODO
  },
  {
    step: "03",
    title: "Production",
    body: "Order confirmed, raw material booked, line allocated. You get scheduled production updates against an agreed timeline, with photographs from the floor.",
    turnaround: "45–75 days", // TODO
  },
  {
    step: "04",
    title: "Quality & inspection",
    body: "In-line inspection through the run and a final random inspection to AQL before packing. Third-party inspection coordinated if your programme requires it.",
    turnaround: "Pre-shipment",
  },
  {
    step: "05",
    title: "Export & documentation",
    body: "Consolidation, container stuffing, and a complete document set — commercial invoice, packing list, bill of lading, certificate of origin. FOB, CIF or DDP.",
    turnaround: "Per Incoterm",
  },
];

/**
 * Certifications available across your supplier network.
 * ⚠️ Only list what you can actually produce a certificate for on request.
 * A buyer WILL ask for the scope certificate, and an unbacked claim ends the
 * relationship.
 */
export const certifications = [
  { name: "OEKO-TEX Standard 100", note: "Tested for harmful substances" },
  { name: "GOTS", note: "Organic textile chain of custody" },
  { name: "GRS", note: "Recycled content verification" },
  { name: "amfori BSCI", note: "Social compliance auditing" },
  { name: "Sedex / SMETA", note: "Ethical trade audit" },
  { name: "ISO 9001", note: "Quality management systems" },
];

export const tradeTerms = {
  incoterms: ["EXW", "FOB", "CIF", "CFR", "DDP"],
  ports: ["Nhava Sheva (JNPT)", "Mundra", "Chennai", "Kolkata"],
  paymentTerms: ["30% advance, 70% against BL copy", "Irrevocable LC at sight", "TT"], // TODO
  currencies: ["USD", "EUR", "GBP"],
};

export const nav = [
  { href: "/products", label: "Products" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];
