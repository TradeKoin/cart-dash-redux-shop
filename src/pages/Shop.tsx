
import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { fetchProducts } from '../store/slices/productsSlice';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import { useLanguage } from '../contexts/LanguageContext';

const Shop = () => {
  const dispatch = useAppDispatch();
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Cart />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('shopTitle')}</h1>
          <p className="text-muted-foreground">{t('shopSubtitle')}</p>
        </div>
        
        <CategoryFilter />
        <ProductGrid />
      </main>
    </div>
  );
};

export default Shop;
