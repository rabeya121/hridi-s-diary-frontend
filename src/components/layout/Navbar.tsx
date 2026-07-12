"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gift, Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const isLoggedIn = !!user;

  const loggedOutLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/combos", label: "Gift Combos" },
    { href: "/about", label: "About" },
  ];

  const loggedInLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/combos", label: "Gift Combos" },
    { href: "/items/add", label: "Add Item" },
    { href: "/items/manage", label: "Manage Items" },
    { href: "/about", label: "About" },
  ];

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-velvet/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Gift className="text-gold" size={26} />
          <span className="font-script text-2xl text-gold">Hridi&apos;s Diary</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-ivory transition hover:text-blush"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side icons */}
        <div className="hidden items-center gap-5 md:flex">
          <Link href="/shop" className="text-ivory transition hover:text-blush">
            <ShoppingBag size={20} />
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 font-body text-sm text-ivory">
                <User size={18} className="text-gold" />
                {user?.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 font-body text-sm text-ivory transition hover:text-blush"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-full bg-blush px-5 py-2 font-body text-sm font-semibold text-velvet transition hover:bg-blush-deep"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="text-ivory md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="flex flex-col gap-1 border-t border-gold/20 bg-velvet px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 font-body text-ivory transition hover:bg-velvet-light"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-left font-body text-ivory transition hover:bg-velvet-light"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-full bg-blush px-5 py-2 text-center font-body font-semibold text-velvet"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;