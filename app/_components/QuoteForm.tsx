"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { quote, site } from "@/app/_data/home";
import { Icon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

const field =
  "w-full rounded-xl border border-line bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition focus:border-ink focus:bg-white focus:ring-4 focus:ring-coral/15";
const label = "mb-1.5 block text-xs font-bold tracking-wide text-ink-soft uppercase";

type Dims = { length: string; width: string; height: string };
const DEFAULT_DIMS = { length: 10, width: 7, height: 4 };

export function QuoteForm() {
  const [dims, setDims] = useState<Dims>({ length: "", width: "", height: "" });
  const [unit, setUnit] = useState<string>("in");
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);

  // Empty / invalid inputs fall back to a friendly default shape for the preview.
  const num = (v: string, d: number) => (Number(v) > 0 ? Number(v) : d);
  const L = num(dims.length, DEFAULT_DIMS.length);
  const W = num(dims.width, DEFAULT_DIMS.width);
  const H = num(dims.height, DEFAULT_DIMS.height);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect to your quote endpoint / server action.
    setSent(true);
  }

  return (
    <section
      id="quotation"
      className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32"
    >
      {/* blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(247_243_236/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(247_243_236/0.05)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -right-40 -bottom-40 size-[36rem] rounded-full bg-coral/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        {/* -------- Left: pitch + live 3D preview -------- */}
        <Reveal variant="left">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-coral uppercase">
            <span className="h-px w-8 bg-current" /> Custom quote
          </p>
          <h2 className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">{quote.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-paper/70">{quote.copy}</p>

          <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-paper/[0.03] p-6 ring-1 ring-paper/10">
            <div className="flex items-center justify-between text-xs font-semibold tracking-widest text-paper/50 uppercase">
              <span className="flex items-center gap-2">
                <span className="size-2 animate-pulse rounded-full bg-coral" /> Live preview
              </span>
              <span className="font-mono normal-case tracking-normal text-paper/80">
                {L} × {W} × {H} {unit}
              </span>
            </div>
            <Box3D l={L} w={W} h={H} />
            <p className="text-center text-xs text-paper/50">Type your interior dimensions — the box reshapes as you go.</p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3 text-sm">
            {[
              { icon: "phone" as const, text: site.phone, href: site.phoneHref },
              { icon: "mail" as const, text: site.email, href: `mailto:${site.email}` },
            ].map((c) => (
              <li key={c.text}>
                <a href={c.href} className="flex items-center gap-2 rounded-full px-4 py-2 font-semibold ring-1 ring-paper/15 transition hover:bg-paper hover:text-ink">
                  <Icon name={c.icon} className="size-4 text-coral" /> {c.text}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* -------- Right: spec-sheet form -------- */}
        <Reveal variant="right" delay={120}>
          <div className="relative rounded-[2rem] bg-paper p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-10">
            {/* corner "spec sheet" tab */}
            <span className="absolute -top-3 left-8 rounded-full bg-coral px-4 py-1 text-[11px] font-bold tracking-widest text-white uppercase">
              Spec sheet
            </span>

            {sent ? (
              <div className="grid min-h-[30rem] place-items-center text-center">
                <div>
                  <span className="mx-auto grid size-16 animate-pop place-items-center rounded-full bg-sage">
                    <Icon name="check" className="size-8" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-medium">Thanks — we’re on it!</h3>
                  <p className="mt-3 text-ink-soft">Our packaging team will get back to you with a quote shortly.</p>
                  <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-bold underline underline-offset-4">
                    Send another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <Step n={1} title="Your details" />
                <div>
                  <label htmlFor="q-name" className={label}>Name:</label>
                  <input id="q-name" name="name" required autoComplete="name" className={field} />
                </div>
                <div>
                  <label htmlFor="q-email" className={label}>Email:</label>
                  <input id="q-email" name="email" type="email" required autoComplete="email" className={field} />
                </div>
                <div>
                  <label htmlFor="q-phone" className={label}>Phone Number:</label>
                  <input id="q-phone" name="phone" type="tel" autoComplete="tel" className={field} />
                </div>
                <div>
                  <label htmlFor="q-qty" className={label}>Quantity:</label>
                  <input id="q-qty" name="quantity" type="number" min={1} className={field} />
                </div>

                <Step n={2} title="Enter Interior Dimensions" />
                <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-4">
                  {(["length", "width", "height"] as const).map((d) => (
                    <div key={d} className="relative">
                      <input
                        name={d}
                        type="number"
                        min={0}
                        step="any"
                        placeholder={d[0].toUpperCase() + d.slice(1)}
                        aria-label={d}
                        value={dims[d]}
                        onChange={(e) => setDims((prev) => ({ ...prev, [d]: e.target.value }))}
                        className={`${field} pr-9`}
                      />
                      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[11px] font-bold text-coral-deep">
                        {d[0].toUpperCase()}
                      </span>
                    </div>
                  ))}
                  <select name="unit" aria-label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} className={field}>
                    {quote.units.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <Step n={3} title="Tell us more" />
                <div className="sm:col-span-2">
                  <label htmlFor="q-msg" className={label}>Message</label>
                  <textarea id="q-msg" name="message" rows={3} className={`${field} resize-none`} />
                </div>

                <label className="group flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-ink/25 px-4 py-4 transition hover:border-coral hover:bg-coral/5 sm:col-span-2">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition group-hover:-translate-y-0.5 group-hover:bg-coral">
                    <Icon name="upload" className="size-4" />
                  </span>
                  <span className="min-w-0 text-sm">
                    <span className="block font-bold">upload</span>
                    <span className="block truncate text-ink-soft">{fileName || "Artwork, dieline or reference image"}</span>
                  </span>
                  <input type="file" name="artwork" className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                </label>

                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-coral px-8 py-4 font-bold text-white transition hover:bg-coral-deep sm:col-span-2"
                >
                  {/* shine sweep on hover */}
                  <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-full" />
                  {quote.submit}
                  <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <p className="flex items-center gap-3 font-display text-lg font-medium sm:col-span-2">
      <span className="grid size-7 place-items-center rounded-full bg-ink font-sans text-xs font-bold text-paper">{n}</span>
      {title}
      <span className="h-px flex-1 bg-line" />
    </p>
  );
}

/**
 * Pure-CSS 3D kraft box. Dimensions are normalised so the largest side is
 * ~150px, then each face is sized/placed with transforms. Faces transition,
 * so the box smoothly morphs as the user types.
 */
function Box3D({ l, w, h }: { l: number; w: number; h: number }) {
  const scale = 150 / Math.max(l, w, h);
  const clamp = (v: number) => Math.max(28, Math.round(v * scale));
  const [L, W, H] = [clamp(l), clamp(w), clamp(h)];

  const face = (width: number, height: number, transform: string, extra = ""): { className: string; style: CSSProperties } => ({
    className: `absolute top-1/2 left-1/2 border border-ink/15 transition-all duration-700 ease-out-expo ${extra}`,
    style: { width, height, marginLeft: -width / 2, marginTop: -height / 2, transform },
  });

  const faces = [
    face(L, H, `translateZ(${W / 2}px)`, "bg-[#d6b082]"), // front
    face(L, H, `rotateY(180deg) translateZ(${W / 2}px)`, "bg-[#c49a69]"), // back
    face(W, H, `rotateY(90deg) translateZ(${L / 2}px)`, "bg-[#c9a272]"), // right
    face(W, H, `rotateY(-90deg) translateZ(${L / 2}px)`, "bg-[#c9a272]"), // left
    face(L, W, `rotateX(90deg) translateZ(${H / 2}px)`, "bg-[#e2c095]"), // top
    face(L, W, `rotateX(-90deg) translateZ(${H / 2}px)`, "bg-[#b38a5c]"), // bottom
  ];

  return (
    <div aria-hidden className="grid h-72 place-items-center [perspective:900px]">
      {/* static 3/4 angle is the fallback when motion is reduced */}
      <div className="relative size-0 animate-spin3d [transform-style:preserve-3d] [transform:rotateX(-24deg)_rotateY(-35deg)]">
        {faces.map((f, i) => (
          <div key={i} className={f.className} style={f.style}>
            {i === 0 && (
              <span className="grid h-full place-items-center font-display text-sm text-coral-deep italic">Dream</span>
            )}
            {i === 4 && <span className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-coral/70" />}
          </div>
        ))}
      </div>
    </div>
  );
}
