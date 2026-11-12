import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
};

/**
 * Infinite horizontal ticker (pure CSS). Content is rendered twice and the
 * track slides by -50%, so the loop is seamless. Pauses on hover.
 */
export function Marquee({ children, duration = 30, className = "" }: Props) {
  return (
    <div
      className={`marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee-track flex w-max animate-marquee">
        <div className="flex shrink-0 items-stretch">{children}</div>
        <div className="flex shrink-0 items-stretch" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
