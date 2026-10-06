'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function SellerSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="pb-4 border-b border-[#E8E2D5]">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
          Guild Bank & Payout Settings
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Disbursement account settings for automatic NEFT/RTGS settlements.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-[#E5DEF0] text-[#4A2D75] text-xs flex items-center gap-2">
          <Check className="w-4 h-4" /> Settlement credentials updated.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-[#E8E2D5] p-6 sm:p-8 space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-[#666] uppercase tracking-wider mb-1">Beneficiary Name (As on Bank Account)</label>
            <input
              type="text"
              defaultValue="Sundaram Master Silk Handloom Cooperative"
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">Bank Name</label>
            <input
              type="text"
              defaultValue="State Bank of India — Kanchipuram Main"
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">Bank IFSC Code</label>
            <input
              type="text"
              defaultValue="SBIN0000854"
              className="w-full border border-[#D5CEBF] p-3 text-sm font-mono focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[#666] uppercase tracking-wider mb-1">Account Number</label>
            <input
              type="password"
              defaultValue="309876543210"
              className="w-full border border-[#D5CEBF] p-3 text-sm font-mono focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          Save Payout Settings
        </button>
      </form>
    </div>
  );
}
