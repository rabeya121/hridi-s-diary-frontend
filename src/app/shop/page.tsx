"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { api } from "@/lib/api";
import type { Product, ProductsResponse } from "@/lib/types";
import ProductCard from "@/components/shop/ProductCard";
import SkeletonCard from "@/components/shop/SkeletonCard";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (sort) params.set("sort", sort);
      params.set("page", String(page));
      params.set("limit", "12");

      const data: ProductsResponse = await api.get(`/products?${params.toString()}`);
      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);

      // Keep URL in sync so filters are shareable/bookmarkable
      router.replace(`/shop?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, minPrice, maxPrice, sort, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleFilterChange = () => {
    setPage(1);
  };

  return (
    <main className="flex-1 bg-velvet px-6 py-10 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <span className="font-script text-2xl text-gold">Explore</span>
          <h1 className="font-display text-3xl italic text-ivory md:text-4xl">
            Shop All Products
          </h1>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="mx-auto mb-6 flex max-w-xl gap-2">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-gold/30 bg-velvet-light py-3 pl-11 pr-4 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-blush px-6 py-3 font-body text-sm font-semibold text-velvet transition hover:bg-blush-deep"
          >
            Search
          </button>
        </form>

        {/* Filters + Sort bar */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-gold/20 bg-velvet-light p-4">
          <SlidersHorizontal size={18} className="text-gold" />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              handleFilterChange();
            }}
            className="rounded-full border border-gold/30 bg-velvet px-4 py-2 font-body text-sm text-ivory focus:border-gold focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="skincare">Skincare</option>
            <option value="haircare">Haircare</option>
            <option value="undergarments">Undergarments</option>
          </select>

          <input
            type="number"
            placeholder="Min ৳"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              handleFilterChange();
            }}
            className="w-24 rounded-full border border-gold/30 bg-velvet px-4 py-2 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
          />

          <input
            type="number"
            placeholder="Max ৳"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              handleFilterChange();
            }}
            className="w-24 rounded-full border border-gold/30 bg-velvet px-4 py-2 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
          />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              handleFilterChange();
            }}
            className="rounded-full border border-gold/30 bg-velvet px-4 py-2 font-body text-sm text-ivory focus:border-gold focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>

        {!loading && products.length === 0 && (
          <p className="py-16 text-center font-body text-ivory/50">
            No products found matching your filters.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-10 w-10 rounded-full font-body text-sm transition ${
                  page === i + 1
                    ? "bg-gold text-velvet"
                    : "border border-gold/30 text-ivory hover:bg-velvet-light"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <ShopContent />
    </Suspense>
  );
}