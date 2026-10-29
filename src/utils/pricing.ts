import { CartItem, CustomizationOption, PromoCode, SelectedCustomizations, OrderStatus } from '../types/food';

export const TAX_RATE = 0.08; // 8% sales tax
export const BASE_DELIVERY_FEE = 2.99;
export const FREE_DELIVERY_THRESHOLD = 35.00;

export const PROMO_CODES: Record<string, PromoCode> = {
  BAZINGA50: {
    code: 'BAZINGA50',
    discountPercent: 50,
    maxDiscount: 10.0,
    minOrder: 15.0,
    description: '50% OFF up to $10 on orders over $15',
  },
  FREESHIP: {
    code: 'FREESHIP',
    freeDelivery: true,
    minOrder: 10.0,
    description: 'Free delivery on all orders over $10',
  },
  STUDENT20: {
    code: 'STUDENT20',
    discountPercent: 20,
    maxDiscount: 15.0,
    minOrder: 12.0,
    description: '20% OFF for students up to $15',
  },
  FEAST10: {
    code: 'FEAST10',
    discountPercent: 10,
    maxDiscount: 5.0,
    minOrder: 20.0,
    description: '10% OFF orders above $20',
  },
};

/**
 * Calculates single unit price for a food item given base price and selected options.
 */
export function calculateUnitPrice(
  basePrice: number,
  customizations?: SelectedCustomizations
): number {
  let price = basePrice;
  if (!customizations) return roundToTwo(price);

  if (customizations.size) {
    price += customizations.size.price;
  }
  if (customizations.toppings && customizations.toppings.length > 0) {
    const toppingsTotal = customizations.toppings.reduce((acc, t) => acc + t.price, 0);
    price += toppingsTotal;
  }
  if (customizations.sauces && customizations.sauces.length > 0) {
    const saucesTotal = customizations.sauces.reduce((acc, s) => acc + s.price, 0);
    price += saucesTotal;
  }

  return roundToTwo(price);
}

/**
 * Generates unique key for item + its customizations so identical customizations group together.
 */
export function createCartItemId(itemId: string, customizations?: SelectedCustomizations): string {
  if (!customizations) return itemId;
  const sizeKey = customizations.size?.id || 'default';
  const toppingKeys = (customizations.toppings || [])
    .map((t) => t.id)
    .sort()
    .join('-');
  const sauceKeys = (customizations.sauces || [])
    .map((s) => s.id)
    .sort()
    .join('-');
  const noteKey = (customizations.specialInstructions || '').trim().toLowerCase();
  return `${itemId}_${sizeKey}_${toppingKeys}_${sauceKeys}_${noteKey}`;
}

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  promoApplied?: PromoCode;
  promoError?: string;
}

/**
 * Calculates entire cart totals including discounts, delivery fee rules, and taxes.
 */
export function calculateCartTotals(
  items: CartItem[],
  promoCodeInput?: string,
  priorityDelivery: boolean = false
): CartTotals {
  const subtotal = roundToTwo(
    items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  );

  if (items.length === 0) {
    return {
      subtotal: 0,
      deliveryFee: 0,
      taxes: 0,
      discount: 0,
      total: 0,
    };
  }

  let deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY_FEE;
  if (priorityDelivery) {
    deliveryFee += 1.99;
  }

  let discount = 0;
  let promoApplied: PromoCode | undefined;
  let promoError: string | undefined;

  if (promoCodeInput && promoCodeInput.trim() !== '') {
    const code = promoCodeInput.trim().toUpperCase();
    const promo = PROMO_CODES[code];

    if (!promo) {
      promoError = 'Invalid promo code. Try BAZINGA50 or STUDENT20!';
    } else if (promo.minOrder && subtotal < promo.minOrder) {
      promoError = `Add $${(promo.minOrder - subtotal).toFixed(2)} more to use ${code}`;
    } else {
      promoApplied = promo;
      if (promo.freeDelivery) {
        deliveryFee = priorityDelivery ? 1.99 : 0; // free standard delivery
      }
      if (promo.discountPercent) {
        const rawDiscount = (subtotal * promo.discountPercent) / 100;
        discount = promo.maxDiscount ? Math.min(rawDiscount, promo.maxDiscount) : rawDiscount;
        discount = roundToTwo(discount);
      }
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const taxes = roundToTwo(taxableAmount * TAX_RATE);
  const total = roundToTwo(Math.max(0, subtotal - discount + deliveryFee + taxes));

  return {
    subtotal,
    deliveryFee: roundToTwo(deliveryFee),
    taxes,
    discount,
    total,
    promoApplied,
    promoError,
  };
}

/**
 * Steps to the next simulated order delivery stage.
 */
export function getNextOrderStatus(current: OrderStatus): OrderStatus {
  switch (current) {
    case 'placed':
      return 'preparing';
    case 'preparing':
      return 'out_for_delivery';
    case 'out_for_delivery':
      return 'delivered';
    case 'delivered':
      return 'delivered';
  }
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function roundToTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
