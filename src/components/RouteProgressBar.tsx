
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const RouteProgressBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Start loading when route changes
    setIsLoading(true);
    setProgress(0);

    // Simulate progress during route change
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 100);

    // Complete the progress bar after a short delay
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50">
      <Progress 
        value={progress} 
        className="h-1 rounded-none bg-transparent"
      />
    </div>
  );
};

export default RouteProgressBar;
