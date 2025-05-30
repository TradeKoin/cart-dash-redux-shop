
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useAppDispatch } from '../hooks/redux';
import { fetchProducts } from '../store/slices/productsSlice';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';

const ShoppingApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Cart />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter />
        <ProductGrid />
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <Provider store={store}>
      <ShoppingApp />
    </Provider>
  );
};

export default Index;
