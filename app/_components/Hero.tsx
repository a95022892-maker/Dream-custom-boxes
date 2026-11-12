import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { hero, site } from "@/app/_data/home";
import { CountUp } from "./ui/CountUp";
import { Icon } from "./ui/Icons";

/* Headline is split into lines so each can rise in on load. */
const lines = [
  { text: "Premium Custom", accent: false },
  { text: "Boxes For Your", accent: false },
  { text: "Products", accent: true },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="grain relative overflow-hidden">
      {/* soft colour blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-lilac blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-coral/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 lg:pt-20 lg:pb-28 xl:grid-cols-[0.92fr_1.08fr]">
        {/* Copy */}
        <div>
          <p className="mb-6 inline-flex animate-rise items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-soft ring-1 ring-line" style={delay(0)}>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-coral" />
            </span>
            No minimums · Free design support · Instant pricing
          </p>

          <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.98] font-medium tracking-tight">
            <span className="sr-only">{hero.title}</span>
            {lines.map((line, i) => (
              <span key={line.text} aria-hidden className="block overflow-hidden pb-1">
                <span
                  className={`block animate-rise ${line.accent ? "text-coral italic" : ""}`}
                  style={delay(120 + i * 110)}
                >
                  {line.text}
                  {line.accent && (
                    <svg viewBox="0 0 300 20" className="mt-1 h-3 w-[min(18rem,60%)] text-kraft" aria-hidden>
                      <path d="M2 14C60 4 140 2 298 10" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-ink-soft" style={delay(500)}>
            {hero.copy}
          </p>

          <div className="mt-9 flex animate-rise flex-wrap gap-3" style={delay(620)}>
            <a
              href={hero.primary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-bold text-paper transition hover:bg-coral"
            >
              {hero.primary.label}
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.secondary.href}
              className="group inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold text-ink ring-1 ring-ink/20 transition hover:bg-white hover:ring-ink"
            >
              {hero.secondary.label}
              <Icon name="arrowUpRight" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Stats */}
          <dl className="mt-12 grid max-w-lg animate-rise grid-cols-3 divide-x divide-line border-t border-line pt-6" style={delay(740)}>
            <div className="pr-4">
              <dt className="sr-only">Brands served</dt>
              <dd className="font-display text-3xl font-medium sm:text-4xl">
                <CountUp to={1200} suffix="+" />
              </dd>
              <p className="mt-1 text-xs text-ink-soft">brands trust us</p>
            </div>
            <div className="px-4">
              <dt className="sr-only">Rating</dt>
              <dd className="flex items-center gap-1 font-display text-3xl font-medium sm:text-4xl">
                <CountUp to={5} decimals={1} />
                <Icon name="star" className="size-5 text-coral" />
              </dd>
              <p className="mt-1 text-xs text-ink-soft">Google &amp; Trustpilot</p>
            </div>
            <div className="pl-4">
              <dt className="sr-only">Production time</dt>
              <dd className="font-display text-3xl font-medium sm:text-4xl">
                6–<CountUp to={20} />
              </dd>
              <p className="mt-1 text-xs text-ink-soft">business days</p>
            </div>
          </dl>
        </div>

        {/* Visual */}
        {/* Window frame matches the photo's landscape ratio (800×505) so nothing important is cropped.
            Full width below xl; on xl it bleeds slightly past the container for extra presence. */}
        <div className="relative w-full animate-pop xl:-mr-10 xl:w-[calc(100%+2.5rem)]" style={delay(300)}>
          <div className="relative aspect-[16/10.5] overflow-hidden rounded-t-[clamp(5rem,24vw,17rem)] rounded-b-[2rem] bg-[#f3f1dc] ring-1 ring-line sm:rounded-b-[2.5rem]">
            <Image
              src={hero.image}
              alt={hero.alt}
              fill
              preload
              sizes="(min-width: 1280px) 55vw, 100vw"
              className="object-cover object-center"
            />
            {/* inner window mullion — gives the frame its "window" feel */}
            <div aria-hidden className="pointer-events-none absolute inset-3 rounded-t-[clamp(4.25rem,23vw,16.25rem)] rounded-b-[1.5rem] ring-1 ring-white/70 sm:inset-4" />
          </div>

          {/* Rotating badge */}
          <div className="absolute -top-6 left-2 grid size-28 place-items-center rounded-full bg-ink text-paper shadow-xl sm:left-6 sm:size-36 xl:-left-8">
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
              <defs>
                <path id="badge-circle" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
              </defs>
              <text className="fill-current text-[8px] font-semibold uppercase">
                <textPath href="#badge-circle" textLength="230" lengthAdjust="spacing">Free shipping • No MOQ • Fast turnaround •</textPath>
              </text>
            </svg>
            <Icon name="box" className="size-9 text-coral" />
          </div>

          {/* Floating chips */}
          <div className="absolute top-[22%] right-2 animate-float rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-16px_rgb(23_22_27/0.3)] sm:right-6 xl:-right-4">
            <p className="text-[11px] font-semibold tracking-wider text-ink-soft uppercase">Minimum order</p>
            <p className="font-display text-2xl font-medium">None.</p>
          </div>
          <div className="absolute -bottom-6 left-2 flex animate-float-slow items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-16px_rgb(23_22_27/0.3)] [animation-delay:-3s] sm:bottom-8 sm:left-6 xl:-left-8">
            <span className="grid size-10 place-items-center rounded-full bg-sage text-ink">
              <Icon name="pen" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold">Free design support</p>
              <p className="text-xs text-ink-soft">3D preview included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust line */}
      <div className="relative border-y border-line bg-white/60 backdrop-blur">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-ink-soft sm:px-6">
          {hero.trust.before}{" "}
          <Link href="#reviews" className="font-bold text-ink underline decoration-coral decoration-2 underline-offset-4 hover:text-coral">
            {hero.trust.link}
          </Link>{" "}
          {hero.trust.after}{" "}
          <a href={site.editorUrl} className="ml-1 hidden font-semibold text-coral-deep hover:underline sm:inline">
            Start designing →
          </a>
        </p>
      </div>
    </section>
  );
}
