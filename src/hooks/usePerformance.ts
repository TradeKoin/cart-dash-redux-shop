
import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  mountTime: number;
  updateCount: number;
}

export const usePerformance = (componentName: string): PerformanceMetrics => {
  const mountTimeRef = useRef<number>(Date.now());
  const renderStartRef = useRef<number>(Date.now());
  const updateCountRef = useRef<number>(0);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    mountTime: 0,
    updateCount: 0,
  });

  useEffect(() => {
    const mountTime = Date.now() - mountTimeRef.current;
    setMetrics(prev => ({ ...prev, mountTime }));
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} mounted in ${mountTime}ms`);
    }
  }, [componentName]);

  useEffect(() => {
    updateCountRef.current += 1;
    const renderTime = Date.now() - renderStartRef.current;
    
    setMetrics(prev => ({
      ...prev,
      renderTime,
      updateCount: updateCountRef.current,
    }));

    if (process.env.NODE_ENV === 'development' && updateCountRef.current > 1) {
      console.log(`[Performance] ${componentName} re-rendered (${updateCountRef.current}) in ${renderTime}ms`);
    }
  });

  // Reset render timer at the start of each render
  renderStartRef.current = Date.now();

  return metrics;
};

export const useRenderCounter = (componentName: string): number => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Render] ${componentName} rendered ${renderCount.current} times`);
  }

  return renderCount.current;
};
