import Image from "next/image";
import Link from "next/link";
import { footerLinks, legal, site } from "@/app/_data/home";
import { ProductionLine } from "./ProductionLine";
import { Icon, type IconName } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* Production line: from order to doorstep */}
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <Reveal className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-coral uppercase">
              <span className="h-px w-8 bg-current" /> From order to doorstep
            </p>
            <h2 className="max-w-xl font-display text-3xl leading-tight font-medium sm:text-4xl">
              Ready to build boxes your customers <span className="text-coral italic">remember?</span>
            </h2>
          </div>
          <a href="#quotation" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-coral px-7 py-4 font-bold text-white transition hover:bg-white hover:text-ink">
            Get a Free Quote <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
        <Reveal variant="scale" delay={120}>
          <ProductionLine />
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span className="inline-block rounded-2xl bg-white px-4 py-3">
            <Image src={site.logo} alt="Dream Custom Boxes Logo" className="h-auto w-40" />
          </span>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/65">{site.tagline}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-coral">
                <Icon name="phone" className="size-4 text-coral" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-coral">
                <Icon name="mail" className="size-4 text-coral" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.addressHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-coral">
                <Icon name="pin" className="size-4 text-coral" /> {site.address}
              </a>
            </li>
            <li>
              <Link href="/customer-reviews/" className="flex items-center gap-2.5 hover:text-coral">
                <Icon name="star" className="size-4 text-coral" /> 5.0 Google &amp; Trustpilot
              </Link>
            </li>
          </ul>
          <ul className="mt-7 flex gap-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full ring-1 ring-paper/20 transition duration-300 hover:-translate-y-1 hover:bg-coral hover:ring-coral"
                >
                  <Icon name={s.label.toLowerCase() as IconName} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerLinks.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="font-display text-lg">{col.title}</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-paper/65">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="inline-block transition hover:translate-x-1 hover:text-coral">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-paper/55 sm:px-6 md:flex-row">
          <p>© 2026 Dream Custom Boxes – All rights reserved</p>
          <Image src={site.payments} alt="payment options" className="h-6 w-auto rounded bg-white/90 px-2 py-1" />
          <div className="flex gap-5">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-coral">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
