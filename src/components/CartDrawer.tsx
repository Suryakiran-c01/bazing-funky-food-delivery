import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { formatCurrency } from '../utils/pricing';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotals,
    promoCodeInput,
    setPromoCodeInput,
    applyPromo,
    setIsCheckoutOpen,
    setScreen,
  } = useApp();

  const [inputCode, setInputCode] = useState(promoCodeInput || '');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyPromo(inputCode.trim().toUpperCase());
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FFF8E7] h-full border-l-4 border-[#25113D] shadow-[-10px_0px_0px_#25113D] flex flex-col justify-between overflow-hidden">
        {/* Cart Header */}
        <div className="p-4 sm:p-5 bg-white border-b-4 border-[#25113D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD93D] border-2 border-[#25113D] flex items-center justify-center text-xl shadow-[2px_2px_0px_#25113D]">
              🛍️
            </div>
            <div>
              <h2 className="font-display font-black text-xl text-[#25113D]">
                Your Feast Cart
              </h2>
              <span className="text-xs text-gray-500 font-semibold">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} ready to feast
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-display font-bold text-gray-400 hover:text-red-500 uppercase px-2 py-1"
                aria-label="Clear all items in cart"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-[#FFF8E7] border-2 border-[#25113D] flex items-center justify-center text-[#25113D] hover:bg-[#FF4F9A] hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Body */}
        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-28 h-28 bg-[#FFD93D] rounded-full border-4 border-[#25113D] shadow-[6px_6px_0px_#25113D] flex items-center justify-center text-5xl mb-4 rotate-6">
              🍔
            </div>
            <h3 className="font-display font-black text-2xl text-[#25113D] mb-2">
              Your cart is feeling lonely!
            </h3>
            <p className="text-gray-600 text-sm max-w-xs mb-6">
              Feed it something awesome! Our gourmet burgers, crazy loaded fries, and freakshakes are waiting.
            </p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setScreen('menu');
              }}
              className="px-6 py-3 bg-[#FF6B35] text-white font-display font-bold text-sm rounded-2xl pop-btn cursor-pointer"
            >
              Browse The Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Free Delivery Banner Progress */}
            {cartTotals.subtotal < 35 && !cartTotals.promoApplied?.freeDelivery && (
              <div className="p-3 bg-white border-2 border-[#25113D] rounded-2xl shadow-[2px_2px_0px_#25113D] flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-[#FF6B35] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-display font-bold text-[#25113D]">
                    Add ${(35 - cartTotals.subtotal).toFixed(2)} more for FREE Delivery!
                  </p>
                  <div className="w-full bg-gray-100 h-2 rounded-full border border-[#25113D] overflow-hidden mt-1">
                    <div
                      className="bg-[#B8F34A] h-full transition-all"
                      style={{ width: `${Math.min(100, (cartTotals.subtotal / 35) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((cartItem) => {
                const { item, quantity, unitPrice, customizations, cartItemId } = cartItem;

                return (
                  <div
                    key={cartItemId}
                    className="p-3.5 bg-white border-2 border-[#25113D] rounded-2xl shadow-[3px_3px_0px_#25113D] flex items-start gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-[#25113D] flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-bold text-sm text-[#25113D] truncate leading-tight">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(cartItemId)}
                          className="text-gray-400 hover:text-red-500 p-0.5"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div className="text-[11px] text-gray-500 font-medium space-y-0.5 my-1">
                        {customizations.size && (
                          <span className="block text-[#FF6B35] font-bold">
                            Size: {customizations.size.name}
                          </span>
                        )}
                        {customizations.toppings && customizations.toppings.length > 0 && (
                          <span className="block">
                            + {customizations.toppings.map((t) => t.name).join(', ')}
                          </span>
                        )}
                        {customizations.sauces && customizations.sauces.length > 0 && (
                          <span className="block">
                            Dip: {customizations.sauces.map((s) => s.name).join(', ')}
                          </span>
                        )}
                        {customizations.specialInstructions && (
                          <span className="block italic text-gray-400">
                            Note: "{customizations.specialInstructions}"
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-display font-black text-sm text-[#25113D]">
                          {formatCurrency(unitPrice * quantity)}
                        </span>

                        <div className="flex items-center bg-[#FFD93D] border border-[#25113D] rounded-lg overflow-hidden shadow-[1px_1px_0px_#25113D]">
                          <button
                            onClick={() => updateCartQuantity(cartItemId, -1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-[#fad02c]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 text-[#25113D]" />
                          </button>
                          <span className="w-6 text-center font-display font-black text-xs text-[#25113D]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(cartItemId, 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-[#fad02c]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 text-[#25113D]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Box */}
            <div className="p-3.5 bg-white border-2 border-[#25113D] rounded-2xl shadow-[3px_3px_0px_#25113D]">
              <div className="flex items-center gap-1.5 mb-2 font-display font-bold text-xs text-[#25113D]">
                <Tag className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Apply Promo Voucher</span>
              </div>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="BAZINGA50 or FREESHIP"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-1.5 bg-[#FFF8E7] border-2 border-[#25113D] rounded-xl text-xs font-display font-bold uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#FFD93D] text-[#25113D] font-display font-bold text-xs rounded-xl pop-btn cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {cartTotals.promoApplied && (
                <div className="mt-2 text-[11px] font-display font-bold text-green-700 bg-green-50 p-2 rounded-lg border border-green-300 flex items-center justify-between">
                  <span>✓ {cartTotals.promoApplied.description}</span>
                  <button
                    onClick={() => applyPromo('')}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {cartTotals.promoError && (
                <div className="mt-2 text-[11px] font-bold text-red-600 bg-red-50 p-2 rounded-lg border border-red-300">
                  ✕ {cartTotals.promoError}
                </div>
              )}

              {/* Quick Coupon Chips */}
              <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => {
                    setInputCode('BAZINGA50');
                    applyPromo('BAZINGA50');
                  }}
                  className="px-2 py-0.5 rounded-md bg-[#FFF8E7] border border-[#25113D] font-display font-bold text-[#FF6B35] hover:bg-[#FFD93D]"
                >
                  ⚡ BAZINGA50 (50% Off)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputCode('FREESHIP');
                    applyPromo('FREESHIP');
                  }}
                  className="px-2 py-0.5 rounded-md bg-[#FFF8E7] border border-[#25113D] font-display font-bold text-[#25113D] hover:bg-[#FFD93D]"
                >
                  🛵 FREESHIP (Free Delivery)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Bottom Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t-4 border-[#25113D] space-y-3">
            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs font-medium text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#25113D]">{formatCurrency(cartTotals.subtotal)}</span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Promo Discount</span>
                  <span>-{formatCurrency(cartTotals.discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-[#25113D]">
                  {cartTotals.deliveryFee === 0 ? (
                    <span className="text-green-600 font-black">FREE</span>
                  ) : (
                    formatCurrency(cartTotals.deliveryFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Taxes & Cafe Service (8%)</span>
                <span className="font-bold text-[#25113D]">{formatCurrency(cartTotals.taxes)}</span>
              </div>

              <div className="pt-2 border-t-2 border-dashed border-gray-200 flex justify-between text-base font-display font-black text-[#25113D]">
                <span>Total Amount</span>
                <span className="text-lg text-[#FF6B35]">
                  {formatCurrency(cartTotals.total)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-[#FF6B35] text-white font-display font-black text-base rounded-2xl pop-btn flex items-center justify-between px-5 hover:bg-[#ff5517] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </div>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
