import type { Metadata } from "next";
import Image from "next/image";
import { workingProcess } from "@/content/site";
import { Arrow, ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Process",
  description:
    "The GoSourceIndia process, from product brief and factory matching through sampling, production follow-up, checking and shipment.",
};

const processImages = {
  brief: "/process/brief-review.jpg",
  factory: "/process/factory-match.jpg",
  sample: "/process/sample-costing.jpg",
  production: "/process/production-followup.jpg",
  shipping: "/process/check-pack-ship.jpg",
} satisfies Record<(typeof workingProcess.steps)[number]["visual"], string>;

const imagePositions = {
  brief: "50% 52%",
  factory: "50% 50%",
  sample: "50% 45%",
  production: "50% 50%",
  shipping: "50% 62%",
} satisfies Record<(typeof workingProcess.steps)[number]["visual"], string>;

type ProcessStep = (typeof workingProcess.steps)[number];

function Underline() {
  return (
    <svg
      viewBox="0 0 224 18"
      className="mt-5 h-4 w-56 text-clay"
      aria-hidden="true"
    >
      <path
        d="M3 10 C48 5 96 8 142 7 C172 6 198 7 221 9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <path
        d="M70 14 C98 11 123 12 151 15"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

function ShieldCheck() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 h-5 w-5 shrink-0 text-clay"
    >
      <path
        d="M10 2.75 16 5.1v4.55c0 3.65-2.38 6.47-6 7.6-3.62-1.13-6-3.95-6-7.6V5.1l6-2.35Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m7.35 9.85 1.75 1.75 3.75-4.05"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProcessPhoto({ step }: { step: ProcessStep }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-bone-deep shadow-[0_18px_40px_rgba(22,24,29,0.08)] ring-1 ring-line">
      <Image
        src={processImages[step.visual]}
        alt={`${step.title} process`}
        fill
        sizes="(min-width: 1280px) 34rem, (min-width: 768px) 44vw, 100vw"
        className="object-cover"
        style={{ objectPosition: imagePositions[step.visual] }}
      />
    </div>
  );
}

function ProcessLabel({
  step,
  align,
}: {
  step: ProcessStep;
  align: "left" | "right";
}) {
  const marker = (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#ff6f6f] bg-bone text-clay">
      <Arrow className={align === "left" ? "rotate-180" : ""} />
    </span>
  );

  const pill = (
    <span className="rounded-md bg-gradient-to-r from-[#e84f74] to-[#f27a42] px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-white shadow-[0_10px_20px_rgba(232,79,116,0.18)]">
      {step.label}
    </span>
  );

  return (
    <div
      className={`mb-7 flex items-center gap-2 ${
        align === "left" ? "lg:justify-end" : ""
      }`}
    >
      {align === "left" ? (
        <>
          {pill}
          {marker}
        </>
      ) : (
        <>
          {marker}
          {pill}
        </>
      )}
    </div>
  );
}

function ProcessCopy({
  step,
  align,
}: {
  step: ProcessStep;
  align: "left" | "right";
}) {
  return (
    <div className={align === "left" ? "lg:ml-auto lg:max-w-[34rem]" : "lg:max-w-[34rem]"}>
      <ProcessLabel step={step} align={align} />
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-clay">
        Step {step.step}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-indigo-deep sm:text-4xl">
        {step.title}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-ink-soft">
        {step.body}
      </p>
      <ul className="mt-7 space-y-4">
        {step.details.map((detail) => (
          <li key={detail} className="flex gap-4">
            <ShieldCheck />
            <span className="text-sm font-medium leading-relaxed text-ink-soft">
              {detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProcessPage() {
  return (
    <>
      <section className="border-b border-line-soft bg-bone">
        <Container className="max-w-[116rem]">
          <div className="mx-auto max-w-[100rem] py-20 text-center sm:py-24">
            <p className="eyebrow mb-5">{workingProcess.eyebrow}</p>
            <h1 className="mx-auto max-w-5xl font-display text-5xl leading-[0.98] text-indigo-deep sm:text-6xl lg:text-7xl">
              {workingProcess.title}
            </h1>
            <div className="flex justify-center">
              <Underline />
            </div>
            <p className="mx-auto mt-8 max-w-4xl text-xl leading-relaxed text-ink-soft">
              {workingProcess.lead}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line-soft bg-bone py-20 sm:py-28">
        <Container className="max-w-[116rem]">
          <div className="mx-auto max-w-[86rem]">
            <div className="relative">
              <div
                className="absolute bottom-8 left-5 top-0 w-px bg-gradient-to-b from-transparent via-clay/35 to-transparent lg:left-1/2 lg:-translate-x-1/2"
                aria-hidden="true"
              />

              <div className="space-y-20 sm:space-y-24 lg:space-y-28">
                {workingProcess.steps.map((step, index) => {
                  const photoLeft = index % 2 === 0;

                  return (
                    <article
                      key={step.step}
                      className="relative grid gap-8 pl-14 lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] lg:items-center lg:gap-10 lg:pl-0"
                    >
                      <div
                        className={
                          photoLeft
                            ? "lg:col-start-1"
                            : "lg:col-start-3"
                        }
                      >
                        <ProcessPhoto step={step} />
                      </div>

                      <div className="absolute left-0 top-0 lg:static lg:col-start-2 lg:row-start-1 lg:flex lg:justify-center">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-clay/30 bg-bone text-xs font-bold text-clay shadow-[0_8px_20px_rgba(182,84,60,0.12)] lg:h-12 lg:w-12">
                          {step.step}
                        </span>
                      </div>

                      <div
                        className={
                          photoLeft
                            ? "lg:col-start-3 lg:row-start-1"
                            : "lg:col-start-1 lg:row-start-1"
                        }
                      >
                        <ProcessCopy
                          step={step}
                          align={photoLeft ? "right" : "left"}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bone-deep py-20 sm:py-24">
        <Container className="max-w-[116rem]">
          <div className="mx-auto grid max-w-[100rem] items-center gap-10 rounded-2xl border border-line bg-white/55 px-8 py-12 sm:px-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4">Start the process</p>
              <h2 className="font-display text-3xl leading-tight text-indigo-deep sm:text-4xl">
                Send the product information you already have.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
                A tech pack is useful, but not required. A sketch, reference
                photo, target product, quantity range or sample note is enough
                for us to understand what the next practical step should be.
              </p>
            </div>
            <div className="flex lg:col-span-5 lg:justify-end">
              <ButtonLink href="/enquiry">
                Request a quote
                <Arrow />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
