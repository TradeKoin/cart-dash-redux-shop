
import React from 'react';
import { useAppSelector } from '../hooks/redux';
import ProductCard from './ProductCard';
import { useLanguage } from '../contexts/LanguageContext';

const ProductGrid = () => {
  const { filteredProducts, loading, error } = useAppSelector(state => state.products);
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden animate-pulse border">
            <div className="h-48 bg-muted" />
            <div className="p-4">
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-3 bg-muted rounded mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-muted rounded w-16" />
                <div className="h-8 bg-muted rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{t('error')}: {error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t('noProducts')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
