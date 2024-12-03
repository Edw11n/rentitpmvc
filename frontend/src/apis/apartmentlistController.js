import Axios from "axios";

class ApartmentListController {
    constructor() {
        this.apartmentList = [];
        this.loading = true;
    }

    async fetchApartments() {
        try {
            const response = await Axios.get('http://localhost:3001/apartments/getapts');
            this.apartmentList = response.data;
            this.loading = false;
        } catch (error) {
            console.error('Error obteniendo apartamentos:', error);
            this.loading = false;
            throw new Error('No se pudieron cargar los apartamentos');
        }
    }
}

export default ApartmentListController;
