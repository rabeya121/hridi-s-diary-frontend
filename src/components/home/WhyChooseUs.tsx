import { ShieldCheck, Leaf, Truck, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Authentic Products",
    description: "100% genuine, quality-checked before every dispatch.",
  },
  {
    icon: Leaf,
    title: "Skin-Friendly Formulas",
    description: "Gentle, dermatologically mindful ingredients.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Nationwide delivery, carefully packaged.",
  },
  {
    icon: HeartHandshake,
    title: "Made For Gifting",
    description: "Beautifully wrapped combos for every celebration.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-velvet px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="font-script text-2xl text-gold">Why Choose Us</span>
          <h2 className="font-display text-3xl italic text-ivory md:text-4xl">
            Trusted by Every Customer
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex h-48 flex-col items-center rounded-2xl border border-gold/20 bg-velvet-light p-6 text-center"
              >
                <Icon className="text-gold" size={32} />
                <h3 className="mt-4 font-display text-lg italic text-ivory">
                  {feature.title}
                </h3>
                <p className="mt-2 font-body text-sm text-ivory/60">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;