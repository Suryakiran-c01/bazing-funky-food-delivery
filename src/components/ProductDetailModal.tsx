import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  Check,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { CustomizationOption, SelectedCustomizations } from '../types/food';
import { calculateUnitPrice, formatCurrency } from '../utils/pricing';
import { MOCK_FOOD_ITEMS } from '../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const {
    activeItemForDetail,
    setActiveItemForDetail,
    addToCart,
    favorites,
    toggleFavorite,
  } = useApp();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<CustomizationOption | undefined>(undefined);
  const [selectedToppings, setSelectedToppings] = useState<CustomizationOption[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<CustomizationOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  useEffect(() => {
    if (activeItemForDetail) {
      setQuantity(1);
      setSelectedSize(
        activeItemForDetail.sizes && activeItemForDetail.sizes.length > 0
          ? activeItemForDetail.sizes[0]
          : undefined
      );
      setSelectedToppings([]);
      setSelectedSauces([]);
      setSpecialInstructions('');
    }
  }, [activeItemForDetail]);

  if (!activeItemForDetail) return null;

  const item = activeItemForDetail;
  const isFav = favorites.includes(item.id);

  const currentCustomizations: SelectedCustomizations = {
    size: selectedSize,
    toppings: selectedToppings,
    sauces: selectedSauces,
    specialInstructions: specialInstructions.trim() || undefined,
  };

  const unitPrice = calculateUnitPrice(item.price, currentCustomizations);
  const totalPrice = unitPrice * quantity;

  const handleToggleTopping = (topping: CustomizationOption) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const handleToggleSauce = (sauce: CustomizationOption) => {
    setSelectedSauces((prev) => {
      const exists = prev.some((s) => s.id === sauce.id);
      if (exists) {
        return prev.filter((s) => s.id !== sauce.id);
      } else {
        return [...prev, sauce];
      }
    });
  };

  const handleAddToCart = () => {
    addToCart(item, currentCustomizations, quantity);
    setActiveItemForDetail(null);
  };

  // Recommended sides
  const recommendedItems = (item.recommendedSides || [])
    .map((sideId) => MOCK_FOOD_ITEMS.find((f) => f.id === sideId))
    .filter((f): f is typeof MOCK_FOOD_ITEMS[0] => f !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border-4 border-[#25113D] rounded-3xl shadow-[10px_10px_0px_#25113D] my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setActiveItemForDetail(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/95 border-2 border-[#25113D] rounded-full flex items-center justify-center text-[#25113D] hover:bg-[#FF4F9A] hover:text-white shadow-[2px_2px_0px_#25113D] transition-colors cursor-pointer"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Product Image */}
        <div className="relative w-full h-60 sm:h-72 bg-gray-100 border-b-4 border-[#25113D]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-white/95 p-1 rounded-md border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]">
              <div
                className={`w-3.5 h-3.5 border-2 flex items-center justify-center ${
                  item.isVeg ? 'border-green-600' : 'border-red-600'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.isVeg ? 'bg-green-600' : 'bg-red-600'
                  }`}
                />
              </div>
            </div>

            {item.isBestseller && (
              <span className="px-2.5 py-1 rounded-xl bg-[#FFD93D] text-[#25113D] text-xs font-display font-black border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D] uppercase">
                ★ Bestseller
              </span>
            )}
            {item.isSpicy && (
              <span className="px-2.5 py-1 rounded-xl bg-[#FF4F9A] text-white text-xs font-display font-black border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D] uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-white" /> Fiery Hot
              </span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-1">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#25113D]">
                {item.name}
              </h2>
              <button
                onClick={() => toggleFavorite(item.id)}
                className="text-xs font-display font-bold text-[#FF4F9A] hover:underline"
              >
                {isFav ? '❤️ Saved' : '🤍 Save'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium mb-3">
              <div className="flex items-center gap-1 font-display font-bold text-[#25113D]">
                <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
                <span>{item.rating.toFixed(1)}</span>
                <span className="text-gray-400">({item.reviewCount} reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Prep: {item.prepTime}</span>
              </div>
              {item.calories && (
                <>
                  <span>•</span>
                  <span>🔥 {item.calories} kcal</span>
                </>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </div>

          {/* Size Options */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="pt-4 border-t-2 border-dashed border-gray-200">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="font-display font-bold text-base text-[#25113D]">
                  Choose Portion Size
                </h3>
                <span className="text-[11px] font-bold uppercase text-[#FF6B35] bg-[#FFF8E7] px-2 py-0.5 rounded-md border border-[#25113D]">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {item.sizes.map((s) => {
                  const isSelected = selectedSize?.id === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 rounded-2xl border-2 border-[#25113D] text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFD93D] shadow-[3px_3px_0px_#25113D] -translate-y-0.5'
                          : 'bg-white hover:bg-gray-50 shadow-[1px_1px_0px_#25113D]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-[#25113D]">
                          {s.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#25113D]" />}
                      </div>
                      <span className="text-xs font-bold text-[#FF6B35] mt-1 block">
                        {s.price === 0 ? 'Included' : `+${formatCurrency(s.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Toppings */}
          {item.toppings && item.toppings.length > 0 && (
            <div className="pt-4 border-t-2 border-dashed border-gray-200">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="font-display font-bold text-base text-[#25113D]">
                  Supercharge with Toppings
                </h3>
                <span className="text-xs text-gray-500 font-medium">Optional</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.toppings.map((t) => {
                  const isChecked = selectedToppings.some((topping) => topping.id === t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTopping(t)}
                      className={`p-3 rounded-xl border-2 border-[#25113D] flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#FFF8E7] shadow-[2px_2px_0px_#25113D]'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border-2 border-[#25113D] flex items-center justify-center ${
                            isChecked ? 'bg-[#FF6B35]' : 'bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="font-medium text-xs sm:text-sm text-[#25113D]">
                          {t.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#FF6B35]">
                        +{formatCurrency(t.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dipping Sauces */}
          {item.sauces && item.sauces.length > 0 && (
            <div className="pt-4 border-t-2 border-dashed border-gray-200">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="font-display font-bold text-base text-[#25113D]">
                  Signature Dips & Sauces
                </h3>
                <span className="text-xs text-gray-500 font-medium">Pick your favorites</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.sauces.map((s) => {
                  const isChecked = selectedSauces.some((sauce) => sauce.id === s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleToggleSauce(s)}
                      className={`p-3 rounded-xl border-2 border-[#25113D] flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#FFF8E7] shadow-[2px_2px_0px_#25113D]'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border-2 border-[#25113D] flex items-center justify-center ${
                            isChecked ? 'bg-[#FF6B35]' : 'bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="font-medium text-xs sm:text-sm text-[#25113D]">
                          {s.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#FF6B35]">
                        +{formatCurrency(s.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommended Sides */}
          {recommendedItems.length > 0 && (
            <div className="pt-4 border-t-2 border-dashed border-gray-200">
              <h3 className="font-display font-bold text-base text-[#25113D] mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                Pairs Insanely Well With
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {recommendedItems.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-2.5 rounded-2xl border-2 border-[#25113D] bg-[#FFF8E7] flex items-center gap-2.5"
                  >
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#25113D]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-display font-bold text-xs text-[#25113D] truncate block">
                        {rec.name}
                      </span>
                      <span className="text-xs font-extrabold text-[#FF6B35]">
                        ${rec.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(rec)}
                      className="p-1.5 bg-[#FF6B35] text-white rounded-lg border border-[#25113D] hover:bg-[#ff5517] cursor-pointer"
                      aria-label={`Add side ${rec.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions Input */}
          <div className="pt-4 border-t-2 border-dashed border-gray-200">
            <label className="block font-display font-bold text-sm text-[#25113D] mb-1">
              Special Cooking Instructions
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Extra crispy buns, no pickles, sauce on the side please!"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3 py-2 border-2 border-[#25113D] rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
          </div>
        </div>

        {/* Sticky Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-[#FFF8E7] border-t-4 border-[#25113D] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-white border-2 border-[#25113D] rounded-2xl shadow-[2px_2px_0px_#25113D] overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-[#25113D]" />
            </button>
            <span className="w-10 text-center font-display font-black text-base text-[#25113D]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-[#25113D]" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-6 bg-[#FF6B35] text-white font-display font-black text-base sm:text-lg rounded-2xl pop-btn flex items-center justify-between hover:bg-[#ff5517] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </span>
            <span>{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
