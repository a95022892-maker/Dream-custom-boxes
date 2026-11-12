"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon, type IconName } from "./ui/Icons";

/* ------------------------------------------------------------------ data */

type BoxType = "mailer" | "rigid" | "folding" | "tuck";

const BOXES: { type: BoxType; name: string; href: string }[] = [
  { type: "mailer", name: "Mailer Box", href: "/custom-mailer-boxes/" },
  { type: "rigid", name: "Rigid Box", href: "/rigid-boxes/" },
  { type: "folding", name: "Folding Carton", href: "/folding-carton-paperboard-boxes/" },
  { type: "tuck", name: "Tuck End Box", href: "/straight-tuck-end-boxes/" },
];

const STEPS: { icon: IconName; label: string }[] = [
  { icon: "form", label: "Order placed" },
  { icon: "factory", label: "Production" },
  { icon: "shield", label: "Quality check" },
  { icon: "truck", label: "Free shipping" },
];

type Arms = "idle" | "wave" | "work" | "carry";
type Item = {
  id: number;
  index: number;
  left: string;
  dur: number;
  built: boolean;
  lifted: boolean;
  checked: boolean;
  loaded: boolean;
};
type Layout = { dock: number; truck: number; drop: number; home: number; assemble: number };

/**
 * Measure the stage and work out where everything stands (in px), so the
 * scene fits any screen width: belt on the left, loading dock on the right.
 */
function measure(stage: HTMLElement): Layout {
  const width = stage.clientWidth;
  const rw = stage.querySelector<HTMLElement>("[data-robot]")?.offsetWidth ?? 150;
  const tw = stage.querySelector<HTMLElement>("[data-truck]")?.offsetWidth ?? 220;
  const bw = rw * 0.83;
  const truck = width - tw - Math.max(8, width * 0.04);
  const drop = truck - rw * 0.3;
  const home = Math.min(width * 0.5, drop - Math.max(60, width * 0.12));
  const assemble = home - (rw * 0.55 + bw * 0.42);
  return { dock: truck - 18, truck, drop, home, assemble };
}

/* ------------------------------------------------------------- component */

/**
 * "From order to doorstep" factory scene for the footer.
 * A small async timeline drives React state; each movement is a CSS
 * transition/animation, so the code reads like a script and motion stays smooth.
 */
export function ProductionLine() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [robotLeft, setRobotLeft] = useState("112%");
  const [walking, setWalking] = useState(false);
  const [arms, setArms] = useState<Arms>("idle");
  const [bubble, setBubble] = useState(false);
  const [item, setItem] = useState<Item | null>(null);
  const [truck, setTruck] = useState({ left: "112%", dur: 0, moving: false });
  const [step, setStep] = useState(-1);
  const [sparks, setSparks] = useState(0);

  // keep the dock position in sync with the stage size
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => setLayout(measure(stage)));
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let cancelled = false;
    const timers: number[] = [];
    const sleep = (ms: number) => new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));
    const patch = (p: Partial<Item>) => setItem((it) => (it ? { ...it, ...p } : it));
    const px = (n: number) => `${Math.round(n)}px`;
    const walkTo = async (left: string, ms = 1500) => {
      setWalking(true);
      setRobotLeft(left);
      await sleep(ms);
      setWalking(false);
    };

    const run = async () => {
      let L = measure(stage);

      // Reduced motion: a calm, static scene.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setRobotLeft(px(L.home));
        setBubble(true);
        setStep(2);
        setTruck({ left: px(L.truck), dur: 0, moving: false });
        setItem({ id: 0, index: 0, left: px(L.assemble), dur: 0, built: true, lifted: false, checked: true, loaded: false });
        return;
      }

      // 1. Robot strolls in and greets the visitor
      await walkTo("66%", 1900);
      if (cancelled) return;
      setArms("wave");
      setBubble(true);
      await sleep(3800);
      if (cancelled) return;
      setBubble(false);
      setArms("idle");
      await walkTo(px(L.home), 1100);

      // 2. Order → production → QC → shipping, on repeat
      for (let n = 0; !cancelled; n++) {
        L = measure(stage);
        const index = n % BOXES.length;

        // Order placed: flat sheet rides in on the belt
        setStep(0);
        setItem({ id: n, index, left: "-20%", dur: 0, built: false, lifted: false, checked: false, loaded: false });
        await sleep(50);
        patch({ left: px(L.assemble), dur: 1500 });
        await sleep(1550);
        if (cancelled) return;

        // Production: assemble
        setStep(1);
        setArms("work");
        await sleep(900);
        patch({ built: true });
        setSparks((s) => s + 1);
        await sleep(1000);
        if (cancelled) return;

        // Quality check: lift it up and stamp it
        setStep(2);
        setArms("carry");
        patch({ left: px(L.home), lifted: true, dur: 600 });
        await sleep(750);
        patch({ checked: true });
        await sleep(800);
        if (cancelled) return;

        // Truck pulls up while the robot carries the box to the dock
        setTruck({ left: px(L.truck), dur: 1400, moving: true });
        patch({ left: px(L.drop), dur: 1500 });
        await walkTo(px(L.drop), 1500);
        setTruck((t) => ({ ...t, moving: false }));
        if (cancelled) return;

        // Load into the truck
        patch({ left: px(L.truck + 30), dur: 450 });
        await sleep(450);
        patch({ loaded: true });
        setArms("idle");
        await sleep(350);

        // Free shipping: truck drives off, robot heads back
        setStep(3);
        setTruck({ left: "115%", dur: 1300, moving: true });
        await walkTo(px(L.home), 1500);
        setTruck((t) => ({ ...t, moving: false }));
        setItem(null);
        await sleep(500);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.4 },
    );
    io.observe(stage);

    return () => {
      cancelled = true;
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const box = item ? BOXES[item.index] : null;
  const dock = layout ? `${layout.dock}px` : "70%";

  return (
    <div
      ref={stageRef}
      role="region"
      aria-label="From order to doorstep — our production line"
      className="relative h-[27rem] overflow-clip rounded-[2rem] bg-gradient-to-b from-[#f6f1e8] to-[#e8dfd0] text-ink sm:h-[29rem]"
      style={{ "--rw": "clamp(96px, 13vw, 170px)", "--bw": "clamp(78px, 10.5vw, 140px)", "--tw": "clamp(130px, 19vw, 260px)" } as CSSProperties}
    >
      {/* factory wall */}
      <div aria-hidden className="absolute inset-0 [background-image:linear-gradient(rgb(23_22_27/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(23_22_27/0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
      <p aria-hidden className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(4rem,13vw,10rem)] leading-none font-medium whitespace-nowrap text-ink/[0.04] italic select-none">
        Dream Custom Boxes
      </p>

      {/* ---------------- top bar: turnaround + order tracker ---------------- */}
      <div className="absolute inset-x-4 top-4 z-40 flex flex-col gap-3 sm:inset-x-6 sm:top-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper sm:text-sm">
            <Icon name="bolt" className="size-4 text-coral" /> Fastest turnarounds
            <span className="font-normal text-paper/60">· 6–20 business days</span>
          </span>
          {box && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur sm:text-sm">
              Building:
              <Link href={box.href} className="font-bold text-coral-deep underline-offset-4 hover:underline">
                {box.name}
              </Link>
            </span>
          )}
        </div>

        <ol className="flex w-fit items-center gap-1 rounded-full bg-white/80 p-1 shadow-sm backdrop-blur" aria-label="Order progress">
          {STEPS.map((s, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={s.label} className="flex items-center gap-1">
                {i > 0 && <span className={`h-0.5 w-3 rounded-full transition-colors duration-500 sm:w-5 ${done || current ? "bg-coral" : "bg-ink/10"}`} />}
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold transition-all duration-500 sm:px-3 sm:text-xs ${
                    current ? "bg-coral text-white shadow-md" : done ? "bg-ink text-paper" : "text-ink-soft"
                  }`}
                  aria-current={current ? "step" : undefined}
                >
                  <Icon name={done ? "check" : s.icon} className="size-3.5" />
                  <span className={current ? "" : "hidden md:inline"}>{s.label}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ---------------- robot (behind the belt / dock) ---------------- */}
      <div
        data-robot
        className="absolute bottom-6 z-10 -translate-x-1/2 transition-[left] duration-[1500ms] ease-in-out"
        style={{ left: robotLeft, width: "var(--rw)" }}
      >
        <div
          role="status"
          className={`absolute bottom-[calc(100%+0.5rem)] left-1/2 w-56 -translate-x-[78%] rounded-2xl bg-white px-4 py-3 text-sm shadow-[0_20px_40px_-20px_rgb(23_22_27/0.4)] transition duration-500 ease-out-expo sm:w-64 ${
            bubble ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-90 opacity-0"
          }`}
        >
          <p className="font-display text-lg leading-tight font-medium">Hello there! 👋</p>
          <p className="mt-0.5 text-ink-soft">Thanks for visiting Dream Custom Boxes. Watch how fast your order gets made!</p>
          <span aria-hidden className="absolute -bottom-1.5 left-[78%] size-3 rotate-45 bg-white" />
        </div>
        <Robot arms={arms} walking={walking} />
      </div>

      {/* ---------------- delivery truck ---------------- */}
      <div
        data-truck
        className="absolute bottom-14 z-20 transition-[left] ease-in-out"
        style={{ left: truck.left, width: "var(--tw)", transitionDuration: `${truck.dur}ms` }}
      >
        {truck.moving && (
          <div aria-hidden className="absolute top-1/3 -left-10 flex flex-col gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-0.5 w-8 animate-pulse rounded-full bg-ink/30" style={{ animationDelay: `${i * 120}ms` }} />
            ))}
          </div>
        )}
        <Truck moving={truck.moving} />
      </div>

      {/* ---------------- floor: conveyor + loading dock ---------------- */}
      <div aria-hidden className="absolute bottom-0 left-0 z-20 h-14 transition-[width] duration-500" style={{ width: dock }}>
        <div className="h-3 animate-belt bg-[repeating-linear-gradient(90deg,#2c2b31_0_18px,#17161b_18px_36px)]" />
        <div className="flex h-11 items-center justify-around overflow-hidden bg-[#3a3940] px-3">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="size-5 shrink-0 rounded-full border-2 border-[#5b5862] bg-[#2c2b31]" />
          ))}
        </div>
      </div>
      <div aria-hidden className="absolute right-0 bottom-0 z-20 h-14 bg-[#4a4752]" style={{ left: dock }}>
        <div className="h-2 bg-[repeating-linear-gradient(135deg,#f2c14e_0_10px,#17161b_10px_20px)]" />
        <div className="mt-4 h-0.5 bg-[repeating-linear-gradient(90deg,#f7f3ec_0_16px,transparent_16px_32px)] opacity-60" />
      </div>

      {/* ---------------- the box ---------------- */}
      {item && (
        <div
          key={item.id}
          className="absolute bottom-14 z-30 transition-[left,translate,scale,opacity] ease-in-out"
          style={{
            left: item.left,
            width: "var(--bw)",
            aspectRatio: "140 / 120",
            transitionDuration: `${item.dur}ms`,
            translate: item.lifted ? "-50% calc(var(--rw) * -0.42)" : "-50% 0",
            scale: item.loaded ? "0.4" : "1",
            opacity: item.loaded ? 0 : 1,
          }}
        >
          <div
            className={`absolute inset-0 origin-bottom transition duration-500 ease-out-expo [transform:perspective(320px)_rotateX(62deg)] ${
              item.built ? "scale-50 opacity-0" : "opacity-100"
            }`}
          >
            <FlatSheet type={BOXES[item.index].type} />
          </div>
          <div
            className={`absolute inset-0 origin-bottom transition duration-700 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${
              item.built ? "scale-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          >
            <BuiltBox type={BOXES[item.index].type} />
          </div>
          {item.built && <Sparks key={sparks} />}

          {/* QC stamp */}
          {item.checked && (
            <span className="absolute -top-3 -right-3 grid size-10 -rotate-12 animate-pop place-items-center rounded-full border-2 border-white bg-[#4f7a3a] text-white shadow-lg sm:size-12">
              <Icon name="check" className="size-5 sm:size-6" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- robot */

function Robot({ arms, walking }: { arms: Arms; walking: boolean }) {
  const part = "transition-transform duration-500 [transform-box:view-box]";
  const leftArm = arms === "work" ? "animate-robot-work-l" : arms === "carry" ? "[transform:rotate(-38deg)]" : "";
  const rightArm =
    arms === "wave" ? "animate-robot-wave" : arms === "work" ? "animate-robot-work-r" : arms === "carry" ? "[transform:rotate(38deg)]" : "";
  const leg = walking ? "animate-robot-leg" : "";

  return (
    <svg viewBox="0 0 160 240" className={`block w-full overflow-visible ${walking ? "animate-robot-bob" : ""}`} role="img" aria-label="Dream Custom Boxes robot">
      {/* legs — black pants, grey boots */}
      <g className={`${part} ${leg}`} style={{ transformOrigin: "63px 156px" }}>
        <rect x="50" y="154" width="26" height="54" rx="7" fill="#0f0e12" />
        <rect x="46" y="202" width="34" height="15" rx="7" fill="#5b5862" />
      </g>
      <g className={`${part} ${leg} [animation-delay:-0.5s]`} style={{ transformOrigin: "97px 156px" }}>
        <rect x="84" y="154" width="26" height="54" rx="7" fill="#0f0e12" />
        <rect x="80" y="202" width="34" height="15" rx="7" fill="#5b5862" />
      </g>

      {/* left arm */}
      <g className={`${part} ${leftArm}`} style={{ transformOrigin: "39px 96px" }}>
        <rect x="29" y="88" width="20" height="30" rx="9" fill="#17161b" />
        <rect x="32" y="114" width="14" height="30" rx="7" fill="#c9c6be" stroke="#17161b" strokeWidth="2" />
        <circle cx="39" cy="150" r="9" fill="#eceae4" stroke="#17161b" strokeWidth="2" />
      </g>

      {/* torso — black T-shirt with the Dream Custom Boxes logo */}
      <rect x="72" y="76" width="16" height="12" fill="#9a978f" />
      <rect x="42" y="84" width="76" height="74" rx="18" fill="#17161b" />
      <path d="M68 85 L80 97 L92 85" fill="none" stroke="#3a3940" strokeWidth="3" strokeLinecap="round" />
      <polygon points="80,99 87,103 87,111 80,115 73,111 73,103" fill="none" stroke="#f7f3ec" strokeWidth="1.6" />
      <rect x="77" y="103" width="2" height="8" fill="#f7f3ec" />
      <rect x="81" y="104" width="2" height="6" fill="#f7f3ec" />
      <text x="80" y="131" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ef5f55" className="font-sans">
        Dream
      </text>
      <text x="80" y="140" textAnchor="middle" fontSize="5.4" fontWeight="700" letterSpacing="1.2" fill="#f7f3ec" className="font-sans">
        CUSTOM BOXES
      </text>
      <rect x="42" y="150" width="76" height="7" rx="3" fill="#2c2b31" />

      {/* right arm */}
      <g className={`${part} ${rightArm}`} style={{ transformOrigin: "121px 96px" }}>
        <rect x="111" y="88" width="20" height="30" rx="9" fill="#17161b" />
        <rect x="114" y="114" width="14" height="30" rx="7" fill="#c9c6be" stroke="#17161b" strokeWidth="2" />
        <circle cx="121" cy="150" r="9" fill="#eceae4" stroke="#17161b" strokeWidth="2" />
      </g>

      {/* head */}
      <line x1="80" y1="6" x2="80" y2="22" stroke="#3a3940" strokeWidth="3" />
      <circle cx="80" cy="6" r="5.5" className="animate-pulse" fill="#ef5f55" />
      <circle cx="40" cy="49" r="6" fill="#c9c6be" stroke="#17161b" strokeWidth="2" />
      <circle cx="120" cy="49" r="6" fill="#c9c6be" stroke="#17161b" strokeWidth="2" />
      <rect x="40" y="20" width="80" height="58" rx="18" fill="#eceae4" stroke="#17161b" strokeWidth="3" />
      <rect x="50" y="33" width="60" height="30" rx="12" fill="#17161b" />
      <g className="animate-blink [transform-box:fill-box] [transform-origin:center]">
        <circle cx="66" cy="46" r="5" fill="#7ee0d6" />
        <circle cx="94" cy="46" r="5" fill="#7ee0d6" />
      </g>
      <path d="M72 55 q8 5 16 0" fill="none" stroke="#7ee0d6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* ----------------------------------------------------------------- truck */

function Truck({ moving }: { moving: boolean }) {
  const wheel = `[transform-box:fill-box] [transform-origin:center] ${moving ? "animate-spin [animation-duration:0.5s]" : ""}`;
  return (
    <svg viewBox="0 0 260 140" className={`block w-full overflow-visible ${moving ? "animate-robot-bob" : ""}`} role="img" aria-label="Dream Custom Boxes delivery truck">
      {/* cargo body (open back on the left) */}
      <rect x="4" y="8" width="172" height="100" rx="10" fill="#f7f3ec" stroke="#17161b" strokeWidth="3" />
      <rect x="4" y="14" width="10" height="88" rx="3" fill="#3a3940" />
      <text x="96" y="52" textAnchor="middle" fontSize="26" fontWeight="800" fill="#ef5f55" className="font-sans">Dream</text>
      <text x="96" y="66" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="2" fill="#17161b" className="font-sans">CUSTOM BOXES</text>
      <rect x="40" y="78" width="112" height="16" rx="8" fill="#17161b" />
      <text x="96" y="89" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#f7f3ec" className="font-sans">FREE WORLDWIDE SHIPPING</text>
      {/* cab */}
      <path d="M176 36 h44 l30 34 v38 h-74 z" fill="#ef5f55" stroke="#17161b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M186 44 h30 l20 24 h-50 z" fill="#bfe6f0" stroke="#17161b" strokeWidth="2" />
      <rect x="240" y="88" width="12" height="8" rx="2" fill="#f2c14e" />
      {/* wheels */}
      {[50, 206].map((cx) => (
        <g key={cx} className={wheel}>
          <circle cx={cx} cy="112" r="20" fill="#17161b" />
          <circle cx={cx} cy="112" r="8" fill="#c9c6be" />
          <rect x={cx - 2} y="96" width="4" height="10" fill="#5b5862" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------ box artwork */

type Palette = { front: string; side: string; top: string; accent: string };

const PALETTES: Record<BoxType, Palette> = {
  mailer: { front: "#d6b082", side: "#b98d5c", top: "#e6c79c", accent: "#ef5f55" },
  rigid: { front: "#2b2a30", side: "#1e1d22", top: "#3a3940", accent: "#ef5f55" },
  folding: { front: "#faf7f2", side: "#e3ddd2", top: "#efe9df", accent: "#9f92dc" },
  tuck: { front: "#cfc6ee", side: "#b3a7e0", top: "#e0daf7", accent: "#ef5f55" },
};

/** Oblique-projection cuboid: front face + top + right side. */
function Cuboid({ x, y, w, h, d, p }: { x: number; y: number; w: number; h: number; d: number; p: Palette }) {
  const dx = d * 0.62;
  const dy = d * 0.5;
  return (
    <g stroke="rgb(23 22 27 / 0.35)" strokeWidth="1" strokeLinejoin="round">
      <polygon points={`${x},${y} ${x + w},${y} ${x + w + dx},${y - dy} ${x + dx},${y - dy}`} fill={p.top} />
      <polygon points={`${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}`} fill={p.side} />
      <rect x={x} y={y} width={w} height={h} fill={p.front} />
    </g>
  );
}

function BuiltBox({ type }: { type: BoxType }) {
  const p = PALETTES[type];
  return (
    <svg viewBox="0 0 140 120" className="size-full overflow-visible drop-shadow-[0_10px_8px_rgb(23_22_27/0.25)]">
      {type === "mailer" && (
        <>
          <Cuboid x={12} y={66} w={98} h={46} d={40} p={p} />
          <rect x={12} y={66} width={98} height={9} fill="#c99f6c" />
          <text x={61} y={98} textAnchor="middle" fontSize="13" fontWeight="800" fill={p.accent} className="font-sans">Dream</text>
        </>
      )}
      {type === "rigid" && (
        <>
          <Cuboid x={24} y={76} w={80} h={36} d={30} p={p} />
          <Cuboid x={20} y={62} w={88} h={16} d={34} p={{ front: "#ef5f55", side: "#d94a40", top: "#f47d74", accent: "" }} />
          <rect x={60} y={62} width={8} height={16} fill="#e6c79c" />
          <polygon points="60,62 68,62 79,53.5 71,53.5" fill="#e6c79c" />
        </>
      )}
      {type === "folding" && (
        <>
          <Cuboid x={44} y={34} w={46} h={78} d={26} p={p} />
          <rect x={44} y={58} width={46} height={18} fill={p.accent} />
          <text x={67} y={70.5} textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" className="font-sans">Dream</text>
        </>
      )}
      {type === "tuck" && (
        <>
          <polygon points="60,29 106,29 101,6 63,10" fill="#e0daf7" stroke="rgb(23 22 27 / 0.35)" />
          <Cuboid x={44} y={42} w={46} h={70} d={26} p={p} />
          <circle cx={67} cy={77} r={11} fill={p.accent} />
          <text x={67} y={80} textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" className="font-sans">Dream</text>
        </>
      )}
    </svg>
  );
}

/** The die-cut sheet before folding (shown lying flat via a CSS rotateX). */
function FlatSheet({ type }: { type: BoxType }) {
  const p = PALETTES[type];
  const panel = { fill: p.front, stroke: "rgb(23 22 27 / 0.4)", strokeWidth: 1.2 };
  return (
    <svg viewBox="0 0 140 120" className="size-full overflow-visible">
      <rect x="8" y="44" width="31" height="36" {...panel} fill={p.side} />
      <rect x="39" y="44" width="31" height="36" {...panel} />
      <rect x="70" y="44" width="31" height="36" {...panel} fill={p.side} />
      <rect x="101" y="44" width="31" height="36" {...panel} />
      <rect x="39" y="14" width="31" height="30" {...panel} fill={p.top} />
      <rect x="39" y="80" width="31" height="30" {...panel} fill={p.top} />
      <path d="M39 44h93M39 80h93M70 44v36M101 44v36" stroke={p.accent} strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
    </svg>
  );
}

/** Six little stars flying outwards — replayed by re-keying. */
function Sparks() {
  const dirs = [
    [-46, -40],
    [0, -58],
    [46, -40],
    [-58, 4],
    [58, 4],
    [0, -30],
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
      {dirs.map(([sx, sy], i) => (
        <span
          key={i}
          className="absolute animate-spark text-coral"
          style={{ "--sx": `${sx}px`, "--sy": `${sy}px`, animationDelay: `${i * 30}ms` } as CSSProperties}
        >
          <Icon name="star" className="size-3.5" />
        </span>
      ))}
    </div>
  );
}
