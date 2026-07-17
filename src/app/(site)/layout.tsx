import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "../globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/preloader/preloader";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Cache rendered site pages instead of re-querying the DB on every nav;
// admin edits still show up immediately via revalidatePath in the actions.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "TEAM TG — Dominate · Unite · Conquer",
  description:
    "TEAM TG is a competitive gaming organization uniting elite creators and players across Valorant, BGMI, Minecraft and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <div className="bg-texture" />
        <div className="bg-noise" />
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
