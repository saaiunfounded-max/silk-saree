'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, DollarSign, Globe2, BookOpen, Layers } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function SellerLandingPage() {
  const { switchRole } = useAuth();

  const handleStartSelling = () => {
    switchRole('seller');
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen text-[#111111]">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 sm:py-36 bg-[#161413] text-[#F8F5EF] overflow-hidden border-b border-[#292929]">
        <div className="absolute inset-0 opacity-30">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80"
            alt="Handloom Weavers Atelier"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-3 font-sans">
            WEAVER PARTNERSHIP INVITATION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight mb-6">
            YOUR CRAFT
            <span className="block italic text-[#E5DEF0]">
              DESERVES A LARGER STAGE.
            </span>
          </h1>
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#D8D2C4] font-light max-w-2xl mb-10 leading-relaxed">
            THARI connects skilled Indian weavers with patrons looking for authentic, certified silk sarees. Retain full pride of your heritage, set your own prices, and bypass layers of intermediary merchants.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/seller/products/new"
              onClick={handleStartSelling}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#B89B5E] text-[#111111] hover:bg-[#D4BC84] text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              START SELLING AS A WEAVER
            </Link>
            <Link
              href="/seller/dashboard"
              onClick={handleStartSelling}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#F8F5EF]/60 text-[#F8F5EF] hover:border-[#B89B5E] hover:text-[#B89B5E] text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              SELLER LOGIN (PORTAL DEMO)
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FIVE CORE BENEFITS */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-2 font-sans">
            WHY WEAVE FOR THARI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111]">
            A MARKETPLACE CONSTRUCTED FOR ARTISANS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#E8E2D5] p-8 flex flex-col justify-between">
            <div>
              <Globe2 className="w-6 h-6 text-[#B89B5E] mb-4" />
              <h3 className="font-serif text-xl text-[#111111] mb-2">
                DIRECT CUSTOMER ACCESS
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Connect directly with connoisseurs across India and 40+ international countries who actively appreciate slow-woven authentic handlooms.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D5] p-8 flex flex-col justify-between">
            <div>
              <Layers className="w-6 h-6 text-[#B89B5E] mb-4" />
              <h3 className="font-serif text-xl text-[#111111] mb-2">
                CONTROL YOUR COLLECTION
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                You decide which sarees to weave, which silk weaves to feature, and define your fair pricing without commercial pressure.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D5] p-8 flex flex-col justify-between">
            <div>
              <BookOpen className="w-6 h-6 text-[#B89B5E] mb-4" />
              <h3 className="font-serif text-xl text-[#111111] mb-2">
                TELL YOUR STORY
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Every weaver gets a dedicated editorial profile page documenting their ancestral village, loom techniques, and master certifications.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D5] p-8 flex flex-col justify-between">
            <div>
              <DollarSign className="w-6 h-6 text-[#B89B5E] mb-4" />
              <h3 className="font-serif text-xl text-[#111111] mb-2">
                TRANSPARENT SETTLEMENTS
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Prompt bank disbursements upon order delivery with clear accounting for your guild or cooperative.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D5] p-8 flex flex-col justify-between">
            <div>
              <Shield className="w-6 h-6 text-[#B89B5E] mb-4" />
              <h3 className="font-serif text-xl text-[#111111] mb-2">
                INTELLECTUAL RESPECT
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Your copyright over traditional motifs and korvai weaves is protected. No industrial imitation tolerated.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8E2D5] p-8 flex flex-col justify-between">
            <div>
              <Sparkles className="w-6 h-6 text-[#B89B5E] mb-4" />
              <h3 className="font-serif text-xl text-[#111111] mb-2">
                INSURED LOGISTICS
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                THARI provides doorstep packaging materials and insured white-glove courier pickup directly from your weaving town.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. READY TO EMBARK CTA */}
      <section className="py-20 bg-[#F2EDE2] border-t border-[#E8E2D5] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-[#111111] mb-4">
            BEGIN LISTING YOUR LOOM CREATIONS
          </h2>
          <p className="text-xs text-[#666666] mb-8 leading-relaxed">
            Join the guild of master weavers from Kanchipuram, Varanasi, Mysore, Raigarh and Chanderi.
          </p>
          <Link
            href="/seller/dashboard"
            onClick={handleStartSelling}
            className="px-8 py-3.5 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
          >
            ENTER SELLER PORTAL
          </Link>
        </div>
      </section>
    </div>
  );
}
