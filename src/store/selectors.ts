
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// Basic selectors
const selectProducts = (state: RootState) => state.products.products;
const selectSearchTerm = (state: RootState) => state.products.searchTerm;
const selectSelectedCategory = (state: RootState) => state.products.selectedCategory;
const selectCartItems = (state: RootState) => state.cart.items;

// Memoized selector for filtered products
export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchTerm, selectSelectedCategory],
  (products, searchTerm, selectedCategory) => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }
);

// Memoized selector for cart total
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

// Memoized selector for cart item count
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

// Memoized selector for categories
export const selectCategories = createSelector(
  [selectProducts],
  (products) => ['all', ...Array.from(new Set(products.map(p => p.category)))]
);
