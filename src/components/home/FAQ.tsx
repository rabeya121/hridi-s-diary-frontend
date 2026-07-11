"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders within Dhaka are usually delivered within 1-2 business days. Outside Dhaka, delivery typically takes 3-5 business days.",
  },
  {
    question: "Are the products authentic?",
    answer:
      "Yes, all products sold on Hridi's Diary are 100% authentic and sourced directly from verified suppliers.",
  },
  {
    question: "Can I customize an occasion gift combo?",
    answer:
      "Currently our combos are curated as fixed sets, but we're working on a custom combo builder for future updates.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unopened products can be returned within 3 days of delivery. Please contact our support team to initiate a return.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-velvet-light px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="font-script text-2xl text-gold">Got Questions?</span>
          <h2 className="font-display text-3xl italic text-ivory md:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-gold/20 bg-velvet"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-body text-sm font-semibold text-ivory md:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gold transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="px-6 pb-4 font-body text-sm text-ivory/60">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;