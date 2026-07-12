"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { api } from "@/lib/api";

interface ComboProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;
  category: string;
  shortDescription: string;
}

interface Combo {
  _id: string;
  title: string;
  occasion: string;
  description: string;
  images: string[];
  products: ComboProduct[];
  originalPrice: number;
  comboPrice: number;
  discountPercent: number;
}

export default function ComboDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [combo, setCombo] = useState<Combo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombo = async () => {
      try {
        const data = await api.get(`/combos/${id}`);
        setCombo(data.combo);
      } catch (error) {
        console.error("Failed to fetch combo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCombo();
  }, [id]);

  if (loading) {
    return <div className="min-h-[60vh] bg-velvet" />;
  }

  if (!combo) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-velvet">
        <p className="font-body text-ivory/60">Combo not found.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-gold/20">
            <Image src={combo.images[0]} alt={combo.title} fill className="object-cover" />
            <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-velvet/90 font-display text-base italic text-gold shadow-lg">
              -{combo.discountPercent}%
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="w-fit rounded-full bg-blush/20 px-3 py-1 font-body text-xs capitalize text-blush">
              {combo.occasion}
            </span>
            <h1 className="mt-3 font-display text-3xl italic text-ivory">{combo.title}</h1>
            <p className="mt-4 font-body text-sm leading-relaxed text-ivory/70">
              {combo.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-body text-3xl font-semibold text-gold">
                ৳{combo.comboPrice}
              </span>
              <span className="font-body text-lg text-ivory/40 line-through">
                ৳{combo.originalPrice}
              </span>
            </div>

            <button className="mt-6 flex items-center gap-2 rounded-full bg-blush px-8 py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep">
              <ShoppingBag size={18} />
              Add Combo to Cart
            </button>
          </div>
        </div>

        {/* Included products */}
        <div className="mt-14">
          <h2 className="font-display text-2xl italic text-ivory">What's Included</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3">
            {combo.products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-velvet-light"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 font-display text-base italic text-ivory">
                    {product.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-gold">৳{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}