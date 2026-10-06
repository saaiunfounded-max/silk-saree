'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, switchRole } = useAuth();

  const navItems = [
    { label: 'OVERVIEW', href: '/account', icon: User },
    { label: 'MY ORDERS', href: '/account/orders', icon: Package },
    { label: 'WISHLIST', href: '/account/wishlist', icon: Heart },
    { label: 'ADDRESSES & PROFILE', href: '/account/profile', icon: MapPin },
  ];

  return (
    <div className="bg-[#F8F5EF] min-h-screen pb-24">
      {/* Top Banner */}
      <div className="bg-[#181615] text-[#F8F5EF] py-12 px-6 sm:px-8 border-b border-[#292929]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-1">
              PATRON ACCOUNT
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl text-[#F8F5EF]">
              Welcome, {user?.name || 'Patron'}
            </h1>
            <p className="text-xs text-[#999999] mt-1">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchRole('seller')}
              className="text-[11px] uppercase tracking-luxury text-[#B9A7D4] border border-[#B9A7D4]/40 px-3 py-1.5 hover:bg-[#B9A7D4]/20"
            >
              Switch to Weaver View &rarr;
            </button>
            <button
              onClick={logout}
              className="text-[11px] uppercase tracking-luxury text-[#AAAAAA] hover:text-white flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="border-b border-[#E8E2D5] bg-[#F2EDE2]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex overflow-x-auto space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-4 text-xs tracking-luxury uppercase flex items-center gap-2 border-b-2 whitespace-nowrap transition-all font-medium ${
                  isActive
                    ? 'border-[#B89B5E] text-[#111111]'
                    : 'border-transparent text-[#666666] hover:text-black hover:border-[#D5CEBF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10">{children}</div>
    </div>
  );
}
