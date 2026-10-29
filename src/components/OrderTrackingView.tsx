import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  ChevronRight,
  Flame,
  Sparkles,
  ShoppingBag,
  RotateCw,
  Share2,
} from 'lucide-react';
import { OrderStatus } from '../types/food';
import { formatCurrency } from '../utils/pricing';

export const OrderTrackingView: React.FC = () => {
  const {
    activeTrackingOrder,
    pastOrders,
    setActiveTrackingOrder,
    advanceTrackingOrder,
    setScreen,
    showToast,
  } = useApp();

  // If no current tracking order, show the most recent order from pastOrders
  const currentOrder = activeTrackingOrder || pastOrders[0];
  const [showDriverChat, setShowDriverChat] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string; text: string }>>([
    { sender: 'driver', text: 'Hey there! I have picked up your BAZINGA order. It is safely in the hot pouch!' },
  ]);

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-24 h-24 mx-auto bg-[#FFD93D] rounded-full border-4 border-[#25113D] shadow-[6px_6px_0px_#25113D] flex items-center justify-center text-4xl mb-4">
          🛵
        </div>
        <h2 className="font-display font-black text-2xl text-[#25113D] mb-2">
          No Active Orders Right Now!
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Your tummy wants something crunchy and delicious. Let's make an order!
        </p>
        <button
          onClick={() => setScreen('menu')}
          className="px-6 py-3 bg-[#FF6B35] text-white font-display font-bold rounded-2xl pop-btn cursor-pointer"
        >
          Explore BAZINGA Menu
        </button>
      </div>
    );
  }

  const steps: Array<{
    status: OrderStatus;
    title: string;
    sub: string;
    icon: string;
  }> = [
    {
      status: 'placed',
      title: 'Order Placed & Confirmed',
      sub: 'BAZINGA Cafe accepted your feast',
      icon: '📝',
    },
    {
      status: 'preparing',
      title: 'Sizzling on the Grill',
      sub: 'Chef is tossing patties and packing fries',
      icon: '🔥',
    },
    {
      status: 'out_for_delivery',
      title: 'Out for Delivery!',
      sub: 'Speeding through the neon streets to you',
      icon: '🛵',
    },
    {
      status: 'delivered',
      title: 'Delivered Fresh & Hot!',
      sub: 'Bite into the fun. Enjoy every crunch!',
      icon: '🎉',
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'preparing':
        return 1;
      case 'out_for_delivery':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  const currentStepIndex = getStepIndex(currentOrder.status);

  // Scooter position along the map path (percentage)
  const scooterPositions = [15, 45, 75, 96];
  const currentPos = scooterPositions[currentStepIndex];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage.trim();
    setChatHistory((prev) => [...prev, { sender: 'me', text: userMsg }]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'driver', text: "Got it! Be right there with extra napkins!" },
      ]);
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header Card */}
      <div className="pop-card bg-white rounded-3xl p-6 relative overflow-hidden">
        {/* Background Dots */}
        <div className="absolute inset-0 comic-dots opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-black text-xs bg-[#FFD93D] text-[#25113D] px-2.5 py-0.5 rounded-full border border-[#25113D]">
                ORDER #{currentOrder.id}
              </span>
              <span className="text-xs text-gray-400 font-medium">{currentOrder.createdAt}</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#25113D]">
              {currentOrder.status === 'delivered'
                ? 'Your Food Has Arrived! 🍔'
                : 'Your Cravings Are On Their Way! 🚀'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              {currentOrder.status === 'delivered'
                ? 'Hope it was delicious! Share your feedback for +50 BAZINGA Coins.'
                : 'Prepared fresh at BAZINGA Street Cafe, 42 Neon Boulevard.'}
            </p>
          </div>

          {/* Simulation & Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={advanceTrackingOrder}
              className="px-4 py-2 bg-[#B8F34A] text-[#25113D] font-display font-bold text-xs rounded-xl border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D] hover:bg-[#a7e834] flex items-center gap-1.5 cursor-pointer"
              title="Click to simulate advancing delivery stage"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Simulate Next Step</span>
            </button>

            <button
              onClick={() => {
                showToast('Tracking link copied to clipboard! 📋', 'success');
              }}
              className="p-2 bg-white text-[#25113D] rounded-xl border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D] hover:bg-gray-50 cursor-pointer"
              aria-label="Share order tracking"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Estimated Time Callout */}
        <div className="mt-5 p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#25113D] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B35] text-white border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D] flex items-center justify-center text-2xl animate-bounce-short">
              ⏱️
            </div>
            <div>
              <span className="text-[11px] font-display font-extrabold uppercase text-[#FF6B35] leading-none block">
                Estimated Delivery
              </span>
              <span className="font-display font-black text-xl text-[#25113D]">
                {currentOrder.status === 'delivered' ? 'Delivered on time!' : currentOrder.estimatedDeliveryTime}
              </span>
            </div>
          </div>

          <div className="text-xs font-display font-bold text-[#25113D] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF4F9A]" />
            <span>Delivering to: {currentOrder.deliveryAddress.label}</span>
          </div>
        </div>
      </div>

      {/* Interactive Delivery Map Section */}
      <div className="pop-card bg-white rounded-3xl overflow-hidden">
        <div className="p-4 bg-[#25113D] text-[#FFD93D] font-display font-bold text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8F34A] animate-ping" />
            <span>LIVE DELIVERY RADAR • GPS SATELLITE</span>
          </div>
          <span className="text-white text-xs">Rider Speed: 32 km/h</span>
        </div>

        {/* Funky Pop-Art Illustrated Map */}
        <div className="relative w-full h-64 sm:h-72 bg-[#FFF8E7] overflow-hidden select-none border-b-2 border-[#25113D]">
          {/* Subtle Grid & Blocks Pattern */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#25113D" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* City Road Network */}
            <path
              d="M 50 180 Q 200 60, 420 160 T 780 120"
              fill="none"
              stroke="#25113D"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M 50 180 Q 200 60, 420 160 T 780 120"
              fill="none"
              stroke="#FFD93D"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Dashed Center Route Line */}
            <path
              d="M 50 180 Q 200 60, 420 160 T 780 120"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="3"
              strokeDasharray="8 6"
              strokeLinecap="round"
            />
          </svg>

          {/* Cafe Origin Pin */}
          <div className="absolute left-6 bottom-10 z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B35] text-white border-2 border-[#25113D] shadow-[3px_3px_0px_#25113D] flex items-center justify-center text-xl">
              🍔
            </div>
            <div className="mt-1 px-2 py-0.5 bg-white border border-[#25113D] rounded-md font-display font-bold text-[10px] text-[#25113D] shadow-[1px_1px_0px_#25113D]">
              BAZINGA Cafe
            </div>
          </div>

          {/* Delivery Destination Pin */}
          <div className="absolute right-6 top-10 z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#B8F34A] text-[#25113D] border-2 border-[#25113D] shadow-[3px_3px_0px_#25113D] flex items-center justify-center text-xl">
              📍
            </div>
            <div className="mt-1 px-2 py-0.5 bg-white border border-[#25113D] rounded-md font-display font-bold text-[10px] text-[#25113D] shadow-[1px_1px_0px_#25113D]">
              {currentOrder.deliveryAddress.label}
            </div>
          </div>

          {/* Animated Rider Scooter on Path */}
          <div
            className="absolute z-20 transition-all duration-700 ease-in-out transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${currentPos}%`,
              top: `${currentStepIndex === 0 ? 65 : currentStepIndex === 1 ? 40 : currentStepIndex === 2 ? 55 : 30}%`,
            }}
          >
            <div className="relative group">
              <div className="w-13 h-13 rounded-2xl bg-[#FF4F9A] text-white border-3 border-[#25113D] shadow-[4px_4px_0px_#25113D] flex items-center justify-center text-2xl animate-pulse">
                🛵
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#25113D] text-[#FFD93D] font-display font-black text-[10px] px-2 py-0.5 rounded-full border border-[#FFD93D]">
                Sam (Electric Bike)
              </div>
            </div>
          </div>

          {/* Decorative City Icons */}
          <div className="absolute top-6 left-1/4 opacity-40 text-2xl">🏢</div>
          <div className="absolute bottom-4 left-1/2 opacity-40 text-2xl">🌳</div>
          <div className="absolute top-12 right-1/3 opacity-40 text-2xl">🏫</div>
        </div>

        {/* 4-Step Progress Timeline */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {steps.map((st, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isUpcoming = idx > currentStepIndex;

              return (
                <div
                  key={st.status}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isCurrent
                      ? 'bg-[#FFD93D] border-[#25113D] shadow-[4px_4px_0px_#25113D] -translate-y-1'
                      : isPast
                      ? 'bg-[#B8F34A]/20 border-[#25113D] shadow-[2px_2px_0px_#25113D]'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{st.icon}</span>
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5 text-green-700" />
                    ) : isCurrent ? (
                      <span className="w-3 h-3 rounded-full bg-[#FF6B35] animate-ping" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    )}
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#25113D] leading-snug">
                    {st.title}
                  </h4>
                  <p className="text-[11px] text-gray-600 font-medium mt-1 leading-normal">
                    {st.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Split: Driver Contact & Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Driver Contact Box */}
        {currentOrder.deliveryPartner && (
          <div className="pop-card bg-white rounded-3xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-display font-extrabold uppercase text-gray-400">
                  Your Delivery Hero
                </span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  ★ {currentOrder.deliveryPartner.rating} Star Champ
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={currentOrder.deliveryPartner.avatar}
                  alt={currentOrder.deliveryPartner.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]"
                />
                <div>
                  <h4 className="font-display font-black text-lg text-[#25113D]">
                    {currentOrder.deliveryPartner.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    Driving: {currentOrder.deliveryPartner.vehicle}
                  </p>
                  <p className="text-xs text-[#FF6B35] font-bold">
                    {currentOrder.deliveryPartner.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Call / Chat Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  showToast(`Calling ${currentOrder.deliveryPartner?.name}... 📞`, 'info');
                }}
                className="flex-1 py-2.5 bg-[#FFF8E7] text-[#25113D] font-display font-bold text-xs rounded-xl border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D] flex items-center justify-center gap-2 hover:bg-[#FFD93D] cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#FF6B35]" />
                <span>Call Driver</span>
              </button>

              <button
                onClick={() => setShowDriverChat(!showDriverChat)}
                className="flex-1 py-2.5 bg-[#FFD93D] text-[#25113D] font-display font-bold text-xs rounded-xl border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D] flex items-center justify-center gap-2 hover:bg-[#fad02c] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#FF6B35]" />
                <span>{showDriverChat ? 'Hide Chat' : 'Chat Direct'}</span>
              </button>
            </div>

            {/* Embedded Driver Chat Modal/Drawer */}
            {showDriverChat && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                <div className="space-y-2 max-h-36 overflow-y-auto mb-2 text-xs">
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-xl max-w-[85%] font-medium ${
                        msg.sender === 'me'
                          ? 'ml-auto bg-[#FF6B35] text-white'
                          : 'bg-gray-100 text-[#25113D]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Message driver..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-[#25113D] rounded-xl text-xs font-medium focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#FF6B35] text-white font-display font-bold text-xs rounded-xl"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Order Items Breakdown */}
        <div className="pop-card bg-white rounded-3xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-display font-extrabold uppercase text-gray-400 block mb-3">
              Order Receipt ({currentOrder.items.length} items)
            </span>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {currentOrder.items.map((ci) => (
                <div key={ci.cartItemId} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-[#FFF8E7] border border-[#25113D] flex items-center justify-center font-display font-black text-[10px]">
                      {ci.quantity}x
                    </span>
                    <span className="font-bold text-[#25113D] truncate">{ci.item.name}</span>
                  </div>
                  <span className="font-bold text-[#25113D] flex-shrink-0">
                    {formatCurrency(ci.unitPrice * ci.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-3 border-t-2 border-dashed border-gray-200 space-y-1 text-xs">
            <div className="flex justify-between text-gray-600 font-medium">
              <span>Payment Mode:</span>
              <span className="font-bold text-[#25113D]">{currentOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between font-display font-black text-sm text-[#25113D] pt-1">
              <span>Paid in Full:</span>
              <span className="text-[#FF6B35] text-base">{formatCurrency(currentOrder.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
