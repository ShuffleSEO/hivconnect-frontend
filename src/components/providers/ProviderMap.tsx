import React, { useState, useEffect, useRef } from 'react';
import type { Provider } from '../../types/provider';

interface Props {
  providers: Provider[];
  filteredProviders: Provider[];
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const ProviderMap: React.FC<Props> = ({ providers, filteredProviders }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Load Google Maps script only once
  useEffect(() => {
    if (window.google) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgHz-TK7VFC&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps script');
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove script on cleanup to prevent reloading
    };
  }, []);

  // Initialize map only once when script is loaded
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || isMapInitialized) return;

    try {
      // Center on Central New Jersey
      const centerLat = 40.4896;
      const centerLng = -74.4519;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 10,
        center: { lat: centerLat, lng: centerLng },
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      const infoWindowInstance = new window.google.maps.InfoWindow();
      
      mapInstanceRef.current = mapInstance;
      infoWindowRef.current = infoWindowInstance;
      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [isScriptLoaded, isMapInitialized]);

  // Update markers when filtered providers change
  useEffect(() => {
    if (!mapInstanceRef.current || !infoWindowRef.current || !isMapInitialized) return;

    // Cleanup function to properly remove existing markers
    const cleanupMarkers = () => {
      markersRef.current.forEach(marker => {
        if (marker && typeof marker.setMap === 'function') {
          try {
            marker.setMap(null);
          } catch (error) {
            console.error('Error removing marker:', error);
          }
        }
      });
      markersRef.current = [];
    };

    // Clean up existing markers
    cleanupMarkers();

    // Create new markers for filtered providers
    const newMarkers = filteredProviders.map(provider => {
      const location = provider.locations[0];
      if (!location.coordinates) return null;

      try {
        // Determine marker color based on services
        let markerColor = '#dc2626'; // Default red
        if (provider.services.medical_care.hiv_treatment) {
          markerColor = '#dc2626'; // Red for HIV treatment
        } else if (provider.services.prevention.hiv_testing) {
          markerColor = '#2563eb'; // Blue for testing
        } else if (provider.services.support_services.case_management) {
          markerColor = '#16a34a'; // Green for support services
        }

        const marker = new window.google.maps.Marker({
          position: location.coordinates,
          map: mapInstanceRef.current,
          title: provider.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: markerColor,
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });

        // Create info window content
        const infoContent = `
          <div class="p-4 max-w-sm">
            <h3 class="font-bold text-lg text-gray-900 mb-2">${provider.name}</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-start space-x-2">
                <svg class="w-4 h-4 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <div>
                  <p class="text-gray-700">${location.address}</p>
                  <p class="text-gray-600">${location.city}, ${location.county.charAt(0).toUpperCase() + location.county.slice(1)} County</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:${provider.contact.phone}" class="text-blue-600 hover:text-blue-800">${provider.contact.phone}</a>
              </div>
              <div class="flex flex-wrap gap-1 mt-2">
                ${provider.services.medical_care.hiv_treatment ? '<span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">HIV Treatment</span>' : ''}
                ${provider.services.prevention.hiv_testing ? '<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">HIV Testing</span>' : ''}
                ${provider.services.medical_care.prep_services ? '<span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">PrEP</span>' : ''}
                ${provider.services.support_services.case_management ? '<span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Case Management</span>' : ''}
              </div>
              <div class="flex space-x-2 mt-3">
                <a href="tel:${provider.contact.phone}" class="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">Call Now</a>
                <a href="/providers/${provider.id}" class="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700">View Details</a>
                <a href="https://maps.google.com/maps?daddr=${location.coordinates.lat},${location.coordinates.lng}" target="_blank" class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">Directions</a>
              </div>
            </div>
          </div>
        `;

        marker.addListener('click', () => {
          infoWindowRef.current.setContent(infoContent);
          infoWindowRef.current.open(mapInstanceRef.current, marker);
        });

        return marker;
      } catch (error) {
        console.error('Error creating marker:', error);
        return null;
      }
    }).filter(Boolean);

    markersRef.current = newMarkers;

    // Adjust map bounds to fit all markers
    if (newMarkers.length > 0) {
      try {
        const bounds = new window.google.maps.LatLngBounds();
        newMarkers.forEach(marker => {
          if (marker && marker.getPosition) {
            bounds.extend(marker.getPosition());
          }
        });
        mapInstanceRef.current.fitBounds(bounds);
        
        // Don't zoom in too much for single markers
        const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'idle', () => {
          if (mapInstanceRef.current.getZoom() > 15) mapInstanceRef.current.setZoom(15);
          window.google.maps.event.removeListener(listener);
        });
      } catch (error) {
        console.error('Error adjusting map bounds:', error);
      }
    }

    // Return cleanup function
    return cleanupMarkers;
  }, [filteredProviders, isMapInitialized]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Provider Locations</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-gray-700">HIV Treatment</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">HIV Testing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-gray-700">Support Services</span>
          </div>
        </div>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-96"
        style={{ minHeight: '400px' }}
      >
        {!isMapInitialized && (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderMap;