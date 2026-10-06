'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  PackageCheck,
  Archive,
  UserCheck,
  Settings,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, switchRole } = useAuth();

  // If on the public landing page (/seller), render children without the dashboard layout
  if (pathname === '/seller') {
    return <>{children}</>;
  }

  const sidebarLinks = [
    { label: 'Overview', href: '/seller/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/seller/products', icon: Layers },
    { label: 'Add Product', href: '/seller/products/new', icon: PlusCircle },
    { label: 'Orders', href: '/seller/orders', icon: PackageCheck },
    { label: 'Inventory', href: '/seller/inventory', icon: Archive },
    { label: 'Weaver Profile', href: '/seller/profile', icon: UserCheck },
    { label: 'Guild Settings', href: '/seller/settings', icon: Settings },
  ];

  return (
    <div className="bg-[#F8F5EF] min-h-screen flex flex-col">
      {/* Sub-header for Seller Portal */}
      <div className="bg-[#191816] text-[#F8F5EF] border-b border-[#2C2925] px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs uppercase tracking-luxury text-[#B89B5E] hover:underline flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
            </Link>
            <span className="text-[#555] text-xs">|</span>
            <span className="text-xs font-serif text-[#E5DEF0]">
              Atelier: Sundaram Silk Guild (Kanchipuram)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-[#B9A7D4]/30 text-[#E5DEF0] rounded">
              Seller Mode
            </span>
            <button
              onClick={() => switchRole('admin')}
              className="text-[10px] uppercase tracking-wider text-[#B89B5E] hover:underline"
            >
              Switch to Admin &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border border-[#E8E2D5] p-5 mb-6">
            <span className="text-[9px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-1">
              AUTHENTICATED WEAVER
            </span>
            <h3 className="font-serif text-lg text-[#111111] leading-tight">
              Sundaram Silk Guild
            </h3>
            <p className="text-xs text-[#777777] mt-0.5">Kanchipuram, Tamil Nadu</p>
            <div className="mt-3 pt-3 border-t border-[#F0ECE1] flex justify-between text-xs text-[#666666]">
              <span>Status</span>
              <span className="text-emerald-700 font-medium">Active Guild</span>
            </div>
          </div>

          <nav className="bg-white border border-[#E8E2D5] p-2 space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs tracking-wider transition-colors font-sans ${
                    isActive
                      ? 'bg-[#111111] text-[#F8F5EF]'
                      : 'text-[#444444] hover:bg-[#F8F5EF] hover:text-[#111111]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* MAIN SELLER BODY */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
