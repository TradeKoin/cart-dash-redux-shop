
import { useEffect, useRef } from 'react';
import { usePrefetch } from './usePrefetch';
import { useLocalStorage } from './useLocalStorage';

interface UserBehavior {
  viewedProducts: number[];
  categoryInteractions: Record<string, number>;
  timeSpentOnProducts: Record<number, number>;
}

export const useSmartPrefetch = () => {
  const { prefetchProduct, prefetchNextPage } = usePrefetch();
  const [userBehavior, setUserBehavior] = useLocalStorage<UserBehavior>('user-behavior', {
    viewedProducts: [],
    categoryInteractions: {},
    timeSpentOnProducts: {},
  });
  
  const viewStartTime = useRef<number>(0);
  const currentProductId = useRef<number | null>(null);

  const trackProductView = (productId: number) => {
    setUserBehavior(prev => ({
      ...prev,
      viewedProducts: [...new Set([...prev.viewedProducts, productId])].slice(-50), // Keep last 50
    }));
    
    // Start timing
    viewStartTime.current = Date.now();
    currentProductId.current = productId;
  };

  const trackProductLeave = () => {
    if (currentProductId.current && viewStartTime.current) {
      const timeSpent = Date.now() - viewStartTime.current;
      const productId = currentProductId.current;
      
      setUserBehavior(prev => ({
        ...prev,
        timeSpentOnProducts: {
          ...prev.timeSpentOnProducts,
          [productId]: (prev.timeSpentOnProducts[productId] || 0) + timeSpent,
        },
      }));
    }
    
    currentProductId.current = null;
    viewStartTime.current = 0;
  };

  const trackCategoryInteraction = (category: string) => {
    setUserBehavior(prev => ({
      ...prev,
      categoryInteractions: {
        ...prev.categoryInteractions,
        [category]: (prev.categoryInteractions[category] || 0) + 1,
      },
    }));
  };

  const getRecommendedProducts = (): number[] => {
    // Simple recommendation based on most viewed and time spent
    const { viewedProducts, timeSpentOnProducts } = userBehavior;
    
    return viewedProducts
      .sort((a, b) => (timeSpentOnProducts[b] || 0) - (timeSpentOnProducts[a] || 0))
      .slice(0, 5);
  };

  const shouldPrefetchProduct = (productId: number): boolean => {
    const recommendations = getRecommendedProducts();
    return recommendations.includes(productId) || Math.random() < 0.3; // 30% chance for exploration
  };

  // Auto-prefetch based on scroll position and user behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / documentHeight;

      // Prefetch next page when 70% scrolled
      if (scrollPercentage > 0.7) {
        prefetchNextPage(0); // Simplified for demo
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefetchNextPage]);

  return {
    trackProductView,
    trackProductLeave,
    trackCategoryInteraction,
    shouldPrefetchProduct,
    getRecommendedProducts,
    userBehavior,
  };
};
