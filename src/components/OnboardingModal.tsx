import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowRight, Check, Zap, Sparkles, Mail, Phone, Lock, User } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, setShowOnboarding, showAuthModal, setShowAuthModal, loginUser } = useApp();
  const [slide, setSlide] = useState<number>(0);
  const [isLoginTab, setIsLoginTab] = useState<boolean>(true);
  const [emailInput, setEmailInput] = useState<string>('alex.rivera@bazingacafe.com');
  const [nameInput, setNameInput] = useState<string>('Alex Rivera');
  const [phoneInput, setPhoneInput] = useState<string>('+1 (555) 789-2044');

  const slides = [
    {
      title: 'Delicious Food At Your Doorstep!',
      tagline: 'CRAVINGS SATISFIED IN 25 MINS',
      desc: 'Our electric delivery squad rushes piping hot burgers, crispy fries, and freakshakes right to your dorm, desk, or couch.',
      icon: '🚀',
      badge: 'SPEEDY DELIVERY',
      color: '#FF6B35',
    },
    {
      title: 'Freshly Prepared Cafe Favorites',
      tagline: 'NO BORING FOOD ALLOWED',
      desc: 'Hand-smashed Angus patties, artisanal wood-style pizzas, loaded animal fries and thick gourmet shakes made fresh to order.',
      icon: '🔥',
      badge: 'CHEF CRAFTED',
      color: '#FFD93D',
    },
    {
      title: 'Fast, Easy & Super Fun Ordering',
      tagline: 'STUDENT DEALS & BAZINGA COINS',
      desc: 'Earn coins on every single bite, unlock secret midnight combos, and split tabs effortlessly with your crew.',
      icon: '🎉',
      badge: 'PARTY TIME',
      color: '#FF4F9A',
    },
  ];

  const handleNextOrFinish = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      setShowOnboarding(false);
      setShowAuthModal(true);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(emailInput, nameInput);
    setShowAuthModal(false);
  };

  if (!showOnboarding && !showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border-4 border-[#25113D] rounded-3xl shadow-[8px_8px_0px_#25113D] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            setShowOnboarding(false);
            setShowAuthModal(false);
          }}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#FFF8E7] border-2 border-[#25113D] rounded-full flex items-center justify-center text-[#25113D] hover:bg-[#FF4F9A] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {showOnboarding ? (
          /* Onboarding Carousel */
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            {/* Header Badge */}
            <div className="mb-4 inline-block px-3 py-1 bg-[#FFD93D] border-2 border-[#25113D] rounded-full text-xs font-display font-extrabold text-[#25113D] shadow-[2px_2px_0px_#25113D]">
              {slides[slide].badge}
            </div>

            {/* Icon Graphic */}
            <div className="w-24 h-24 mb-5 rounded-3xl border-4 border-[#25113D] bg-[#FFF8E7] flex items-center justify-center text-5xl shadow-[4px_4px_0px_#25113D]">
              <span>{slides[slide].icon}</span>
            </div>

            {/* Slide title & description */}
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#25113D] mb-2 leading-tight">
              {slides[slide].title}
            </h2>
            <div className="font-display font-bold text-xs uppercase tracking-wider text-[#FF6B35] mb-3">
              {slides[slide].tagline}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {slides[slide].desc}
            </p>

            {/* Dots */}
            <div className="flex gap-2 mb-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlide(idx)}
                  className={`h-3 rounded-full transition-all border border-[#25113D] ${
                    slide === idx ? 'w-8 bg-[#FF6B35]' : 'w-3 bg-gray-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="w-full flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  setShowOnboarding(false);
                }}
                className="text-xs font-bold font-display text-gray-500 hover:text-[#25113D] uppercase tracking-wider py-2 px-3"
              >
                Skip to Menu
              </button>

              <button
                onClick={handleNextOrFinish}
                className="px-6 py-3 bg-[#FF6B35] text-white font-display font-bold rounded-2xl pop-btn flex items-center gap-2 hover:bg-[#ff571e]"
              >
                <span>{slide === slides.length - 1 ? "Let's Get Started!" : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Login & Signup Form */
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <span className="text-3xl mb-1 block">🍔⚡</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#25113D]">
                Let's Get This Party Started!
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Sign in to track orders, save favorites & unlock BAZINGA coins.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex bg-[#FFF8E7] p-1 border-2 border-[#25113D] rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setIsLoginTab(true)}
                className={`flex-1 py-2 text-sm font-display font-bold rounded-xl transition-all cursor-pointer ${
                  isLoginTab
                    ? 'bg-[#FF6B35] text-white shadow-[2px_2px_0px_#25113D] border border-[#25113D]'
                    : 'text-[#25113D] hover:bg-black/5'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setIsLoginTab(false)}
                className={`flex-1 py-2 text-sm font-display font-bold rounded-xl transition-all cursor-pointer ${
                  !isLoginTab
                    ? 'bg-[#FF6B35] text-white shadow-[2px_2px_0px_#25113D] border border-[#25113D]'
                    : 'text-[#25113D] hover:bg-black/5'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLoginTab && (
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#25113D] mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Maya Chen"
                      className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-[#25113D] rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#25113D] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="you@campus.edu"
                    className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-[#25113D] rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#25113D] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-[#25113D] rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FFD93D] text-[#25113D] font-display font-black text-base rounded-2xl pop-btn flex items-center justify-center gap-2 hover:bg-[#fad02c] mt-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#FF6B35]" />
                <span>{isLoginTab ? 'Bite In & Log In' : 'Join the BAZINGA Club'}</span>
              </button>
            </form>

            {/* Social Logins */}
            <div className="mt-5 pt-4 border-t-2 border-dashed border-gray-200 text-center">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-3">
                Or Continue With
              </span>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => loginUser('google.user@example.com', 'Google Foodie')}
                  className="px-4 py-2 border-2 border-[#25113D] rounded-xl font-display font-bold text-xs bg-white hover:bg-gray-50 shadow-[2px_2px_0px_#25113D] flex items-center gap-2"
                >
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginUser('apple.user@example.com', 'Apple Foodie')}
                  className="px-4 py-2 border-2 border-[#25113D] rounded-xl font-display font-bold text-xs bg-white hover:bg-gray-50 shadow-[2px_2px_0px_#25113D] flex items-center gap-2"
                >
                  <span>Apple</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginUser('guest@bazingacafe.com', 'Hungry Guest')}
                  className="px-4 py-2 border-2 border-[#25113D] rounded-xl font-display font-bold text-xs bg-[#B8F34A] hover:bg-[#a6e633] text-[#25113D] shadow-[2px_2px_0px_#25113D] flex items-center gap-2"
                >
                  <span>Guest Mode</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
