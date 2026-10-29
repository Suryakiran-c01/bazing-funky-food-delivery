import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle2,
  Phone,
  Sparkles,
  Zap,
  ShieldCheck,
  Building,
  Home,
  Briefcase,
} from 'lucide-react';
import { formatCurrency } from '../utils/pricing';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotals,
    selectedAddress,
    setSelectedAddress,
    addresses,
    user,
    priorityDelivery,
    setPriorityDelivery,
    placeOrder,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<string>('UPI (Google Pay)');
  const [deliveryInstruction, setDeliveryInstruction] = useState<string>('Leave at door & ring bell');
  const [deliveryTiming, setDeliveryTiming] = useState<'standard' | 'express'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(paymentMethod, deliveryInstruction);
      setIsSubmitting(false);
    }, 700);
  };

  const getAddressIcon = (label: string) => {
    switch (label) {
      case 'Campus Dorm':
        return <Building className="w-4 h-4 text-[#FF6B35]" />;
      case 'Home':
        return <Home className="w-4 h-4 text-[#FFD93D]" />;
      case 'Work':
        return <Briefcase className="w-4 h-4 text-[#FF4F9A]" />;
      default:
        return <MapPin className="w-4 h-4 text-[#B8F34A]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-4 border-[#25113D] rounded-3xl shadow-[10px_10px_0px_#25113D] my-8 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#FF6B35] text-white border-b-4 border-[#25113D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD93D] border-2 border-[#25113D] flex items-center justify-center text-xl text-[#25113D]">
              ⚡
            </div>
            <div>
              <h2 className="font-bungee text-2xl tracking-tight text-white drop-shadow-[2px_2px_0px_#25113D]">
                Checkout & Confirm
              </h2>
              <span className="text-xs font-display font-bold text-[#FFF8E7]">
                Fast, Funky & Fresh Delivery to your spot
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-9 h-9 rounded-full bg-white border-2 border-[#25113D] flex items-center justify-center text-[#25113D] hover:bg-[#FF4F9A] hover:text-white transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePlaceOrderSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Section 1: Delivery Address */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-black text-base text-[#25113D] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B35]" />
                1. Delivery Location
              </h3>
              <span className="text-xs font-bold text-gray-500">
                {addresses.length} saved spots
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-3.5 rounded-2xl border-2 border-[#25113D] cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FFF8E7] shadow-[3px_3px_0px_#25113D] -translate-y-0.5'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-display font-bold text-xs text-[#25113D]">
                        {getAddressIcon(addr.label)}
                        <span>{addr.label}</span>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-black bg-[#B8F34A] text-[#25113D] px-2 py-0.5 rounded-full border border-[#25113D]">
                          DELIVER HERE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{addr.street}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Speed & Delivery Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Speed Options */}
            <div>
              <h3 className="font-display font-black text-sm text-[#25113D] mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FF6B35]" />
                2. Delivery Speed
              </h3>
              <div className="space-y-2">
                <label
                  onClick={() => {
                    setDeliveryTiming('standard');
                    setPriorityDelivery(false);
                  }}
                  className={`p-3 rounded-2xl border-2 border-[#25113D] flex items-center justify-between cursor-pointer ${
                    deliveryTiming === 'standard'
                      ? 'bg-[#FFD93D] shadow-[2px_2px_0px_#25113D]'
                      : 'bg-white'
                  }`}
                >
                  <div>
                    <span className="font-display font-bold text-xs text-[#25113D] block">
                      Standard Rush (25-35 mins)
                    </span>
                    <span className="text-[11px] text-gray-600 font-medium">
                      Regular kitchen priority
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="deliveryTiming"
                    checked={deliveryTiming === 'standard'}
                    onChange={() => {}}
                    className="accent-[#FF6B35]"
                  />
                </label>

                <label
                  onClick={() => {
                    setDeliveryTiming('express');
                    setPriorityDelivery(true);
                  }}
                  className={`p-3 rounded-2xl border-2 border-[#25113D] flex items-center justify-between cursor-pointer ${
                    deliveryTiming === 'express'
                      ? 'bg-[#FFD93D] shadow-[2px_2px_0px_#25113D]'
                      : 'bg-white'
                  }`}
                >
                  <div>
                    <span className="font-display font-bold text-xs text-[#25113D] flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
                      Express Rocket (15-20 mins)
                    </span>
                    <span className="text-[11px] text-gray-600 font-medium">
                      First in grill queue (+$1.99)
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="deliveryTiming"
                    checked={deliveryTiming === 'express'}
                    onChange={() => {}}
                    className="accent-[#FF6B35]"
                  />
                </label>
              </div>
            </div>

            {/* Rider Instructions */}
            <div>
              <h3 className="font-display font-black text-sm text-[#25113D] mb-2 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#FF6B35]" />
                3. Rider Instructions
              </h3>
              <div className="space-y-1.5">
                {[
                  'Leave at door & ring bell',
                  'Meet in Campus Lobby / Gate',
                  'Call on arrival (Dorm quiet hours)',
                  'Hand directly to me',
                ].map((inst) => (
                  <button
                    key={inst}
                    type="button"
                    onClick={() => setDeliveryInstruction(inst)}
                    className={`w-full py-2 px-3 text-left rounded-xl border-2 border-[#25113D] text-xs font-display font-bold transition-all ${
                      deliveryInstruction === inst
                        ? 'bg-[#B8F34A] text-[#25113D] shadow-[2px_2px_0px_#25113D]'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {deliveryInstruction === inst ? '✓ ' : ''}{inst}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Payment Methods */}
          <div>
            <h3 className="font-display font-black text-base text-[#25113D] mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#FF6B35]" />
              4. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'UPI (Google Pay)',
                  title: 'UPI (Google Pay / PhonePe)',
                  desc: 'Instant 1-click contactless checkout',
                  badge: 'FASTEST',
                  icon: '⚡',
                },
                {
                  id: 'Credit/Debit Card',
                  title: 'Credit / Debit Card',
                  desc: 'Visa, Mastercard, Amex, Apple Pay',
                  badge: 'SAVED',
                  icon: '💳',
                },
                {
                  id: 'BAZINGA Wallet',
                  title: `BAZINGA Coins (${user.bazingaCoins} available)`,
                  desc: 'Redeem points directly on this order',
                  badge: 'REWARDS',
                  icon: '🪙',
                },
                {
                  id: 'Cash On Delivery',
                  title: 'Cash on Delivery (COD)',
                  desc: 'Pay cash or UPI scan at your door',
                  badge: 'EASY',
                  icon: '💵',
                },
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3.5 rounded-2xl border-2 border-[#25113D] cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#FFD93D] shadow-[3px_3px_0px_#25113D] -translate-y-0.5'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-xs text-[#25113D]">
                          {method.title}
                        </span>
                        <span className="text-[9px] font-black px-1.5 py-0.5 bg-white border border-[#25113D] rounded-md text-[#25113D]">
                          {method.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 font-medium mt-0.5">{method.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 5: Order Items Preview */}
          <div className="p-4 bg-[#FFF8E7] border-2 border-[#25113D] rounded-2xl">
            <span className="text-xs font-display font-bold uppercase text-gray-500 block mb-2">
              Order Items ({cart.length})
            </span>
            <div className="space-y-1 text-xs font-medium text-gray-700">
              {cart.map((c) => (
                <div key={c.cartItemId} className="flex justify-between">
                  <span className="truncate">
                    {c.quantity}x {c.item.name} {c.customizations.size ? `(${c.customizations.size.name})` : ''}
                  </span>
                  <span className="font-bold text-[#25113D]">
                    {formatCurrency(c.unitPrice * c.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t-2 border-dashed border-[#25113D]/20 flex items-center justify-between font-display font-black text-sm text-[#25113D]">
              <span>Final Bill to Pay:</span>
              <span className="text-lg text-[#FF6B35]">
                {formatCurrency(cartTotals.total)}
              </span>
            </div>
          </div>

          {/* Place Order CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#FF6B35] text-white font-display font-black text-lg rounded-2xl pop-btn flex items-center justify-center gap-2 hover:bg-[#ff5517] cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Locking in Your Feast...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#FFD93D]" />
                  <span>Place Order • {formatCurrency(cartTotals.total)}</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-gray-500 font-medium mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              100% Secure & Freshness Guaranteed by BAZINGA
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
