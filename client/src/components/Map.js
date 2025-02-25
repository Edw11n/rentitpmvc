import React, { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from 'leaflet';
import mapController from '../apis/mapController'; 

// Componente Map
function Map() {
    const [apartments, setApartments] = useState([]);

    const DefaultIcon = L.icon({
        iconUrl: '/apartmentLogo.png',
        shadowUrl: markerShadow,
        iconSize: [25, 30],
        iconAnchor: [12, 30],
    });
    // Crear un ícono diferente para el Instituto
    const InstituteIcon = L.icon({
        iconUrl: '/instituteLogo.png', // Cambia este path al de tu ícono
        iconSize: [25, 30], // Ajusta el tamaño según sea necesario
        iconAnchor: [12, 30], // Punto donde el marcador "toca" el mapa
        popupAnchor: [0, -45], // Posición del popup respecto al icono
    });

    // Efecto para obtener los datos de los apartamentos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await mapController(); // Llama la función de la petición
                setApartments(data);
            } catch (error) {
                console.error('Error obteniendo los apartamentos', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="map-container">
            <MapContainer 
                center={[1.157, -76.651]} 
                zoom={17}  
                className="leaflet-container" 
                maxZoom={18}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                />

                {/* Marcador para el Instituto Tecnológico del Putumayo */}
                <Marker 
                    position={[1.157037, -76.651443]} 
                    icon={InstituteIcon} // Ícono personalizado
                >
                    <Popup>
                        <b>Instituto Tecnológico del Putumayo</b>
                        <p>"Un sueño de todos"</p>
                    </Popup>
                </Marker>

                {/* Marcadores dinámicos para los apartamentos */}
                {apartments.map((apt) => (
                    <Marker
                        key={apt.id_apartamento}
                        position={[apt.latitud_apartamento, apt.longitud_apartamento]}
                        icon={DefaultIcon}
                    >
                        <Popup>
                            <b>Dirección: {apt.direccion_apartamento}</b>
                            <p><strong>Barrio: </strong>{apt.barrio_apartamento}</p>
                            <p><b>Información adicional: </b><br />{apt.info_adicional_apartamento}</p>
                            <button>Ver más</button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
