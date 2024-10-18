import L from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Controlador para el componente Map
const useMapController = () => {
    // Configuración del ícono del marcador
    const DefaultIcon = L.icon({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    return {
        DefaultIcon,
    };
};

export default useMapController;
