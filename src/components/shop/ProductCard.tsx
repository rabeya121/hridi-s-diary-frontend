import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product._id}`}
      className="group flex h-[420px] w-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-velvet-light transition hover:border-gold/50"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-velvet/80 px-3 py-1 font-body text-xs capitalize text-gold backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-display text-lg italic text-ivory">
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 font-body text-sm text-ivory/60">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-body text-lg font-semibold text-gold">
            ৳{product.price}
          </span>
          <span className="flex items-center gap-1 font-body text-sm text-ivory/70">
            <Star size={14} className="fill-gold text-gold" />
            {product.rating > 0 ? product.rating.toFixed(1) : "New"}
          </span>
        </div>

        <span className="mt-3 block rounded-full border border-gold/40 py-2 text-center font-body text-sm font-medium text-gold transition group-hover:bg-gold group-hover:text-velvet">
          View Details
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;