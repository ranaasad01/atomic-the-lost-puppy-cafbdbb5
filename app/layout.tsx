import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "The Lost Puppy — A Choose-Your-Adventure Story",
  description:
    "Help Biscuit find his way home! A fun choose-your-adventure story for kids aged 6–10 with happy endings and lots of choices.",
  openGraph: {
    title: "The Lost Puppy — A Choose-Your-Adventure Story",
    description:
      "Help Biscuit find his way home! A fun choose-your-adventure story for kids aged 6–10.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="#"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" style={{ background: "var(--background)" }}>
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}