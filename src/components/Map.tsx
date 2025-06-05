
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  
  // Your Google Maps API key
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAFcQicsPRRI_-HBSTEAtHb7XDKdwj-D8o';

  const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      window.initMap = () => {
        setMapLoaded(true);
        resolve();
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setMapError(true);
        reject(new Error('Failed to load Google Maps'));
      };
      document.head.appendChild(script);
    });
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const shophubLocation = { lat: 40.7128, lng: -74.0060 }; // New York coordinates as example

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      zoom: 15,
      center: shophubLocation,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    // Add marker for ShopHub location
    const marker = new window.google.maps.Marker({
      position: shophubLocation,
      map: mapInstanceRef.current,
      title: 'ShopHub Location',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#dc2626"/>
            <circle cx="12" cy="10" r="3" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
      },
    });

    // Add info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; font-family: system-ui, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">ShopHub</h3>
          <p style="margin: 0; color: #666; font-size: 14px;">123 Shopping Street<br>Commerce City, CC 12345</p>
        </div>
      `,
    });

    mapInstanceRef.current.addListener('click', () => {
      infoWindow.close();
    });

    // Show info window on marker click
    marker.addListener('click', () => {
      infoWindow.open(mapInstanceRef.current, marker);
    });
  };

  useEffect(() => {
    loadGoogleMapsScript().catch((error) => {
      console.error('Failed to load Google Maps:', error);
      setMapError(true);
    });
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      initializeMap();
    }
  }, [mapLoaded]);

  if (mapError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Interactive Map</h3>
        <div className="text-center">
          <MapPin className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Failed to load Google Maps. Please check your internet connection.</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-96 relative">
        {!mapLoaded ? (
          <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600">Loading Google Maps...</p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-full" />
        )}
        
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-red-600" />
            <span className="font-semibold text-gray-800">ShopHub Location</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">123 Shopping Street, Commerce City, CC 12345</p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=123+Shopping+Street,Commerce+City,CC+12345`, '_blank');
              }}
            >
              <Navigation className="h-4 w-4 mr-1" />
              Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
