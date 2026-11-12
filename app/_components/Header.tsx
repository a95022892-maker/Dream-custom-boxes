"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { announcements, nav, site } from "@/app/_data/home";
import { Icon } from "./ui/Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>

      {/* Utility bar */}
      <div className="bg-ink text-paper/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="flex items-center gap-1.5 transition hover:text-coral">
              <Icon name="phone" className="size-3.5" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 transition hover:text-coral sm:flex">
              <Icon name="mail" className="size-3.5" /> {site.email}
            </a>
          </div>
          <ul className="hidden items-center gap-5 md:flex">
            {announcements.map((a) => (
              <li key={a} className="flex items-center gap-1.5">
                <Icon name="check" className="size-3.5 text-coral" /> {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-out-expo ${
          scrolled ? "bg-paper/85 shadow-[0_8px_30px_-12px_rgb(23_22_27/0.18)] backdrop-blur-xl" : "bg-paper"
        }`}
      >
        <div className={`relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-500 sm:px-6 ${scrolled ? "py-2.5" : "py-4"}`}>
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image src={site.logo} alt="Dream Custom Boxes logo" className={`h-auto transition-all duration-500 ${scrolled ? "w-36" : "w-44"}`} preload />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.label} className={`group ${item.groups.length > 2 ? "" : "relative"}`}>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink/5 group-focus-within:bg-ink/5"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <Icon name="chevron" className="size-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                  <MegaPanel item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/get-quote/"
              className="group hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-white transition hover:bg-coral-deep sm:inline-flex"
            >
              Get a Quote
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-11 place-items-center rounded-full bg-ink text-paper xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        inert={!mobileOpen}
      >
        <div
          onClick={closeMobile}
          className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper shadow-2xl transition-transform duration-500 ease-out-expo ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Image src={site.logo} alt="" className="h-auto w-36" />
            <button type="button" onClick={closeMobile} className="grid size-10 place-items-center rounded-full bg-ink/5" aria-label="Close menu">
              <Icon name="close" className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            {nav.map((item) => {
              const open = mobileSection === item.label;
              return (
                <div key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setMobileSection(open ? null : item.label)}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-xl"
                    aria-expanded={open}
                  >
                    {item.label}
                    <Icon name="plus" className={`size-5 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      {item.groups.map((g) => (
                        <div key={g.title} className="pb-4">
                          <p className="mb-2 text-xs font-bold tracking-widest text-coral-deep uppercase">
                            {g.href ? <Link href={g.href} onClick={closeMobile}>{g.title}</Link> : g.title}
                          </p>
                          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-ink-soft">
                            {g.links.map((l) => (
                              <li key={l.href + l.label}>
                                <Link href={l.href} onClick={closeMobile} className="hover:text-ink">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          <div className="border-t border-line p-5">
            <Link href="/get-quote/" onClick={closeMobile} className="flex w-full items-center justify-center gap-2 rounded-full bg-coral py-3.5 font-bold text-white">
              Get a Quote <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

/** Dropdown panel shown on hover / keyboard focus of a nav item. */
function MegaPanel({ item }: { item: (typeof nav)[number] }) {
  const wide = item.groups.length > 2;
  return (
    <div
      className={`invisible absolute top-full pt-3 opacity-0 transition-all duration-300 ease-out-expo group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
        wide ? "left-1/2 w-[min(64rem,90vw)] -translate-x-1/2 translate-y-2" : "left-0 w-max translate-y-2"
      }`}
    >
      <div className="rounded-3xl bg-white p-7 shadow-[0_30px_60px_-20px_rgb(23_22_27/0.3)] ring-1 ring-line">
        <div className={`grid gap-x-8 gap-y-6 ${wide ? "grid-cols-5" : item.groups.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {item.groups.map((g) => (
            <div key={g.title}>
              <p className="mb-3 text-xs font-bold tracking-widest text-coral-deep uppercase">
                {g.href ? <Link href={g.href} className="hover:text-ink">{g.title}</Link> : g.title}
              </p>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="inline-block text-sm text-ink-soft transition hover:translate-x-1 hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {item.footer && (
          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <p className="text-sm text-ink-soft">
              {announcements.join(" · ")}
            </p>
            <div className="flex gap-2">
              {item.footer.map((f) => (
                <Link key={f.href} href={f.href} className="group/btn inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-coral">
                  {f.label} <Icon name="arrow" className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
