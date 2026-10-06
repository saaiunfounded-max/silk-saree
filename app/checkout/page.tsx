'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building,
  Truck
} from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';
import { Order } from '@/types/order';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, cartShipping, cartTotal, createOrder } = useMarketplace();

  // Form state
  const [formData, setFormData] = useState({
    customerName: 'Ananya Rao',
    customerEmail: 'demo@thari.local',
    phone: '+91 98401 23456',
    address: 'No. 44, Boat Club Road, RA Puram',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600028',
    paymentMethod: 'UPI' as 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="bg-[#F8F5EF] min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl text-[#111111] mb-2">No Items in Checkout</h2>
        <p className="text-xs text-[#666666] mb-6">Your shopping bag is empty. Please select a silk saree to proceed.</p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-[#111111] text-[#F8F5EF] text-xs uppercase tracking-luxury hover:bg-[#B89B5E]"
        >
          Browse Silks
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder(formData);
      setCompletedOrder(order);
      setIsSubmitting(false);
    }, 1200);
  };

  // SUCCESS CONFIRMATION VIEW
  if (completedOrder) {
    return (
      <div className="bg-[#F8F5EF] min-h-screen py-16 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto bg-white border border-[#E8E2D5] p-8 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#E5DEF0] text-[#4A2D75] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-1">
            DEMO CHECKOUT COMPLETE &bull; ORDER RECORDED
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-2">
            THANK YOU FOR SUPPORTING INDIAN WEAVERS
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] max-w-lg mx-auto mb-6">
            Your acquisition has been confirmed. The artisan looms will prepare and dispatch your heritage saree in archival packaging.
          </p>

          <div className="bg-[#F8F5EF] border border-[#E8E2D5] p-6 text-left my-8 space-y-3">
            <div className="flex justify-between text-xs pb-3 border-b border-[#E8E2D5]">
              <span className="text-[#777777] uppercase tracking-wider">Order Reference</span>
              <span className="font-mono font-bold text-[#111111]">{completedOrder.order_number}</span>
            </div>
            <div className="flex justify-between text-xs pb-3 border-b border-[#E8E2D5]">
              <span className="text-[#777777] uppercase tracking-wider">Customer Name</span>
              <span className="text-[#111111]">{completedOrder.customer_name}</span>
            </div>
            <div className="flex justify-between text-xs pb-3 border-b border-[#E8E2D5]">
              <span className="text-[#777777] uppercase tracking-wider">Dispatched To</span>
              <span className="text-[#111111] text-right">
                {completedOrder.shipping_address.address_line_1}, {completedOrder.shipping_address.city},{' '}
                {completedOrder.shipping_address.state} - {completedOrder.shipping_address.postal_code}
              </span>
            </div>
            <div className="flex justify-between text-xs pt-1">
              <span className="text-[#777777] uppercase tracking-wider">Settlement Total</span>
              <span className="font-serif text-lg font-bold text-[#111111]">
                {formatPrice(completedOrder.total)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/account/orders"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              VIEW IN MY ORDERS
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F8F5EF] text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              CONTINUE BROWSING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EF] min-h-screen pb-24">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E2D5] py-8 bg-[#F4EFE5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-1">
            BESPOKE CHECKOUT
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
            DEMO CHECKOUT &bull; HERITAGE SETTLEMENT
          </h1>
          <p className="text-[11px] text-[#777777] mt-1">
            Running in safe Demo Mode. Payment gateways (Razorpay/Stripe) easily pluggable.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: FORM FIELDS (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Contact Information */}
            <div className="bg-white border border-[#E8E2D5] p-6 sm:p-8">
              <h2 className="font-serif text-lg text-[#111111] mb-4 pb-3 border-b border-[#E8E2D5]">
                1. CONTACT INFORMATION
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#666666] uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-[#666666] uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#666666] uppercase tracking-wider mb-1">Phone (for courier delivery coordination)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white border border-[#E8E2D5] p-6 sm:p-8">
              <h2 className="font-serif text-lg text-[#111111] mb-4 pb-3 border-b border-[#E8E2D5]">
                2. SHIPPING DESTINATION
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#666666] uppercase tracking-wider mb-1">Street Address / Estate</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#666666] uppercase tracking-wider mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#666666] uppercase tracking-wider mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#666666] uppercase tracking-wider mb-1">PIN / Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method (Demo abstraction) */}
            <div className="bg-white border border-[#E8E2D5] p-6 sm:p-8">
              <h2 className="font-serif text-lg text-[#111111] mb-4 pb-3 border-b border-[#E8E2D5]">
                3. PAYMENT PREFERENCE (DEMO GATEWAY)
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'UPI', label: 'Instant UPI (Google Pay / PhonePe / Paytm / BHIM)', icon: QrCode },
                  { id: 'Card', label: 'Credit / Debit Card (Visa, Mastercard, Amex)', icon: CreditCard },
                  { id: 'Net Banking', label: 'Net Banking (All Major Indian Scheduled Banks)', icon: Building },
                  { id: 'Cash on Delivery', label: 'Pay on Delivery (Verified Signature Delivery)', icon: Truck },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                        formData.paymentMethod === item.id
                          ? 'border-[#B89B5E] bg-[#FCFAF6]'
                          : 'border-[#E8E2D5] hover:border-[#D5CEBF]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === item.id}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            paymentMethod: item.id as any,
                          })
                        }
                        className="text-[#111111] focus:ring-[#B89B5E]"
                      />
                      <Icon className="w-4 h-4 text-[#B89B5E]" />
                      <span className="text-xs text-[#222222] font-medium">{item.label}</span>
                    </label>
                  );
                })}
              </div>

              <div className="mt-4 p-3 bg-[#F2EEF8] border border-[#B9A7D4]/40 text-[11px] text-[#4A2D75]">
                <strong>Notice:</strong> This is a demo checkout flow. Placing an order will directly record it in your multi-vendor customer and seller order queues without charging real currency.
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#F2EDE2] border border-[#E0D8C7] p-6 sm:p-8 sticky top-28">
              <h3 className="font-serif text-lg text-[#111111] pb-3 border-b border-[#E0D8C7] mb-4">
                BAG SUMMARY ({cart.length} {cart.length === 1 ? 'PIECE' : 'PIECES'})
              </h3>

              <div className="divide-y divide-[#E0D8C7] max-h-72 overflow-y-auto mb-6">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="py-3 flex gap-3 items-center">
                    <div className="relative w-12 h-16 bg-[#E0D8C7] flex-shrink-0">
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs text-[#111111] truncate">{product.name}</h4>
                      <p className="text-[10px] text-[#777777]">
                        {product.silk_type} &bull; Qty: {quantity}
                      </p>
                      <p className="text-[10px] text-[#8E77B3]">Artisan: {product.seller_name}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-xs font-semibold text-[#111111]">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs text-[#555555] py-4 border-t border-b border-[#E0D8C7]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif text-sm text-[#111111] font-medium">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>White Glove Shipping</span>
                  <span className="text-[#4A2D75] font-medium uppercase tracking-wider text-[11px]">
                    COMPLIMENTARY
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Heritage Insurance & Silk Mark</span>
                  <span className="text-[#B89B5E] font-medium">INCLUDED</span>
                </div>
              </div>

              <div className="py-4 flex items-baseline justify-between">
                <span className="font-serif text-lg text-[#111111]">Total Payable</span>
                <span className="font-serif text-2xl font-bold text-[#111111]">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] py-4 px-6 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>AUTHENTICATING DEMO ORDER...</span>
                ) : (
                  <>
                    <span>COMPLETE DEMO PURCHASE</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
