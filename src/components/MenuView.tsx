import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_FOOD_ITEMS, CATEGORIES_LIST } from '../data/mockData';
import { FoodCard } from './FoodCard';
import { FoodCategory, FoodItem } from '../types/food';
import {
  Search,
  SlidersHorizontal,
  Flame,
  ArrowUpDown,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

export const MenuView: React.FC = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    dietaryFilter,
    setDietaryFilter,
    sortBy,
    setSortBy,
  } = useApp();

  const [priceRange, setPriceRange] = useState<'all' | 'under10' | '10to15' | 'above15'>('all');

  const filteredItems = useMemo(() => {
    return MOCK_FOOD_ITEMS.filter((item) => {
      // Category filter
      if (categoryFilter !== 'All' && item.category !== categoryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTags) {
          return false;
        }
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'non-veg' && item.isVeg) return false;
      if (dietaryFilter === 'spicy' && !item.isSpicy) return false;

      // Price filter
      if (priceRange === 'under10' && item.price >= 10) return false;
      if (priceRange === '10to15' && (item.price < 10 || item.price > 15)) return false;
      if (priceRange === 'above15' && item.price <= 15) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // 'popular'
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });
  }, [categoryFilter, searchQuery, dietaryFilter, priceRange, sortBy]);

  const handleResetFilters = () => {
    setCategoryFilter('All');
    setSearchQuery('');
    setDietaryFilter('all');
    setPriceRange('all');
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Menu Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD93D] text-[#25113D] border border-[#25113D] rounded-full text-xs font-display font-black uppercase mb-2 shadow-[2px_2px_0px_#25113D]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            BAZINGA Full Cafe Menu
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#25113D]">
            Explore All Cravings
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
            Browse handcrafted burgers, artisan pizzas, animal-style loaded fries & freakshakes.
          </p>
        </div>

        {/* Search Input on Menu Screen */}
        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#25113D]" />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#25113D] rounded-2xl text-xs sm:text-sm font-medium shadow-[3px_3px_0px_#25113D] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-gray-400 hover:text-[#25113D] font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = categoryFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as FoodCategory)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-2xl border-2 border-[#25113D] text-xs font-display font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FF6B35] text-white shadow-[3px_3px_0px_#25113D] -translate-y-0.5'
                  : 'bg-white text-[#25113D] hover:bg-[#FFF8E7]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="p-4 bg-white rounded-3xl border-2 border-[#25113D] shadow-[4px_4px_0px_#25113D] flex flex-wrap items-center justify-between gap-4">
        {/* Left: Dietary Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-display font-black text-gray-500 uppercase mr-1">
            Diet:
          </span>
          {[
            { id: 'all', label: 'All' },
            { id: 'veg', label: '🟢 Pure Veg' },
            { id: 'non-veg', label: '🔴 Non-Veg' },
            { id: 'spicy', label: '🔥 Spicy Only' },
          ].map((diet) => (
            <button
              key={diet.id}
              onClick={() => setDietaryFilter(diet.id as any)}
              className={`px-3 py-1.5 rounded-xl border-2 border-[#25113D] text-xs font-display font-bold transition-all cursor-pointer ${
                dietaryFilter === diet.id
                  ? 'bg-[#FFD93D] text-[#25113D] shadow-[2px_2px_0px_#25113D]'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {diet.label}
            </button>
          ))}
        </div>

        {/* Middle: Price Bracket */}
        <div className="flex items-center gap-1.5 text-xs font-display font-bold">
          <span className="text-gray-500 uppercase font-black mr-1">Price:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'under10', label: '< $10' },
            { id: '10to15', label: '$10 - $15' },
            { id: 'above15', label: '$15+' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPriceRange(p.id as any)}
              className={`px-2.5 py-1.5 rounded-xl border border-[#25113D] text-[11px] transition-all cursor-pointer ${
                priceRange === p.id
                  ? 'bg-[#B8F34A] text-[#25113D] font-black'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Right: Sort By dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 bg-[#FFF8E7] border-2 border-[#25113D] rounded-xl text-xs font-display font-bold text-[#25113D] focus:outline-none cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs font-display font-bold text-gray-500">
        <span>Showing {filteredItems.length} delicious items</span>

        {(categoryFilter !== 'All' || dietaryFilter !== 'all' || priceRange !== 'all' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[#FF6B35] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Food Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border-3 border-[#25113D] shadow-[6px_6px_0px_#25113D]">
          <span className="text-5xl block mb-3">🔍🍔</span>
          <h3 className="font-display font-black text-2xl text-[#25113D] mb-2">
            No dishes matched your filters!
          </h3>
          <p className="text-gray-600 text-sm max-w-sm mx-auto mb-6">
            Try resetting your dietary preference or search keywords to see all BAZINGA cafe items.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-3 bg-[#FF6B35] text-white font-display font-bold text-sm rounded-2xl pop-btn cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
