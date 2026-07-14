"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Gift,
  ClipboardList,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
  { href: "/items/add", label: "Add Item", icon: PackagePlus },
  { href: "/items/manage", label: "Manage Items", icon: PackageSearch },
  { href: "/admin/combos/add", label: "Add Combo", icon: Gift },
  { href: "/admin/orders", label: "All Orders", icon: ClipboardList },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-gold/20 bg-velvet-light md:w-64 md:border-b-0 md:border-r">
      <div className="p-4">
        <p className="mb-3 font-script text-xl text-gold">Admin Panel</p>
        <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 font-body text-sm transition ${
                  isActive
                    ? "bg-gold/15 text-gold"
                    : "text-ivory/70 hover:bg-velvet hover:text-ivory"
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;