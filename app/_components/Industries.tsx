import Link from "next/link";
import { industries } from "@/app/_data/home";
import { Icon } from "./ui/Icons";
import { ProductCard } from "./ui/ProductCard";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Industries() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[20rem_1fr]">
        {/* Sticky intro column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Shop by industry" title={industries.title}>
            {industries.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="text-base">
                {p}
              </p>
            ))}
          </SectionHeading>
          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            <a href="#quotation" className="group inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-bold text-white transition hover:bg-coral-deep">
              Get a Free Quote <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/products/" className="inline-flex items-center rounded-full px-6 py-3 font-bold ring-1 ring-ink/20 transition hover:ring-ink">
              Browse All
            </Link>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
          {industries.products.map((p, i) => (
            <Reveal as="li" key={p.name} variant="scale" delay={(i % 4) * 90}>
              <ProductCard product={p} sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 30vw, 45vw" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
