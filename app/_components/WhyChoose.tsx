import type { CSSProperties, ReactNode } from "react";
import { site, whyChoose } from "@/app/_data/home";
import { Icon, type IconName } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const [design, moq, turnaround] = whyChoose.items;

/** Bento grid — each reason gets its own animated mini-illustration. */
export function WhyChoose() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-white py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 size-[30rem] rounded-full bg-lilac/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Why us" title={whyChoose.title} align="center" />

        <div className="mt-16 grid gap-5 lg:grid-cols-5">
          {/* 1 — Design online */}
          <Card className="bg-lilac lg:col-span-3" index={1} delay={0}>
            <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
              <CardText icon={design.icon} title={design.title} copy={design.copy}>
                <a href={site.editorUrl} className="group/link mt-6 inline-flex items-center gap-2 text-sm font-bold">
                  <span className="border-b-2 border-ink pb-0.5 transition group-hover/link:border-coral">Open the box editor</span>
                  <Icon name="arrowUpRight" className="size-4" />
                </a>
              </CardText>
              <EditorMock />
            </div>
          </Card>

          {/* 2 — No MOQ */}
          <Card className="bg-ink text-paper lg:col-span-2" index={2} delay={120} dark>
            <CardText icon={moq.icon} title={moq.title} copy={moq.copy} dark />
            <StackingBoxes />
          </Card>

          {/* 3 — Turnaround */}
          <Card className="bg-sage lg:col-span-5" index={3} delay={200}>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
              <CardText icon={turnaround.icon} title={turnaround.title} copy={turnaround.copy} />
              <DeliveryTimeline />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ building blocks */

function Card({ children, className, index, delay, dark }: { children: ReactNode; className: string; index: number; delay: number; dark?: boolean }) {
  return (
    <Reveal
      variant="scale"
      delay={delay}
      className={`group relative overflow-hidden rounded-[2rem] p-7 transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(23_22_27/0.35)] sm:p-10 ${className}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute top-4 right-6 font-display text-7xl leading-none font-medium italic transition duration-700 group-hover:-translate-y-1 group-hover:rotate-[-4deg] ${dark ? "text-paper/10" : "text-ink/10"}`}
      >
        0{index}
      </span>
      {children}
    </Reveal>
  );
}

function CardText({ icon, title, copy, dark, children }: { icon: IconName; title: string; copy: string; dark?: boolean; children?: ReactNode }) {
  return (
    <div className="relative">
      <span
        className={`grid size-14 place-items-center rounded-2xl transition duration-500 group-hover:rotate-[-8deg] ${dark ? "bg-coral text-white" : "bg-ink text-paper group-hover:bg-coral"}`}
      >
        <Icon name={icon} className="size-6" />
      </span>
      <h3 className="mt-7 font-display text-3xl font-medium tracking-tight">{title}</h3>
      <p className={`mt-4 leading-relaxed ${dark ? "text-paper/70" : "text-ink-soft"}`}>{copy}</p>
      {children}
    </div>
  );
}

/** Mini browser window with a box dieline drawing itself and a roaming cursor. */
function EditorMock() {
  const swatches = ["bg-coral", "bg-ink", "bg-kraft", "bg-[#4f7a3a]", "bg-white"];
  return (
    <div aria-hidden className="relative rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgb(23_22_27/0.45)] ring-1 ring-ink/5 transition duration-700 group-hover:rotate-[-1.5deg]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-coral" />
        <span className="size-2.5 rounded-full bg-kraft" />
        <span className="size-2.5 rounded-full bg-sage" />
        <span className="ml-3 truncate rounded-full bg-paper px-3 py-0.5 text-[10px] text-ink-soft">editor.dreamcustomboxes.com</span>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-2 border-r border-line p-2.5">
          {(["cursor", "pen", "layers", "box"] as const).map((t, i) => (
            <span key={t} className={`grid size-7 place-items-center rounded-lg ${i === 1 ? "bg-coral text-white" : "bg-paper text-ink-soft"}`}>
              <Icon name={t} className="size-3.5" />
            </span>
          ))}
        </div>
        <div className="relative grid flex-1 place-items-center bg-[radial-gradient(rgb(23_22_27/0.08)_1px,transparent_1px)] [background-size:12px_12px] p-5">
          <svg viewBox="0 0 160 120" className="w-full max-w-[15rem]">
            {/* front panel fill */}
            <rect x="45" y="42" width="35" height="36" className="fill-coral/20" />
            <text x="62.5" y="63" textAnchor="middle" className="fill-coral-deep font-display text-[7px] italic">Dream</text>
            {/* dieline: panels + flaps */}
            <path
              pathLength={1}
              d="M10 42h140v36H10zM45 42v36M80 42v36M115 42v36M45 42V10h35v32M45 78v32h35V78M10 42l6-8h23l6 8M115 42l6-8h23l6 8"
              className="animate-draw fill-none stroke-coral"
              strokeWidth="1.4"
              strokeDasharray="1"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute right-6 bottom-6 animate-cursor text-ink drop-shadow">
            <Icon name="cursor" className="size-5 fill-white" />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-line px-4 py-3">
        {swatches.map((s, i) => (
          <span key={s} className={`size-5 rounded-full ring-1 ring-ink/10 ${s} ${i === 0 ? "ring-2 ring-offset-2 ring-coral" : ""}`} />
        ))}
        <span className="ml-auto rounded-full bg-ink px-3 py-1 text-[10px] font-bold text-paper">3D preview</span>
      </div>
    </div>
  );
}

/** Boxes popping into a grid on loop — "one box or thousands". */
function StackingBoxes() {
  return (
    <div aria-hidden className="mt-8 rounded-2xl bg-paper/5 p-5 ring-1 ring-paper/10">
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 16 }, (_, i) => (
          <span
            key={i}
            className="grid aspect-square animate-pop-loop place-items-center rounded-md bg-kraft/90 text-ink/60"
            style={{ animationDelay: `${i * 0.12}s` } as CSSProperties}
          >
            <Icon name="box" className="size-3/5" />
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs font-semibold text-paper/60">
        <span>1 box</span>
        <span className="mx-3 h-px flex-1 bg-gradient-to-r from-coral to-kraft" />
        <span>thousands</span>
      </div>
    </div>
  );
}

/** Truck driving along an order → production → shipping track. */
function DeliveryTimeline() {
  const stops = [
    { icon: "form" as const, label: "Order placed" },
    { icon: "factory" as const, label: "6–20 business days" },
    { icon: "globe" as const, label: "Free worldwide shipping" },
  ];
  return (
    <div aria-hidden className="rounded-2xl bg-white/70 p-6 ring-1 ring-ink/5 backdrop-blur sm:p-8">
      <div className="relative mx-4 h-2 rounded-full bg-ink/10">
        <span className="absolute inset-0 origin-left animate-fill rounded-full bg-gradient-to-r from-coral to-kraft" />
        <span className="absolute -top-9 -translate-x-1/2 animate-drive">
          <span className="grid size-9 place-items-center rounded-full bg-ink text-paper shadow-lg">
            <Icon name="truck" className="size-4" />
          </span>
        </span>
      </div>
      <ol className="mt-6 grid grid-cols-3 text-center text-xs font-semibold sm:text-sm">
        {stops.map((s, i) => (
          <li key={s.label} className={`flex flex-col items-center gap-2 ${i === 0 ? "items-start text-left" : i === 2 ? "items-end text-right" : ""}`}>
            <span className="grid size-10 place-items-center rounded-full bg-white text-coral-deep ring-1 ring-line">
              <Icon name={s.icon} className="size-4" />
            </span>
            {s.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
