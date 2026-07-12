"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-velvet px-6 text-center">
        <ShoppingBag size={48} className="text-gold/40" />
        <h1 className="font-display text-2xl italic text-ivory">Your cart is empty</h1>
        <Link
          href="/shop"
          className="rounded-full bg-blush px-8 py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-display text-3xl italic text-ivory">Your Cart</h1>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-velvet-light p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="font-display text-base italic text-ivory">{item.title}</h3>
                <p className="mt-1 font-body text-sm text-gold">৳{item.price}</p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-gold/30 px-2 py-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-ivory hover:text-gold"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-body text-sm text-ivory">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-ivory hover:text-gold"
                >
                  <Plus size={14} />
                </button>
              </div>

              <p className="w-20 text-right font-body text-sm font-semibold text-ivory">
                ৳{item.price * item.quantity}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-ivory/60 transition hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-end gap-4 rounded-2xl border border-gold/20 bg-velvet-light p-6">
          <div className="flex w-full justify-between font-body text-lg">
            <span className="text-ivory/70">Subtotal</span>
            <span className="font-semibold text-gold">৳{totalPrice}</span>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="w-full rounded-full bg-blush py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep sm:w-auto sm:px-10"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}