
import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { fetchProducts } from '../store/slices/productsSlice';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';

const Shop = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Cart />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Our Products</h1>
          <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>
        
        <CategoryFilter />
        <ProductGrid />
      </main>
    </div>
  );
};

export default Shop;
