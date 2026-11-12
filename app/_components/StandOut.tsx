import Image from "next/image";
import { standOut, trusted } from "@/app/_data/home";
import { Icon, type IconName } from "./ui/Icons";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/* One icon per customer need, in the same order as standOut.features */
const icons: IconName[] = ["cart", "infinity", "cursor", "layers", "printer", "ruler", "shield", "tag"];

export function StandOut() {
  const features = standOut.features.map((f, i) => ({ ...f, icon: icons[i], n: i + 1 }));
  const left = features.slice(0, 4);
  const right = features.slice(4);

  return (
    <section className="border-t border-line">
      <div className="relative overflow-hidden bg-white">
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 size-[48rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,var(--color-lilac)_0%,transparent_65%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <SectionHeading eyebrow="The difference" title={standOut.title} align="center">
            {standOut.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </SectionHeading>

          {/* Orbit layout: needs on either side, product in the middle */}
          <div className="mt-16 grid items-center gap-6 lg:grid-cols-[1fr_minmax(16rem,24rem)_1fr] lg:gap-8">
            <Orbit className="lg:order-2" />

            <ul className="grid gap-4 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
              {left.map((f, i) => (
                <Feature key={f.title} {...f} side="left" delay={i * 110} />
              ))}
            </ul>
            <ul className="grid gap-4 sm:grid-cols-2 lg:order-3 lg:grid-cols-1">
              {right.map((f, i) => (
                <Feature key={f.title} {...f} side="right" delay={i * 110} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trusted maker band */}
      <div className="relative overflow-hidden bg-coral text-white">
        <Marquee duration={40} className="border-b border-white/20 py-4">
          {trusted.finishes.concat(["Eco-friendly materials", "Short runs", "Bulk production"]).map((t) => (
            <span key={t} className="flex items-center gap-6 pr-6 font-display text-2xl italic">
              {t} <Icon name="star" className="size-4 text-white/60" />
            </span>
          ))}
        </Marquee>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal as="h2" variant="left" className="font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
            {trusted.title}
          </Reveal>
          <Reveal variant="right" delay={120}>
            <p className="leading-relaxed text-white/85">{trusted.copy}</p>
            <p className="mt-5 font-bold">{trusted.closing}</p>
            <a href={trusted.cta.href} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-bold text-paper transition hover:bg-white hover:text-ink">
              {trusted.cta.label}
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type FeatureProps = { title: string; copy: string; icon: IconName; n: number; side: "left" | "right"; delay: number };

function Feature({ title, copy, icon, n, side, delay }: FeatureProps) {
  const isLeft = side === "left";
  return (
    <Reveal as="li" variant={isLeft ? "left" : "right"} delay={delay}>
      <div
        className={`group flex h-full gap-4 rounded-3xl bg-white/70 p-5 ring-1 ring-line backdrop-blur transition duration-500 ease-out-expo hover:bg-white hover:shadow-[0_24px_48px_-24px_rgb(23_22_27/0.3)] hover:ring-coral/30 ${
          isLeft ? "lg:flex-row-reverse lg:text-right lg:hover:translate-x-2" : "lg:hover:-translate-x-2"
        }`}
      >
        <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-coral/10 text-coral-deep transition duration-500 group-hover:rotate-[-8deg] group-hover:bg-coral group-hover:text-white">
          <Icon name={icon} className="size-5" />
          <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-paper">{n}</span>
        </span>
        <div>
          <h3 className="font-display text-lg leading-snug font-medium">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{copy}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Orbit({ className = "" }: { className?: string }) {
  return (
    <Reveal variant="scale" className={`group relative mx-auto aspect-square w-full max-w-[22rem] lg:max-w-none ${className}`}>
      {/* dashed outer ring */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow text-coral/60" aria-hidden>
        <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5 3" />
      </svg>
      {/* counter-rotating satellites */}
      <div aria-hidden className="absolute inset-0 animate-spin-reverse">
        <span className="absolute top-0 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coral text-white shadow-lg">
          <Icon name="box" className="size-4" />
        </span>
        <span className="absolute bottom-[14%] left-[3%] size-4 rounded-full bg-kraft" />
        <span className="absolute right-[3%] bottom-[14%] size-3 rounded-full bg-ink" />
      </div>
      {/* inner solid ring + photo */}
      <div className="absolute inset-[9%] rounded-full bg-paper p-3 shadow-[0_40px_80px_-30px_rgb(23_22_27/0.45)] ring-1 ring-line">
        <div className="relative size-full overflow-hidden rounded-full">
          <Image
            src={standOut.image}
            alt={standOut.imageAlt}
            fill
            sizes="(min-width: 1024px) 24rem, 22rem"
            className="object-cover transition duration-[1.4s] ease-out-expo group-hover:scale-110"
          />
        </div>
      </div>
      <p className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold whitespace-nowrap text-paper shadow-xl">
        <Icon name="star" className="size-3.5 text-coral" /> Trusted by 1200+ brands
      </p>
    </Reveal>
  );
}
