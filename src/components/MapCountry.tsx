
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

interface MapCountryProps {
    latlng: [string, string]; 
}


const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41], 
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapCountry: React.FC<MapCountryProps> = ({ latlng }) => {
    return (
        <MapContainer center={latlng} zoom={5} style={{ height: '45vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={latlng}>
                <Popup>
                    Country location.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapCountry;