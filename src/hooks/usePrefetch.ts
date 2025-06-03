
import { useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { productKeys, useProduct } from '../services/productsService';

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const prefetchTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const prefetchProduct = useCallback((id: number, delay = 300) => {
    const key = `product-${id}`;
    
    // Clear existing timeout
    const existingTimeout = prefetchTimeouts.current.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => fetch(`/api/products/${id}`).then(res => res.json()),
        staleTime: 5 * 60 * 1000,
      });
      prefetchTimeouts.current.delete(key);
    }, delay);

    prefetchTimeouts.current.set(key, timeout);
  }, [queryClient]);

  const cancelPrefetch = useCallback((id: number) => {
    const key = `product-${id}`;
    const timeout = prefetchTimeouts.current.get(key);
    if (timeout) {
      clearTimeout(timeout);
      prefetchTimeouts.current.delete(key);
    }
  }, []);

  const prefetchNextPage = useCallback((currentPage: number) => {
    const nextPage = currentPage + 1;
    queryClient.prefetchInfiniteQuery({
      queryKey: productKeys.infinite(''),
      queryFn: ({ pageParam = 0 }) => 
        fetch(`/api/products?page=${pageParam}`).then(res => res.json()),
      initialPageParam: nextPage,
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);

  return {
    prefetchProduct,
    cancelPrefetch,
    prefetchNextPage,
  };
};
