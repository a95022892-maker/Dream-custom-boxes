import Image from "next/image";
import Link from "next/link";
import { reviews } from "@/app/_data/home";
import { Icon } from "./ui/Icons";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

const avatarTints = ["bg-lilac", "bg-sage", "bg-paper-deep", "bg-coral/20"];

export function Reviews() {
  return (
    <section id="reviews" className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-4 sm:px-6">
        <SectionHeading eyebrow={reviews.eyebrow} title={reviews.title} />
        <Reveal delay={200} className="flex flex-wrap items-center gap-3">
          {reviews.badges.map((b) => (
            <a
              key={b.alt}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white px-4 py-3 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Image src={b.image} alt={b.alt} className="h-9 w-auto" />
            </a>
          ))}
          <Link href={reviews.allHref} className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper transition hover:bg-coral">
            View All Reviews
            <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <Reveal variant="fade" delay={150} className="mt-14">
        <Marquee duration={45}>
          {reviews.items.map((r, i) => (
            <figure
              key={r.name}
              className="mr-5 flex w-[22rem] shrink-0 flex-col justify-between rounded-[1.75rem] bg-white p-7 ring-1 ring-line sm:w-[26rem]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-coral" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, s) => (
                      <Icon key={s} name="star" className="size-4" />
                    ))}
                  </div>
                  <span className="text-sm font-bold">{r.rating}</span>
                </div>
                <blockquote className="mt-5 font-display text-lg leading-snug">“{r.text}”</blockquote>
              </div>
              <figcaption className="mt-7 flex items-center gap-3">
                <span className={`grid size-10 place-items-center rounded-full text-sm font-bold ${avatarTints[i % avatarTints.length]}`}>
                  {initials(r.name)}
                </span>
                <span>
                  <span className="block text-sm font-bold">{r.name}</span>
                  <span className="block text-xs text-ink-soft">Verified Google review</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
