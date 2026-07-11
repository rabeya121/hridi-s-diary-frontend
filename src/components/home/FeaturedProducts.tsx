"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Product, ProductsResponse } from "@/lib/types";
import ProductCard from "@/components/shop/ProductCard";
import SkeletonCard from "@/components/shop/SkeletonCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ProductsResponse = await api.get("/products?limit=8&sort=rating");
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-velvet px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="font-script text-2xl text-gold">Our Bestsellers</span>
            <h2 className="font-display text-3xl italic text-ivory md:text-4xl">
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden font-body text-sm font-semibold text-gold hover:text-gold-soft sm:block"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;