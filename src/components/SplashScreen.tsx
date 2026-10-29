import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Flame, ArrowRight, Zap } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setShowSplash, setShowOnboarding } = useApp();
  const [activeIcon, setActiveIcon] = useState<number>(0);

  const icons = ['🍔', '🍕', '🍟', '🥤', '🍩'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  const handleEnterApp = () => {
    setShowSplash(false);
  };

  const handleStartOnboarding = () => {
    setShowSplash(false);
    setShowOnboarding(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF8E7] overflow-hidden">
      {/* Comic dotted background & decorative starbursts */}
      <div className="absolute inset-0 comic-dots opacity-40 pointer-events-none" />

      {/* Comic pop burst decorative shapes */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-[#FFD93D] rounded-full border-4 border-[#25113D] shadow-[6px_6px_0px_#25113D] flex items-center justify-center -rotate-12">
        <span className="font-display font-black text-2xl text-[#25113D] pt-12 pl-12">BOOM! 💥</span>
      </div>

      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#FF4F9A] rounded-full border-4 border-[#25113D] shadow-[6px_6px_0px_#25113D] flex items-center justify-center rotate-12">
        <span className="font-display font-black text-2xl text-white pb-12 pr-12">TASTY! ⚡</span>
      </div>

      {/* Floating comic speech bubble */}
      <div className="absolute top-12 right-12 hidden md:block">
        <div className="pop-badge bg-[#B8F34A] text-[#25113D] px-4 py-2 rounded-2xl rotate-6 text-sm font-bold flex items-center gap-1">
          <Flame className="w-4 h-4 text-[#FF6B35]" />
          Hot & Fresh from BAZINGA Cafe!
        </div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 max-w-lg w-full mx-4 p-8 sm:p-10 bg-white border-4 border-[#25113D] rounded-3xl shadow-[10px_10px_0px_#25113D] text-center">
        {/* Animated Food Emoji Icon Box */}
        <div className="relative inline-block mb-6">
          <div className="w-28 h-28 mx-auto bg-[#FFD93D] border-4 border-[#25113D] rounded-3xl shadow-[6px_6px_0px_#25113D] flex items-center justify-center text-6xl transform transition-transform duration-300 hover:rotate-6">
            <span className="animate-pulse">{icons[activeIcon]}</span>
          </div>
          {/* Badge over icon */}
          <div className="absolute -top-3 -right-3 bg-[#FF4F9A] text-white border-2 border-[#25113D] px-2.5 py-0.5 rounded-full text-xs font-display font-extrabold uppercase tracking-wider rotate-12 shadow-[2px_2px_0px_#25113D]">
            Fresh!
          </div>
        </div>

        {/* Brand Name */}
        <div className="relative mb-2">
          <h1 className="font-bungee text-5xl sm:text-6xl text-[#FF6B35] tracking-tight drop-shadow-[4px_4px_0px_#25113D] select-none">
            BAZINGA
          </h1>
          <div className="inline-block bg-[#25113D] text-[#FFD93D] font-display font-extrabold text-xs sm:text-sm px-4 py-1 rounded-full uppercase tracking-widest mt-1 border border-[#FFD93D]">
            CAFE & STREET FOOD EXPRESS
          </div>
        </div>

        {/* Tagline */}
        <p className="font-display font-black text-2xl sm:text-3xl text-[#25113D] mt-3 mb-2">
          "Bite Into The Fun!"
        </p>
        <p className="text-gray-600 text-sm sm:text-base max-w-xs mx-auto mb-8 font-medium">
          Insanely delicious burgers, cheesy pizzas, loaded fries & shakes crafted for true foodies.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={handleEnterApp}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FF6B35] text-white font-display font-bold text-lg rounded-2xl pop-btn flex items-center justify-center gap-2 hover:bg-[#ff5517] cursor-pointer"
          >
            <span>Bite In Now!</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleStartOnboarding}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FFD93D] text-[#25113D] font-display font-bold text-base rounded-2xl pop-btn flex items-center justify-center gap-2 hover:bg-[#f6cd2b] cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#FF6B35]" />
            <span>Tour & Perks</span>
          </button>
        </div>

        {/* Footer info note */}
        <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-200 flex items-center justify-center gap-4 text-xs font-semibold text-gray-500">
          <span>⚡ Fast Delivery</span>
          <span>•</span>
          <span>🍔 100% Fresh Smash</span>
          <span>•</span>
          <span>🔥 Midnight Cravings</span>
        </div>
      </div>
    </div>
  );
};
