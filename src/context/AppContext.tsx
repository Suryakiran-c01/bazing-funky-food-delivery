import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  DeliveryAddress,
  FoodCategory,
  FoodItem,
  Order,
  PromoCode,
  SelectedCustomizations,
  OrderStatus,
} from '../types/food';
import {
  MOCK_FOOD_ITEMS,
  SAVED_ADDRESSES,
  MOCK_PAST_ORDERS,
} from '../data/mockData';
import {
  calculateCartTotals,
  calculateUnitPrice,
  createCartItemId,
  getNextOrderStatus,
} from '../utils/pricing';

export type ActiveScreen = 'home' | 'menu' | 'orders' | 'profile';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'bazinga';
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bazingaCoins: number;
  avatar: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  screen: ActiveScreen;
  setScreen: (screen: ActiveScreen) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  user: UserProfile;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  addresses: DeliveryAddress[];
  selectedAddress: DeliveryAddress;
  setSelectedAddress: (addr: DeliveryAddress) => void;
  addAddress: (addr: Omit<DeliveryAddress, 'id'>) => void;
  cart: CartItem[];
  addToCart: (
    item: FoodItem,
    customizations?: SelectedCustomizations,
    quantity?: number
  ) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  promoCodeInput: string;
  setPromoCodeInput: (code: string) => void;
  applyPromo: (code: string) => void;
  priorityDelivery: boolean;
  setPriorityDelivery: (priority: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeItemForDetail: FoodItem | null;
  setActiveItemForDetail: (item: FoodItem | null) => void;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  advanceTrackingOrder: () => void;
  pastOrders: Order[];
  placeOrder: (paymentMethod: string, notes?: string) => Order;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  categoryFilter: FoodCategory;
  setCategoryFilter: (cat: FoodCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  dietaryFilter: 'all' | 'veg' | 'non-veg' | 'spicy';
  setDietaryFilter: (diet: 'all' | 'veg' | 'non-veg' | 'spicy') => void;
  sortBy: 'popular' | 'rating' | 'price-asc' | 'price-desc';
  setSortBy: (sort: 'popular' | 'rating' | 'price-asc' | 'price-desc') => void;
  toasts: ToastMessage[];
  showToast: (msg: string, type?: 'success' | 'info' | 'bazinga') => void;
  cartCount: number;
  cartTotals: ReturnType<typeof calculateCartTotals>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check for ?autostart=1 in URL
  const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const autostart = queryParams?.get('autostart') === '1';

  const [showSplash, setShowSplash] = useState<boolean>(!autostart);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [screen, setScreen] = useState<ActiveScreen>('home');

  const [user, setUser] = useState<UserProfile>({
    name: 'Alex Rivera',
    email: 'alex.rivera@bazingacafe.com',
    phone: '+1 (555) 789-2044',
    bazingaCoins: 420,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    isLoggedIn: true,
  });

  const [addresses, setAddresses] = useState<DeliveryAddress[]>(SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress>(SAVED_ADDRESSES[0]);

  const [cart, setCart] = useState<CartItem[]>([
    // Initial friendly sample cart item
    {
      cartItemId: 'b1_default',
      item: MOCK_FOOD_ITEMS[0],
      quantity: 1,
      unitPrice: 11.99,
      customizations: {
        size: { id: 'reg', name: 'Regular', price: 0 },
        toppings: [{ id: 'extra-cheese', name: 'Gooey Melted Cheddar', price: 1.25 }],
        sauces: [{ id: 'bazinga-secret', name: 'BAZINGA Dynamite Dip', price: 0.75 }],
      },
    },
  ]);

  const [promoCodeInput, setPromoCodeInput] = useState<string>('BAZINGA50');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>('BAZINGA50');
  const [priorityDelivery, setPriorityDelivery] = useState<boolean>(false);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeItemForDetail, setActiveItemForDetail] = useState<FoodItem | null>(null);

  const [pastOrders, setPastOrders] = useState<Order[]>(MOCK_PAST_ORDERS);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  const [favorites, setFavorites] = useState<string[]>(['b1', 'p1', 'f1', 's1']);
  const [categoryFilter, setCategoryFilter] = useState<FoodCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'spicy'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular');

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'bazinga' = 'bazinga') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const loginUser = (email: string, name?: string) => {
    setUser({
      name: name || email.split('@')[0] || 'Awesome Foodie',
      email,
      phone: '+1 (555) 234-5678',
      bazingaCoins: 150,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isLoggedIn: true,
    });
    setShowAuthModal(false);
    showToast(`Welcome to BAZINGA, ${name || 'Foodie'}! 🎉`, 'bazinga');
  };

  const logoutUser = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    showToast('Signed out. See you soon for next craving!', 'info');
  };

  const addAddress = (addr: Omit<DeliveryAddress, 'id'>) => {
    const newAddr: DeliveryAddress = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [newAddr, ...prev]);
    setSelectedAddress(newAddr);
    showToast('New address saved!', 'success');
  };

  const addToCart = (
    item: FoodItem,
    customizations: SelectedCustomizations = { toppings: [], sauces: [] },
    quantity = 1
  ) => {
    const unitPrice = calculateUnitPrice(item.price, customizations);
    const cartItemId = createCartItemId(item.id, customizations);

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity,
        };
        return copy;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            quantity,
            customizations,
            unitPrice,
          },
        ];
      }
    });

    showToast(`Added ${item.name} to cart! 💥`, 'bazinga');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (code: string) => {
    setAppliedPromoCode(code);
    const totals = calculateCartTotals(cart, code, priorityDelivery);
    if (totals.promoApplied) {
      showToast(`Promo ${code.toUpperCase()} applied! Savings unlocked! 🔥`, 'success');
    } else if (totals.promoError) {
      showToast(totals.promoError, 'info');
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your favorites! ❤️', 'bazinga');
        return [...prev, id];
      }
    });
  };

  const cartTotals = calculateCartTotals(cart, appliedPromoCode, priorityDelivery);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (paymentMethod: string, notes?: string): Order => {
    const newOrder: Order = {
      id: `BZ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      items: [...cart],
      subtotal: cartTotals.subtotal,
      deliveryFee: cartTotals.deliveryFee,
      taxes: cartTotals.taxes,
      discount: cartTotals.discount,
      total: cartTotals.total,
      status: 'placed',
      estimatedDeliveryTime: priorityDelivery ? '15-20 mins (Express)' : '25-30 mins',
      deliveryAddress: selectedAddress,
      paymentMethod,
      deliveryPartner: {
        name: 'Sam "Rocket" Miller',
        phone: '+1 (555) 773-9988',
        rating: 4.98,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        vehicle: 'Neon Electric Superbike #07',
      },
    };

    setPastOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setScreen('orders');
    showToast('Order Placed! BAZINGA kitchen is firing up! 🚀', 'bazinga');

    // Add reward coins for placing order
    setUser((prev) => ({
      ...prev,
      bazingaCoins: prev.bazingaCoins + Math.round(newOrder.total * 2),
    }));

    return newOrder;
  };

  const advanceTrackingOrder = () => {
    if (!activeTrackingOrder) return;
    const nextStatus = getNextOrderStatus(activeTrackingOrder.status);
    const updated: Order = {
      ...activeTrackingOrder,
      status: nextStatus,
    };
    setActiveTrackingOrder(updated);
    setPastOrders((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );

    const statusMessages: Record<OrderStatus, string> = {
      placed: 'Order confirmed!',
      preparing: 'Chef is grilling and assembling your food! 🔥',
      out_for_delivery: 'Rider is zooming with your hot meal! 🛵',
      delivered: 'Order Delivered! Bon Appétit! 🎉',
    };
    showToast(statusMessages[nextStatus], 'bazinga');
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        showSplash,
        setShowSplash,
        showOnboarding,
        setShowOnboarding,
        showAuthModal,
        setShowAuthModal,
        user,
        loginUser,
        logoutUser,
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        promoCodeInput,
        setPromoCodeInput,
        applyPromo,
        priorityDelivery,
        setPriorityDelivery,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeItemForDetail,
        setActiveItemForDetail,
        activeTrackingOrder,
        setActiveTrackingOrder,
        advanceTrackingOrder,
        pastOrders,
        placeOrder,
        favorites,
        toggleFavorite,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        dietaryFilter,
        setDietaryFilter,
        sortBy,
        setSortBy,
        toasts,
        showToast,
        cartCount,
        cartTotals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
