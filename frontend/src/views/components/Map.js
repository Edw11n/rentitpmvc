import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map.css';
import useMapController from '../../controllers/mapController';

// Componente Map
function Map() {
    const { DefaultIcon } = useMapController(); // Utiliza el controlador

    return (
        <div className="map-container">
            <MapContainer 
                center={[1.157, -76.651]} 
                zoom={20}  
                className="leaflet-container" // Añadido para aplicar estilos CSS
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                />
            </MapContainer>
        </div>
    );
}

export default Map;
