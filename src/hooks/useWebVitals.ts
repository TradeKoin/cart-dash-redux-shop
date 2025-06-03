
import { useEffect } from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

export const useWebVitals = (onMetric?: (metric: WebVitalMetric) => void) => {
  useEffect(() => {
    const reportMetric = (metric: WebVitalMetric) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vital] ${metric.name}: ${metric.value}ms`);
      }
      
      // Call custom handler if provided
      onMetric?.(metric);
      
      // Here you could send to analytics service
      // analytics.track('web_vital', metric);
    };

    // Measure Core Web Vitals
    const measureCLS = () => {
      let clsValue = 0;
      let clsEntries: LayoutShift[] = [];

      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as LayoutShift[]) {
          if (!entry.hadRecentInput) {
            clsEntries.push(entry);
            clsValue += entry.value;
          }
        }
        
        reportMetric({
          name: 'CLS',
          value: clsValue,
          id: 'cls-' + Date.now(),
          delta: clsValue,
        });
      });

      observer.observe({ type: 'layout-shift', buffered: true });
      return observer;
    };

    const measureFID = () => {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as PerformanceEventTiming[]) {
          reportMetric({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            id: 'fid-' + Date.now(),
            delta: entry.processingStart - entry.startTime,
          });
        }
      });

      observer.observe({ type: 'first-input', buffered: true });
      return observer;
    };

    const measureLCP = () => {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as PerformancePaintTiming[];
        const lastEntry = entries[entries.length - 1];
        
        reportMetric({
          name: 'LCP',
          value: lastEntry.startTime,
          id: 'lcp-' + Date.now(),
          delta: lastEntry.startTime,
        });
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      return observer;
    };

    const measureTTFB = () => {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        const ttfb = navEntry.responseStart - navEntry.requestStart;
        
        reportMetric({
          name: 'TTFB',
          value: ttfb,
          id: 'ttfb-' + Date.now(),
          delta: ttfb,
        });
      }
    };

    // Initialize measurements
    const observers: PerformanceObserver[] = [];
    
    try {
      observers.push(measureCLS());
      observers.push(measureFID());
      observers.push(measureLCP());
      measureTTFB();
    } catch (error) {
      console.warn('Some performance measurements not supported:', error);
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [onMetric]);
};

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

interface PerformancePaintTiming extends PerformanceEntry {
  startTime: number;
}
