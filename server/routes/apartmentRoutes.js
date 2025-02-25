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
// Rutas para la gestión de apartamentos

/**
 * Ruta para subir una imagen de un apartamento.
 * Método: POST
 * Endpoint: /uploadImage/:id_apt
*/
router.post('/uploadImage/:id_apt', upload.array('images'), ApartmentController.uploadImage);

/*
 * Ruta para agregar un nuevo apartamento con imagen.
 * Método: POST
 * Endpoint: /addApartment
 * Controlador: ApartmentController.addApartment
 */
router.post('/addApartment', upload.array('images'), ApartmentController.addApartment);

/**
 * Ruta para obtener los apartamentos de un arrendador.
 * Método: GET
 * Endpoint: /manage
 * Controlador: ApartmentController.getApartmentsByLessor
 */
router.get('/manage', ApartmentController.getApartmentsByLessor);

/**
 * Ruta para actualizar un apartamento existente.
 * Método: PUT
 * Endpoint: /update/:id_apt
 * Parámetro: id_apt (ID del apartamento que se desea actualizar)
 * Controlador: ApartmentController.updateApartment
 */
router.put('/update/:id_apt', upload.array("new_images"), ApartmentController.updateApartment);

/**
 * Ruta para eliminar un apartamento.
 * Método: DELETE
 * Endpoint: /delete/:id_apt
 * Parámetro: id_apt (ID del apartamento que se desea eliminar)
 * Controlador: ApartmentController.deleteApartment
 */
router.delete('/delete/:id_apt', ApartmentController.deleteApartment);

/**
 * Ruta para obtener todos los apartamentos.
 * Método: GET
 * Endpoint: /getapts
 * Controlador: ApartmentController.getAllApartments
 */
router.get('/getapts', ApartmentController.getAllApartments);

/**
 * Ruta para obtener información de los marcadores del mapa.
 * Método: GET
 * Endpoint: /getMarkersInfo
 * Controlador: ApartmentController.getMarkersInfo
 */
router.get('/getMarkersInfo', ApartmentController.getMarkersInfo);

// Exportación del router para usarlo en la aplicación principal
module.exports = router;
