const express = require('express');
const router = express.Router();
const LessorController = require('../controllers/LessorController');

// rutas de arrendadores
router.post('/signup', LessorController.signup);
router.post('/login', LessorController.login);

module.exports = router;