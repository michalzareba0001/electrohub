import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importuj obiekt L z Leaflet
import logo from '../../Assets/ef-logo.webp';

import 'leaflet/dist/leaflet.css';
import './Mapa.css';

const Mapa = () => {
  const position = [53.950617346001195, 18.474596661135166]; // Początkowe współrzędne mapy

  // Zdefiniuj niestandardową ikonę markera z własnym obrazkiem
  const customIcon = new L.Icon({
    iconUrl: logo, // Ścieżka do twojego obrazka
    iconSize: [32, 32], // Rozmiar ikony
    iconAnchor: [16, 32], // Punkt kotwiczenia ikony
    popupAnchor: [0, -32], // Punkt kotwiczenia popupu
  });

  return (
    <div className='mapa-container'>
      <MapContainer center={position} zoom={13} className='mapa-openmaps'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Elektro Hub<br />
            Centrum operacyjne
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapa;
