const db = require('../config/db');
const bcrypt = require('bcrypt');

class Lessor {
    static signup({ nombre, apellido, email, telefono, password, rolId }, callback) {
        // Generar un hash para la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            }
    
            // Paso 1: Insertar el nuevo usuario en la tabla 'users'
            const query = 'INSERT INTO users (user_name, user_lastname, user_email, user_phonenumber, user_password) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [nombre, apellido, email, telefono, hashedPassword], (err, result) => {
                if (err) {
                    return callback(err);
                }
    
                // Paso 2: Obtener el ID del usuario recién insertado
                const userId = result.insertId;
                // Paso 3: Insertar el rol del usuario en la tabla 'users_rol'
                const queryRol = 'INSERT INTO user_rol (user_id, rol_id, start_date) VALUES (?, ?, ?)';
                const startDate = new Date(); // Fecha de inicio del rol (ahora)
                db.query(queryRol, [userId, rolId, startDate], callback);
            });
        });
    }
    

    static findByEmail(email, callback) {
        const query = `
            SELECT users.*, user_rol.rol_id
            FROM users
            JOIN user_rol ON users.user_id = user_rol.user_id
            WHERE users.user_email = ?
        `;
        db.query(query, [email], callback);
    }
    static comparePassword(plainPassword, hashedPassword, callback) {
        bcrypt.compare(plainPassword, hashedPassword, callback);
    }
}

module.exports = Lessor;
