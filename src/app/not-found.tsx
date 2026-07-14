import Link from "next/link";
import { Gift, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-velvet px-6 py-24 text-center">
      <Gift className="text-gold" size={48} />

      <span className="font-script text-2xl text-gold">Oops...</span>

      <h1 className="font-display text-6xl italic text-ivory md:text-7xl">404</h1>

      <p className="max-w-md font-body text-sm text-ivory/60 md:text-base">
        This page seems to have wandered off, like a misplaced page from a diary.
        Let&apos;s get you back to somewhere familiar.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-full bg-blush px-8 py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep"
        >
          <Home size={18} />
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="flex items-center justify-center gap-2 rounded-full border border-gold/40 px-8 py-3 font-body font-semibold text-gold transition hover:bg-gold hover:text-velvet"
        >
          <Search size={18} />
          Browse Shop
        </Link>
      </div>
    </main>
  );
}