
import { useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { Product } from '../store/slices/productsSlice';

// Mock API data - same as in productsSlice
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    title: "Premium Coffee Beans",
    price: 24.99,
    description: "Organic single-origin coffee beans roasted to perfection.",
    category: "food",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
    rating: { rate: 4.8, count: 89 }
  },
  {
    id: 3,
    title: "Minimalist Watch",
    price: 199.99,
    description: "Elegant minimalist watch with leather strap and Swiss movement.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    rating: { rate: 4.3, count: 156 }
  },
  {
    id: 4,
    title: "Smartphone Stand",
    price: 15.99,
    description: "Adjustable smartphone stand for desk use with anti-slip base.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop",
    rating: { rate: 4.1, count: 203 }
  },
  {
    id: 5,
    title: "Yoga Mat",
    price: 39.99,
    description: "Eco-friendly yoga mat with superior grip and cushioning.",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
    rating: { rate: 4.6, count: 78 }
  },
  {
    id: 6,
    title: "Leather Backpack",
    price: 129.99,
    description: "Vintage leather backpack with multiple compartments and laptop sleeve.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: { rate: 4.4, count: 92 }
  },
  // Generate more mock products for pagination demo
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 7,
    title: `Product ${i + 7}`,
    price: Math.floor(Math.random() * 200) + 10,
    description: `Description for product ${i + 7}. High-quality item with excellent features.`,
    category: ['electronics', 'food', 'accessories', 'fitness'][Math.floor(Math.random() * 4)],
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=500&h=500&fit=crop`,
    rating: { rate: Math.round((Math.random() * 2 + 3) * 10) / 10, count: Math.floor(Math.random() * 200) + 20 }
  }))
];

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  infinite: (filters: string) => [...productKeys.all, 'infinite', { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

// API functions
const fetchProducts = async (page = 0, limit = 12): Promise<{ products: Product[], nextPage: number | null }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const start = page * limit;
  const end = start + limit;
  const products = mockProducts.slice(start, end);
  const hasMore = end < mockProducts.length;
  
  return {
    products,
    nextPage: hasMore ? page + 1 : null
  };
};

const fetchProduct = async (id: number): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const product = mockProducts.find(p => p.id === id);
  if (!product) throw new Error('Product not found');
  return product;
};

// React Query hooks
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => fetchProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInfiniteProducts = (filters?: string) => {
  return useInfiniteQuery({
    queryKey: productKeys.infinite(filters || ''),
    queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam, 12),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    staleTime: 10 * 60 * 1000, // 10 minutes for individual products
  });
};

// Prefetch helpers
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(id),
      queryFn: () => fetchProduct(id),
      staleTime: 10 * 60 * 1000,
    });
  };
};
