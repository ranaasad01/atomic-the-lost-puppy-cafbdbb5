"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/data";
import { BRAND } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50"
      style={{
        background: "var(--card)",
        borderBottom: "3px solid var(--border)",
        boxShadow: "0 4px 16px rgba(255,112,67,0.12)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl" aria-hidden="true">
            {BRAND.emoji}
          </span>
          <span
            className="font-extrabold text-xl leading-tight"
            style={{
              fontFamily: "'Baloo 2', sans-serif",
              color: "var(--primary)",
            }}
          >
            {BRAND.name}
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isAnchor = link.href.startsWith("#");
              const label = navT[link.key] ?? link.label;

              return (
                <li key={link.key}>
                  <Link
                    href={
                      isAnchor
                        ? pathname === "/"
                          ? link.href
                          : "/" + link.href
                        : link.href
                    }
                    onClick={
                      isAnchor
                        ? (e) => {
                            if (pathname === "/") {
                              e.preventDefault();
                              document
                                .querySelector(link.href)
                                ?.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        : undefined
                    }
                    className="px-3 py-2 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: "var(--foreground)",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "var(--border)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "transparent";
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}