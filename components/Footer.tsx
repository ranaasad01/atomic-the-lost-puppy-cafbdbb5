"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { navLinks, BRAND } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const footerT = t.raw("footer") as Record<string, string>;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-16"
      style={{
        background: "var(--card)",
        borderTop: "3px solid var(--border)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <span className="text-4xl" aria-hidden="true">
            {BRAND.emoji}
          </span>
          <span
            className="font-extrabold text-2xl"
            style={{
              fontFamily: "'Baloo 2', sans-serif",
              color: "var(--primary)",
            }}
          >
            {BRAND.name}
          </span>
        </div>

        <p
          className="text-base font-semibold"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: "var(--muted-foreground)",
          }}
        >
          {footerT["tagline"] ?? BRAND.tagline}
        </p>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-3">
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
                    className="px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: "var(--foreground)",
                      background: "var(--background)",
                      border: "2px solid var(--border)",
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <p
          className="text-sm font-semibold"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: "var(--muted-foreground)",
          }}
        >
          {footerT["made"] ?? "Made with 💛 for curious kids everywhere"}
        </p>
      </div>
    </motion.footer>
  );
}