const db = require('../config/db');
const bcrypt = require('bcrypt');

class Lessor {
    static signup({ nombre, apellido, email, telefono, password }, callback) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            }

            const query = 'INSERT INTO arrendadores_data (Lessor_name, Lessor_lastname, Lessor_email, Lessor_phonenumber, Lessor_password) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [nombre, apellido, email, telefono, hashedPassword], callback);
        });
    }

    static findByEmail(email, callback) {
        const query = 'SELECT * FROM arrendadores_data WHERE Lessor_email = ?';
        db.query(query, [email], callback);
    }

    static comparePassword(plainPassword, hashedPassword, callback) {
        bcrypt.compare(plainPassword, hashedPassword, callback);
    }
}

module.exports = Lessor;
