import React, { useEffect, useRef, useState } from 'react';

// Importación dinámica para evitar SSR issues
const loadLeaflet = async () => {
  const [leaflet, css] = await Promise.all([
    import('leaflet'),
    import('leaflet/dist/leaflet.css')
  ]);
  return leaflet.default;
};

interface MapProps {
  className?: string;
}

const LocationMap: React.FC<MapProps> = ({ className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    const initializeMap = async () => {
      const L = await loadLeaflet();

      // Coordenadas de Aplicaciones Hidráulicas del Tajo
      const latitude = 39.979428;
      const longitude = -4.268534;

      // Configuración del icono del marcador
      const customIcon = L.divIcon({
        html: `
          <div style="
            background-color: #1568a7;
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              background: white;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      });

      // Crear el mapa solo si no existe
      if (!mapInstanceRef.current) {
        if (!mapRef.current) return;
        const map = L.map(mapRef.current, {
          center: [latitude, longitude],
          zoom: 16,
          zoomControl: true,
          scrollWheelZoom: false,
          dragging: true,
          doubleClickZoom: true
        });

        // Añadir capa de tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Crear marcador con tooltip y popup
        const marker = L.marker([latitude, longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              padding: 8px;
              text-align: center;
              min-width: 200px;
            ">
              <h4 style="margin: 0 0 8px 0; color: #1568a7; font-size: 14px;">
                Aplicaciones Hidráulicas del Tajo
              </h4>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #333;">
                Calle Dalí 1, 45500 Torrijos, Toledo
              </p>
              <a href="tel:+34687416029" style="
                display: inline-block;
                background: #1568a7;
                color: white;
                padding: 6px 12px;
                text-decoration: none;
                border-radius: 4px;
                font-size: 12px;
                margin-top: 4px;
              ">📞 Llámanos</a>
            </div>
          `)
          .bindTooltip(`
            <div style="
              font-size: 12px;
              font-weight: bold;
              color: #1568a7;
            ">
              👆 ¡Visítanos o contáctanos!
            </div>
          `, {
            permanent: false,
            direction: 'top',
            offset: [0, -35],
            className: 'custom-tooltip'
          });

        // Abrir popup inicialmente
        marker.openPopup();

        mapInstanceRef.current = map;
      }
    };

    initializeMap();

    // Limpiar al desmontar
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div 
        className={className}
        style={{
          width: '100%',
          height: '280px',
          borderRadius: '8px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Mapa con ubicación de Aplicaciones Hidráulicas del Tajo"
      >
        Cargando mapa...
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className={className}
      style={{
        width: '100%',
        height: '280px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
      aria-label="Mapa con ubicación de Aplicaciones Hidráulicas del Tajo"
      role="application"
    />
  );
};

export default LocationMap;