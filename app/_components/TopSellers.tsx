"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { topSellers } from "@/app/_data/home";
import { Icon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/**
 * "Spotlight" showcase: one large stage + selectable product tabs.
 * The active tab's progress bar is a CSS animation; when it ends we advance
 * to the next product, so pausing (hover/focus) is just animation-play-state.
 */
export function TopSellers() {
  const products = topSellers.products;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const advance = () => {
    if (!reducedMotion.current) setActive((i) => (i + 1) % products.length);
  };

  const current = products[active];

  return (
    <section id="content" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Best sellers" title={topSellers.title} />
        <Reveal delay={200}>
          <Link href="/products/" className="group inline-flex items-center gap-2 font-bold text-ink">
            <span className="border-b-2 border-coral pb-0.5">Browse All Products</span>
            <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <Reveal
        variant="fade"
        className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* ---------- Stage ---------- */}
        <div className="relative isolate aspect-square overflow-hidden rounded-[2rem] bg-paper-deep sm:aspect-[4/3] lg:aspect-auto lg:min-h-[36rem] lg:rounded-[2.5rem]">
          {products.map((p, i) => (
            <Image
              key={p.name}
              src={p.image}
              alt={i === active ? p.alt : ""}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={`-z-10 object-cover transition duration-[1100ms] ease-out-expo ${
                i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
            />
          ))}
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

          {/* counter */}
          <p className="absolute top-5 left-5 rounded-full bg-white/90 px-4 py-1.5 font-display text-sm backdrop-blur sm:top-7 sm:left-7">
            <span className="font-semibold">0{active + 1}</span>
            <span className="text-ink-soft"> / 0{products.length}</span>
          </p>

          {/* price medallion — re-keyed so it pops on every change */}
          <div
            key={`price-${active}`}
            className="absolute top-4 right-4 grid size-24 animate-pop place-items-center rounded-full bg-coral text-center text-white shadow-xl sm:top-6 sm:right-6 sm:size-28"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-wider uppercase opacity-80">As low As</p>
              <p className="font-display text-2xl leading-none font-medium sm:text-3xl">{current.price}</p>
              <p className="text-[11px] opacity-80">/ Box</p>
            </div>
          </div>

          {/* caption */}
          <div key={`cap-${active}`} className="absolute inset-x-0 bottom-0 p-6 text-paper sm:p-9">
            <h3 className="animate-fade-up font-display text-3xl font-medium tracking-tight sm:text-5xl">{current.name}</h3>
            <p className="mt-2 max-w-md animate-fade-up text-sm text-paper/80 [animation-delay:80ms] sm:text-base">
              {current.description}
            </p>
            <Link
              href={current.href}
              className="group mt-5 inline-flex animate-fade-up items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-bold text-ink transition [animation-delay:160ms] hover:bg-coral hover:text-white"
            >
              View {current.name}
              <Icon name="arrowUpRight" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ---------- Tabs ---------- */}
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:content-between lg:gap-4" role="list">
          {products.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={p.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  aria-label={`Show ${p.name}`}
                  className={`group relative flex h-full w-full items-center gap-3 overflow-hidden rounded-2xl p-3 text-left transition duration-500 ease-out-expo sm:gap-4 sm:p-4 lg:rounded-3xl lg:p-5 ${
                    isActive
                      ? "bg-ink text-paper shadow-[0_24px_48px_-24px_rgb(23_22_27/0.6)] lg:translate-x-[-0.75rem]"
                      : "bg-white ring-1 ring-line hover:ring-ink/25"
                  }`}
                >
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-paper-deep sm:size-16 lg:size-20">
                    <Image src={p.image} alt="" fill sizes="80px" className={`object-cover transition duration-700 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className={`hidden font-display text-xs italic sm:block ${isActive ? "text-coral" : "text-ink-soft"}`}>0{i + 1}</span>
                    <span className="block truncate font-display text-base font-medium sm:text-xl">{p.name}</span>
                    <span className={`block text-xs sm:text-sm ${isActive ? "text-paper/70" : "text-ink-soft"}`}>
                      As low As <b className={isActive ? "text-coral" : "text-coral-deep"}>{p.price}</b> / Box
                    </span>
                    {/* description expands only for the active tab on desktop */}
                    <span className={`hidden transition-[grid-template-rows] duration-500 ease-out-expo lg:grid ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-sm text-paper/70">{p.description}</span>
                      </span>
                    </span>
                  </span>

                  <Icon
                    name="arrow"
                    className={`hidden size-5 shrink-0 transition duration-500 sm:block ${isActive ? "text-coral" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
                  />

                  {/* auto-advance progress */}
                  {isActive && (
                    <span
                      key={active}
                      onAnimationEnd={advance}
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                      className="absolute inset-x-0 bottom-0 h-1 origin-left animate-progress bg-coral"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
