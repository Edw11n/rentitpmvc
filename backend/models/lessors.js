const db = require('../config/db');

const Lessor = {};

// Registrar un nuevo arrendador
Lessor.create = (nombre, apellido, email, telefono, hashedPassword, callback) => {
    const query = 'INSERT INTO arrendadores_data (Lessor_name, Lessor_lastname, Lessor_email, Lessor_phonenumber, Lessor_password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, apellido, email, telefono, hashedPassword], callback);
};

// Buscar arrendador por correo electrónico
Lessor.findByEmail = (email, callback) => {
    const query = 'SELECT * FROM arrendadores_data WHERE Lessor_email = ?';
    db.query(query, [email], callback);
};

module.exports = Lessor;
