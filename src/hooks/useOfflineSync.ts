
import { useState, useEffect } from 'react';
import { useAppDispatch } from './redux';
import { requestBackgroundSync } from '../utils/serviceWorker';

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingOperations, setPendingOperations] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Trigger background sync when coming back online
      if (pendingOperations.length > 0) {
        requestBackgroundSync('cart-sync');
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingOperations]);

  const addPendingOperation = (operation: string) => {
    setPendingOperations(prev => [...prev, operation]);
  };

  const clearPendingOperations = () => {
    setPendingOperations([]);
  };

  return {
    isOnline,
    pendingOperations,
    addPendingOperation,
    clearPendingOperations,
  };
};
