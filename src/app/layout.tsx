import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hridi's Diary | Skincare, Haircare & Gift Combos",
  description:
    "A curated beauty destination for skincare, haircare, and occasion gift combos — Valentine's, Eid, Christmas & Puja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-velvet text-ivory"
        suppressHydrationWarning
      >
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#3D1830",
                color: "#F7F0E8",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                fontFamily: "var(--font-inter)",
              },
              success: {
                iconTheme: { primary: "#D4AF37", secondary: "#3D1830" },
              },
              error: {
                iconTheme: { primary: "#E07A92", secondary: "#3D1830" },
              },
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      </body>
    </html>
  );
}
