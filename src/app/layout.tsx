import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mercado Prisma",
    template: '%s - Mercado Prisma',
  },
  description: "Venha conhecer o supermercado que entende você! Oferecemos uma ampla variedade de produtos frescos, marcas confiáveis e promoções imperdíveis para facilitar sua vida e cuidar do seu bolso.",
  //É possível adicionar imagens para o Open Graph e Twitter Card
  openGraph: {
    images: [
      {
        url: "https://placehold.co/1280x768?text=Mercado+Prisma",
        width: 1280,
        height: 768,
        alt: "Mercado Prisma",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-lt-installed="true">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
