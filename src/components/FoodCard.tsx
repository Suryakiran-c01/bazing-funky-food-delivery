import React from 'react';
import { FoodItem } from '../types/food';
import { useApp } from '../context/AppContext';
import { Star, Clock, Flame, Heart, Plus, Minus, Sparkles } from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const {
    cart,
    addToCart,
    updateCartQuantity,
    setActiveItemForDetail,
    favorites,
    toggleFavorite,
  } = useApp();

  const isFav = favorites.includes(item.id);

  // Find if this item is in the cart (sum of quantities across variations)
  const cartMatches = cart.filter((c) => c.item.id === item.id);
  const totalInCart = cartMatches.reduce((sum, c) => sum + c.quantity, 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If it has complex customizations (sizes/toppings), opening modal is best for user choice,
    // but if it's already in cart, increment the first match!
    if (cartMatches.length > 0) {
      updateCartQuantity(cartMatches[0].cartItemId, 1);
    } else {
      addToCart(item);
    }
  };

  const handleQuickDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartMatches.length > 0) {
      updateCartQuantity(cartMatches[cartMatches.length - 1].cartItemId, -1);
    }
  };

  return (
    <div
      onClick={() => setActiveItemForDetail(item)}
      className="pop-card bg-white rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100 border-b-3 border-[#25113D]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-300"
        />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 bg-white/95 p-1 rounded-md border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]">
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

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 border-2 border-[#25113D] flex items-center justify-center shadow-[2px_2px_0px_#25113D] hover:scale-110 transition-transform cursor-pointer"
          aria-label={isFav ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
        >
          <Heart
            className={`w-4 h-4 ${
              isFav ? 'text-[#FF4F9A] fill-[#FF4F9A]' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Bestseller / Spicy Badges */}
        <div className="absolute bottom-2.5 left-3 flex flex-wrap gap-1.5">
          {item.isBestseller && (
            <span className="px-2 py-0.5 rounded-lg bg-[#FFD93D] text-[#25113D] text-[10px] font-display font-black border border-[#25113D] shadow-[1px_1px_0px_#25113D] uppercase">
              ★ Bestseller
            </span>
          )}
          {item.isSpicy && (
            <span className="px-2 py-0.5 rounded-lg bg-[#FF4F9A] text-white text-[10px] font-display font-black border border-[#25113D] shadow-[1px_1px_0px_#25113D] uppercase flex items-center gap-0.5">
              <Flame className="w-3 h-3 fill-white" /> Spicy
            </span>
          )}
        </div>

        {/* Prep Time pill */}
        <div className="absolute bottom-2.5 right-3 bg-black/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-lg text-[10px] font-display font-bold flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#FFD93D]" />
          <span>{item.prepTime}</span>
        </div>
      </div>

      {/* Item Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-1.5 text-xs">
            <div className="flex items-center gap-1 font-display font-bold text-[#25113D]">
              <Star className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500 font-medium text-[11px]">
              ({item.reviewCount} reviews)
            </span>
          </div>

          {/* Item Name */}
          <h3 className="font-display font-bold text-base sm:text-lg text-[#25113D] group-hover:text-[#FF6B35] transition-colors leading-snug line-clamp-1 mb-1.5">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
            {item.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t-2 border-dashed border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[10px] font-display font-extrabold uppercase text-gray-400 leading-none">
              Price
            </span>
            <span className="font-display font-black text-lg sm:text-xl text-[#25113D]">
              ${item.price.toFixed(2)}
            </span>
          </div>

          {totalInCart > 0 ? (
            /* Quantity Stepper in Card */
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-[#FFD93D] border-2 border-[#25113D] rounded-xl shadow-[2px_2px_0px_#25113D] overflow-hidden"
            >
              <button
                onClick={handleQuickDecrement}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#fad02c] active:bg-[#e0b51a] cursor-pointer"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="w-3.5 h-3.5 text-[#25113D]" />
              </button>
              <span className="w-7 text-center font-display font-black text-sm text-[#25113D]">
                {totalInCart}
              </span>
              <button
                onClick={handleQuickAdd}
                className="w-8 h-8 flex items-center justify-center hover:bg-[#fad02c] active:bg-[#e0b51a] cursor-pointer"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="w-3.5 h-3.5 text-[#25113D]" />
              </button>
            </div>
          ) : (
            /* Add button */
            <button
              onClick={handleQuickAdd}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#FF6B35] text-white font-display font-bold text-xs sm:text-sm rounded-xl pop-btn flex items-center gap-1.5 hover:bg-[#ff5517] cursor-pointer"
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
