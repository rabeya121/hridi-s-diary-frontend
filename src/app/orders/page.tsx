"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface OrderItem {
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  address: string;
  phone: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  createdAt: string;
}

const statusColors: Record<Order["status"], string> = {
  pending: "bg-gold/20 text-gold",
  processing: "bg-blush/20 text-blush",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

function MyOrdersContent() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get("/orders/my", token || undefined);
        setOrders(data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-display text-3xl italic text-ivory">My Orders</h1>

        {loading ? (
          <p className="py-16 text-center font-body text-ivory/50">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="py-16 text-center font-body text-ivory/50">
            You haven&apos;t placed any orders yet.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-gold/20 bg-velvet-light p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/10 pb-4">
                  <div>
                    <p className="font-body text-xs text-ivory/50">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="font-body text-xs text-ivory/50">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-body text-xs font-semibold capitalize ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="line-clamp-1 font-body text-sm text-ivory">{item.title}</p>
                        <p className="font-body text-xs text-ivory/50">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-body text-sm text-gold">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between border-t border-gold/10 pt-4 font-body text-sm">
                  <span className="text-ivory/70">Total</span>
                  <span className="font-semibold text-gold">৳{order.totalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function MyOrdersPage() {
  return (
    <ProtectedRoute>
      <MyOrdersContent />
    </ProtectedRoute>
  );
}