
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setSearchTerm } from '../store/slices/productsSlice';
import { toggleCart } from '../store/slices/cartSlice';
import { useDebounce } from '../hooks/useDebounce';

const Header = () => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(state => state.products);
  const { itemCount } = useAppSelector(state => state.cart);
  
  // Local state for immediate UI updates
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Debounced value that will trigger the actual search
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  // Update Redux state only when debounced value changes
  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  // Sync local state with Redux state on external changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ShopHub</h1>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button
            onClick={() => dispatch(toggleCart())}
            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
