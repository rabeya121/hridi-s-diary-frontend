"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

function AddItemForm() {
  const router = useRouter();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("skincare");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !shortDescription || !fullDescription || !price || !stock) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/products",
        {
          title,
          category,
          shortDescription,
          fullDescription,
          price: Number(price),
          stock: Number(stock),
          images: imageUrl ? [imageUrl] : ["https://picsum.photos/seed/new-product/600/750"],
        },
        token || undefined
      );
      toast.success("Product added successfully!");
      router.push("/items/manage");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 bg-velvet px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <span className="font-script text-2xl text-gold">Admin</span>
          <h1 className="font-display text-3xl italic text-ivory">Add New Product</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-3xl border border-gold/20 bg-velvet-light p-8"
        >
          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
            >
              <option value="skincare">Skincare</option>
              <option value="haircare">Haircare</option>
              <option value="undergarments">Undergarments</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">
              Short Description *
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">
              Full Description *
            </label>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-body text-sm text-ivory/70">Price (৳) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm text-ivory/70">Stock *</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">
              Image URL (optional)
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-blush py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Product"}
          </button>
        </form>
      </div>
    </main>
  );
}
export default function AddItemPage() {
  return (
    <ProtectedRoute adminOnly>
      <AddItemForm />
    </ProtectedRoute>
  );
}