'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  Package,
  Layers,
  Settings,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useMarketplace } from '@/lib/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { switchRole } = useAuth();
  const { products } = useMarketplace();

  const pendingCount = products.filter((p) => p.approval_status === 'pending').length;

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    {
      label: 'Approvals',
      href: '/admin/approvals',
      icon: ShieldCheck,
      badge: pendingCount > 0 ? pendingCount : undefined,
    },
    { label: 'Products', href: '/admin/products', icon: Layers },
    { label: 'Sellers & Guilds', href: '/admin/sellers', icon: Users },
    { label: 'Marketplace Orders', href: '/admin/orders', icon: Package },
    { label: 'Operations Config', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="bg-[#141414] text-[#F8F5EF] min-h-screen flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="border-b border-[#292929] bg-[#111111] px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs uppercase tracking-luxury text-[#B89B5E] hover:underline flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Storefront
            </Link>
            <span className="text-[#333333]">|</span>
            <span className="font-serif text-lg tracking-luxury text-[#E5DEF0]">
              THARI &bull; Marketplace Operations Console
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
              Super Admin Mode
            </span>
            <button
              onClick={() => switchRole('customer')}
              className="text-[10px] uppercase tracking-wider text-[#AAAAAA] hover:text-white"
            >
              Switch to Customer &rarr;
            </button>
          </div>
        </div>
      </header>

      {/* Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Admin Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="bg-[#1C1C1C] border border-[#2E2E2E] p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-2.5 text-xs tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#B89B5E] text-[#111111] font-medium'
                      : 'text-[#AAAAAA] hover:bg-[#252525] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 bg-rose-600 text-white text-[10px] rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 p-4 bg-[#1C1C1C] border border-[#2E2E2E] text-xs text-[#888888] space-y-2">
            <div className="text-[10px] tracking-wider text-[#B89B5E] uppercase font-semibold">
              Marketplace Health
            </div>
            <div className="flex justify-between">
              <span>DB Relational Schema:</span>
              <span className="text-emerald-400">Compliant</span>
            </div>
            <div className="flex justify-between">
              <span>Multi-Vendor RLS:</span>
              <span className="text-emerald-400">Enabled</span>
            </div>
            <div className="flex justify-between">
              <span>Loom Settlement Rate:</span>
              <span className="text-white">90% Net</span>
            </div>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
