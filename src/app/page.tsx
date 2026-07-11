import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import OccasionCombos from "@/components/home/OccasionCombos";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <OccasionCombos />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <FAQ />
    </main>
  );
}