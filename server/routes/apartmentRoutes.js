// Importación de módulos necesarios
const express = require('express'); // Framework para manejar rutas y peticiones HTTP
const router = express.Router(); // Router para agrupar y manejar rutas
const ApartmentController = require('../controllers/ApartmentController'); // Controlador que gestiona la lógica de los apartamentos
const multer = require('multer'); // Middleware para subir archivos
const path = require('path'); // Módulo para manejar rutas de archivos

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });

router.post('/uploadImage/:id_apt', upload.array('images'), ApartmentController.uploadImage);

router.post('/addApartment', upload.array('images'), ApartmentController.addApartment);

router.put('/update/:id_apt', upload.array("new_images"), ApartmentController.updateApartment);

router.get('/manage', ApartmentController.getApartmentsByLessor);

router.delete('/delete/:id_apt', ApartmentController.deleteApartment);

router.get('/getapts', ApartmentController.getAllApartments);

router.get('/getMarkersInfo', ApartmentController.getMarkersInfo);

module.exports = router;
