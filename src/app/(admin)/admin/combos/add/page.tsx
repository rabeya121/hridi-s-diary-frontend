"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImagePlus, Check } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/uploadImage";
import type { Product, ProductsResponse } from "@/lib/types";

function AddComboForm() {
  const router = useRouter();
  const { token } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [occasion, setOccasion] = useState("valentines");
  const [description, setDescription] = useState("");
  const [comboPrice, setComboPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ProductsResponse = await api.get("/products?limit=100");
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const originalPrice = products
    .filter((p) => selectedProductIds.includes(p._id))
    .reduce((sum, p) => sum + p.price, 0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !comboPrice) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      let imageUrl = "https://picsum.photos/seed/new-combo/700/500"; // fallback

      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImageToImgBB(imageFile);
        setUploading(false);
      }

      await api.post(
        "/combos",
        {
          title,
          occasion,
          products: selectedProductIds,
          description,
          images: [imageUrl],
          originalPrice,
          comboPrice: Number(comboPrice),
          discountPercent: Number(discountPercent) || 0,
        },
        token || undefined,
      );
      toast.success("Combo created successfully!");
      router.push("/combos");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create combo.",
      );
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <main className="flex-1 bg-velvet px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="font-script text-2xl text-gold">Admin</span>
          <h1 className="font-display text-3xl italic text-ivory">
            Create Gift Combo
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-3xl border border-gold/20 bg-velvet-light p-8"
        >
          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">
              Combo Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Valentine's Glow & Grace Combo"
              className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">
              Occasion *
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
            >
              <option value="valentines">Valentine&apos;s</option>
              <option value="eid">Eid</option>
              <option value="christmas">Christmas</option>
              <option value="puja">Puja</option>
              <option value="general">General</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">
              Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-body text-sm text-ivory/70">
              Select Products for this Combo (optional) —{" "}
              {selectedProductIds.length} selected
            </label>
            <div className="grid max-h-64 grid-cols-1 gap-2 overflow-y-auto rounded-xl border border-gold/20 bg-velvet p-3 sm:grid-cols-2">
              {products.map((product) => {
                const isSelected = selectedProductIds.includes(product._id);
                return (
                  <button
                    type="button"
                    key={product._id}
                    onClick={() => toggleProduct(product._id)}
                    className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition ${
                      isSelected
                        ? "border-gold bg-gold/10"
                        : "border-gold/10 hover:border-gold/30"
                    }`}
                  >
                    <span className="line-clamp-1 font-body text-xs text-ivory">
                      {product.title} (৳{product.price})
                    </span>
                    {isSelected && (
                      <Check size={14} className="shrink-0 text-gold" />
                    )}
                  </button>
                );
              })}
            </div>
            {selectedProductIds.length > 0 && (
              <p className="mt-2 font-body text-xs text-ivory/50">
                Original combined price: ৳{originalPrice}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-body text-sm text-ivory/70">
                Combo Price (৳) *
              </label>
              <input
                type="number"
                value={comboPrice}
                onChange={(e) => setComboPrice(e.target.value)}
                className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm text-ivory/70">
                Discount % (optional)
              </label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-body text-sm text-ivory/70">
              Combo Image
            </label>
            <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gold/30 bg-velvet transition hover:border-gold/60">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <>
                  <ImagePlus className="text-gold/60" size={28} />
                  <span className="font-body text-xs text-ivory/50">
                    Click to upload from your device
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-blush py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep disabled:opacity-60"
          >
            {uploading
              ? "Uploading image..."
              : loading
                ? "Creating combo..."
                : "Create Combo"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function AddComboPage() {
  return (
    <ProtectedRoute adminOnly>
      <AddComboForm />
    </ProtectedRoute>
  );
}
