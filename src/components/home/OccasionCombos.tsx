"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";

interface Combo {
  _id: string;
  title: string;
  occasion: string;
  description: string;
  images: string[];
  originalPrice: number;
  comboPrice: number;
  discountPercent: number;
}

const OccasionCombos = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const data = await api.get("/combos");
        setCombos(data.combos);
      } catch (error) {
        console.error("Failed to fetch combos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCombos();
  }, []);

  if (loading || combos.length === 0) return null;

  return (
    <section className="bg-velvet-light px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="font-script text-2xl text-blush">Celebrate Every Occasion</span>
          <h2 className="font-display text-3xl italic text-ivory md:text-4xl">
            Gift Combos, Made With Love
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {combos.map((combo) => (
            <Link
              key={combo._id}
              href={`/combos/${combo._id}`}
              className="group relative flex h-[380px] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-velvet"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={combo.images[0]}
                  alt={combo.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Wax-seal style discount badge */}
                <div className="absolute right-3 top-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-velvet/90 font-display text-sm italic text-gold shadow-lg">
                  -{combo.discountPercent}%
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <span className="w-fit rounded-full bg-blush/20 px-3 py-1 font-body text-xs capitalize text-blush">
                  {combo.occasion}
                </span>
                <h3 className="mt-2 line-clamp-1 font-display text-lg italic text-ivory">
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
      </div>
    </section>
  );
};

export default OccasionCombos;