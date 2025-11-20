import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './NavigationApp.css';
import MapSearchOverlay from './MapSearchOverlay';

// Module-level variable to track initialization globally
let globalMapInstance = null;

function NavigationApp() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geolocateControl = useRef(null);
  const carMarker = useRef(null);
  const isInitialized = useRef(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locationStatus, setLocationStatus] = useState('requesting');
  const [isSearchOpen, setIsSearchOpen] = useState(true); // Show by default
  const [searchDestination, setSearchDestination] = useState(null);

  useEffect(() => {
    // Prevent double initialization (React StrictMode guard)
    if (isInitialized.current) {
      console.log('Already initialized, skipping');
      return;
    }
    if (map.current) {
      console.log('Map ref exists, skipping');
      return;
    }
    if (globalMapInstance) {
      console.log('Global map instance exists, skipping');
      return;
    }
    
    // Wait for container to be ready
    if (!mapContainer.current) {
      console.log('Container not ready, skipping');
      return;
    }
    
    // Check if container already has maplibregl elements (most important check!)
    const hasMapLibreElements = mapContainer.current.querySelector('.maplibregl-canvas-container');
    if (hasMapLibreElements) {
      console.log('MapLibre elements already exist in container, skipping initialization');
      return;
    }
    
    console.log('Initializing map...');
    
    // Completely clear container to ensure clean state
    while (mapContainer.current.firstChild) {
      mapContainer.current.removeChild(mapContainer.current.firstChild);
    }
    
    // Mark as initialized IMMEDIATELY to prevent race conditions
    isInitialized.current = true;

    // Create custom car marker element
    const createCarMarker = () => {
      const el = document.createElement('div');
      el.className = 'car-marker';
      el.innerHTML = `
        <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_5753_109516)">
            <path d="M46.3208 14.5407L17.2586 73.3893C16.0454 75.846 19.4325 78.0679 21.7988 76.3675L47.1469 58.1535C48.2256 57.3783 49.7822 57.3783 50.861 58.1535L76.209 76.3675C78.5753 78.0679 81.9624 75.8461 80.7492 73.3893L51.6871 14.5407C50.6725 12.4864 47.3353 12.4864 46.3208 14.5407Z" fill="url(#paint0_linear_5753_109516)"/>
            <path d="M46.3208 14.5407L17.2586 73.3893C16.0454 75.846 19.4325 78.0679 21.7988 76.3675L47.1469 58.1535C48.2256 57.3783 49.7822 57.3783 50.861 58.1535L76.209 76.3675C78.5753 78.0679 81.9624 75.8461 80.7492 73.3893L51.6871 14.5407C50.6725 12.4864 47.3353 12.4864 46.3208 14.5407Z" stroke="#F0F4F8" stroke-width="2"/>
          </g>
          <defs>
            <filter id="filter0_d_5753_109516" x="0" y="0" width="98.0078" height="97.9653" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="8"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5753_109516"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5753_109516" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_5753_109516" x1="17.0039" y1="74" x2="81.0039" y2="74" gradientUnits="userSpaceOnUse">
              <stop stop-color="#9D9D9D"/>
              <stop offset="0.499388" stop-color="#D6D6D6"/>
              <stop offset="0.503297" stop-color="#8A8A8A"/>
              <stop offset="1" stop-color="#7E7E7E"/>
            </linearGradient>
          </defs>
        </svg>
      `;
      return el;
    };

    // Get user's location first, then initialize map
    const initializeMap = (userLocation) => {
      try {
        console.log('Initializing map with container:', mapContainer.current);
        console.log('Container dimensions:', {
          width: mapContainer.current?.offsetWidth,
          height: mapContainer.current?.offsetHeight
        });
        
        const center = userLocation 
          ? [userLocation.longitude, userLocation.latitude]
          : [-122.4194, 37.7749]; // Fallback to San Francisco
        
        console.log('Map center:', center, userLocation ? '(your location)' : '(default)');
        
        const mapInstance = new maplibregl.Map({
          container: mapContainer.current,
          // Satellite imagery from ESRI World Imagery
          style: {
            version: 8,
            sources: {
              'satellite': {
                type: 'raster',
                tiles: [
                  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                ],
                tileSize: 256,
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              },
              'labels': {
                type: 'raster',
                tiles: [
                  'https://a.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}@2x.png',
                  'https://b.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}@2x.png',
                  'https://c.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}@2x.png',
                  'https://d.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}@2x.png'
                ],
                tileSize: 256
              },
              'openmaptiles': {
                type: 'vector',
                tiles: ['https://tiles.openfreemap.org/planet/{z}/{x}/{y}.pbf'],
                attribution: '© OpenMapTiles © OpenStreetMap'
              }
            },
            layers: [
     
              {
                id: 'satellite-layer',
                type: 'raster',
                source: 'satellite',
                minzoom: 0,
                maxzoom: 22,
                paint: {
                  'raster-opacity': 0.3
                }
              },
              {
                id: 'labels-layer',
                type: 'raster',
                source: 'labels',
                paint: {
                  'raster-opacity': 1
                }
              }
            ],
            glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf'
          },
          center: center,
          zoom: 16,
          pitch: 0,
          bearing: 0
        });

        // Store in both ref and global
        map.current = mapInstance;
        globalMapInstance = mapInstance;

        // Add navigation controls
        mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');

        // Add geolocate control to track user location
        // Hide default marker since we're using custom car icon
        geolocateControl.current = new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
            timeout: 6000
          },
          trackUserLocation: true,
          showUserLocation: false, // Hide default blue dot
          showAccuracyCircle: false // Hide accuracy circle
        });

        mapInstance.addControl(geolocateControl.current, 'top-right');

        // Listen for geolocation events to update car marker position
        geolocateControl.current.on('geolocate', (e) => {
          console.log('Location updated:', e.coords);
          setLocationStatus('found');
          
          // Update car marker position
          if (carMarker.current) {
            carMarker.current.setLngLat([e.coords.longitude, e.coords.latitude]);
            
            // Rotate car based on heading if available
            if (e.coords.heading !== null && e.coords.heading !== undefined) {
              const carElement = carMarker.current.getElement();
              if (carElement) {
                carElement.style.transform = `rotate(${e.coords.heading}deg)`;
              }
            }
          } else if (map.current) {
            // Create marker if it doesn't exist yet
            const carElement = createCarMarker();
            carMarker.current = new maplibregl.Marker({
              element: carElement,
              anchor: 'center',
              rotationAlignment: 'map',
              pitchAlignment: 'map'
            })
              .setLngLat([e.coords.longitude, e.coords.latitude])
              .addTo(map.current);
          }
        });

        geolocateControl.current.on('error', (e) => {
          console.warn('Geolocation error:', e.message);
          if (locationStatus !== 'found') {
            setLocationStatus('error');
          }
        });

        geolocateControl.current.on('trackuserlocationstart', () => {
          console.log('Started tracking user location');
          setLocationStatus('tracking');
        });

        // Wait for map to load before adding car marker and triggering geolocation
        mapInstance.on('load', () => {
          setMapLoaded(true);
          console.log('Map loaded successfully');
          setLocationStatus(userLocation ? 'found' : 'error');
          
          // Add car marker if we have user location
          if (userLocation) {
            const carElement = createCarMarker();
            carMarker.current = new maplibregl.Marker({
              element: carElement,
              anchor: 'center',
              rotationAlignment: 'map',
              pitchAlignment: 'map'
            })
              .setLngLat([userLocation.longitude, userLocation.latitude])
              .addTo(mapInstance);
            
            console.log('Car marker added at:', userLocation);
            
            // ===== REAL-TIME LOCATION TRACKING (COMMENTED OUT) =====
            // Uncomment below to enable real-time location tracking
            /*
            setTimeout(() => {
              if (geolocateControl.current) {
                geolocateControl.current.trigger();
              }
            }, 100);
            */
          }
        });

        // Log errors
        mapInstance.on('error', (e) => {
          console.error('Map error:', e);
        });

      } catch (error) {
        console.error('Failed to initialize map:', error);
        setLocationStatus('error');
      }
    };

    // ===== PRESET FAKE LOCATION =====
    // Using a preset location instead of real geolocation
    // San Mateo Downtown, CA coordinates
    const FAKE_CURRENT_LOCATION = {
      latitude: 37.5630,
      longitude: -122.3255
    };
    
    console.log('Using preset fake location:', FAKE_CURRENT_LOCATION);
    initializeMap(FAKE_CURRENT_LOCATION);
    
    // ===== REAL GEOLOCATION CODE (COMMENTED OUT FOR FUTURE USE) =====
    // Uncomment the code below to use real device location instead of fake location
    /*
    if ('geolocation' in navigator) {
      console.log('Requesting your location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Got your location:', position.coords);
          initializeMap({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Could not get location:', error.message);
          setLocationStatus('error');
          initializeMap(null); // Initialize with default location
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.warn('Geolocation not supported');
      setLocationStatus('error');
      initializeMap(null);
    }
    */

    return () => {
      // Cleanup function - only run when component truly unmounts
      if (carMarker.current) {
        carMarker.current.remove();
        carMarker.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      globalMapInstance = null;
      isInitialized.current = false;
    };
  }, []);

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    setSearchDestination(query);
    // Here you would typically geocode the query and update map center
    // For now, we'll just log it
  };

  return (
    <div className="navigation-app">
      {/* Map Container */}
      <div ref={mapContainer} className="map-container" />

      {/* Search Overlay - Always visible */}
      <MapSearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
      {!mapLoaded && (
        <div className="map-loading">
          <div className="loading-text">
            {locationStatus === 'requesting' && 'Finding Your Location...'}
            {locationStatus === 'error' && 'Loading Map (Using Default Location)...'}
            {locationStatus === 'found' && 'Loading Map at Your Location...'}
          </div>
        </div>
      )}
      {mapLoaded && locationStatus === 'requesting' && (
        <div className="location-status">
          <div className="status-indicator">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" strokeDasharray="4 4">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 10 10"
                  to="360 10 10"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <span>Finding your location...</span>
          </div>
        </div>
      )}
      {mapLoaded && locationStatus === 'error' && (
        <div className="location-status error">
          <div className="status-indicator">
            <span>⚠️ Location unavailable - showing default view</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavigationApp;

