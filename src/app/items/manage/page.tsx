"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { Product, ProductsResponse } from "@/lib/types";

function ManageItemsContent() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data: ProductsResponse = await api.get("/products?limit=100");
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      await api.delete(`/products/${id}`, token || undefined);
      toast.success("Product deleted.");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="font-script text-2xl text-gold">Admin</span>
            <h1 className="font-display text-3xl italic text-ivory">Manage Products</h1>
          </div>
          <Link
            href="/items/add"
            className="rounded-full bg-blush px-6 py-3 font-body text-sm font-semibold text-velvet transition hover:bg-blush-deep"
          >
            + Add New
          </Link>
        </div>

        {loading ? (
          <p className="py-16 text-center font-body text-ivory/50">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="py-16 text-center font-body text-ivory/50">No products yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gold/20">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gold/20 bg-velvet-light">
                  <th className="p-4 font-body text-sm font-semibold text-ivory">Image</th>
                  <th className="p-4 font-body text-sm font-semibold text-ivory">Title</th>
                  <th className="p-4 font-body text-sm font-semibold text-ivory">Category</th>
                  <th className="p-4 font-body text-sm font-semibold text-ivory">Price</th>
                  <th className="p-4 font-body text-sm font-semibold text-ivory">Stock</th>
                  <th className="p-4 font-body text-sm font-semibold text-ivory">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gold/10">
                    <td className="p-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-body text-sm text-ivory">{product.title}</td>
                    <td className="p-4 font-body text-sm capitalize text-ivory/70">
                      {product.category}
                    </td>
                    <td className="p-4 font-body text-sm text-gold">৳{product.price}</td>
                    <td className="p-4 font-body text-sm text-ivory/70">{product.stock}</td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <Link
                          href={`/product/${product._id}`}
                          className="text-ivory transition hover:text-gold"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deletingId === product._id}
                          className="text-ivory transition hover:text-red-400 disabled:opacity-40"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <ManageItemsContent />
    </ProtectedRoute>
  );
}