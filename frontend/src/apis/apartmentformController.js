import Axios from 'axios';

class ApartmentFormController {
    constructor(user) {
        this.user = user;
        this.apartmentData = {
            barrio: '',
            direccion: '',
            latitud: '',
            longitud: '',
            addInfo: '',
        };
    }

    setApartmentData(data) {
        this.apartmentData = { ...this.apartmentData, ...data };
    }

    async submitApartment() {
        const { barrio, direccion, latitud, longitud, addInfo } = this.apartmentData;

        if (!barrio || !direccion || !latitud || !longitud || !addInfo) {
            throw new Error('Por favor rellene los campos');
        }

        try {
            await Axios.post('http://localhost:3001/apartments/addApartment', {
                barrio,
                direccion,
                latitud,
                longitud,
                addInfo,
                user_email: this.user.email,
            });
            return 'Apartamento añadido exitosamente';
        } catch (error) {
            console.error('Error añadiendo apartamento:', error);
            throw new Error('Hubo un problema al añadir el apartamento');
        }
    }
}

export default ApartmentFormController;
