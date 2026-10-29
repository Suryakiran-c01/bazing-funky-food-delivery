import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/mockData';
import { FoodCategory } from '../types/food';

export const CategoryChips: React.FC = () => {
  const { categoryFilter, setCategoryFilter } = useApp();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#25113D] flex items-center gap-2">
            <span>What's Your Craving?</span>
            <span className="text-xl">🍟🍕</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Tap a category to filter the tastiest treats in town.
          </p>
        </div>

        <button
          onClick={() => setCategoryFilter('All')}
          className="text-xs font-display font-bold text-[#FF6B35] hover:underline uppercase tracking-wider"
        >
          View All ({CATEGORIES_LIST.length})
        </button>
      </div>

      {/* Horizontal Scrollable Categories */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = categoryFilter === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as FoodCategory)}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border-2 border-[#25113D] transition-all cursor-pointer font-display select-none ${
                isSelected
                  ? 'bg-[#FF6B35] text-white shadow-[4px_4px_0px_#25113D] -translate-y-1 scale-105'
                  : 'bg-white text-[#25113D] hover:bg-[#FFF8E7] shadow-[2px_2px_0px_#25113D]'
              }`}
              aria-pressed={isSelected}
            >
              <span className="text-2xl transform transition-transform group-hover:scale-125">
                {cat.icon}
              </span>
              <span className="font-bold text-sm tracking-wide">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
