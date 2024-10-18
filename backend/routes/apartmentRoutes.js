const express = require('express');
const ApartmentController = require('../controllers/apartmentController');
const router = express.Router();

// Ruta para agregar un nuevo apartamento
router.post('/addApartment', ApartmentController.addApartment);

// Ruta para obtener los apartamentos de un arrendador por su email
router.get('/manage', ApartmentController.getApartmentsByLessor);

// Ruta para obtener todos los apartamentos (disponible para los usuarios)
router.get('/getapts', ApartmentController.getAllApartments);

// Ruta para eliminar un apartamento por su ID
router.delete('/delete/:id_apartamento', ApartmentController.deleteApartment);

// Ruta para actualizar un apartamento por su ID
router.put('/update/:id_apartamento', ApartmentController.updateApartment);

module.exports = router;
