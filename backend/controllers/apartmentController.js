const Apartment = require('../models/apartments');

const ApartmentController = {
    // Agregar un nuevo apartamento
    addApartment: (req, res) => {
        const { barrio, direccion, latitud, longitud, addInfo, Lessor_email } = req.body;

        if (!barrio || !direccion || !latitud || !longitud || !Lessor_email) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        Apartment.create(barrio, direccion, latitud, longitud, addInfo, Lessor_email, (err, result) => {
            if (err) {
                console.error('Error al agregar el apartamento:', err);
                return res.status(500).send('Error al agregar el apartamento');
            }
            res.status(200).send('Apartamento agregado exitosamente');
        });
    },

    // Obtener apartamentos por email del arrendador
    getApartmentsByLessor: (req, res) => {
        const { email } = req.query;

        if (!email) {
            return res.status(400).send('El email del arrendador es requerido');
        }

        Apartment.findByLessorEmail(email, (err, results) => {
            if (err) {
                console.error('Error al obtener los apartamentos:', err);
                return res.status(500).send('Error al obtener los apartamentos');
            }
            res.json(results);
        });
    },

    // Obtener todos los apartamentos para los usuarios
    getAllApartments: (req, res) => {
        Apartment.getAll((err, results) => {
            if (err) {
                console.error('Error al obtener los apartamentos:', err);
                return res.status(500).send('Error al obtener los apartamentos');
            }
            res.json(results);
        });
    },

    // Eliminar un apartamento
    deleteApartment: (req, res) => {
        const { id_apartamento } = req.params;

        Apartment.delete(id_apartamento, (err, result) => {
            if (err) {
                console.error('Error al eliminar el apartamento:', err);
                return res.status(500).send('Error al eliminar el apartamento');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Apartamento no encontrado');
            }
            res.status(200).send('Apartamento eliminado exitosamente');
        });
    },

    // Actualizar un apartamento
    updateApartment: (req, res) => {
        const { id_apartamento } = req.params;
        const { direccion_apartamento, barrio_apartamento, latitud_apartamento, longitud_apartamento, info_adicional_apartamento } = req.body;

        Apartment.update(id_apartamento, direccion_apartamento, barrio_apartamento, latitud_apartamento, longitud_apartamento, info_adicional_apartamento, (err, result) => {
            if (err) {
                console.error('Error al actualizar el apartamento:', err);
                return res.status(500).send('Error al actualizar el apartamento');
            }
            res.status(200).send('Apartamento actualizado exitosamente');
        });
    }
};

module.exports = ApartmentController;
