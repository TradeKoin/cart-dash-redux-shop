
import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useInfiniteProducts } from '../services/productsService';
import ProductCard from './ProductCard';
import { useAppSelector } from '../hooks/redux';
import { Product } from '../store/slices/productsSlice';

interface ItemData {
  products: Product[];
  itemsPerRow: number;
}

const ProductRow: React.FC<{ index: number; style: any; data: ItemData }> = ({
  index,
  style,
  data,
}) => {
  const { products, itemsPerRow } = data;
  const startIndex = index * itemsPerRow;
  const rowProducts = products.slice(startIndex, startIndex + itemsPerRow);

  return (
    <div style={style} className="flex gap-6 px-4">
      {rowProducts.map((product) => (
        <div key={product.id} className="flex-1">
          <ProductCard product={product} />
        </div>
      ))}
      {/* Fill empty slots if row is not complete */}
      {Array.from({ length: itemsPerRow - rowProducts.length }, (_, i) => (
        <div key={`empty-${i}`} className="flex-1" />
      ))}
    </div>
  );
};

interface VirtualizedProductListProps {
  height?: number;
  itemsPerRow?: number;
  rowHeight?: number;
}

const VirtualizedProductList: React.FC<VirtualizedProductListProps> = ({
  height = 600,
  itemsPerRow = 3,
  rowHeight = 400,
}) => {
  const { selectedCategory, searchTerm } = useAppSelector(state => state.products);
  
  const filters = JSON.stringify({ category: selectedCategory, search: searchTerm });
  const { data, isLoading } = useInfiniteProducts(filters);

  const allProducts = useMemo(() => {
    return data?.pages.flatMap(page => page.products) || [];
  }, [data]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchTerm]);

  const itemData: ItemData = useMemo(() => ({
    products: filteredProducts,
    itemsPerRow,
  }), [filteredProducts, itemsPerRow]);

  const itemCount = Math.ceil(filteredProducts.length / itemsPerRow);

  if (isLoading) {
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

  return (
    <List
      height={height}
      width="100%"
      itemCount={itemCount}
      itemSize={rowHeight}
      itemData={itemData}
      className="w-full"
    >
      {ProductRow}
    </List>
  );
};

export default VirtualizedProductList;
