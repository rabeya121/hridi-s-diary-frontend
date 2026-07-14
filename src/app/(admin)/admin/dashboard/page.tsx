"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface Order {
  _id: string;
  totalPrice: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
}

interface Product {
  _id: string;
  category: "skincare" | "haircare" | "undergarments";
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#D4AF37",
  processing: "#F2A6B8",
  delivered: "#4ADE80",
  cancelled: "#F87171",
};

const CATEGORY_COLOR = "#D4AF37";

function AdminDashboardContent() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await api.get("/orders", token || undefined);
        setOrders(orderData.orders);

        const productData = await api.get("/products?limit=200");
        setProducts(productData.products);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-velvet">
        <p className="font-body text-ivory/50">Loading dashboard...</p>
      </main>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  const statusCounts = ["pending", "processing", "delivered", "cancelled"]
    .map((status) => ({
      name: status,
      value: orders.filter((o) => o.status === status).length,
    }))
    .filter((entry) => entry.value > 0);

  const categoryCounts = ["skincare", "haircare", "undergarments"].map((cat) => ({
    name: cat,
    count: products.filter((p) => p.category === cat).length,
  }));

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <span className="font-script text-2xl text-gold">Admin</span>
          <h1 className="font-display text-3xl italic text-ivory">Dashboard Overview</h1>
        </div>

        {/* Stat cards */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-gold/20 bg-velvet-light p-6">
            <p className="font-body text-xs text-ivory/50">Total Revenue</p>
            <p className="mt-2 font-display text-3xl italic text-gold">৳{totalRevenue}</p>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-velvet-light p-6">
            <p className="font-body text-xs text-ivory/50">Total Orders</p>
            <p className="mt-2 font-display text-3xl italic text-ivory">{totalOrders}</p>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-velvet-light p-6">
            <p className="font-body text-xs text-ivory/50">Total Products</p>
            <p className="mt-2 font-display text-3xl italic text-ivory">{totalProducts}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Order status pie chart */}
          <div className="rounded-2xl border border-gold/20 bg-velvet-light p-6">
            <h2 className="mb-4 font-display text-lg italic text-ivory">Orders by Status</h2>
            {totalOrders === 0 ? (
              <p className="font-body text-sm text-ivory/50">No orders yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusCounts}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, value, percent }) =>
                      `${name} (${value}) ${(percent! * 100).toFixed(0)}%`
                    }
                  >
                    {statusCounts.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#3D1830",
                      border: "1px solid rgba(212,175,55,0.3)",
                      borderRadius: 8,
                      color: "#F7F0E8",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "#F7F0E8", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Products by category bar chart */}
          <div className="rounded-2xl border border-gold/20 bg-velvet-light p-6">
            <h2 className="mb-4 font-display text-lg italic text-ivory">
              Products by Category
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.1)" />
                <XAxis dataKey="name" tick={{ fill: "#F7F0E8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#F7F0E8", fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "#3D1830",
                    border: "1px solid rgba(212,175,55,0.3)",
                    borderRadius: 8,
                    color: "#F7F0E8",
                  }}
                />
                <Bar dataKey="count" fill={CATEGORY_COLOR} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}