'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Check } from 'lucide-react';

export default function AccountProfilePage() {
  const { user } = useAuth();
  const [savedNotice, setSavedNotice] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || 'Ananya Rao',
    email: user?.email || 'demo@thari.local',
    phone: user?.phone || '+91 98401 23456',
    address: 'No. 44, Boat Club Road, RA Puram',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600028',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="pb-4 border-b border-[#E8E2D5]">
        <h2 className="font-serif text-2xl text-[#111111]">Profile & Shipping Address</h2>
        <p className="text-xs text-[#666666] mt-0.5">
          Manage your personal details and primary delivery address.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3 bg-[#E5DEF0] text-[#4A2D75] text-xs flex items-center gap-2">
          <Check className="w-4 h-4" /> Profile credentials updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-[#E8E2D5] p-6 sm:p-8 space-y-6">
        <h3 className="font-serif text-lg text-[#111111]">Patron Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">Email</label>
            <input
              type="email"
              disabled
              value={profile.email}
              className="w-full border border-[#D5CEBF] bg-[#F8F5EF] p-3 text-sm text-[#777]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[#666] uppercase tracking-wider mb-1">Mobile Contact</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
        </div>

        <h3 className="font-serif text-lg text-[#111111] pt-6 border-t border-[#E8E2D5]">
          Primary Delivery Destination
        </h3>
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-[#666] uppercase tracking-wider mb-1">Street Address</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#666] uppercase tracking-wider mb-1">City</label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-[#666] uppercase tracking-wider mb-1">State</label>
              <input
                type="text"
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-[#666] uppercase tracking-wider mb-1">Postal Code</label>
              <input
                type="text"
                value={profile.postalCode}
                onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
