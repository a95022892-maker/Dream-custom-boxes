"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type HTMLAttributes } from "react";

type Variant = "up" | "left" | "right" | "scale" | "fade";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Delay in ms — handy for staggering items in a list. */
  delay?: number;
  variant?: Variant;
};

/* One shared observer for every <Reveal> on the page keeps this cheap. */
let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  return observer;
}

/**
 * Fades/slides its children in the first time they scroll into view.
 * Animation styles live in globals.css under [data-reveal].
 */
export function Reveal({ as: Tag = "div", delay = 0, variant = "up", style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    />
  );
}
