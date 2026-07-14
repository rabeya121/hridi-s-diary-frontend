"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

function CheckoutContent() {
  const { items, totalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !phone) {
      toast.error("Please fill in your delivery details.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setPlacing(true);

    if (paymentMethod === "card") {
      try {
        const data = await api.post(
          "/payments/create-checkout-session",
          {
            items: items.map((item) => ({
              title: item.title,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
            })),
            address,
            phone,
          },
          token || undefined
        );
        window.location.href = data.url;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to start checkout.");
        setPlacing(false);
      }
    } else {
      try {
        await api.post(
          "/orders",
          {
            items: items.map((item) => ({
              productId: item.type === "product" ? item.id : undefined,
              title: item.title,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
            })),
            totalPrice,
            address,
            phone,
            paymentMethod: "Cash on Delivery",
          },
          token || undefined
        );
        toast.success("Order placed successfully! 🎉");
        clearCart();
        router.push("/orders");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to place order.");
      } finally {
        setPlacing(false);
      }
    }
  };

  if (items.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-velvet px-6">
        <p className="font-body text-ivory/60">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-display text-3xl italic text-ivory">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Delivery form */}
          <form
            onSubmit={handlePlaceOrder}
            className="flex h-fit flex-col gap-4 rounded-2xl border border-gold/20 bg-velvet-light p-6"
          >
            <h2 className="font-display text-xl italic text-ivory">Delivery Details</h2>

            <div>
              <label className="mb-1 block font-body text-sm text-ivory/70">Full Name</label>
              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="w-full rounded-xl border border-gold/20 bg-velvet px-4 py-3 font-body text-sm text-ivory/50"
              />
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-ivory/70">
                Delivery Address *
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House, road, area, city"
                className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-ivory/70">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-body text-sm text-ivory/70">
                Payment Method *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-xl border px-4 py-3 text-left font-body text-sm transition ${
                    paymentMethod === "cod"
                      ? "border-gold bg-gold/10 text-ivory"
                      : "border-gold/20 text-ivory/60 hover:border-gold/40"
                  }`}
                >
                  <span className="block font-semibold">Cash on Delivery</span>
                  <span className="text-xs text-ivory/50">Pay when it arrives</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-xl border px-4 py-3 text-left font-body text-sm transition ${
                    paymentMethod === "card"
                      ? "border-gold bg-gold/10 text-ivory"
                      : "border-gold/20 text-ivory/60 hover:border-gold/40"
                  }`}
                >
                  <span className="block font-semibold">Card Payment</span>
                  <span className="text-xs text-ivory/50">Pay securely via Stripe</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={placing}
              className="mt-2 rounded-full bg-blush py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep disabled:opacity-60"
            >
              {placing
                ? "Processing..."
                : paymentMethod === "card"
                  ? "Proceed to Payment"
                  : "Place Order"}
            </button>
          </form>

          {/* Order summary (editable) */}
          <div className="h-fit rounded-2xl border border-gold/20 bg-velvet-light p-6">
            <h2 className="font-display text-xl italic text-ivory">Order Summary</h2>

            <div className="mt-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 font-body text-sm text-ivory">{item.title}</p>
                    <p className="font-body text-xs text-gold">৳{item.price}</p>
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-gold/30 px-1.5 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-ivory hover:text-gold"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center font-body text-xs text-ivory">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-ivory hover:text-gold"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-ivory/50 transition hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t border-gold/10 pt-4 font-body text-lg">
              <span className="text-ivory/70">Total</span>
              <span className="font-semibold text-gold">৳{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}