const db = require('../config/db');

class Apartment {
    static addApartment(data, callback) {
        const queryBarrio = `
            INSERT INTO barrio (barrio)
            SELECT ? 
            WHERE NOT EXISTS (
                SELECT 1 FROM barrio WHERE barrio = ?
            );
        `;
    
        const getBarrioId = `SELECT id_barrio FROM barrio WHERE barrio = ?`;
        const getUserId = `SELECT user_id FROM users WHERE user_email = ?`;
    
        const queryApartment = `
            INSERT INTO apartments (id_barrio, direccion_apt, latitud_apt, longitud_apt, info_add_apt, user_id)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
    
        db.beginTransaction((err) => {
            if (err) return callback(err); // Manejo de errores al iniciar la transacción
    
            // Inserta el barrio si no existe
            db.query(queryBarrio, [data.barrio, data.barrio], (err) => {
                if (err) return db.rollback(() => callback(err));
    
                // Obtiene el ID del barrio
                db.query(getBarrioId, [data.barrio], (err, barrioResults) => {
                    if (err) return db.rollback(() => callback(err));
                    const idBarrio = barrioResults[0].id_barrio;
    
                    // Obtiene el ID del usuario
                    db.query(getUserId, [data.user_email], (err, userResults) => {
                        if (err) return db.rollback(() => callback(err));
                        if (!userResults.length) {
                            return db.rollback(() => callback(new Error("User not found")));
                        }
    
                        const userId = userResults[0].user_id;
    
                        // Inserta el apartamento
                        db.query(
                            queryApartment,
                            [idBarrio, data.direccion, data.latitud, data.longitud, data.addInfo, userId],
                            (err, results) => {
                                if (err) return db.rollback(() => callback(err));
    
                                // Finaliza la transacción
                                db.commit((err) => {
                                    if (err) return db.rollback(() => callback(err));
                                    callback(null, results);
                                });
                            }
                        );
                    });
                });
            });
        });
    }
    

    static getApartmentsByLessor(user_id, callback) {
        const query = `
            SELECT a.*, b.barrio
            FROM apartments AS a
            LEFT JOIN barrio AS b ON a.id_barrio = b.id_barrio
            WHERE a.user_id = ?;
        `;
        db.query(query, [user_id], callback);
    }
    

    static updateApartment(id_apt, data, callback) {
        const queryBarrio = `
            INSERT INTO barrio (barrio)
            SELECT ?
            WHERE NOT EXISTS (
                SELECT 1 FROM barrio WHERE barrio = ?
            );
        `;
    
        const getBarrioId = `SELECT id_barrio FROM barrio WHERE barrio = ?`;
    
        const queryApartment = `
            UPDATE apartments 
            SET direccion_apt = ?, 
                id_barrio = ?, 
                latitud_apt = ?, 
                longitud_apt = ?, 
                info_add_apt = ?
            WHERE id_apt = ?;
        `;
    
        db.beginTransaction((err) => {
            if (err) return callback(err);
    
            // Inserta el barrio si no existe
            db.query(queryBarrio, [data.barrio, data.barrio], (err) => {
                if (err) return db.rollback(() => callback(err));
    
                // Obtiene el ID del barrio
                db.query(getBarrioId, [data.barrio], (err, results) => {
                    if (err) return db.rollback(() => callback(err));
                    const idBarrio = results[0].id_barrio;
    
                    // Actualiza el apartamento
                    db.query(queryApartment, [
                        data.direccion_apt,
                        idBarrio,
                        data.latitud_apt,
                        data.longitud_apt,
                        data.info_add_apt,
                        id_apt
                    ], (err, results) => {
                        if (err) return db.rollback(() => callback(err));
    
                        // Finaliza la transacción
                        db.commit((err) => {
                            if (err) return db.rollback(() => callback(err));
                            callback(null, results);
                        });
                    });
                });
            });
        });
    }
    
    

    static deleteApartment(id_apt, callback) {
        const query = 'DELETE FROM apartments WHERE id_apt = ?';
        db.query(query, [id_apt], callback);
    }

    static getAllApartments(callback) {
        const query = `
            SELECT
                a.id_apt,
                a.direccion_apt,
                a.latitud_apt,
                a.longitud_apt,
                a.info_add_apt,
                b.barrio,
                u.user_id,
                u.user_name,
                u.user_lastname,
                u.user_email,
                u.user_phonenumber
            FROM
                apartments AS a
            LEFT JOIN
                barrio AS b
            ON
                a.id_barrio = b.id_barrio
            LEFT JOIN
                users AS u
            ON
                a.user_id = u.user_id
        `;
        db.query(query, callback);
    }
    

    static getMarkersInfo(callback) {
        const query = `
            SELECT
                a.id_apt AS id_apartamento,
                a.direccion_apt AS direccion_apartamento,
                b.barrio AS barrio_apartamento,
                a.latitud_apt AS latitud_apartamento,
                a.longitud_apt AS longitud_apartamento,
                a.info_add_apt AS info_adicional_apartamento
            FROM
                apartments AS a
            LEFT JOIN
                barrio AS b
            ON
                a.id_barrio = b.id_barrio
        `;
        db.query(query, callback);
    }
    
} 
module.exports = Apartment;
