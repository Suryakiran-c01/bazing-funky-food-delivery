import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, Flame, Zap, Award, Star } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setScreen, setCategoryFilter } = useApp();

  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl bg-[#FF6B35] border-4 border-[#25113D] shadow-[8px_8px_0px_#25113D]">
      {/* Background Pop Pattern */}
      <div className="absolute inset-0 comic-dots opacity-20 pointer-events-none" />

      {/* Decorative Starburst Badges */}
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#FFD93D] rounded-full border-3 border-[#25113D] shadow-[4px_4px_0px_#25113D] flex items-center justify-center rotate-12 hidden sm:flex">
        <span className="font-display font-black text-xs text-[#25113D] text-center uppercase leading-tight pt-2 pr-2">
          ⚡ 50% OFF<br />FIRST BITE
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 sm:py-12 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Column: Headlines & CTAs */}
        <div className="flex-1 text-center lg:text-left">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFD93D] text-[#25113D] border-2 border-[#25113D] rounded-full text-xs font-display font-extrabold uppercase tracking-wider mb-4 shadow-[3px_3px_0px_#25113D] transform -rotate-1">
            <Flame className="w-4 h-4 text-[#FF6B35]" />
            <span>Late Night Cafe & Delivery • Open till 3 AM</span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="font-bungee text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-[4px_4px_0px_#25113D] leading-none mb-3">
            GOOD FOOD.<br />
            GOOD MOOD.<br />
            <span className="text-[#FFD93D] drop-shadow-[4px_4px_0px_#25113D]">BAZINGA!</span>
          </h1>

          <p className="font-display font-bold text-base sm:text-xl text-[#FFF8E7] max-w-xl mb-6 drop-shadow-[1px_1px_0px_#25113D]">
            Insanely crunchy smashed burgers, cheesy wood-fire style pizzas, freakshakes and monster fries dripping with loaded sauces.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <button
              onClick={() => {
                setCategoryFilter('All');
                setScreen('menu');
              }}
              className="px-7 py-3.5 bg-[#FFD93D] text-[#25113D] font-display font-black text-base sm:text-lg rounded-2xl pop-btn flex items-center gap-2 hover:bg-[#fad02c] cursor-pointer"
            >
              <span>Order Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setCategoryFilter('Burgers');
                setScreen('menu');
              }}
              className="px-6 py-3.5 bg-white text-[#25113D] font-display font-bold text-base rounded-2xl pop-btn flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Explore Burgers</span>
            </button>
          </div>

          {/* Social Proof Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-display font-bold text-white drop-shadow-[1px_1px_0px_#25113D]">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#B8F34A] text-[#25113D] flex items-center justify-center text-[10px] font-black">
                ✓
              </div>
              <span>25 Mins Average Delivery</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
              <span>4.9 / 5 Rating (3,500+ Campus Orders)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Pop-Art Badges */}
        <div className="relative flex-shrink-0 w-full max-w-md lg:max-w-lg">
          {/* Main Visual Box */}
          <div className="relative mx-auto rounded-3xl overflow-hidden border-4 border-[#25113D] shadow-[8px_8px_0px_#25113D] bg-white group">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
              alt="BAZINGA Signature Monster Burger"
              className="w-full h-72 sm:h-84 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay banner at bottom */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white flex items-center justify-between">
              <div>
                <span className="font-display font-black text-lg text-[#FFD93D]">
                  The Big Kahuna Burger
                </span>
                <span className="block text-xs text-white/90 font-medium">
                  Double Angus Smash + Candied Bacon
                </span>
              </div>
              <span className="px-3 py-1 bg-[#FF6B35] border-2 border-white rounded-xl font-display font-black text-base shadow-[2px_2px_0px_#25113D]">
                $11.99
              </span>
            </div>
          </div>

          {/* Floating Sticker 1 */}
          <div className="absolute -top-4 -left-4 bg-[#B8F34A] text-[#25113D] px-3.5 py-1.5 rounded-2xl border-3 border-[#25113D] shadow-[4px_4px_0px_#25113D] -rotate-6 font-display font-black text-xs flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#25113D]" />
            100% FLAME SMASHED
          </div>

          {/* Floating Sticker 2 */}
          <div className="absolute -bottom-4 -right-2 bg-[#FF4F9A] text-white px-3.5 py-1.5 rounded-2xl border-3 border-[#25113D] shadow-[4px_4px_0px_#25113D] rotate-6 font-display font-black text-xs flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            CHEESIEST PULL IN TOWN
          </div>
        </div>
      </div>
    </div>
  );
};
