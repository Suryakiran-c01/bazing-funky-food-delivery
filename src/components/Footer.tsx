import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setScreen, setCategoryFilter } = useApp();

  return (
    <footer className="mt-16 bg-[#25113D] text-[#FFF8E7] border-t-4 border-[#25113D] pt-12 pb-24 lg:pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Col */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] border-2 border-white flex items-center justify-center text-xl">
              🍔
            </div>
            <span className="font-bungee text-2xl text-[#FFD93D] tracking-tight">
              BAZINGA
            </span>
          </div>

          <p className="font-display font-black text-sm text-[#FF4F9A]">
            "Bite Into The Fun!"
          </p>

          <p className="text-xs text-gray-300 font-medium leading-relaxed">
            The funkiest street-food cafe & delivery platform. Fresh smash burgers, crazy loaded fries, freakshakes, and late-night cravings.
          </p>
        </div>

        {/* Quick Menu Links */}
        <div>
          <h4 className="font-display font-black text-sm text-[#FFD93D] uppercase tracking-wider mb-3">
            Cravings
          </h4>
          <ul className="space-y-2 text-xs font-medium text-gray-300">
            {['Burgers', 'Pizza', 'Fries', 'Shakes', 'Desserts'].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setCategoryFilter(cat as any);
                    setScreen('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Cafe Info */}
        <div>
          <h4 className="font-display font-black text-sm text-[#FFD93D] uppercase tracking-wider mb-3">
            Hours & Location
          </h4>
          <div className="space-y-2.5 text-xs text-gray-300 font-medium">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
              <span>42 Neon Boulevard, Tech District, Metro City</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#B8F34A] flex-shrink-0" />
              <span>Open Daily: 11:00 AM – 3:00 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FFD93D] flex-shrink-0" />
              <span>+1 (555) 722-9464</span>
            </div>
          </div>
        </div>

        {/* Student Perks */}
        <div>
          <h4 className="font-display font-black text-sm text-[#FFD93D] uppercase tracking-wider mb-3">
            Student Specials
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed mb-3">
            Valid student ID gets 20% off every single weekday between 2 PM – 6 PM. Use code <span className="text-[#B8F34A] font-bold">STUDENT20</span>!
          </p>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/20 text-xs">
            <span className="font-display font-bold text-[#FF6B35] block">
              ⚡ Flash Deal Active
            </span>
            <span className="text-gray-300 text-[11px]">Free delivery on all orders over $35</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <div>
          © {new Date().getFullYear()} BAZINGA Cafe Inc. All rights reserved. Made with ❤️ for food lovers.
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Feast</span>
          <span>•</span>
          <span>Nutrition Info</span>
        </div>
      </div>
    </footer>
  );
};
