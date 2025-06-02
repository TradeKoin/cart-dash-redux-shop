
import React, { useEffect, useRef, useMemo } from 'react';
import { useInfiniteProducts } from '../services/productsService';
import ProductCard from './ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppSelector } from '../hooks/redux';
import { Loader2 } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';
import { usePerformance } from '../hooks/usePerformance';

const InfiniteProductGrid = React.memo(() => {
  const { selectedCategory, searchTerm } = useAppSelector(state => state.products);
  const { t } = useLanguage();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const performance = usePerformance('InfiniteProductGrid');

  // Create filters string for query key
  const filters = useMemo(() => 
    JSON.stringify({ category: selectedCategory, search: searchTerm }), 
    [selectedCategory, searchTerm]
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteProducts(filters);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten all pages into a single array with memoization
  const allProducts = useMemo(() => 
    data?.pages.flatMap(page => page.products) || [], 
    [data]
  );

  // Filter products based on category and search with memoization
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchTerm]);

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

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{t('error')}: {error?.message}</p>
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
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ErrorBoundary key={product.id}>
              <ProductCard product={product} />
            </ErrorBoundary>
          ))}
        </div>

        {/* Load more trigger */}
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading more products...</span>
            </div>
          )}
          {!hasNextPage && filteredProducts.length > 0 && (
            <p className="text-muted-foreground">You've reached the end!</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
});

InfiniteProductGrid.displayName = 'InfiniteProductGrid';

export default InfiniteProductGrid;
