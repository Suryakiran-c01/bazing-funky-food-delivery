import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Compass, Clock, User, ShoppingBag } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { screen, setScreen, cartCount, setIsCartOpen } = useApp();

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-4 border-[#25113D] shadow-[0px_-4px_0px_#25113D] lg:hidden px-3 py-2"
    >
      <div className="flex items-center justify-around">
        <button
          onClick={() => setScreen('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            screen === 'home'
              ? 'bg-[#FFD93D] text-[#25113D] border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
              : 'text-gray-500 hover:text-[#25113D]'
          }`}
          aria-label="Go to Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-display font-bold">Home</span>
        </button>

        <button
          onClick={() => setScreen('menu')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            screen === 'menu'
              ? 'bg-[#FFD93D] text-[#25113D] border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
              : 'text-gray-500 hover:text-[#25113D]'
          }`}
          aria-label="Explore Menu"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-display font-bold">Explore</span>
        </button>

        {/* Center Quick Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative -top-5 flex flex-col items-center justify-center w-13 h-13 rounded-2xl bg-[#FF6B35] text-white border-3 border-[#25113D] shadow-[3px_3px_0px_#25113D] active:translate-y-1"
          aria-label={`Cart with ${cartCount} items`}
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FFD93D] text-[#25113D] rounded-full border-2 border-[#25113D] text-[10px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setScreen('orders')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            screen === 'orders'
              ? 'bg-[#FFD93D] text-[#25113D] border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
              : 'text-gray-500 hover:text-[#25113D]'
          }`}
          aria-label="Order Tracking"
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-display font-bold">Orders</span>
        </button>

        <button
          onClick={() => setScreen('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            screen === 'profile'
              ? 'bg-[#FFD93D] text-[#25113D] border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
              : 'text-gray-500 hover:text-[#25113D]'
          }`}
          aria-label="View Profile"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-display font-bold">Profile</span>
        </button>
      </div>
    </nav>
  );
};
