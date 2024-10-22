const express = require('express');
const router = express.Router();
const ApartmentController = require('../controllers/ApartmentController');

// rutas de apartamentos
router.post('/addApartment', ApartmentController.addApartment);
router.get('/manage', ApartmentController.getApartmentsByLessor);
router.put('/update/:id_apartamento', ApartmentController.updateApartment);
router.delete('/delete/:id_apartamento', ApartmentController.deleteApartment);
router.get('/getapts', ApartmentController.getAllApartments);

module.exports = router;
