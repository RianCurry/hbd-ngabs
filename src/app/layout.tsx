import type { Metadata } from "next";
import { Bricolage_Grotesque, Quicksand } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "tictac ngao",
  description: "A special birthday surprise for Ficha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-body text-on-surface">
        {children}
      </body>
    </html>
  );
}
