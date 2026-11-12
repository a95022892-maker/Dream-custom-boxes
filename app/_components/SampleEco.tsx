import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { eco, sample } from "@/app/_data/home";
import { Icon, type IconName } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

/**
 * Two "poster" cards. The portrait photos have the products at the top and
 * plain backdrop below, so copy sits on the backdrop — no awkward cropping.
 */
export function SampleEco() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="grid gap-6 md:grid-cols-2">
        <Poster
          image={sample.image}
          tone="bg-[#cfc8ec]"
          sticker="Try before you buy • Try before you buy •"
          stickerIcon="box"
          title={sample.title}
          copy={sample.copy}
          points={[
            { icon: "shield", label: "Quality" },
            { icon: "ruler", label: "Fit" },
            { icon: "sparkle", label: "Finish" },
          ]}
          cta={
            <Link href={sample.cta.href} className="group/btn inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-paper transition hover:bg-coral">
              {sample.cta.label}
              <Icon name="arrow" className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          }
        />
        <Poster
          image={eco.image}
          tone="bg-[#ecc9a3]"
          sticker="Go green • Go green • Go green •"
          stickerIcon="leaf"
          title={eco.title}
          copy={eco.copy}
          points={[
            { icon: "layers", label: "Recycled" },
            { icon: "infinity", label: "Recyclable" },
            { icon: "leaf", label: "Compostable" },
          ]}
          delay={140}
          offset
        />
      </div>
    </section>
  );
}

type PosterProps = {
  image: StaticImageData;
  tone: string;
  sticker: string;
  stickerIcon: IconName;
  title: string;
  copy: string;
  points: { icon: IconName; label: string }[];
  cta?: ReactNode;
  delay?: number;
  /** nudges the second card down on desktop for a playful rhythm */
  offset?: boolean;
};

function Poster({ image, tone, sticker, stickerIcon, title, copy, points, cta, delay = 0, offset }: PosterProps) {
  const id = `sticker-${stickerIcon}`;
  return (
    <Reveal variant="up" delay={delay} className={offset ? "md:mt-16" : ""}>
      <article className={`group relative isolate flex min-h-[40rem] flex-col justify-end overflow-hidden rounded-[2.5rem] ${tone}`}>
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="-z-10 object-cover object-top transition duration-[1.6s] ease-out-expo group-hover:scale-[1.06]"
        />

        {/* rotating sticker */}
        <div className="absolute top-6 right-6 grid size-24 place-items-center rounded-full bg-white/80 shadow-lg backdrop-blur transition duration-700 group-hover:scale-110 sm:size-28">
          <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
            <defs>
              <path id={id} d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" />
            </defs>
            <text className="fill-ink text-[8px] font-bold uppercase">
              <textPath href={`#${id}`} textLength="224" lengthAdjust="spacing">
                {sticker}
              </textPath>
            </text>
          </svg>
          <Icon name={stickerIcon} className="size-7 text-coral-deep" />
        </div>

        {/* content panel on the plain lower half of the photo */}
        <div className="m-3 rounded-[2rem] bg-white/55 p-7 backdrop-blur-md transition duration-700 ease-out-expo group-hover:bg-white/75 sm:m-4 sm:p-9">
          <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">{title}</h2>
          <p className="mt-4 leading-relaxed text-ink/75">{copy}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {points.map((p, i) => (
              <li
                key={p.label}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold shadow-sm transition duration-500 group-hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <Icon name={p.icon} className="size-4 text-coral-deep" />
                {p.label}
              </li>
            ))}
          </ul>

          {cta && <div className="mt-7">{cta}</div>}
        </div>
      </article>
    </Reveal>
  );
}
