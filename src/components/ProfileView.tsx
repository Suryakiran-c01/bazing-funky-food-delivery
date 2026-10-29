import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  Clock,
  Heart,
  Gift,
  HelpCircle,
  LogOut,
  Sparkles,
  CreditCard,
  Plus,
  ArrowRight,
  Flame,
  Check,
  ChevronRight,
} from 'lucide-react';
import { MOCK_FOOD_ITEMS } from '../data/mockData';
import { formatCurrency } from '../utils/pricing';
import { AddressPickerModal } from './AddressPickerModal';

export const ProfileView: React.FC = () => {
  const {
    user,
    logoutUser,
    addresses,
    pastOrders,
    favorites,
    toggleFavorite,
    addToCart,
    setIsCartOpen,
    setScreen,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'favorites' | 'addresses' | 'rewards' | 'support'
  >('orders');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [scratchedReward, setScratchedReward] = useState<boolean>(false);

  // Filter food items that are in favorites
  const favoriteItems = MOCK_FOOD_ITEMS.filter((item) => favorites.includes(item.id));

  const handleReorder = (orderItems: typeof pastOrders[0]['items']) => {
    orderItems.forEach((ci) => {
      addToCart(ci.item, ci.customizations, ci.quantity);
    });
    setIsCartOpen(true);
    showToast('Reordered previous feast! Cart updated! 🍕', 'bazinga');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Profile Card */}
      <div className="pop-card bg-white rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 comic-dots opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-3 border-[#25113D] shadow-[4px_4px_0px_#25113D]"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#FFD93D] text-[#25113D] p-1 rounded-lg border border-[#25113D] text-xs font-black">
                VIP
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="font-display font-black text-2xl text-[#25113D]">
                  {user.name}
                </h1>
                <span className="text-[10px] font-display font-black bg-[#B8F34A] text-[#25113D] px-2 py-0.5 rounded-full border border-[#25113D]">
                  BURGER CONNOISSEUR
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">{user.email} • {user.phone}</p>

              {/* Badges / Stats Row */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                <div className="px-3 py-1 bg-[#FFF8E7] border border-[#25113D] rounded-xl text-xs font-display font-bold text-[#25113D] flex items-center gap-1 shadow-[1px_1px_0px_#25113D]">
                  <span>🪙 {user.bazingaCoins} Coins</span>
                </div>
                <div className="px-3 py-1 bg-[#FFF8E7] border border-[#25113D] rounded-xl text-xs font-display font-bold text-[#25113D] flex items-center gap-1 shadow-[1px_1px_0px_#25113D]">
                  <span>📦 {pastOrders.length} Orders</span>
                </div>
                <div className="px-3 py-1 bg-[#FFF8E7] border border-[#25113D] rounded-xl text-xs font-display font-bold text-[#25113D] flex items-center gap-1 shadow-[1px_1px_0px_#25113D]">
                  <span>❤️ {favorites.length} Faves</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="px-4 py-2 border-2 border-[#25113D] rounded-xl font-display font-bold text-xs text-red-600 bg-white hover:bg-red-50 shadow-[2px_2px_0px_#25113D] flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar font-display font-bold text-xs sm:text-sm">
        {[
          { id: 'orders', label: 'Order History', icon: <Clock className="w-4 h-4" /> },
          { id: 'favorites', label: 'Favorite Foods', icon: <Heart className="w-4 h-4" /> },
          { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" /> },
          { id: 'rewards', label: 'Coins & Rewards', icon: <Gift className="w-4 h-4" /> },
          { id: 'support', label: 'Help & FAQ', icon: <HelpCircle className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border-2 border-[#25113D] whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-[#FF6B35] text-white shadow-[3px_3px_0px_#25113D] -translate-y-0.5'
                : 'bg-white text-[#25113D] hover:bg-[#FFF8E7]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-xl text-[#25113D]">
              Past Feasts & Deliveries
            </h2>
            <span className="text-xs text-gray-500 font-bold">{pastOrders.length} orders total</span>
          </div>

          {pastOrders.map((ord) => (
            <div
              key={ord.id}
              className="pop-card bg-white rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-display font-black text-xs bg-[#FFD93D] text-[#25113D] px-2 py-0.5 rounded-full border border-[#25113D]">
                    {ord.id}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{ord.createdAt}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-300">
                    {ord.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs text-gray-700 font-medium space-y-0.5">
                  {ord.items.map((it) => (
                    <div key={it.cartItemId}>
                      {it.quantity}x {it.item.name}
                    </div>
                  ))}
                </div>

                <div className="text-xs font-display font-bold text-[#25113D] mt-2">
                  Total: <span className="text-[#FF6B35] text-sm">{formatCurrency(ord.total)}</span>
                  <span className="text-gray-400 font-normal"> · {ord.paymentMethod}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReorder(ord.items)}
                  className="px-4 py-2 bg-[#FF6B35] text-white font-display font-bold text-xs rounded-xl pop-btn hover:bg-[#ff5517] cursor-pointer"
                >
                  ⚡ Reorder Again
                </button>
                <button
                  onClick={() => {
                    setScreen('orders');
                  }}
                  className="px-3 py-2 bg-[#FFF8E7] text-[#25113D] font-display font-bold text-xs rounded-xl border border-[#25113D] hover:bg-[#FFD93D] cursor-pointer"
                >
                  View Radar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h2 className="font-display font-black text-xl text-[#25113D]">
            Your Handpicked Favorites ({favoriteItems.length})
          </h2>

          {favoriteItems.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border-2 border-[#25113D]">
              <span className="text-4xl block mb-2">💔</span>
              <p className="font-display font-bold text-base text-[#25113D]">No favorites saved yet!</p>
              <p className="text-xs text-gray-500 mb-4">Tap the heart on any food item to keep it handy.</p>
              <button
                onClick={() => setScreen('menu')}
                className="px-4 py-2 bg-[#FF6B35] text-white font-display font-bold text-xs rounded-xl pop-btn"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteItems.map((fav) => (
                <div
                  key={fav.id}
                  className="p-4 bg-white rounded-3xl border-2 border-[#25113D] shadow-[3px_3px_0px_#25113D] flex items-center gap-3.5"
                >
                  <img
                    src={fav.image}
                    alt={fav.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#25113D]"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-sm text-[#25113D] truncate">
                      {fav.name}
                    </h3>
                    <span className="text-xs font-black text-[#FF6B35]">
                      ${fav.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => addToCart(fav)}
                        className="px-2.5 py-1 bg-[#FFD93D] text-[#25113D] font-display font-black text-[11px] rounded-lg border border-[#25113D] hover:bg-[#fad02c] shadow-[1px_1px_0px_#25113D]"
                      >
                        + Add
                      </button>
                      <button
                        onClick={() => toggleFavorite(fav.id)}
                        className="text-[10px] text-gray-400 hover:text-red-500 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-xl text-[#25113D]">
              Saved Delivery Locations
            </h2>
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="px-3 py-1.5 bg-[#FF6B35] text-white font-display font-bold text-xs rounded-xl pop-btn flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-4 bg-white rounded-3xl border-2 border-[#25113D] shadow-[3px_3px_0px_#25113D]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display font-bold text-sm text-[#25113D] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF6B35]" />
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-black bg-[#B8F34A] text-[#25113D] px-2 py-0.5 rounded-full border border-[#25113D]">
                      DEFAULT
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{addr.street}</p>
                {addr.landmark && (
                  <p className="text-[11px] text-[#FF6B35] font-semibold mt-1">
                    Near: {addr.landmark}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Coins & Scratch Card Rewards */}
      {activeTab === 'rewards' && (
        <div className="space-y-5">
          <div className="p-6 bg-gradient-to-r from-[#FFD93D] to-[#FF6B35] text-[#25113D] rounded-3xl border-4 border-[#25113D] shadow-[6px_6px_0px_#25113D]">
            <span className="font-display font-black text-xs uppercase tracking-wider block mb-1">
              BAZINGA Loyalty Club
            </span>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bungee text-4xl text-[#25113D]">
                  {user.bazingaCoins} COINS
                </span>
                <p className="text-xs font-bold mt-1 text-[#25113D]/80">
                  Worth $4.20 off your next feast! Earn 2 coins for every $1 spent.
                </p>
              </div>
              <div className="text-5xl">🪙</div>
            </div>
          </div>

          {/* Interactive Scratch Card */}
          <div className="pop-card bg-white rounded-3xl p-6 text-center">
            <h3 className="font-display font-black text-lg text-[#25113D] mb-1">
              🎉 Daily Mystery Scratch Card!
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Tap the card below to reveal your surprise daily discount voucher!
            </p>

            <div
              onClick={() => {
                if (!scratchedReward) {
                  setScratchedReward(true);
                  showToast('Voucher UNLOCKED! Use code BAZINGA50 for 50% OFF! 🎉', 'bazinga');
                }
              }}
              className={`w-full max-w-sm mx-auto h-32 rounded-3xl border-3 border-[#25113D] flex flex-col items-center justify-center cursor-pointer transition-all ${
                scratchedReward
                  ? 'bg-[#B8F34A] shadow-[4px_4px_0px_#25113D]'
                  : 'bg-[#FF4F9A] text-white hover:scale-102 shadow-[4px_4px_0px_#25113D]'
              }`}
            >
              {scratchedReward ? (
                <div>
                  <span className="text-3xl block mb-1">🎁 50% OFF</span>
                  <span className="font-bungee text-lg text-[#25113D]">CODE: BAZINGA50</span>
                  <p className="text-[10px] font-bold text-gray-800">Auto-applied in your cart!</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-8 h-8 animate-spin" />
                  <span className="font-display font-black text-base">
                    TAP HERE TO SCRATCH!
                  </span>
                  <span className="text-[10px] opacity-90 font-bold uppercase tracking-wider">
                    Guaranteed Perk
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Help & FAQ */}
      {activeTab === 'support' && (
        <div className="pop-card bg-white rounded-3xl p-6 space-y-4">
          <h2 className="font-display font-black text-xl text-[#25113D] mb-3">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {[
              {
                q: 'How fast is BAZINGA cafe delivery?',
                a: 'Standard orders take 25–35 minutes. If you pick Express Priority, our riders deliver within 15–20 minutes straight from the grill.',
              },
              {
                q: 'What are the cafe operating hours?',
                a: 'We are open every single day from 11:00 AM to 3:00 AM for all lunch, dinner, and late-night campus cravings.',
              },
              {
                q: 'How do I redeem my BAZINGA coins?',
                a: 'On checkout, choose BAZINGA Wallet under Payment Methods to instantly deduct coins from your bill.',
              },
              {
                q: 'Can I customize toppings and sauce levels?',
                a: 'Absolutely! Click any item card to pick your exact size, bun type, cheese sauces, and add custom cooking notes.',
              },
            ].map((faq, i) => (
              <div key={i} className="p-3.5 bg-[#FFF8E7] rounded-2xl border border-[#25113D]">
                <h4 className="font-display font-bold text-sm text-[#25113D] mb-1">
                  {faq.q}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t-2 border-dashed border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-bold text-gray-600">
              Need immediate help with a live order?
            </span>
            <button
              onClick={() => showToast('Connecting to BAZINGA Support Hotline... 💬', 'info')}
              className="px-4 py-2 bg-[#FFD93D] text-[#25113D] font-display font-bold text-xs rounded-xl pop-btn cursor-pointer"
            >
              Chat With Support
            </button>
          </div>
        </div>
      )}

      <AddressPickerModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  );
};
