import { process } from "@/app/_data/home";
import { Icon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Process() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-coral/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="How it works" title={process.title} align="center" tone="light">
          <p>{process.copy}</p>
        </SectionHeading>

        {/* Timeline — the connecting line draws itself when revealed */}
        <Reveal as="ol" variant="fade" className="relative mt-20 grid gap-12 md:grid-cols-5 md:gap-6">
          <span aria-hidden className="absolute top-8 right-[10%] left-[10%] hidden h-px bg-paper/15 md:block" />
          <span aria-hidden className="process-line absolute top-8 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-coral via-kraft to-coral md:block" />

          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={250 + i * 160} className="group relative text-center">
              <div className="relative mx-auto grid size-16 place-items-center rounded-full bg-ink ring-1 ring-paper/20 transition duration-500 group-hover:bg-coral group-hover:ring-coral">
                <Icon name={step.icon} className="size-6 text-coral transition group-hover:text-white" />
                <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-paper text-[11px] font-bold text-ink">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-paper/65">{step.copy}</p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
