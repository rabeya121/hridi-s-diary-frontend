import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Categories />
    </main>
  );
}