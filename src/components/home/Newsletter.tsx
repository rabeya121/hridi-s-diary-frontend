"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to a real newsletter API/service later
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-velvet px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-gold/30 bg-velvet-light px-6 py-12 text-center">
        <Mail className="text-gold" size={32} />
        <h2 className="mt-4 font-display text-2xl italic text-ivory md:text-3xl">
          Get Occasion Offers First
        </h2>
        <p className="mt-2 font-body text-sm text-ivory/60">
          Subscribe for early access to Valentine&apos;s, Eid, Christmas & Puja combo drops.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full border border-gold/30 bg-velvet px-5 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-blush px-6 py-3 font-body text-sm font-semibold text-velvet transition hover:bg-blush-deep"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="mt-3 font-body text-sm text-gold">
            🎉 Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;