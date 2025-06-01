
import { lazy } from 'react';

// Lazy load heavy shop-related components
export const CategoryFilter = lazy(() => import('./CategoryFilter'));
export const ProductGrid = lazy(() => import('./ProductGrid'));
export const Cart = lazy(() => import('./Cart'));
