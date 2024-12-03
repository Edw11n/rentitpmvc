import axios from "axios";

// Función para obtener los apartamentos
const fetchApartments = async () => {
    try {
        const response = await axios.get("http://localhost:3001/apartments/getMarkersInfo");
        return response.data; // Retorna los datos de los apartamentos
    } catch (error) {
        console.error('Error obteniendo los apartamentos', error);
        throw error; // Propaga el error
    }
};

export default fetchApartments;
