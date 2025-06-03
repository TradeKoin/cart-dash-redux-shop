
import React, { useCallback, useMemo } from 'react';
import { Star, ShoppingCart, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../store/slices/productsSlice';
import { useAppDispatch } from '../hooks/redux';
import { addToCart } from '../store/slices/cartSlice';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrefetch } from '../hooks/usePrefetch';
import { useSmartPrefetch } from '../hooks/useSmartPrefetch';
import OptimizedImage from './OptimizedImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { prefetchProduct, cancelPrefetch } = usePrefetch();
  const { shouldPrefetchProduct, trackProductView } = useSmartPrefetch();

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
    toast({
      title: t('addedToCart'),
      description: `${product.title} ${t('addedToCartDesc')}`,
    });
  }, [dispatch, product, toast, t]);

  const handleMouseEnter = useCallback(() => {
    if (shouldPrefetchProduct(product.id)) {
      prefetchProduct(product.id, 200); // Shorter delay for smart prefetch
    }
    trackProductView(product.id);
  }, [product.id, prefetchProduct, shouldPrefetchProduct, trackProductView]);

  const handleMouseLeave = useCallback(() => {
    cancelPrefetch(product.id);
  }, [product.id, cancelPrefetch]);

  const formattedPrice = useMemo(() => `$${product.price.toFixed(2)}`, [product.price]);
  
  const ratingDisplay = useMemo(() => ({
    rate: product.rating.rate.toFixed(1),
    count: product.rating.count
  }), [product.rating]);

  return (
    <div 
      className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group border"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">{product.title}</h3>
          <span className="text-lg font-bold text-blue-600 ml-2">{formattedPrice}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-muted-foreground">{ratingDisplay.rate}</span>
            </div>
            <span className="ml-2 text-sm text-muted-foreground">({ratingDisplay.count})</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{t('addToCart')}</span>
          </button>
          
          <Link
            to="/checkout"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <CreditCard className="h-4 w-4" />
            <span>{t('buyNow')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.title === nextProps.product.title
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
