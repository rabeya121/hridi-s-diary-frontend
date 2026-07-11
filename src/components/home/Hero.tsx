"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { Sparkles, Gift, Heart } from "lucide-react";


  const slides = [
  {
    image: "https://images.unsplash.com/photo-1676570092589-a6c09ecbb373?fm=jpg&q=60&w=1600&auto=format&fit=crop",
    icon: <Sparkles className="mx-auto mb-4 text-6xl text-gold" size={56} />,
    tag: "✨ Skincare Essentials",
    title: "Care for Your Skin,",
    titleAccent: "Comfort for Your Life",
    subtitle: "Shop skincare essentials crafted for your everyday glow and confidence.",
    cta: "Shop Skincare",
    href: "/shop?category=skincare",
  },
  {
    image: "https://loremflickr.com/1600/900/fashion,clothing",
    icon: <Heart className="mx-auto mb-4 text-6xl text-blush" size={56} />,
    tag: "💗 Comfort You Deserve",
    title: "Confidence You Wear,",
    titleAccent: "Every Single Day",
    subtitle: "Premium undergarments made for all-day comfort, fit, and confidence.",
    cta: "Shop Undergarments",
    href: "/shop?category=undergarments",
  },
  {
    image: "https://loremflickr.com/1600/900/giftbox,ribbon",
    icon: <Gift className="mx-auto mb-4 text-6xl text-gold" size={56} />,
    tag: "🎁 Celebrate Every Occasion",
    title: "Handpicked Combos,",
    titleAccent: "Made With Love",
    subtitle: "Gift sets curated for Valentine's, Eid, Christmas & Puja celebrations.",
    cta: "Explore Gift Combos",
    href: "/combos",
  },
];


const Hero = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      loop={true}
      className="hero-swiper w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative flex min-h-[65vh] items-center justify-center px-4 text-ivory"
            style={{
              backgroundImage: `linear-gradient(rgba(43,15,30,0.75), rgba(43,15,30,0.75)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 mx-auto max-w-3xl py-20 text-center">
              <span className="mb-6 inline-block rounded-full border border-gold/40 bg-velvet-light/60 px-4 py-1 font-body text-sm font-semibold text-gold backdrop-blur-sm">
                {slide.tag}
              </span>

              {slide.icon}

              <h1 className="mb-5 font-display text-4xl italic leading-tight text-ivory drop-shadow-md md:text-6xl">
                {slide.title}
                <br />
                <span className="text-gold">{slide.titleAccent}</span>
              </h1>

              <p className="mx-auto mb-8 max-w-xl font-body text-lg text-ivory/80">
                {slide.subtitle}
              </p>

              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 rounded-full bg-blush px-8 py-3 font-body font-bold text-velvet shadow-lg transition hover:scale-105 hover:bg-blush-deep"
              >
                {slide.cta} →
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;