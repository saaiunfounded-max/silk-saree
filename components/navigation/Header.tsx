'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, Shield, Sparkles } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const pathname = usePathname();
  const { cartCount, wishlist } = useMarketplace();
  const { user, role, switchRole } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'NEW ARRIVALS', href: '/shop?filter=new' },
    { label: 'SILK SAREES', href: '/shop' },
    { label: 'COLLECTIONS', href: '/#collections' },
    { label: 'WEAVERS', href: '/#weavers' },
    { label: 'OUR STORY', href: '/#story' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F5EF]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D5] py-3'
            : 'bg-[#F8F5EF] border-b border-[#EFE9DC] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* MOBILE: Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-[#111111] hover:text-[#B89B5E] transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-[#111111] hover:text-[#B89B5E] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* BRAND WORDMARK (LEFT on Desktop, CENTER on Mobile) */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col group">
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-luxury text-[#111111] group-hover:text-[#B89B5E] transition-colors">
                THARI
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest-luxury uppercase text-[#B89B5E] hidden sm:block -mt-1 font-sans">
                THE ART OF INDIAN SILK
              </span>
            </Link>
          </div>

          {/* DESKTOP CENTER NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs tracking-luxury text-[#292929] hover:text-[#B89B5E] transition-colors font-sans py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B89B5E] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTION ICONS */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search (Desktop) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs tracking-wider text-[#292929] hover:text-[#B89B5E] transition-colors"
              aria-label="Search THARI catalog"
            >
              <Search className="w-4 h-4" />
              <span className="text-[11px] font-sans">SEARCH</span>
            </button>

            {/* Quick Demo Role Switcher Badge */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className={`px-2.5 py-1 text-[10px] tracking-wider uppercase rounded-full border transition-all flex items-center gap-1 ${
                  role === 'admin'
                    ? 'bg-[#111111] text-[#F8F5EF] border-[#111111]'
                    : role === 'seller'
                    ? 'bg-[#B9A7D4]/30 text-[#4A2D75] border-[#B9A7D4]'
                    : 'bg-[#B89B5E]/20 text-[#6B521D] border-[#B89B5E]'
                }`}
                title="Switch demo preview role"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span className="font-medium">{role}</span>
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-[#FFFFFF] border border-[#E8E2D5] shadow-lg rounded-none py-2 z-50 text-left"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-[#F0ECE1] text-[10px] text-[#888888] uppercase tracking-wider">
                    Demo Mode Role Switcher
                  </div>
                  <button
                    onClick={() => {
                      switchRole('customer');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#111111] hover:bg-[#F8F5EF] flex items-center justify-between"
                  >
                    <span>Customer View</span>
                    {role === 'customer' && <span className="text-[#B89B5E]">✓</span>}
                  </button>
                  <Link
                    href="/seller/dashboard"
                    onClick={() => {
                      switchRole('seller');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#111111] hover:bg-[#F8F5EF] flex items-center justify-between"
                  >
                    <span>Weaver / Seller View</span>
                    {role === 'seller' && <span className="text-[#B89B5E]">✓</span>}
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => {
                      switchRole('admin');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#111111] hover:bg-[#F8F5EF] flex items-center justify-between"
                  >
                    <span>Admin Portal</span>
                    {role === 'admin' && <span className="text-[#B89B5E]">✓</span>}
                  </Link>
                </div>
              )}
            </div>

            {/* Account Link */}
            <Link
              href={role === 'admin' ? '/admin' : role === 'seller' ? '/seller/dashboard' : '/account'}
              className="p-1.5 text-[#292929] hover:text-[#B89B5E] transition-colors"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/account/wishlist"
              className="p-1.5 text-[#292929] hover:text-[#B89B5E] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B89B5E] text-[#111111] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag / Cart Link */}
            <Link
              href="/cart"
              className="p-1.5 text-[#292929] hover:text-[#B89B5E] transition-colors relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-[#F8F5EF] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-[#F8F5EF] h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D5]">
              <span className="font-serif text-2xl font-medium tracking-luxury">
                THARI
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#292929] hover:text-[#111111]"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="py-6 flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-serif text-lg tracking-luxury text-[#111111] hover:text-[#B89B5E]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-[#E8E2D5] space-y-4">
              <div className="text-[10px] uppercase tracking-luxury text-[#B89B5E]">
                MARKETPLACE PORTALS
              </div>
              <Link
                href="/seller"
                className="block text-xs uppercase tracking-luxury text-[#292929] hover:text-[#B89B5E]"
              >
                Sell with THARI (Weaver Hub)
              </Link>
              <Link
                href="/admin"
                className="block text-xs uppercase tracking-luxury text-[#292929] hover:text-[#B89B5E]"
              >
                Admin Marketplace Console
              </Link>
              <Link
                href="/account"
                className="block text-xs uppercase tracking-luxury text-[#292929] hover:text-[#B89B5E]"
              >
                Customer Profile & Orders
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
