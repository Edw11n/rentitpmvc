const Apartment = require('../models/ApartmentModel');

// Controlador para agregar un nuevo apartamento
exports.addApartment = (req, res) => {
    const { barrio, direccion, latitud, longitud, addInfo, user_email } = req.body;
    Apartment.addApartment({ barrio, direccion, latitud, longitud, addInfo, user_email }, (err, result) => {
        if (err) {
            console.error('Error adding apartment:', err);
            return res.status(500).send('Error adding apartment');
        }
        const apartmentId = result.insertId;

        // Si se subieron múltiples imágenes (upload.array)
        if (req.files && req.files.length > 0) {
            let imagesProcessed = 0;
            req.files.forEach(file => {
                Apartment.addImage(apartmentId, file.path, (err, imageResult) => {
                    imagesProcessed++;
                    if (err) {
                        console.error('Error adding image:', err);
                    }
                    // Cuando se hayan procesado todas las imágenes, se envía la respuesta
                    if (imagesProcessed === req.files.length) {
                        return res.status(200).send('Apartment added successfully with images');
                    }
                });
            });
        } 
        // O si se subió una sola imagen (upload.single)
        else if (req.file) {
            Apartment.addImage(apartmentId, req.file.path, (err, imageResult) => {
                if (err) {
                    console.error('Error adding image:', err);
                }
                return res.status(200).send('Apartment added successfully with image');
            });
        } 
        // Si no se subieron imágenes
        else {
            return res.status(200).send('Apartment added successfully');
        }
    });
};

// Controlador para agregar imagenes a un apartamento
exports.uploadImage = (req, res) => {
    const { id_apt } = req.params;
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }
    const imagePath = req.file.path;
    // Llamar al método addImage del modelo para insertar en apartment_images
    Apartment.addImage(id_apt, imagePath, (err, result) => {
        if (err) {
            console.error('Error al subir la imagen:', err);
            return res.status(500).send('Error al subir la imagen.');
        }
        res.status(200).send('Imagen subida correctamente.');
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
    // Extraer datos del cuerpo de la solicitud (los campos llegan como texto)
    const { direccion_apt, barrio, latitud_apt, longitud_apt, info_add_apt, existing_images } = req.body;
    // Obtener los nuevos archivos enviados (con upload.array('new_images'))
    const newImages = req.files; // Array de archivos nuevos

    // Campo existing_images para que el modelo lo procese
    Apartment.updateApartment(id_apt, { 
        direccion_apt, 
        barrio, 
        latitud_apt, 
        longitud_apt, 
        info_add_apt, 
        existing_images 
    }, (err, result) => {
        if (err) {
            console.error('Error updating apartment:', err);
            return res.status(500).send('Error updating apartment');
        }
        // Si se han enviado nuevos archivos, se insertan en la tabla de imágenes
        if (newImages && newImages.length > 0) {
            let imagesProcessed = 0;
            newImages.forEach((file) => {
                Apartment.addImage(id_apt, file.path, (err, imageResult) => {
                    imagesProcessed++;
                    if (err) {
                        console.error('Error adding new image:', err);
                    }
                    // Cuando se hayan procesado todas las nuevas imágenes, se envía la respuesta
                    if (imagesProcessed === newImages.length) {
                        return res.status(200).send('Apartment updated successfully with new images');
                    }
                });
            });
        } else {
            return res.status(200).send('Apartment updated successfully');
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
            console.error('Error obteniendo apartamentos', err);
            return res.status(500).send('Error al obtener los apartamentos');
        }
        console.log("Resultados obtenidos:", results); // <-- Verifica que sea un array
        res.json(Array.isArray(results) ? results : []); // Asegura que siempre se envía un array
    });
};


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
