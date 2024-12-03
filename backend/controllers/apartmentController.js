const Apartment = require('../models/ApartmentModel');

// Controlador para agregar un nuevo apartamento
exports.addApartment = (req, res) => {
    // Desglose de los datos del cuerpo de la solicitud
    const { barrio, direccion, latitud, longitud, addInfo, user_email } = req.body;
    Apartment.addApartment({ barrio, direccion, latitud, longitud, addInfo, user_email }, (err, result) => {
        if (err) {
            console.error('Error adding apartment:', err); // Registro del error en la consola
            res.status(500).send('Error adding apartment'); // Respuesta de error al cliente
        } else {
            res.status(200).send('Apartment added successfully'); // Respuesta exitosa al cliente
        }
    });
};

// Controlador para obtener los apartamentos de un arrendador
exports.getApartmentsByLessor = (req, res) => {
    // Obtener el ID del arrendador desde los parámetros de consulta
    const { id } = req.query;  
    Apartment.getApartmentsByLessor(id, (err, results) => {
        if (err) {
            console.error('Error getting apartments:', err); // Registro del error en la consola
            res.status(500).send('Error getting apartments'); // Respuesta de error al cliente
        } else {
            res.json(results); // Respuesta exitosa con los datos en formato JSON
        }
    });
};

// Controlador para actualizar un apartamento existente
exports.updateApartment = (req, res) => {
    // Obtener el ID del apartamento desde los parámetros de la ruta
    const { id_apt } = req.params;
    // Obtener los datos del cuerpo de la solicitud
    const { direccion_apt, barrio, latitud_apt, longitud_apt, info_add_apt } = req.body;

    Apartment.updateApartment(id_apt, { direccion_apt, barrio, latitud_apt, longitud_apt, info_add_apt }, (err, result) => {
        if (err) {
            console.error('Error updating apartment:', err); // Registro del error en la consola
            res.status(500).send('Error updating apartment'); // Respuesta de error al cliente
        } else {
            res.status(200).send('Apartment updated successfully'); //Respuesta exitosa en el cliente
        }
    });
};

// Controlador para eliminar un apartamento
exports.deleteApartment = (req, res) => {
    // Obtener el ID del apartamento desde los parámetros de la ruta
    const { id_apt } = req.params;

    Apartment.deleteApartment(id_apt, (err, result) => {
        if (err) {
            console.error('Error deleting apartment:', err); // Registro de error en la consola
            res.status(500).send('Error deleting apartment'); // Respuesta de error en el cliente
        } else if (result.affectedRows === 0) {
            res.status(404).send('Apartment not found'); // Respuesta si no se encontró apartamento
        } else {
            res.status(200).send('Apartment deleted successfully'); // Respuesta de exito en el cliente
        }
    });
};

// Controlador para obtener todos los apartamentos
exports.getAllApartments = (req, res) => {
    Apartment.getAllApartments((err, results) => {
        if (err) {
            console.error('Error obteniendo apartamentos', err); // Registro de error
            return res.status(500).send('Error al obtener los apartamentos'); // Respuesta de error en el cliente
        }
        res.json(results); // Respuesta exitosa con los datos en formato JSON
    });
}

// Controlador para obtener 
exports.getMarkersInfo = (req, res) => {
    Apartment.getMarkersInfo((err, results) => {
        if (err) {
            console.error('Error obteniendo los marcadores', err); // Registro de error
            return res.status(500).send('Error al obtener los datos'); // Respuesta de error en el cliente
        }
        res.json(results); // Respuesta exitosa con los datos en formato JSON
    });
}