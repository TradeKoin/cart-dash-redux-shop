
import React from 'react';
import { useAppSelector } from '../hooks/redux';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const { filteredProducts, loading, error } = useAppSelector(state => state.products);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300" />
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2" />
              <div className="h-3 bg-gray-300 rounded mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-gray-300 rounded w-16" />
                <div className="h-8 bg-gray-300 rounded w-24" />
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
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found.</p>
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
