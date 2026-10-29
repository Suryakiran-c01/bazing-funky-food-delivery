import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ShoppingBag,
  MapPin,
  Heart,
  User,
  Zap,
  Flame,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { AddressPickerModal } from './AddressPickerModal';

export const Navbar: React.FC = () => {
  const {
    screen,
    setScreen,
    selectedAddress,
    cartCount,
    cartTotals,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    user,
    setShowAuthModal,
    favorites,
  } = useApp();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF8E7] border-b-4 border-[#25113D] shadow-[0px_4px_0px_#25113D]">
        {/* Top Mini Marquee / Notification Bar */}
        <div className="bg-[#25113D] text-[#FFD93D] py-1 px-4 text-xs font-display font-bold flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>FLASH DEAL: Use code BAZINGA50 for 50% OFF! Free delivery over $35 🍔</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white">
            <span className="flex items-center gap-1 text-[#B8F34A]">
              <Zap className="w-3 h-3" />
              Kitchen Live: Open till 3:00 AM
            </span>
            <span>•</span>
            <button
              onClick={() => setScreen('profile')}
              className="text-[#FFD93D] hover:underline cursor-pointer"
            >
              🪙 {user.bazingaCoins} Coins
            </button>
          </div>
        </div>

        {/* Main Navbar Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setScreen('home')}
              className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
              aria-label="BAZINGA home"
            >
              <div className="w-11 h-11 bg-[#FF6B35] rounded-2xl border-2 border-[#25113D] shadow-[3px_3px_0px_#25113D] flex items-center justify-center text-2xl transform group-hover:rotate-6 transition-transform">
                🍔
              </div>
              <div>
                <span className="font-bungee text-2xl sm:text-3xl tracking-tight text-[#FF6B35] drop-shadow-[2px_2px_0px_#25113D]">
                  BAZINGA
                </span>
                <span className="block text-[10px] font-display font-extrabold uppercase text-[#25113D] -mt-1 tracking-wider">
                  Bite Into The Fun!
                </span>
              </div>
            </button>

            {/* Location Selector Button */}
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-[#25113D] rounded-xl shadow-[2px_2px_0px_#25113D] hover:bg-[#FFF8E7] transition-colors cursor-pointer text-left"
              aria-label="Change delivery location"
            >
              <div className="w-6 h-6 rounded-lg bg-[#FFD93D] border border-[#25113D] flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-[#25113D]" />
              </div>
              <div className="max-w-[140px] truncate">
                <span className="block text-[10px] font-display font-extrabold text-gray-500 uppercase leading-none">
                  Deliver to
                </span>
                <span className="text-xs font-display font-bold text-[#25113D] truncate block">
                  {selectedAddress.label} · {selectedAddress.street.split(',')[0]}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#25113D]" />
            </button>
          </div>

          {/* Search Bar (Center) */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#25113D]" />
              <input
                type="text"
                placeholder="Craving something awesome? Try 'burger', 'truffle', 'fries'..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (screen !== 'menu' && e.target.value.trim().length > 0) {
                    setScreen('menu');
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-white border-2 border-[#25113D] rounded-2xl text-xs sm:text-sm font-medium shadow-[3px_3px_0px_#25113D] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-[#25113D] font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 font-display font-bold text-sm">
            <button
              onClick={() => setScreen('home')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                screen === 'home'
                  ? 'bg-[#FF6B35] text-white border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
                  : 'text-[#25113D] hover:bg-white/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setScreen('menu')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                screen === 'menu'
                  ? 'bg-[#FF6B35] text-white border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
                  : 'text-[#25113D] hover:bg-white/60'
              }`}
            >
              Menu & Combos
            </button>
            <button
              onClick={() => setScreen('orders')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                screen === 'orders'
                  ? 'bg-[#FF6B35] text-white border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
                  : 'text-[#25113D] hover:bg-white/60'
              }`}
            >
              Track Order
            </button>
            <button
              onClick={() => setScreen('profile')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                screen === 'profile'
                  ? 'bg-[#FF6B35] text-white border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
                  : 'text-[#25113D] hover:bg-white/60'
              }`}
            >
              Profile
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist / Favorites count */}
            <button
              onClick={() => {
                setScreen('profile');
              }}
              className="p-2 sm:px-3 sm:py-2 bg-white border-2 border-[#25113D] rounded-xl shadow-[2px_2px_0px_#25113D] hover:bg-[#FFF8E7] transition-all flex items-center gap-1.5 cursor-pointer relative"
              aria-label={`Favorites, ${favorites.length} saved`}
            >
              <Heart className="w-4 h-4 text-[#FF4F9A] fill-[#FF4F9A]" />
              <span className="hidden sm:inline font-display font-bold text-xs text-[#25113D]">
                {favorites.length}
              </span>
            </button>

            {/* Profile Avatar or Login */}
            {user.isLoggedIn ? (
              <button
                onClick={() => setScreen('profile')}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 bg-[#FFD93D] border-2 border-[#25113D] rounded-xl shadow-[2px_2px_0px_#25113D] hover:translate-y-[-1px] transition-all cursor-pointer"
                aria-label="User profile"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-lg object-cover border border-[#25113D]"
                />
                <span className="hidden sm:inline font-display font-bold text-xs text-[#25113D] max-w-[80px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-1.5 bg-[#FFD93D] border-2 border-[#25113D] rounded-xl font-display font-bold text-xs text-[#25113D] shadow-[2px_2px_0px_#25113D] cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Floating / Header Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 sm:px-4 py-2 bg-[#FF6B35] text-white border-2 border-[#25113D] rounded-2xl shadow-[3px_3px_0px_#25113D] hover:bg-[#ff5517] transition-all flex items-center gap-2 cursor-pointer pop-btn"
              aria-label={`Open shopping cart with ${cartCount} items, total $${cartTotals.total.toFixed(2)}`}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-display font-extrabold uppercase text-[#FFD93D]">
                  Cart
                </span>
                <span className="font-display font-black text-sm">
                  ${cartTotals.total.toFixed(2)}
                </span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFD93D] text-[#25113D] border-2 border-[#25113D] rounded-full flex items-center justify-center font-display font-black text-xs shadow-[2px_2px_0px_#25113D] animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar & Location Row */}
        <div className="px-4 pb-2.5 flex flex-col gap-2 md:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="flex-1 flex items-center justify-between px-3 py-1.5 bg-white border-2 border-[#25113D] rounded-xl text-xs font-display font-bold text-[#25113D] shadow-[2px_2px_0px_#25113D]"
            >
              <span className="truncate flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B35] flex-shrink-0" />
                <span className="truncate">{selectedAddress.label}: {selectedAddress.street}</span>
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1 flex-shrink-0" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#25113D]" />
            <input
              type="text"
              placeholder="Craving something awesome?"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (screen !== 'menu' && e.target.value.trim().length > 0) {
                  setScreen('menu');
                }
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-white border-2 border-[#25113D] rounded-xl text-xs font-medium shadow-[2px_2px_0px_#25113D] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
          </div>
        </div>
      </header>

      <AddressPickerModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </>
  );
};
