'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="pb-4 border-b border-[#2E2E2E]">
        <h1 className="font-serif text-2xl sm:text-3xl text-white">
          Marketplace Operations Configuration
        </h1>
        <p className="text-xs text-[#888888] mt-0.5">
          Platform commission parameters, Silk Mark verification rules, and automated settlement cycles.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-[#E5DEF0] text-[#4A2D75] text-xs flex items-center gap-2">
          <Check className="w-4 h-4" /> Platform settings updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#1C1C1C] border border-[#2E2E2E] p-6 sm:p-8 space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#AAAAAA] uppercase tracking-wider mb-1">
              Marketplace Commission Rate (%)
            </label>
            <input
              type="number"
              defaultValue={10}
              className="w-full bg-[#242424] border border-[#3E3E3E] text-white p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>

          <div>
            <label className="block text-[#AAAAAA] uppercase tracking-wider mb-1">
              Payout Disbursement Schedule
            </label>
            <select
              defaultValue="t+3"
              className="w-full bg-[#242424] border border-[#3E3E3E] text-white p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            >
              <option value="instant">Immediate upon Delivery Confirmation</option>
              <option value="t+3">T + 3 Days (Post Return Window Inspection)</option>
              <option value="weekly">Weekly Friday Consolidation</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[#AAAAAA] uppercase tracking-wider mb-1">
              Product Moderation Requirement
            </label>
            <select
              defaultValue="strict"
              className="w-full bg-[#242424] border border-[#3E3E3E] text-white p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            >
              <option value="strict">Strict (Every loom product requires admin sign-off)</option>
              <option value="trusted">Fast-Track for Master Weavers with 30+ Completed Orders</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-[#B89B5E] text-[#111111] hover:bg-[#D4BC84] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          Save Platform Configuration
        </button>
      </form>
    </div>
  );
}
