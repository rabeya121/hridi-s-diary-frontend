"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // TODO: connect to a real contact/email API later
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 800);
  };

  return (
    <main className="flex-1 bg-velvet px-6 py-16 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="font-script text-2xl text-gold">Get in Touch</span>
          <h1 className="font-display text-3xl italic text-ivory md:text-4xl">
            Contact Us
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 rounded-2xl border border-gold/20 bg-velvet-light p-5">
              <MapPin className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <p className="font-body text-sm font-semibold text-ivory">Address</p>
                <p className="mt-1 font-body text-sm text-ivory/60">
                  Mirpur, Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-gold/20 bg-velvet-light p-5">
              <Phone className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <p className="font-body text-sm font-semibold text-ivory">Phone</p>
                <p className="mt-1 font-body text-sm text-ivory/60">+880 1XXX-XXXXXX</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-gold/20 bg-velvet-light p-5">
              <Mail className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <p className="font-body text-sm font-semibold text-ivory">Email</p>
                <p className="mt-1 font-body text-sm text-ivory/60">
                  hello@hridisdiary.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl border border-gold/20 bg-velvet-light p-6"
          >
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
            <textarea
              rows={5}
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-xl border border-gold/30 bg-velvet px-4 py-3 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-full bg-blush py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep disabled:opacity-60"
            >
              <Send size={16} />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}