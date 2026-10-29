import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateUnitPrice,
  createCartItemId,
  calculateCartTotals,
  getNextOrderStatus,
  PROMO_CODES,
} from './pricing';
import { CartItem, FoodItem } from '../types/food';

const mockFoodItem: FoodItem = {
  id: 'burger-1',
  name: 'Bazinga Big Kahuna Burger',
  category: 'Burgers',
  description: 'Signature juicy patty with melted cheese and crispy onion rings',
  price: 9.99,
  rating: 4.9,
  reviewCount: 320,
  prepTime: '15-20 min',
  isVeg: false,
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
};

test('calculateUnitPrice adds sizes, toppings, and sauces correctly', () => {
  const base = 9.99;
  const unitPrice = calculateUnitPrice(base, {
    size: { id: 'large', name: 'Large', price: 2.5 },
    toppings: [
      { id: 'bacon', name: 'Crispy Bacon', price: 1.5 },
      { id: 'cheese', name: 'Extra Cheddar', price: 1.0 },
    ],
    sauces: [{ id: 'bbq', name: 'Smoky BBQ', price: 0.75 }],
  });
  // 9.99 + 2.50 + 1.50 + 1.00 + 0.75 = 15.74
  assert.equal(unitPrice, 15.74);
});

test('calculateUnitPrice without customization returns base price', () => {
  const unitPrice = calculateUnitPrice(9.99);
  assert.equal(unitPrice, 9.99);
});

test('createCartItemId generates distinct IDs for different toppings or sizes', () => {
  const id1 = createCartItemId('burger-1', {
    size: { id: 'regular', name: 'Regular', price: 0 },
    toppings: [{ id: 'cheese', name: 'Extra Cheddar', price: 1.0 }],
    sauces: [],
  });

  const id2 = createCartItemId('burger-1', {
    size: { id: 'large', name: 'Large', price: 2.0 },
    toppings: [{ id: 'cheese', name: 'Extra Cheddar', price: 1.0 }],
    sauces: [],
  });

  assert.notEqual(id1, id2);
});

test('calculateCartTotals computes subtotal, taxes, and free delivery over threshold', () => {
  const items: CartItem[] = [
    {
      cartItemId: 'item-1',
      item: mockFoodItem,
      quantity: 4,
      customizations: { toppings: [], sauces: [] },
      unitPrice: 10.0,
    },
  ];

  // Subtotal = 40.00 (>= 35 threshold, so delivery fee = 0)
  const totals = calculateCartTotals(items, undefined, false);
  assert.equal(totals.subtotal, 40.0);
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.taxes, 3.2); // 40 * 0.08 = 3.2
  assert.equal(totals.total, 43.2);
});

test('calculateCartTotals applies BAZINGA50 promo code with max cap', () => {
  const items: CartItem[] = [
    {
      cartItemId: 'item-1',
      item: mockFoodItem,
      quantity: 3,
      customizations: { toppings: [], sauces: [] },
      unitPrice: 10.0,
    },
  ];

  // Subtotal = 30.00. 50% would be $15, but maxDiscount is $10. Delivery fee = $2.99
  const totals = calculateCartTotals(items, 'BAZINGA50', false);
  assert.equal(totals.subtotal, 30.0);
  assert.equal(totals.discount, 10.0);
  assert.equal(totals.promoApplied?.code, 'BAZINGA50');
  assert.equal(totals.deliveryFee, 2.99);
  // Taxable = 30 - 10 = 20. Tax = 20 * 0.08 = 1.60
  assert.equal(totals.taxes, 1.6);
  // Total = 20 + 2.99 + 1.60 = 24.59
  assert.equal(totals.total, 24.59);
});

test('calculateCartTotals applies FREESHIP promo code', () => {
  const items: CartItem[] = [
    {
      cartItemId: 'item-1',
      item: mockFoodItem,
      quantity: 1,
      customizations: { toppings: [], sauces: [] },
      unitPrice: 20.0,
    },
  ];

  const totals = calculateCartTotals(items, 'FREESHIP', false);
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.promoApplied?.code, 'FREESHIP');
});

test('getNextOrderStatus cycles through order tracking stages correctly', () => {
  assert.equal(getNextOrderStatus('placed'), 'preparing');
  assert.equal(getNextOrderStatus('preparing'), 'out_for_delivery');
  assert.equal(getNextOrderStatus('out_for_delivery'), 'delivered');
  assert.equal(getNextOrderStatus('delivered'), 'delivered');
});
