import React from 'react';
import { useApp } from '../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { CategoryChips } from './CategoryChips';
import { FoodCard } from './FoodCard';
import { MOCK_FOOD_ITEMS, SPECIAL_COMBOS } from '../data/mockData';
import { Sparkles, Flame, ArrowRight, Star, Tag, Award, Zap } from 'lucide-react';
import { formatCurrency } from '../utils/pricing';

export const HomeView: React.FC = () => {
  const { setScreen, setCategoryFilter, addToCart, showToast } = useApp();

  const bestsellers = MOCK_FOOD_ITEMS.filter((item) => item.isBestseller);
  const popularItems = MOCK_FOOD_ITEMS.filter((item) => item.isPopular);
  const recommendations = MOCK_FOOD_ITEMS.slice(3, 7);

  const handleAddCombo = (combo: typeof SPECIAL_COMBOS[0]) => {
    // Add primary item of combo or create a bundle notification
    const matched = MOCK_FOOD_ITEMS.find((f) => f.id === combo.itemsIncluded[0]);
    if (matched) {
      addToCart(matched);
      showToast(`Added ${combo.title} deal! 🔥`, 'bazinga');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Chips */}
      <CategoryChips />

      {/* Special Offers & Combo Deals */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF4F9A] text-white font-display font-black text-xs border border-[#25113D] shadow-[2px_2px_0px_#25113D] uppercase">
                SUPER DEALS
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#25113D]">
                Special Offers & Combos
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              Massive feast bundles engineered for hangouts, dorm parties, and late night study sessions.
            </p>
          </div>

          <button
            onClick={() => {
              setCategoryFilter('All');
              setScreen('menu');
            }}
            className="hidden sm:flex items-center gap-1 font-display font-bold text-xs text-[#FF6B35] hover:underline uppercase tracking-wider"
          >
            <span>All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="pop-card bg-white rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100 border-b-3 border-[#25113D]">
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#FFD93D] text-[#25113D] px-2.5 py-0.5 rounded-lg border-2 border-[#25113D] font-display font-black text-xs shadow-[2px_2px_0px_#25113D]">
                  {combo.badge}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-display font-black uppercase text-[#FF6B35] tracking-wider block mb-1">
                    {combo.tagline}
                  </span>
                  <h3 className="font-display font-black text-lg text-[#25113D] mb-2 leading-tight">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {combo.description}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-xl text-[#25113D]">
                      ${combo.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-gray-400 line-through">
                      ${combo.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    className="px-4 py-2 bg-[#FF6B35] text-white font-display font-bold text-xs rounded-xl pop-btn hover:bg-[#ff5517] cursor-pointer"
                  >
                    Grab Combo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFD93D] text-[#25113D] font-display font-black text-xs border border-[#25113D] shadow-[2px_2px_0px_#25113D] uppercase">
                CROWD FAVORITES
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#25113D]">
                BAZINGA Bestsellers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              The dishes our regulars order on repeat every single week.
            </p>
          </div>

          <button
            onClick={() => {
              setCategoryFilter('Burgers');
              setScreen('menu');
            }}
            className="flex items-center gap-1 font-display font-bold text-xs text-[#FF6B35] hover:underline uppercase tracking-wider"
          >
            <span>See More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.slice(0, 4).map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Pop-Art Midnight Craving Callout Banner */}
      <div className="pop-card bg-[#25113D] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 comic-dots opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD93D] text-[#25113D] font-display font-black text-xs rounded-full border border-[#25113D] uppercase mb-3 shadow-[2px_2px_0px_#25113D]">
            <Flame className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>NIGHT OWL HEADQUARTERS</span>
          </div>
          <h3 className="font-bungee text-2xl sm:text-3xl text-white tracking-tight mb-2">
            Hungry at 1:30 AM? We Got You!
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium">
            Our kitchen runs the flames till 3:00 AM daily with piping hot delivery to dorms, co-working labs, and homes.
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          <button
            onClick={() => {
              setCategoryFilter('Fries');
              setScreen('menu');
            }}
            className="px-6 py-3.5 bg-[#B8F34A] text-[#25113D] font-display font-black text-sm rounded-2xl pop-btn hover:bg-[#a6e633] cursor-pointer"
          >
            Order Midnight Loaded Fries 🍟
          </button>
        </div>
      </div>

      {/* Popular Items Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#25113D]">
              Popular Right Now
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              Trending flavors ordered in the last few hours across Metro City.
            </p>
          </div>

          <button
            onClick={() => {
              setCategoryFilter('All');
              setScreen('menu');
            }}
            className="flex items-center gap-1 font-display font-bold text-xs text-[#FF6B35] hover:underline uppercase tracking-wider"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.slice(0, 4).map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border-3 border-[#25113D] shadow-[6px_6px_0px_#25113D]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#FF4F9A] text-white border-2 border-[#25113D] flex items-center justify-center text-xl shadow-[2px_2px_0px_#25113D]">
            ✨
          </div>
          <div>
            <h2 className="font-display font-black text-2xl text-[#25113D]">
              Personalized for Your Tastebuds
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Based on your flavor profile and current trending combinations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};
