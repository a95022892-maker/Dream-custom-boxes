import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { hero, site } from "@/app/_data/home";
import { CountUp } from "./ui/CountUp";
import { Icon } from "./ui/Icons";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    /* Banner colour matches the photo's own backdrop so the image blends across the whole banner. */
    <section className="relative flex flex-col overflow-hidden bg-[#efecd9]">
      {/* Photo — fills the right of the banner on desktop, sits under the copy on mobile/tablet.
          Its edge fades into the banner colour so there is no visible frame. */}
      <div className="relative order-2 aspect-[16/10] w-full animate-hero-zoom [mask-image:linear-gradient(to_bottom,transparent,#000_22%)] xl:absolute xl:inset-y-0 xl:right-0 xl:aspect-auto xl:w-[60%] xl:[mask-image:linear-gradient(to_right,transparent,#000_28%)]">
        <Image
          src={hero.image}
          alt={hero.alt}
          fill
          preload
          sizes="(min-width: 1280px) 60vw, 100vw"
          className="object-cover object-center xl:object-[70%_center]"
        />
      </div>

      <div className="relative order-1 mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 xl:flex xl:min-h-[36rem] xl:items-center xl:py-20">
        <div className="max-w-xl">
          <p
            className="mb-5 inline-flex animate-rise items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold text-ink-soft ring-1 ring-ink/5 backdrop-blur"
            style={delay(0)}
          >
            <span className="size-2 rounded-full bg-coral" />
            No minimums · Free design support · Instant pricing
          </p>

          <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] font-medium tracking-tight">
            <span className="sr-only">{hero.title}</span>
            <span aria-hidden className="block overflow-hidden">
              <span className="block animate-rise sm:whitespace-nowrap" style={delay(100)}>
                Premium Custom Boxes
              </span>
            </span>
            <span aria-hidden className="block overflow-hidden">
              <span className="block animate-rise sm:whitespace-nowrap" style={delay(200)}>
                For Your <span className="text-coral italic">Products</span>
              </span>
            </span>
          </h1>

          <p className="mt-5 max-w-lg animate-rise text-base leading-relaxed text-ink-soft sm:text-lg" style={delay(320)}>
            {hero.copy}
          </p>

          <div className="mt-8 flex animate-rise flex-wrap gap-3" style={delay(440)}>
            <a
              href={hero.primary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-paper transition hover:bg-coral"
            >
              {hero.primary.label}
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.secondary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-white/70 px-6 py-3.5 text-sm font-bold text-ink ring-1 ring-ink/15 backdrop-blur transition hover:bg-white hover:ring-ink"
            >
              {hero.secondary.label}
              <Icon name="arrowUpRight" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <dl className="mt-10 flex animate-rise flex-wrap gap-x-8 gap-y-4" style={delay(560)}>
            <Stat label="brands trust us">
              <CountUp to={1200} suffix="+" />
            </Stat>
            <Stat label="Google & Trustpilot">
              <CountUp to={5} decimals={1} />
              <Icon name="star" className="ml-1 inline size-4 text-coral" />
            </Stat>
            <Stat label="business days">
              6–<CountUp to={20} />
            </Stat>
          </dl>
        </div>
      </div>

      {/* Trust line */}
      <div className="relative order-3 border-t border-ink/10 bg-white/60 backdrop-blur">
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

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-coral pl-3">
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-2xl font-medium">{children}</dd>
      <p className="text-xs text-ink-soft">{label}</p>
    </div>
  );
}
