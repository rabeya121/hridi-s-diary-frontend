import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Nusrat Jahan",
    location: "Dhaka",
    rating: 5,
    text: "The Eid combo was beautifully packaged and the products are genuinely good quality. Fast delivery too!",
  },
  {
    name: "Farzana Akter",
    location: "Chittagong",
    rating: 5,
    text: "Ordered the Valentine's combo for my sister — she loved it. Will definitely order again for Puja.",
  },
  {
    name: "Sadia Islam",
    location: "Sylhet",
    rating: 4,
    text: "Great skincare range, the Rose Water Toner is now part of my daily routine. Highly recommend.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-velvet-light px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="font-script text-2xl text-blush">Customer Love</span>
          <h2 className="font-display text-3xl italic text-ivory md:text-4xl">
            What They're Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex h-56 flex-col rounded-2xl border border-gold/20 bg-velvet p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < t.rating ? "fill-gold text-gold" : "text-ivory/20"}
                  />
                ))}
              </div>
              <p className="mt-3 flex-1 font-body text-sm italic text-ivory/80">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4">
                <p className="font-body text-sm font-semibold text-ivory">{t.name}</p>
                <p className="font-body text-xs text-ivory/50">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;