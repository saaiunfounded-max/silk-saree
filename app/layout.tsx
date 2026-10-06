import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import { MarketplaceProvider } from '@/lib/store';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THARI — The Art of Indian Silk',
  description:
    'Discover exceptional Indian silk sarees sourced from skilled weavers and curated through a modern luxury marketplace.',
  keywords: [
    'silk saree',
    'kanchipuram silk',
    'banarasi saree',
    'mysore silk',
    'luxury handloom',
    'indian craft',
    'thari',
  ],
  authors: [{ name: 'THARI Luxury Marketplaces' }],
  openGraph: {
    title: 'THARI — The Art of Indian Silk',
    description:
      'Connecting India’s most revered silk weavers directly with discerning patrons worldwide.',
    url: 'https://thari.luxury',
    siteName: 'THARI',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'THARI Luxury Silk Sarees',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THARI — The Art of Indian Silk',
    description:
      'From the loom to the world. Discover authentic heirloom Indian silks.',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#F8F5EF] text-[#111111] min-h-screen flex flex-col font-sans antialiased selection:bg-[#B9A7D4] selection:text-[#111111]">
        <AuthProvider>
          <MarketplaceProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </MarketplaceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
