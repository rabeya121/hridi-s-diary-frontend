// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Gift, Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { useCart } from "@/context/CartContext";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   const isLoggedIn = !!user;

//   const loggedOutLinks = [
//     { href: "/shop", label: "Shop" },
//     { href: "/combos", label: "Gift Combos" },
//     { href: "/about", label: "About" },
//     { href: "/blog", label: "Blog" },
//     { href: "/contact", label: "Contact" },
//   ];

//   const loggedInLinks = [
//     { href: "/shop", label: "Shop" },
//     { href: "/combos", label: "Gift Combos" },
//     { href: "/items/add", label: "Add Item" },
//     { href: "/items/manage", label: "Manage Items" },
//     { href: "/about", label: "About" },
//     { href: "/blog", label: "Blog" },
//     { href: "/contact", label: "Contact" },
//   ];

//   const links = isLoggedIn ? loggedInLinks : loggedOutLinks;
//   const { totalItems } = useCart();

//   const handleLogout = () => {
//     logout();
//     setIsOpen(false);
//     router.push("/");
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-velvet/95 backdrop-blur-sm">
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <Gift className="text-gold" size={26} />
//           <span className="font-script text-2xl text-gold">
//             Hridi&apos;s Diary
//           </span>
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden items-center gap-6 md:flex lg:gap-8">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="whitespace-nowrap font-body text-sm font-medium text-ivory transition hover:text-blush"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>

//         {/* Right side icons */}
//         <div className="hidden items-center gap-5 md:flex">
//           <Link
//             href="/cart"
//             className="relative text-ivory transition hover:text-blush"
//           >
//             <ShoppingBag size={20} />
//             {totalItems > 0 && (
//               <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blush text-[10px] font-bold text-velvet">
//                 {totalItems}
//               </span>
//             )}
//           </Link>
//           {isLoggedIn ? (
//             <div className="flex items-center gap-4">
//               <span className="flex items-center gap-2 font-body text-sm text-ivory">
//                 <User size={18} className="text-gold" />
//                 {user?.name.split(" ")[0]}
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-1 font-body text-sm text-ivory transition hover:text-blush"
//               >
//                 <LogOut size={18} />
//               </button>
//             </div>
//           ) : (
//             <Link
//               href="/auth/login"
//               className="rounded-full bg-blush px-5 py-2 font-body text-sm font-semibold text-velvet transition hover:bg-blush-deep"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile menu button */}
//         <button
//           className="text-ivory md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle menu"
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </nav>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto border-t border-gold/20 bg-velvet px-6 py-4 md:hidden">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setIsOpen(false)}
//               className="rounded-lg px-3 py-2 font-body text-ivory transition hover:bg-velvet-light"
//             >
//               {link.label}
//             </Link>
//           ))}
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-left font-body text-ivory transition hover:bg-velvet-light"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           ) : (
//             <Link
//               href="/auth/login"
//               onClick={() => setIsOpen(false)}
//               className="mt-2 rounded-full bg-blush px-5 py-2 text-center font-body font-semibold text-velvet"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Gift,
  Menu,
  X,
  ShoppingBag,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [dashDropdownOpen, setDashDropdownOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileDashOpen, setMobileDashOpen] = useState(false);

  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();

  const isLoggedIn = !!user;

  const shopCategories = [
    { href: "/shop?category=skincare", label: "Skincare" },
    { href: "/shop?category=haircare", label: "Haircare" },
    { href: "/shop?category=undergarments", label: "Undergarments" },
    { href: "/shop", label: "All Products" },
  ];

  const dashboardLinks = [
    { href: "/orders", label: "My Orders" },
    ...(user?.role === "admin"
      ? [
          { href: "/admin/dashboard", label: "Dashboard Overview" },
          { href: "/items/add", label: "Add Item" },
          { href: "/items/manage", label: "Manage Items" },
          { href: "/admin/combos/add", label: "Add Combo" },
          { href: "/admin/orders", label: "All Orders" },
        ]
      : []),
  ];

  const staticLinks = [
    { href: "/combos", label: "Gift Combos" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

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
          <span className="font-script text-2xl text-gold">
            Hridi&apos;s Diary
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {/* Shop dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 font-body text-sm font-medium text-ivory transition hover:text-blush">
              Shop
              <ChevronDown size={16} />
            </button>
            {shopDropdownOpen && (
              <div className="absolute left-0 top-full w-48 rounded-xl border border-gold/20 bg-velvet-light py-2 shadow-lg">
                {shopCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="block px-4 py-2 font-body text-sm text-ivory transition hover:bg-velvet hover:text-blush"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {staticLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-body text-sm font-medium text-ivory transition hover:text-blush"
            >
              {link.label}
            </Link>
          ))}

          {/* Dashboard dropdown (logged in only) */}
          {isLoggedIn && (
            <div
              className="relative"
              onMouseEnter={() => setDashDropdownOpen(true)}
              onMouseLeave={() => setDashDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 font-body text-sm font-medium text-ivory transition hover:text-blush">
                Dashboard
                <ChevronDown size={16} />
              </button>
              {dashDropdownOpen && (
                <div className="absolute left-0 top-full w-44 rounded-xl border border-gold/20 bg-velvet-light py-2 shadow-lg">
                  {dashboardLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 font-body text-sm text-ivory transition hover:bg-velvet hover:text-blush"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side icons */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/cart"
            className="relative text-ivory transition hover:text-blush"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blush text-[10px] font-bold text-velvet">
                {totalItems}
              </span>
            )}
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
        <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto border-t border-gold/20 bg-velvet px-6 py-4 md:hidden">
          {/* Mobile Shop accordion */}
          <button
            onClick={() => setMobileShopOpen(!mobileShopOpen)}
            className="flex items-center justify-between rounded-lg px-3 py-2 font-body text-ivory transition hover:bg-velvet-light"
          >
            Shop
            <ChevronDown
              size={16}
              className={`transition-transform ${mobileShopOpen ? "rotate-180" : ""}`}
            />
          </button>
          {mobileShopOpen && (
            <div className="ml-4 flex flex-col gap-1">
              {shopCategories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 font-body text-sm text-ivory/80 transition hover:bg-velvet-light"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          )}

          {staticLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 font-body text-ivory transition hover:bg-velvet-light"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Dashboard accordion */}
          {isLoggedIn && (
            <>
              <button
                onClick={() => setMobileDashOpen(!mobileDashOpen)}
                className="flex items-center justify-between rounded-lg px-3 py-2 font-body text-ivory transition hover:bg-velvet-light"
              >
                Dashboard
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileDashOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileDashOpen && (
                <div className="ml-4 flex flex-col gap-1">
                  {dashboardLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-2 font-body text-sm text-ivory/80 transition hover:bg-velvet-light"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

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
