"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface OrderItem {
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderUser {
  name: string;
  email: string;
}

interface Order {
  _id: string;
  userId: OrderUser;
  items: OrderItem[];
  totalPrice: number;
  address: string;
  phone: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  createdAt: string;
}

const statusOptions: Order["status"][] = ["pending", "processing", "delivered", "cancelled"];

const statusColors: Record<Order["status"], string> = {
  pending: "bg-gold/20 text-gold",
  processing: "bg-blush/20 text-blush",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

function AdminOrdersContent() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.get("/orders", token || undefined);
      setOrders(data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    setUpdatingId(orderId);
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus }, token || undefined);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success("Order status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <span className="font-script text-2xl text-gold">Admin</span>
          <h1 className="font-display text-3xl italic text-ivory">All Orders</h1>
        </div>

        {loading ? (
          <p className="py-16 text-center font-body text-ivory/50">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="py-16 text-center font-body text-ivory/50">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-gold/20 bg-velvet-light p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/10 pb-4">
                  <div>
                    <p className="font-body text-sm font-semibold text-ivory">
                      {order.userId?.name || "Unknown"}{" "}
                      <span className="font-normal text-ivory/50">
                        ({order.userId?.email})
                      </span>
                    </p>
                    <p className="font-body text-xs text-ivory/50">
                      Order #{order._id.slice(-6).toUpperCase()} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-1 font-body text-xs text-ivory/50">
                      {order.address} · {order.phone}
                    </p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value as Order["status"])
                    }
                    disabled={updatingId === order._id}
                    className={`rounded-full border-none px-3 py-1 font-body text-xs font-semibold capitalize focus:outline-none ${statusColors[order.status]}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s} className="bg-velvet text-ivory">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
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

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminOrdersContent />
    </ProtectedRoute>
  );
}