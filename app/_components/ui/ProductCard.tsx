import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/_data/home";
import { Icon } from "./Icons";

type Props = {
  product: Product;
  size?: "lg" | "sm";
  sizes?: string;
};

/** Product tile with image zoom, lift and an arrow that slides in on hover. */
export function ProductCard({ product, size = "sm", sizes = "(min-width: 1024px) 25vw, 50vw" }: Props) {
  const lg = size === "lg";
  return (
    <Link
      href={product.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgb(23_22_27/0.25)] hover:ring-ink/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
    >
      <div className={`relative overflow-hidden bg-paper-deep ${lg ? "aspect-[4/3.4]" : "aspect-square"}`}>
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 ease-out-expo group-hover:scale-[1.07]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-ink-soft uppercase backdrop-blur">
          As low As <span className="ml-1 font-bold text-coral-deep">{product.price}</span> / Box
        </span>
        <span className="absolute right-3 bottom-3 grid size-10 translate-y-3 place-items-center rounded-full bg-ink text-paper opacity-0 transition duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="arrowUpRight" className="size-4" />
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${lg ? "p-6" : "p-5"}`}>
        <h3 className={`font-display font-medium tracking-tight ${lg ? "text-2xl" : "text-xl"}`}>
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{product.description}</p>
      </div>
    </Link>
  );
}
