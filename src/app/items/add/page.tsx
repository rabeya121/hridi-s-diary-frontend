"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImagePlus } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/uploadImage";

function AddItemForm() {
  const router = useRouter();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("skincare");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !shortDescription || !fullDescription || !price || !stock) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "https://picsum.photos/seed/new-product/600/750"; // fallback

      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImageToImgBB(imageFile);
        setUploading(false);
      }

      await api.post(
        "/products",
        {
          title,
          category,
          shortDescription,
          fullDescription,
          price: Number(price),
          stock: Number(stock),
          images: [imageUrl],
        },
        token || undefined
      );
      toast.success("Product added successfully!");
      router.push("/items/manage");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add product.");
    } finally {
      setLoading(false);
      setUploading(false);
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
              Product Image
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
            {uploading ? "Uploading image..." : loading ? "Submitting..." : "Submit Product"}
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