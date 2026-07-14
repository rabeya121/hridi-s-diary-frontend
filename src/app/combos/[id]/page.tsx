"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Zap, Star } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface ComboProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;
  category: string;
  shortDescription: string;
}

interface Combo {
  _id: string;
  title: string;
  occasion: string;
  description: string;
  images: string[];
  products: ComboProduct[];
  originalPrice: number;
  comboPrice: number;
  discountPercent: number;
}

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ComboDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { addToCart } = useCart();
  const { user, token } = useAuth();

  const [combo, setCombo] = useState<Combo | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchCombo = async () => {
      try {
        const data = await api.get(`/combos/${id}`);
        setCombo(data.combo);

        const reviewData = await api.get(`/reviews/combo/${id}`);
        setReviews(reviewData.reviews);
      } catch (error) {
        console.error("Failed to fetch combo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCombo();
  }, [id]);

  const handleAddToCart = () => {
    if (!combo) return;
    addToCart({
      id: combo._id,
      type: "combo",
      title: combo.title,
      image: combo.images[0],
      price: combo.comboPrice,
    });
    toast.success(`${combo.title} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!combo) return;
    addToCart({
      id: combo._id,
      type: "combo",
      title: combo.title,
      image: combo.images[0],
      price: combo.comboPrice,
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
        { comboId: id, rating: newRating, comment: newComment },
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

  if (!combo) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-velvet">
        <p className="font-body text-ivory/60">Combo not found.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-velvet px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-gold/20">
            <Image src={combo.images[0]} alt={combo.title} fill className="object-cover" />
            {combo.discountPercent > 0 && (
              <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-velvet/90 font-display text-base italic text-gold shadow-lg">
                -{combo.discountPercent}%
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="w-fit rounded-full bg-blush/20 px-3 py-1 font-body text-xs capitalize text-blush">
              {combo.occasion}
            </span>
            <h1 className="mt-3 font-display text-3xl italic text-ivory">{combo.title}</h1>
            <p className="mt-4 font-body text-sm leading-relaxed text-ivory/70">
              {combo.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-body text-3xl font-semibold text-gold">
                ৳{combo.comboPrice}
              </span>
              {combo.originalPrice > combo.comboPrice && (
                <span className="font-body text-lg text-ivory/40 line-through">
                  ৳{combo.originalPrice}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-full border border-gold/40 px-8 py-3 font-body font-semibold text-gold transition hover:bg-gold hover:text-velvet"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 rounded-full bg-blush px-8 py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep"
              >
                <Zap size={18} />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Included products */}
        {combo.products.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl italic text-ivory">What&apos;s Included</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3">
              {combo.products.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-velvet-light"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-1 font-display text-base italic text-ivory">
                      {product.title}
                    </h3>
                    <p className="mt-1 font-body text-sm text-gold">৳{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-14">
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
              placeholder="Share your experience with this combo..."
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
              No reviews yet. Be the first to review this combo.
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
      </div>
    </main>
  );
}