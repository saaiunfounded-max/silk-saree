'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111111] text-[#F8F5EF] pt-20 pb-12 border-t border-[#292929]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* NEWSLETTER EDITORIAL SECTION */}
        <div className="pb-16 border-b border-[#292929] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="text-[10px] tracking-widest-luxury text-[#B89B5E] uppercase block mb-3 font-sans">
              THE PRIVATE SALON
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#F8F5EF] leading-snug">
              ENTER THE WORLD OF THARI.
            </h3>
            <p className="text-xs sm:text-sm text-[#AAAAAA] mt-2 max-w-lg font-light leading-relaxed">
              Curated chronicles of master weavers, rare limited-edition loom releases, and private invitations from India&apos;s finest silk guilds.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="flex items-center gap-2 text-[#B89B5E] text-sm py-3 font-serif">
                <CheckCircle2 className="w-5 h-5" />
                <span>Welcome to the THARI salon. An invitation has been dispatched.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex border-b border-[#B89B5E] pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-transparent flex-1 text-sm text-[#F8F5EF] placeholder:text-[#666666] focus:outline-none pr-3"
                />
                <button
                  type="submit"
                  className="text-xs tracking-luxury uppercase text-[#B89B5E] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 font-sans font-medium"
                >
                  JOIN THE EDIT <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5-COLUMN FOOTER LINKS */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Col 1: SHOP */}
          <div>
            <h4 className="text-[11px] tracking-widest-luxury uppercase text-[#B89B5E] mb-5 font-sans">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs text-[#CCCCCC] font-light">
              <li>
                <Link href="/shop?filter=new" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=featured" className="hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop?type=Kanchipuram" className="hover:text-white transition-colors">
                  Kanchipuram Korvai
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: DISCOVER */}
          <div>
            <h4 className="text-[11px] tracking-widest-luxury uppercase text-[#B89B5E] mb-5 font-sans">
              DISCOVER
            </h4>
            <ul className="space-y-3 text-xs text-[#CCCCCC] font-light">
              <li>
                <Link href="/#story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/#weavers" className="hover:text-white transition-colors">
                  Our Weavers
                </Link>
              </li>
              <li>
                <Link href="/#craftsmanship" className="hover:text-white transition-colors">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/#weavers" className="hover:text-white transition-colors">
                  Loom Chronicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: SELL WITH THARI */}
          <div>
            <h4 className="text-[11px] tracking-widest-luxury uppercase text-[#B89B5E] mb-5 font-sans">
              SELL WITH THARI
            </h4>
            <ul className="space-y-3 text-xs text-[#CCCCCC] font-light">
              <li>
                <Link href="/seller" className="hover:text-white transition-colors">
                  Become a Weaver
                </Link>
              </li>
              <li>
                <Link href="/seller/dashboard" className="hover:text-white transition-colors">
                  Seller Portal
                </Link>
              </li>
              <li>
                <Link href="/seller/products/new" className="hover:text-white transition-colors">
                  List a Loom Creation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Marketplace Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: HELP */}
          <div>
            <h4 className="text-[11px] tracking-widest-luxury uppercase text-[#B89B5E] mb-5 font-sans">
              HELP
            </h4>
            <ul className="space-y-3 text-xs text-[#CCCCCC] font-light">
              <li>
                <a href="#help" className="hover:text-white transition-colors">
                  White Glove Shipping
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white transition-colors">
                  Authentication & Returns
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white transition-colors">
                  Silk Care Concierge
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white transition-colors">
                  Contact Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: LEGAL & SOCIAL */}
          <div>
            <h4 className="text-[11px] tracking-widest-luxury uppercase text-[#B89B5E] mb-5 font-sans">
              LEGAL
            </h4>
            <ul className="space-y-3 text-xs text-[#CCCCCC] font-light">
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Heritage Sale
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Artisan Intellectual Property
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BRAND FOOTER */}
        <div className="pt-10 border-t border-[#292929] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#888888]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg tracking-luxury text-[#E5DEF0]">
              THARI
            </span>
            <span className="text-[#666666]">/</span>
            <span className="font-serif text-base text-[#B89B5E]">தறி</span>
            <span className="text-[11px] text-[#AAAAAA] ml-2">
              The Loom. The Weaver. The Saree.
            </span>
          </div>

          <div className="text-center md:text-right text-[11px] text-[#777777]">
            &copy; {new Date().getFullYear()} THARI Inc. All rights reserved. Handcrafted for Indian Silk Heritage.
          </div>
        </div>
      </div>
    </footer>
  );
}
