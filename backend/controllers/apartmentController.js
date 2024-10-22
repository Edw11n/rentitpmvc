const Apartment = require('../models/ApartmentModel');

exports.addApartment = (req, res) => {
    const { barrio, direccion, latitud, longitud, addInfo, Lessor_email } = req.body;
    Apartment.addApartment({ barrio, direccion, latitud, longitud, addInfo, Lessor_email }, (err, result) => {
        if (err) {
            console.error('Error adding apartment:', err);
            res.status(500).send('Error adding apartment');
        } else {
            res.status(200).send('Apartment added successfully');
        }
    });
};

exports.getApartmentsByLessor = (req, res) => {
    const { email } = req.query;
    Apartment.getApartmentsByLessor(email, (err, results) => {
        if (err) {
            console.error('Error getting apartments:', err);
            res.status(500).send('Error getting apartments');
        } else {
            res.json(results);
        }
    });
};

exports.updateApartment = (req, res) => {
    const { id_apartamento } = req.params;
    const { direccion_apartamento, barrio_apartamento, latitud_apartamento, longitud_apartamento, info_adicional_apartamento } = req.body;

    Apartment.updateApartment(id_apartamento, { direccion_apartamento, barrio_apartamento, latitud_apartamento, longitud_apartamento, info_adicional_apartamento }, (err, result) => {
        if (err) {
            console.error('Error updating apartment:', err);
            res.status(500).send('Error updating apartment');
        } else {
            res.status(200).send('Apartment updated successfully');
        }
    });
};

exports.deleteApartment = (req, res) => {
    const { id_apartamento } = req.params;

    Apartment.deleteApartment(id_apartamento, (err, result) => {
        if (err) {
            console.error('Error deleting apartment:', err);
            res.status(500).send('Error deleting apartment');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Apartment not found');
        } else {
            res.status(200).send('Apartment deleted successfully');
        }
    });
};

exports.getAllApartments = (req, res) => {
    Apartment.getAllApartments((err, results) => {
        if (err) {
            console.error('Error obteniendo apartamentos', err);
            return res.status(500).send('Error al obtener los apartamentos');
        }
        res.json(results);
    });
}