
import React, { useCallback } from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleCart, updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { selectCartTotal, selectCartItemCount } from '../store/selectors';
import { useLanguage } from '../contexts/LanguageContext';
import OptimizedImage from './OptimizedImage';

const Cart = React.memo(() => {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector(state => state.cart);
  const total = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);
  const { t } = useLanguage();

  const handleToggleCart = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  }, [dispatch]);

  const handleRemoveFromCart = useCallback((id: number) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleToggleCart} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-xl border-l">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-foreground">{t('shoppingCart')} ({itemCount})</h2>
            <button
              onClick={handleToggleCart}
              className="p-2 hover:bg-muted rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t('cartEmpty')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-muted/50 p-3 rounded-lg">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground line-clamp-1">{item.title}</h3>
                      <p className="text-blue-600 font-semibold">${item.price}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1 bg-background rounded border">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-foreground">{t('total')}: ${total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                  {t('checkout')}
                </button>
                <button
                  onClick={handleClearCart}
                  className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 rounded-lg font-medium transition-colors"
                >
                  {t('clearCart')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Cart.displayName = 'Cart';

export default Cart;
