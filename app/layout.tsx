// app/layout.tsx   [MODIFIÉ : remplace tout le contenu]
import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

// Polices ESTIMÉES d'après les mock-ups : serif douce pour les titres, sans-serif arrondie pour le texte.
// next/font les télécharge au build et les sert depuis ton propre domaine.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"], // inclut les lettres accentuées du français
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "HoneyLMS — Honey Group Academy", template: "%s · HoneyLMS" },
  description: "Plateforme de formation Honey Group : langues, bureautique et EDUCTOUR.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}