import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGift,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-velvet px-6 pt-14 pb-8 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <FaGift className="text-gold" size={22} />
            <span className="font-script text-2xl text-gold">Hridi&apos;s Diary</span>
          </Link>
          <p className="mt-4 max-w-xs font-body text-sm text-ivory/70">
            Skincare, haircare & occasion gift combos — curated with care for
            every celebration.
          </p>
          <div className="mt-5 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-ivory transition hover:bg-gold hover:text-velvet"
            >
              <FaFacebookF size={14} />
            </a>
            
            <a  href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-ivory transition hover:bg-gold hover:text-velvet"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-ivory transition hover:bg-gold hover:text-velvet"
            >
              <FaYoutube size={16} />
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="font-display text-lg italic text-gold">Shop</h3>
          <ul className="mt-4 flex flex-col gap-2 font-body text-sm text-ivory/70">
            <li>
              <Link href="/shop?category=skincare" className="transition hover:text-blush">
                Skincare
              </Link>
            </li>
            <li>
              <Link href="/shop?category=haircare" className="transition hover:text-blush">
                Haircare
              </Link>
            </li>
            <li>
              <Link href="/shop?category=undergarments" className="transition hover:text-blush">
                Undergarments
              </Link>
            </li>
            <li>
              <Link href="/combos" className="transition hover:text-blush">
                Gift Combos
              </Link>
            </li>
          </ul>
        </div>

        {/* Company links */}
        <div>
          <h3 className="font-display text-lg italic text-gold">Company</h3>
          <ul className="mt-4 flex flex-col gap-2 font-body text-sm text-ivory/70">
            <li>
              <Link href="/about" className="transition hover:text-blush">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-blush">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition hover:text-blush">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-blush">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-lg italic text-gold">Contact</h3>
          <ul className="mt-4 flex flex-col gap-3 font-body text-sm text-ivory/70">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt size={14} className="mt-0.5 shrink-0 text-gold" />
              Mirpur, Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt size={14} className="shrink-0 text-gold" />
              +880 1747-019338
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope size={14} className="shrink-0 text-gold" />
              hello@hridisdiary.com
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-gold/10 pt-6 text-center font-body text-xs text-ivory/50">
        © {year} Hridi&apos;s Diary. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;