import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import OccasionCombos from "@/components/home/OccasionCombos";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <OccasionCombos />
    </main>
  );
}