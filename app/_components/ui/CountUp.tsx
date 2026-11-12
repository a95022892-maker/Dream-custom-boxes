"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
};

/**
 * Counts from 0 to `to` when scrolled into view.
 * The final value is server-rendered (good for SEO / no-JS); the animation
 * writes straight to the DOM so it never triggers React re-renders.
 */
export function CountUp({ to, decimals = 0, suffix = "", duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = format(to * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // format is derived from props already listed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, decimals, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(to)}
    </span>
  );
}
