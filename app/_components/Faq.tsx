"use client";

import { useMemo, useState, type ReactNode } from "react";
import { faqs, site } from "@/app/_data/home";
import { Icon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/** Wraps each match of `query` in <mark> for live search highlighting. */
function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.split(new RegExp(`(${escaped})`, "ig")).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="rounded bg-coral/25 px-0.5 text-inherit">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const q = query.trim();

  const results = useMemo(
    () =>
      faqs.items
        .map((item, index) => ({ ...item, index }))
        .filter((item) => !q || `${item.q} ${item.a}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <section className="relative overflow-hidden border-t border-line bg-paper py-24 lg:py-32">
      {/* floating question marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          "top-24 left-[6%] text-8xl animate-float text-coral/15",
          "top-1/2 left-[2%] text-6xl animate-float-slow text-kraft/30 [animation-delay:-2s]",
          "bottom-16 left-[22%] text-7xl animate-float text-ink/5 [animation-delay:-4s]",
          "top-16 right-[4%] text-7xl animate-float-slow text-ink/5",
        ].map((c) => (
          <span key={c} className={`absolute font-display italic ${c}`}>?</span>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        {/* ------------- Left: heading, search, help card ------------- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Questions" title={faqs.title} />

          <Reveal delay={180} className="relative mt-8">
            <Icon name="search" className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-soft" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search FAQs"
              className="w-full rounded-full bg-white py-4 pr-5 pl-13 text-sm shadow-[0_12px_30px_-16px_rgb(23_22_27/0.25)] ring-1 ring-line outline-none transition focus:ring-2 focus:ring-coral"
            />
          </Reveal>
          <p className="mt-3 pl-5 text-xs text-ink-soft" aria-live="polite">
            {q ? `${results.length} of ${faqs.items.length} questions match` : `${faqs.items.length} questions answered`}
          </p>

          <Reveal delay={260} className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-ink p-7 text-paper">
            <span aria-hidden className="absolute -right-4 -bottom-10 font-display text-[9rem] leading-none text-paper/5 italic">?</span>
            <p className="font-display text-xl">Still have questions?</p>
            <p className="mt-2 text-sm text-paper/70">Our packaging experts are one call or email away.</p>
            <div className="relative mt-6 flex flex-col gap-3 text-sm font-semibold">
              <a href={site.phoneHref} className="flex items-center gap-2 transition hover:translate-x-1 hover:text-coral">
                <Icon name="phone" className="size-4 text-coral" /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition hover:translate-x-1 hover:text-coral">
                <Icon name="mail" className="size-4 text-coral" /> {site.email}
              </a>
            </div>
          </Reveal>
        </div>

        {/* ------------- Right: accordion cards ------------- */}
        <ul className="space-y-3">
          {results.map((item, pos) => {
            const isOpen = open === item.index;
            const id = `faq-${item.index}`;
            return (
              <Reveal as="li" key={item.index} delay={Math.min(pos, 6) * 60}>
                {/* re-mounting on search gives each result a fresh fade-up */}
                <div
                  key={q}
                  className={`animate-fade-up overflow-hidden rounded-3xl transition-all duration-500 ease-out-expo ${
                    isOpen
                      ? "bg-ink text-paper shadow-[0_30px_60px_-30px_rgb(23_22_27/0.6)]"
                      : "bg-white ring-1 ring-line hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-24px_rgb(23_22_27/0.35)] hover:ring-ink/15"
                  }`}
                  style={{ animationDelay: `${pos * 40}ms` }}
                >
                  <h3>
                    <button
                      type="button"
                      id={`${id}-btn`}
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : item.index)}
                      className="group flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-6"
                    >
                      <span className={`font-display text-sm italic transition-colors ${isOpen ? "text-coral" : "text-ink-soft"}`}>
                        {String(item.index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-lg leading-snug sm:text-xl">{highlight(item.q, q)}</span>
                      {/* plus → minus: the vertical bar rotates flat */}
                      <span
                        aria-hidden
                        className={`relative grid size-10 shrink-0 place-items-center rounded-full transition duration-500 ease-out-expo ${
                          isOpen ? "rotate-180 bg-coral" : "bg-paper group-hover:bg-ink"
                        }`}
                      >
                        <span className={`absolute h-0.5 w-3.5 rounded-full transition-colors ${isOpen ? "bg-white" : "bg-ink group-hover:bg-paper"}`} />
                        <span
                          className={`absolute h-3.5 w-0.5 rounded-full transition duration-500 ease-out-expo ${
                            isOpen ? "scale-y-0 bg-white" : "bg-ink group-hover:bg-paper"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={id}
                    role="region"
                    aria-labelledby={`${id}-btn`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`flex gap-4 px-5 pb-6 transition duration-500 ease-out-expo sm:gap-6 sm:px-6 ${
                          isOpen ? "translate-y-0 opacity-100 delay-150" : "-translate-y-3 opacity-0"
                        }`}
                      >
                        <span aria-hidden className="w-[1.35rem] shrink-0 border-l-2 border-coral/60" />
                        <p className="max-w-2xl leading-relaxed text-paper/75">{highlight(item.a, q)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {results.length === 0 && (
            <li className="animate-fade-up rounded-3xl bg-white p-10 text-center ring-1 ring-line">
              <p className="font-display text-2xl">No questions match “{q}”.</p>
              <p className="mt-2 text-ink-soft">
                Ask us directly at{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-coral-deep underline underline-offset-4">
                  {site.email}
                </a>
              </p>
              <button type="button" onClick={() => setQuery("")} className="mt-5 text-sm font-bold underline underline-offset-4">
                Clear search
              </button>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
