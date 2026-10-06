'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { ProductCard } from '@/components/products/ProductCard';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';
import { SILK_COLLECTIONS } from '@/lib/products';

export default function HomePage() {
  const { approvedProducts, sellers } = useMarketplace();
  const newArrivals = approvedProducts.filter((p) => p.is_new).slice(0, 4);
  const featuredProducts = approvedProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col bg-[#F8F5EF] text-[#111111]">
      {/* 1. HERO SECTION (85-100vh on desktop) */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#111111]">
        {/* Background Editorial Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
            alt="THARI Pure Indian Silk Saree Drapery"
            fill
            priority
            className="object-cover object-center opacity-65 scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/70 via-transparent to-[#111111]/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center py-20">
          <span className="text-[11px] sm:text-xs tracking-widest-luxury text-[#B89B5E] uppercase font-sans mb-4 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#B89B5E]" />
            THE ART OF INDIAN SILK
            <span className="w-6 h-[1px] bg-[#B89B5E]" />
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F8F5EF] font-light leading-[1.08] tracking-tight max-w-4xl">
            THE ART
            <span className="block italic font-light text-[#E5DEF0]">
              OF INDIAN SILK
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#D8D2C4] font-light tracking-wide max-w-xl mt-6 mb-10 leading-relaxed">
            Woven by tradition. Curated for the extraordinary. Direct from India&apos;s master weavers to your wardrobe.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F8F5EF] text-[#111111] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-all duration-300 text-center"
            >
              EXPLORE COLLECTION
            </Link>
            <a
              href="#weavers"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#F8F5EF]/60 text-[#F8F5EF] hover:border-[#B89B5E] hover:text-[#B89B5E] text-xs uppercase tracking-luxury font-light transition-all duration-300 text-center backdrop-blur-sm"
            >
              MEET THE WEAVERS
            </a>
          </div>

          {/* Micro Brand Descriptor */}
          <div className="mt-16 text-[10px] tracking-widest-luxury uppercase text-[#B9A7D4]/80 flex items-center gap-6">
            <span>THE LOOM</span>
            <span>&rarr;</span>
            <span>THE WEAVER</span>
            <span>&rarr;</span>
            <span>THE SAREE</span>
            <span>&rarr;</span>
            <span>THE PATRON</span>
          </div>
        </div>
      </section>

      {/* 2. NEW ARRIVALS */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#E8E2D5] pb-6">
          <div>
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-2 font-sans">
              FRESH OFF THE LOOM
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            href="/shop?filter=new"
            className="mt-4 sm:mt-0 text-xs tracking-luxury uppercase text-[#292929] hover:text-[#B89B5E] transition-colors flex items-center gap-2 group font-sans"
          >
            View All New Creations
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. SHOP BY SILK (EDITORIAL COLLECTION TILES) */}
      <section id="collections" className="py-20 bg-[#F2EDE2] border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-2 font-sans">
              LEGENDARY GUILDS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal">
              SHOP BY SILK
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] mt-3 font-light leading-relaxed">
              Discover six centuries-old weaving lineages, each defined by distinct silk yarns, indigenous looms, and mathematical precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SILK_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                className="group relative flex flex-col bg-[#F8F5EF] border border-[#E0D8C7] overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E2D9C4]">
                  <ImageWithFallback
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block">
                      {col.origin}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F8F5EF]">
                      {col.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <p className="text-xs text-[#555555] font-light leading-relaxed mb-6">
                    {col.description}
                  </p>
                  <Link
                    href={`/shop?type=${encodeURIComponent(col.name)}`}
                    className="inline-flex items-center justify-between text-xs tracking-luxury uppercase text-[#111111] group-hover:text-[#B89B5E] font-medium pt-3 border-t border-[#EAE3D4] transition-colors"
                  >
                    <span>EXPLORE {col.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE WEAVERS (LARGE EDITORIAL SECTION) */}
      <section id="weavers" className="py-24 sm:py-32 bg-[#191816] text-[#F8F5EF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-3 font-sans">
                THE ARTISANS OF THARI
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F8F5EF] leading-tight mb-6">
                FROM THEIR LOOMS.
                <span className="block italic text-[#E5DEF0]">
                  TO YOUR WARDROBE.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#C4BCAB] font-light leading-relaxed mb-6">
                Every THARI saree begins with a weaver, a loom and generations of craft. By eliminating layers of middlemen, we ensure master artisans receive their rightful reverence and earnings while you receive verifiable authenticity.
              </p>
              <p className="text-xs text-[#9E9585] font-light leading-relaxed mb-8">
                From the korvai pit looms of Kanchipuram to the Kadhwa needle artisans along the Varanasi ghats, meet the families who turn pure raw silk into living art.
              </p>
              <div>
                <Link
                  href="/seller"
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#B89B5E] text-[#111111] hover:bg-[#D4BC84] text-xs uppercase tracking-luxury font-medium transition-colors"
                >
                  MEET OUR WEAVERS <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Weavers Showcase */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sellers.slice(0, 2).map((seller) => (
                <div
                  key={seller.id}
                  className="border border-[#2C2925] bg-[#201D1A] p-6 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-[#151412]">
                    <ImageWithFallback
                      src={seller.cover_url}
                      alt={seller.display_name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 px-2 py-0.5 text-[10px] text-[#B89B5E] tracking-wider uppercase">
                      {seller.years_of_experience} Yrs Craft
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-[#B9A7D4] block mb-1">
                      {seller.location}, {seller.region}
                    </span>
                    <h3 className="font-serif text-xl text-[#F8F5EF] mb-2">
                      {seller.business_name}
                    </h3>
                    <p className="text-xs text-[#AAAAAA] font-light leading-relaxed mb-4 line-clamp-3">
                      &ldquo;{seller.story_excerpt}&rdquo;
                    </p>
                  </div>

                  <Link
                    href={`/weavers/${seller.id}`}
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#B89B5E] tracking-luxury uppercase hover:text-white transition-colors pt-3 border-t border-[#2C2925]"
                  >
                    Read Weaver Chronicle &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP (SPLIT-SCREEN EDITORIAL SECTION) */}
      <section id="craftsmanship" className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Imagery */}
          <div className="relative aspect-[4/5] w-full bg-[#E8E2D5] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
              alt="Intricate Handloom Zari Weaving Process"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur-md border border-[#E8E2D5]">
              <span className="text-[9px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-1">
                PURITY STANDARD
              </span>
              <p className="font-serif text-lg text-[#111111]">
                3-Ply Twisted Mulberry Silk & Certified Silver-Gold Zari
              </p>
            </div>
          </div>

          {/* Right Text Story */}
          <div className="flex flex-col">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-3 font-sans">
              HERITAGE CODE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] leading-tight mb-6">
              CRAFTED BY HAND.
              <span className="block italic text-[#846CA6]">
                CHOSEN WITH INTENT.
              </span>
            </h2>

            <div className="space-y-6 text-sm text-[#444444] font-light leading-relaxed">
              <p>
                In an era dominated by high-speed power looms and synthetic counterfeits, THARI stands resolutely for authentic slow fashion. Each saree in our catalog represents hundreds of hours of patient hand coordination between the weaver&apos;s hands and feet.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E8E2D5]">
                <div>
                  <h4 className="font-serif text-base text-[#111111] font-semibold mb-1">
                    Tested Precious Zari
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Crafted with genuine silver leaf electroplated in 24-karat gold, assuring unmatched heirloom longevity.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#111111] font-semibold mb-1">
                    Direct Origin Verification
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Every saree traces directly to registered artisan cooperatives with certified geographical origins.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#111111] font-semibold mb-1">
                    Multi-Vendor Equity
                  </h4>
                  <p className="text-xs text-[#666666]">
                    Transparent direct seller settlements ensuring 85%+ of order value goes directly to weaving communities.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#111111] font-semibold mb-1">
                    Silk Mark Guarantee
                  </h4>
                  <p className="text-xs text-[#666666]">
                    100% natural pure mulberry, katan, tussar and muga fibers tested for thread count and pure natural luster.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-[#111111] hover:text-[#B89B5E] font-medium border-b border-[#111111] pb-1"
              >
                DISCOVER THE CRAFT ARCHIVE &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED COLLECTION (LARGE VISUAL CAMPAIGN) */}
      <section className="relative py-28 sm:py-36 bg-[#181615] text-[#F8F5EF] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=2000&q=80"
            alt="The Festive Edit Silk Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#111111]/75" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] mb-3 block font-sans">
            ANNUAL CURATION
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#F8F5EF] font-light leading-tight mb-4">
            THE FESTIVE EDIT
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#D4CBB8] font-light max-w-lg mb-8 leading-relaxed">
            Silks made for moments worth remembering. Royal jewel tones, heavy kadhwa brocades, and radiant gold temple borders.
          </p>
          <Link
            href="/shop?filter=featured"
            className="px-8 py-3.5 bg-[#B89B5E] text-[#111111] hover:bg-[#D4BC84] text-xs uppercase tracking-luxury font-medium transition-colors"
          >
            DISCOVER THE EDIT
          </Link>
        </div>
      </section>

      {/* 7. SELL WITH THARI (MARKETPLACE WEAVER SECTION) */}
      <section className="py-20 sm:py-28 bg-[#F0EAE0] border-t border-[#E0D8C7]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-2 font-sans">
            WEAVER COOPERATIVE INVITATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal mb-4">
            YOUR LOOM. YOUR STORY. YOUR THARI.
          </h2>
          <p className="text-sm sm:text-base text-[#555555] font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            Bring your craft directly to patrons who revere authentic Indian silk. Control your pricing, present your ancestral stories, and build a global patronage without middlemen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/seller"
              className="px-8 py-3.5 bg-[#111111] text-[#F8F5EF] hover:bg-[#292929] text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              BECOME A WEAVER
            </Link>
            <Link
              href="/seller/dashboard"
              className="px-8 py-3.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F8F5EF] text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              SELLER LOGIN
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
