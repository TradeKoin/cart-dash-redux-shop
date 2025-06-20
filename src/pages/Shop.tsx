
import React, { useEffect, Suspense } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { fetchProducts } from '../store/slices/productsSlice';
import { CategoryFilter, Cart } from '../components/ShopComponents';
import InfiniteProductGrid from '../components/InfiniteProductGrid';
import { useLanguage } from '../contexts/LanguageContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { usePerformance } from '../hooks/usePerformance';

const ComponentSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-muted rounded mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 bg-muted rounded-lg" />
      ))}
    </div>
  </div>
);

const Shop = () => {
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  const performance = usePerformance('Shop');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        <Suspense fallback={<div className="h-16" />}>
          <Cart />
        </Suspense>
      </ErrorBoundary>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('shopTitle')}</h1>
          <p className="text-muted-foreground">{t('shopSubtitle')}</p>
        </div>
        
        <ErrorBoundary>
          <Suspense fallback={<div className="h-20 bg-muted rounded-lg mb-6 animate-pulse" />}>
            <CategoryFilter />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<ComponentSkeleton />}>
            <InfiniteProductGrid />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Shop;
