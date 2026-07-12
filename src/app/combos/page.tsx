"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";

interface ComboProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;
  category: string;
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

const occasions = ["all", "valentines", "eid", "christmas", "puja", "general"];

export default function CombosPage() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeOccasion, setActiveOccasion] = useState("all");

  useEffect(() => {
    const fetchCombos = async () => {
      setLoading(true);
      try {
        const endpoint =
          activeOccasion === "all" ? "/combos" : `/combos?occasion=${activeOccasion}`;
        const data = await api.get(endpoint);
        setCombos(data.combos);
      } catch (error) {
        console.error("Failed to fetch combos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCombos();
  }, [activeOccasion]);

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <span className="font-script text-2xl text-blush">Celebrate Every Occasion</span>
          <h1 className="font-display text-3xl italic text-ivory md:text-4xl">
            Gift Combos
          </h1>
        </div>

        {/* Occasion filter tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {occasions.map((occ) => (
            <button
              key={occ}
              onClick={() => setActiveOccasion(occ)}
              className={`rounded-full border px-5 py-2 font-body text-sm capitalize transition ${
                activeOccasion === occ
                  ? "border-gold bg-gold text-velvet"
                  : "border-gold/30 text-ivory hover:bg-velvet-light"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>

        {/* Combo grid */}
        {loading ? (
          <p className="py-16 text-center font-body text-ivory/50">Loading combos...</p>
        ) : combos.length === 0 ? (
          <p className="py-16 text-center font-body text-ivory/50">
            No combos found for this occasion.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {combos.map((combo) => (
              <Link
                key={combo._id}
                href={`/combos/${combo._id}`}
                className="group flex h-[420px] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-velvet-light"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={combo.images[0]}
                    alt={combo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-velvet/90 font-display text-sm italic text-gold shadow-lg">
                    -{combo.discountPercent}%
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="w-fit rounded-full bg-blush/20 px-3 py-1 font-body text-xs capitalize text-blush">
                    {combo.occasion}
                  </span>
                  <h3 className="mt-2 font-display text-lg italic text-ivory">
                    {combo.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 font-body text-sm text-ivory/60">
                    {combo.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-4">
                    <span className="font-body text-lg font-semibold text-gold">
                      ৳{combo.comboPrice}
                    </span>
                    <span className="font-body text-sm text-ivory/40 line-through">
                      ৳{combo.originalPrice}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}