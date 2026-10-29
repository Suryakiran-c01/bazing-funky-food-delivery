/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingModal } from './components/OnboardingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/Toast';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { ProfileView } from './components/ProfileView';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  const { screen, showSplash } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E7] text-[#25113D] selection:bg-[#FF6B35] selection:text-white">
      {/* Splash Screen */}
      {showSplash && <SplashScreen />}

      {/* Global Modals & Notifications */}
      <ToastContainer />
      <OnboardingModal />
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Screen Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        {screen === 'home' && <HomeView />}
        {screen === 'menu' && <MenuView />}
        {screen === 'orders' && <OrderTrackingView />}
        {screen === 'profile' && <ProfileView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
