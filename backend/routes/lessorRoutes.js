const express = require('express');
const LessorController = require('../controllers/lessorController');
const router = express.Router();

router.post('/signup', LessorController.signup);
router.post('/login', LessorController.login);

module.exports = router;
