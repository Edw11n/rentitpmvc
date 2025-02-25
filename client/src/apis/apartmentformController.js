import Axios from 'axios';

class ApartmentFormController {
    constructor(user) {
        this.user = user;
    }

    async submitApartment(formData) {
        if (
            !formData.get('barrio') ||
            !formData.get('direccion') ||
            !formData.get('latitud') ||
            !formData.get('longitud') ||
            !formData.get('addInfo')
        ) {
            throw new Error('Por favor rellene los campos');
        }

        try {
            await Axios.post('http://localhost:3001/apartments/addApartment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return 'Apartamento añadido exitosamente';
        } catch (error) {
            console.error('Error añadiendo apartamento:', error);
            throw new Error('Hubo un problema al añadir el apartamento');
        }
    }
}

export default ApartmentFormController;
