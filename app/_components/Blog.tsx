import Image from "next/image";
import Link from "next/link";
import { blog } from "@/app/_data/home";
import { Icon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Blog() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
      <SectionHeading eyebrow={blog.eyebrow} title={blog.title} align="center">
        <p>{blog.copy}</p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blog.posts.map((post, i) => (
          <Reveal as="li" key={post.href} delay={i * 110}>
            <Link href={post.href} className="group flex h-full flex-col">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-paper-deep">
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition duration-700 ease-out-expo group-hover:scale-105 group-hover:rotate-[0.5deg]"
                />
              </div>
              <p className="mt-5 text-xs font-semibold tracking-wide text-ink-soft uppercase">
                {post.author} · <time>{post.date}</time>
              </p>
              <h3 className="mt-2 font-display text-xl leading-snug font-medium transition-colors group-hover:text-coral-deep">
                {post.title}
              </h3>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold">
                Read More
                <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="text-ink-soft">{blog.more}</p>
        <Link href={blog.allHref} className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold ring-1 ring-ink/20 transition hover:bg-ink hover:text-paper">
          View all articles
          <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
