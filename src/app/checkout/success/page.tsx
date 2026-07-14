"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const { token, isLoading } = useAuth();
  const { items, clearCart } = useCart();

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    // Wait until auth has finished restoring the token from localStorage
    if (isLoading) return;

    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    const confirmPayment = async () => {
      try {
        const data = await api.get(
          `/payments/verify-session/${sessionId}`,
          token || undefined,
        );
        const meta = data.session.metadata;

        if (!orderCreated && items.length > 0) {
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
              totalPrice: items.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0,
              ),
              address: meta?.address || "",
              phone: meta?.phone || "",
              paymentMethod: "Card Payment (Stripe)",
            },
            token || undefined,
          );
          setOrderCreated(true);
          clearCart();
        }

        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    confirmPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isLoading, token]);

  if (status === "verifying") {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-velvet px-6">
        <p className="font-body text-ivory/60">Confirming your payment...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-velvet px-6 text-center">
        <p className="font-body text-ivory/60">
          We couldn&apos;t confirm your payment. If you were charged, please
          contact support.
        </p>
        <Link
          href="/"
          className="rounded-full bg-blush px-8 py-3 font-body font-semibold text-velvet"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-velvet px-6 text-center">
      <CheckCircle size={56} className="text-gold" />
      <h1 className="font-display text-3xl italic text-ivory">
        Payment Successful!
      </h1>
      <p className="font-body text-sm text-ivory/60">
        Your order has been placed and is being processed.
      </p>
      <div className="mt-4 flex gap-3">
        <Link
          href="/orders"
          className="rounded-full bg-blush px-6 py-3 font-body text-sm font-semibold text-velvet transition hover:bg-blush-deep"
        >
          View My Orders
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-gold/40 px-6 py-3 font-body text-sm font-semibold text-gold transition hover:bg-gold hover:text-velvet"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-velvet" />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
