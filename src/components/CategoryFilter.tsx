
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSelectedCategory } from '../store/slices/productsSlice';

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector(state => state.products);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => dispatch(setSelectedCategory(category))}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
