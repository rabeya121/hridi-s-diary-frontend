import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Skincare",
    href: "/shop?category=skincare",
    image: "https://loremflickr.com/600/700/skincare,cosmetics",
    description: "Serums, toners & daily glow essentials",
  },
  {
    name: "Haircare",
    href: "/shop?category=haircare",
    image: "https://loremflickr.com/600/700/haircare,shampoo",
    description: "Shampoos, oils & repair treatments",
  },
  {
    name: "Undergarments",
    href: "/shop?category=undergarments",
    image: "https://loremflickr.com/600/700/fashion,clothing",
    description: "Everyday comfort, confidently designed",
  },
];

const Categories = () => {
  return (
    <section className="bg-velvet px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="font-script text-2xl text-gold">Shop by</span>
          <h2 className="font-display text-3xl italic text-ivory md:text-4xl">
            Category
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative h-80 overflow-hidden rounded-2xl border border-gold/20"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-velvet via-velvet/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl italic text-ivory">
                  {cat.name}
                </h3>
                <p className="mt-1 font-body text-sm text-ivory/70">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;