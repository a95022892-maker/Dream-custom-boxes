import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({ eyebrow, title, children, align = "left", tone = "dark", className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal
          as="p"
          className={`mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase ${tone === "light" ? "text-coral" : "text-coral-deep"}`}
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={80}
        className={`font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl ${tone === "light" ? "text-paper" : "text-ink"}`}
      >
        {title}
      </Reveal>
      {children && (
        <Reveal
          delay={160}
          className={`mt-5 space-y-4 text-base leading-relaxed sm:text-lg ${tone === "light" ? "text-paper/70" : "text-ink-soft"}`}
        >
          {children}
        </Reveal>
      )}
    </div>
  );
}
