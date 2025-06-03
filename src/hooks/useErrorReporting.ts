import { useEffect } from 'react';

interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: number;
  userId?: string;
}

export const useErrorReporting = () => {
  const reportError = (error: Error, errorInfo?: any) => {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Report]', errorReport);
    }

    // Store in localStorage for offline reporting
    try {
      const existingErrors = JSON.parse(localStorage.getItem('error-reports') || '[]');
      existingErrors.push(errorReport);
      // Keep only last 10 errors
      localStorage.setItem('error-reports', JSON.stringify(existingErrors.slice(-10)));
    } catch (e) {
      console.warn('Failed to store error report:', e);
    }

    // Here you would send to your error reporting service
    // Example: Sentry, LogRocket, etc.
    // errorReportingService.captureException(error, errorReport);
  };

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      reportError(new Error(event.reason?.message || 'Unhandled Promise Rejection'), {
        reason: event.reason,
      });
    };

    const handleError = (event: ErrorEvent) => {
      reportError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return { reportError };
};
