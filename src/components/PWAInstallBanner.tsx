
import React from 'react';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLocalStorage } from '../hooks/useLocalStorage';

const PWAInstallBanner: React.FC = () => {
  const { isInstallable, installApp } = usePWAInstall();
  const [bannerDismissed, setBannerDismissed] = useLocalStorage('pwa-banner-dismissed', false);

  if (!isInstallable || bannerDismissed) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setBannerDismissed(true);
    }
  };

  const handleDismiss = () => {
    setBannerDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Install App</h3>
          <p className="text-xs opacity-90">Add CartDash to your home screen for quick access</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleInstall}
            className="bg-primary-foreground text-primary px-3 py-1 rounded text-xs font-medium hover:bg-opacity-90 transition-colors flex items-center space-x-1"
          >
            <Download className="h-3 w-3" />
            <span>Install</span>
          </button>
          <button
            onClick={handleDismiss}
            className="text-primary-foreground hover:bg-primary-foreground hover:bg-opacity-20 p-1 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;
