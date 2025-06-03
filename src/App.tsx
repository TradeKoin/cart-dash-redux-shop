import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense, lazy } from 'react';
import { store, persistor } from './store/store';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useWebVitals } from './hooks/useWebVitals';
import { useErrorReporting } from './hooks/useErrorReporting';
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import PWAInstallBanner from "./components/PWAInstallBanner";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteProgressBar from "./components/RouteProgressBar";

// Lazy load all page components
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AppContent = () => {
  // Initialize performance monitoring
  useWebVitals((metric) => {
    // You can send metrics to analytics here
    console.log('[Web Vital]', metric);
  });
  
  const { reportError } = useErrorReporting();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <RouteProgressBar />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <PWAInstallBanner />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <ThemeProvider>
            <LanguageProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </LanguageProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </TooltipProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
