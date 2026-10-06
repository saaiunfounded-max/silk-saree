'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { INITIAL_SELLERS } from '@/lib/sellers';

export default function SellerProfilePage() {
  const seller = INITIAL_SELLERS[0];
  const [savedNotice, setSavedNotice] = useState(false);

  const [formData, setFormData] = useState({
    business_name: seller.business_name,
    display_name: seller.display_name,
    location: seller.location,
    region: seller.region,
    years_of_experience: seller.years_of_experience,
    craft_specialization: seller.craft_specialization,
    bio: seller.bio,
    full_story: seller.full_story,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="pb-4 border-b border-[#E8E2D5]">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
          Weaver Atelier Public Profile
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          This biography and craft lineage is showcased directly to patrons on your public profile.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3 bg-[#E5DEF0] text-[#4A2D75] text-xs flex items-center gap-2">
          <Check className="w-4 h-4" /> Guild profile updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-[#E8E2D5] p-6 sm:p-8 space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">Guild / Business Name</label>
            <input
              type="text"
              value={formData.business_name}
              onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">Master Weaver Title</label>
            <input
              type="text"
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">City / Weaving Hub</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">Years of Craft Tradition</label>
            <input
              type="number"
              value={formData.years_of_experience}
              onChange={(e) => setFormData({ ...formData, years_of_experience: Number(e.target.value) })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[#666] uppercase tracking-wider mb-1">Craft Specialization</label>
            <input
              type="text"
              value={formData.craft_specialization}
              onChange={(e) => setFormData({ ...formData, craft_specialization: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[#666] uppercase tracking-wider mb-1">Concise Atelier Bio</label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[#666] uppercase tracking-wider mb-1">Full Chronicle & Ancestral Loom History</label>
            <textarea
              rows={4}
              value={formData.full_story}
              onChange={(e) => setFormData({ ...formData, full_story: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          Update Public Weaver Chronicle
        </button>
      </form>
    </div>
  );
}
