import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fight | 0.1.0",
  description: "App para el control de las peleas de karateDo",
  authors: [{ url: "https//github.com/alexisrhc", name: "Alexis Hernandez" }],
  keywords: ["fight", "karate", "karate do", "fighting", "app", "control"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        {children}
      </body>
    </html>
  );
}
