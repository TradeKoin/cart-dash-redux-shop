
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSelectedCategory } from '../store/slices/productsSlice';
import { selectCategories } from '../store/selectors';
import { useLanguage } from '../contexts/LanguageContext';

const CategoryFilter = React.memo(() => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const { selectedCategory } = useAppSelector(state => state.products);
  const { t } = useLanguage();

  const handleCategoryChange = useCallback((category: string) => {
    dispatch(setSelectedCategory(category));
  }, [dispatch]);

  return (
    <div className="bg-card rounded-lg shadow-sm p-4 mb-6 border">
      <h3 className="text-lg font-semibold text-foreground mb-3">{t('categories')}</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
