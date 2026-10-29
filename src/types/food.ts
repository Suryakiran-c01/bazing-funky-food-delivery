export type FoodCategory =
  | 'All'
  | 'Burgers'
  | 'Pizza'
  | 'Sandwiches'
  | 'Fries'
  | 'Wraps'
  | 'Shakes'
  | 'Desserts';

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: Exclude<FoodCategory, 'All'>;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  prepTime: string;
  isVeg: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
  isPopular?: boolean;
  image: string;
  calories?: number;
  tags?: string[];
  sizes?: CustomizationOption[];
  toppings?: CustomizationOption[];
  sauces?: CustomizationOption[];
  recommendedSides?: string[]; // IDs of food items
}

export interface SelectedCustomizations {
  size?: CustomizationOption;
  toppings: CustomizationOption[];
  sauces: CustomizationOption[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string; // unique ID combining item.id and customization hash
  item: FoodItem;
  quantity: number;
  customizations: SelectedCustomizations;
  unitPrice: number;
}

export type OrderStatus = 'placed' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface DeliveryAddress {
  id: string;
  label: 'Home' | 'Campus Dorm' | 'Work' | 'Other';
  street: string;
  city: string;
  landmark?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  status: OrderStatus;
  estimatedDeliveryTime: string; // e.g. "25 mins"
  deliveryAddress: DeliveryAddress;
  paymentMethod: string;
  deliveryPartner?: {
    name: string;
    phone: string;
    rating: number;
    avatar: string;
    vehicle: string;
  };
}

export interface PromoCode {
  code: string;
  discountPercent?: number;
  maxDiscount?: number;
  minOrder?: number;
  freeDelivery?: boolean;
  description: string;
}
