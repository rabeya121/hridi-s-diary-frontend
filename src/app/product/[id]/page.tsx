"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import type { Product, ProductsResponse } from "@/lib/types";
import ProductCard from "@/components/shop/ProductCard";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { addToCart } = useCart();
  const { user, token } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await api.get(`/products/${id}`);
        setProduct(productData.product);

        const reviewData = await api.get(`/reviews/${id}`);
        setReviews(reviewData.reviews);

        const relatedData: ProductsResponse = await api.get(
          `/products?category=${productData.product.category}&limit=4`
        );
        setRelated(relatedData.products.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product._id,
      type: "product",
      title: product.title,
      image: product.images[0],
      price: product.price,
    });
    toast.success(`${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart({
      id: product._id,
      type: "product",
      title: product.title,
      image: product.images[0],
      price: product.price,
    });
    router.push("/checkout");
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to leave a review.");
      return;
    }
    if (newRating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    setSubmittingReview(true);
    try {
      const data = await api.post(
        "/reviews",
        { productId: id, rating: newRating, comment: newComment },
        token || undefined
      );
      setReviews((prev) => [data.review, ...prev]);
      setNewRating(0);
      setNewComment("");
      toast.success("Review submitted!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <div className="min-h-[60vh] bg-velvet" />;
  }

  if (!product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-velvet">
        <p className="font-body text-ivory/60">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-velvet px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Top section: Images + Info */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Image gallery */}
          <div>
            <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-gold/20">
              <Image
                src={product.images[activeImage]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 ${
                      activeImage === index ? "border-gold" : "border-gold/20"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="w-fit rounded-full bg-blush/20 px-3 py-1 font-body text-xs capitalize text-blush">
              {product.category}
            </span>
            <h1 className="mt-3 font-display text-3xl italic text-ivory">
              {product.title}
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-gold text-gold"
                        : "text-ivory/20"
                    }
                  />
                ))}
              </div>
              <span className="font-body text-sm text-ivory/60">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-4 font-body text-2xl font-semibold text-gold">
              ৳{product.price}
            </p>

            <p className="mt-4 font-body text-sm leading-relaxed text-ivory/70">
              {product.shortDescription}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex items-center justify-center gap-2 rounded-full border border-gold/40 px-8 py-3 font-body font-semibold text-gold transition hover:bg-gold hover:text-velvet disabled:opacity-40"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex items-center justify-center gap-2 rounded-full bg-blush px-8 py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep disabled:opacity-40"
              >
                <Zap size={18} />
                Buy Now
              </button>
            </div>

            <p className="mt-3 font-body text-xs text-ivory/40">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
        </div>

        {/* Overview */}
        <div className="mt-14">
          <h2 className="font-display text-2xl italic text-ivory">Overview</h2>
          <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-ivory/70">
            {product.fullDescription}
          </p>
        </div>

        {/* Specifications */}
        {product.specs && Object.values(product.specs).some(Boolean) && (
          <div className="mt-10">
            <h2 className="font-display text-2xl italic text-ivory">
              Specifications
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {Object.entries(product.specs).map(
                ([key, value]) =>
                  value && (
                    <div
                      key={key}
                      className="rounded-xl border border-gold/20 bg-velvet-light px-4 py-3"
                    >
                      <p className="font-body text-xs capitalize text-ivory/50">
                        {key}
                      </p>
                      <p className="font-body text-sm text-ivory">{value}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="font-display text-2xl italic text-ivory">
            Reviews ({reviews.length})
          </h2>

          {/* Review submission form */}
          <form
            onSubmit={handleSubmitReview}
            className="mb-6 mt-4 flex flex-col gap-3 rounded-xl border border-gold/20 bg-velvet-light p-5"
          >
            <p className="font-body text-sm font-semibold text-ivory">Write a Review</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="transition"
                >
                  <Star
                    size={22}
                    className={star <= newRating ? "fill-gold text-gold" : "text-ivory/20"}
                  />
                </button>
              ))}
            </div>
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={submittingReview}
              className="w-fit rounded-full bg-blush px-6 py-2 font-body text-sm font-semibold text-velvet transition hover:bg-blush-deep disabled:opacity-60"
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          {reviews.length === 0 ? (
            <p className="mt-3 font-body text-sm text-ivory/50">
              No reviews yet. Be the first to review this product.
            </p>
          ) : (
            <div className="mt-4 flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-xl border border-gold/20 bg-velvet-light p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-body text-sm font-semibold text-ivory">
                      {review.userName}
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < review.rating
                              ? "fill-gold text-gold"
                              : "text-ivory/20"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 font-body text-sm text-ivory/70">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl italic text-ivory">
              You May Also Like
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}