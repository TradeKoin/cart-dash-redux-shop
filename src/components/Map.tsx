
import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Map = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      // Here you would initialize the actual Mapbox map
      console.log('Mapbox token set:', mapboxToken);
    }
  };

  if (showTokenInput) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Interactive Map</h3>
        <div className="space-y-4">
          <p className="text-gray-600">
            To display an interactive map, please enter your Mapbox public token:
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit}>
              Load Map
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Get your free token at{' '}
            <a
              href="https://mapbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">ShopHub Location</h3>
          <p className="text-gray-600 mb-4">123 Shopping Street, Commerce City, CC 12345</p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm">
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowTokenInput(true)}>
              Load Interactive Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
