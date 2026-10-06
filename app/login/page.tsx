'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/types/user';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoLogin = async (role: UserRole) => {
    switchRole(role);
    if (role === 'admin') router.push('/admin');
    else if (role === 'seller') router.push('/seller/dashboard');
    else router.push('/account');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email);
    setIsSubmitting(false);
    if (email.includes('admin')) router.push('/admin');
    else if (email.includes('seller')) router.push('/seller/dashboard');
    else router.push('/account');
  };

  return (
    <div className="bg-[#F8F5EF] min-h-[85vh] flex items-center justify-center py-16 px-6 sm:px-8">
      <div className="max-w-md w-full bg-white border border-[#E8E2D5] p-8 sm:p-10 shadow-sm">
        <div className="text-center mb-8">
          <span className="font-serif text-3xl font-medium tracking-luxury text-[#111111]">
            THARI
          </span>
          <span className="text-[9px] tracking-widest-luxury uppercase text-[#B89B5E] block mt-1">
            THE ART OF INDIAN SILK
          </span>
          <h1 className="font-serif text-xl text-[#111111] mt-4">
            Sign In to Your Account
          </h1>
        </div>

        {/* ONE-CLICK DEMO ACCESS BAR */}
        <div className="mb-8 p-4 bg-[#F8F5EF] border border-[#E8E2D5]">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-2 font-medium">
            QUICK DEMO ACCESS (ONE-CLICK)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('customer')}
              className="px-2 py-2 bg-white border border-[#D5CEBF] hover:border-[#111] text-[11px] text-[#111] transition-colors"
            >
              Patron
            </button>
            <button
              onClick={() => handleDemoLogin('seller')}
              className="px-2 py-2 bg-white border border-[#B9A7D4] hover:bg-[#F2EEF8] text-[11px] text-[#4A2D75] transition-colors font-medium"
            >
              Weaver
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="px-2 py-2 bg-[#111] text-white hover:bg-[#292929] text-[11px] transition-colors font-medium"
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#666666] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@thari.local / seller@thari.local"
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>

          <div>
            <label className="block text-[#666666] uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] py-3.5 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2 mt-4"
          >
            Sign In with Credentials
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#F0ECE1] text-center text-xs text-[#777777]">
          <span>Are you an independent weaver? </span>
          <Link href="/seller" className="text-[#B89B5E] uppercase tracking-wider underline">
            Register your loom
          </Link>
        </div>
      </div>
    </div>
  );
}
