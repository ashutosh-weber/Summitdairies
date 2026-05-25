'use client';

import { useRef, useEffect, useState, memo } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  _id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  status: 'unexplored' | 'planned' | 'explored';
  altitude: number;
  region: string;
  difficulty: string;
  bestSeason?: string[];
  weatherInfo?: string;
  routeInformation?: string;
  estimatedDuration?: string;
  preparationChecklist?: string[];
  suggestedEquipment?: string[];
  travelNotes?: string;
  planningNotes?: string;
  plannedDate?: string;
  exploredDate?: string;
  exploredYear?: number;
  memories?: any;
  images?: any[];
  videos?: any[];
  trekDistance?: string;
  trekDuration?: string;
}

interface Globe3DProps {
  locations: Location[];
  onLocationClick: (location: Location) => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const HIMALAYAN_BOUNDS: [[number, number], [number, number]] = [
  [73.5, 27.5],
  [89.0, 36.5],
];

// Simple Pinpoint Marker Component
const PinMarker = memo(({ color, onClick }: { color: string; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="cursor-pointer transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform"
    style={{ filter: `drop-shadow(0 2px 4px ${color}80)` }}
  >
    <MapPin
      className="w-8 h-8"
      style={{ color, fill: color }}
      strokeWidth={1.5}
    />
  </div>
));

PinMarker.displayName = 'PinMarker';

export default function Globe3D({ locations, onLocationClick }: Globe3DProps) {
  const mapRef = useRef<any>(null);
  const [viewState, setViewState] = useState({
    longitude: 79.8,
    latitude: 30.5,
    zoom: 7,
    pitch: 60,
    bearing: 0,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current.getMap();
      
      map.setMaxBounds(HIMALAYAN_BOUNDS);
      
      // Add terrain
      if (!map.getSource('mapbox-dem')) {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      }
    }
  }, [mapLoaded]);

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'explored': return '#10b981';
      case 'planned': return '#fbbf24';
      case 'unexplored': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="w-full h-full relative">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onLoad={() => setMapLoaded(true)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        style={{ width: '100%', height: '100%' }}
        maxPitch={70}
        minZoom={6}
        maxZoom={13}
        maxBounds={HIMALAYAN_BOUNDS}
      >
        <NavigationControl position="top-right" />

        {mapLoaded && locations.map((location) => (
          <Marker
            key={location._id}
            longitude={location.coordinates.lng}
            latitude={location.coordinates.lat}
            anchor="bottom"
          >
            <PinMarker
              color={getMarkerColor(location.status)}
              onClick={() => onLocationClick(location)}
            />
          </Marker>
        ))}
      </Map>

      {!mapLoaded && (
        <div className="absolute inset-0 bg-[#0a0e1a] flex items-center justify-center">
          <p className="text-white">Loading map...</p>
        </div>
      )}
    </div>
  );
}
