import Image from "next/image";
import { Heart, Leaf, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1 bg-velvet px-6 py-16 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="font-script text-2xl text-gold">Our Story</span>
          <h1 className="font-display text-3xl italic text-ivory md:text-4xl">
            About Hridi&apos;s Diary
          </h1>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-gold/20">
            <Image
              src="https://picsum.photos/seed/hd-about/700/800"
              alt="Hridi's Diary"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-body text-sm leading-relaxed text-ivory/70">
              Hridi&apos;s Diary began as a simple idea: beauty and gifting shouldn&apos;t
              be complicated. We started with a small collection of skincare essentials
              and grew into a destination for skincare, haircare, and thoughtfully
              curated occasion gift combos.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-ivory/70">
              Every product on our shelves is chosen with care — for quality,
              for gentleness, and for the moments they&apos;re meant to be part of,
              whether that&apos;s a quiet self-care evening or a festive celebration
              with the people you love.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-gold/20 bg-velvet-light p-6 text-center">
            <Leaf className="mx-auto text-gold" size={28} />
            <h3 className="mt-3 font-display text-lg italic text-ivory">
              Gentle Formulas
            </h3>
            <p className="mt-2 font-body text-sm text-ivory/60">
              Products chosen for how they treat real skin and hair.
            </p>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-velvet-light p-6 text-center">
            <ShieldCheck className="mx-auto text-gold" size={28} />
            <h3 className="mt-3 font-display text-lg italic text-ivory">
              Verified Quality
            </h3>
            <p className="mt-2 font-body text-sm text-ivory/60">
              Every product is checked before it reaches your doorstep.
            </p>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-velvet-light p-6 text-center">
            <Heart className="mx-auto text-gold" size={28} />
            <h3 className="mt-3 font-display text-lg italic text-ivory">
              Made for Gifting
            </h3>
            <p className="mt-2 font-body text-sm text-ivory/60">
              Combos designed for the celebrations that matter to you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}