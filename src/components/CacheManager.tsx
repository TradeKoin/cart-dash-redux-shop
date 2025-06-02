
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCw } from 'lucide-react';
import { storage } from '../utils/storage';
import { productKeys } from '../services/productsService';
import { useToast } from '../hooks/use-toast';

const CacheManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const clearQueryCache = () => {
    queryClient.clear();
    toast({
      title: "Cache Cleared",
      description: "All cached data has been removed.",
    });
  };

  const invalidateProducts = () => {
    queryClient.invalidateQueries({ queryKey: productKeys.all });
    toast({
      title: "Products Refreshed",
      description: "Product data will be refetched from the server.",
    });
  };

  const clearLocalStorage = () => {
    storage.clear();
    toast({
      title: "Storage Cleared",
      description: "All local storage data has been removed.",
    });
  };

  const prefetchAllProducts = () => {
    queryClient.prefetchQuery({
      queryKey: productKeys.lists(),
      queryFn: async () => {
        // This would be your actual API call
        const response = await fetch('/api/products');
        return response.json();
      },
    });
    toast({
      title: "Prefetch Started",
      description: "Products are being loaded in the background.",
    });
  };

  return (
    <div className="p-4 bg-card border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Cache Management</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={invalidateProducts}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Products</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={prefetchAllProducts}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Prefetch Data</span>
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          onClick={clearQueryCache}
          className="flex items-center space-x-2"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear Cache</span>
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          onClick={clearLocalStorage}
          className="flex items-center space-x-2"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear Storage</span>
        </Button>
      </div>
    </div>
  );
};

export default CacheManager;
