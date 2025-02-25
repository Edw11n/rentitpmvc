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
            if (err) return callback(err);
    
            db.query(queryBarrio, [data.barrio, data.barrio], (err) => {
                if (err) return db.rollback(() => callback(err));
    
                db.query(getBarrioId, [data.barrio], (err, barrioResults) => {
                    if (err) return db.rollback(() => callback(err));
                    const idBarrio = barrioResults[0].id_barrio;
    
                    db.query(getUserId, [data.user_email], (err, userResults) => {
                        if (err) return db.rollback(() => callback(err));
                        if (!userResults.length) {
                            return db.rollback(() => callback(new Error("User not found")));
                        }
    
                        const userId = userResults[0].user_id;
    
                        db.query(
                            queryApartment,
                            [idBarrio, data.direccion, data.latitud, data.longitud, data.addInfo, userId],
                            (err, results) => {
                                if (err) return db.rollback(() => callback(err));
    
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

    // Método para asociar una imagen a un apartamento
    static addImage(id_apt, imagePath, callback) {
        const query = `INSERT INTO apartment_images (imagen, id_apt) VALUES (?, ?)`;
        db.query(query, [imagePath, id_apt], callback);
    }
    

    static getApartmentsByLessor(user_id, callback) {
        const query = `
            SELECT 
                a.*, 
                b.barrio,
                GROUP_CONCAT(ai.imagen) AS images
            FROM apartments AS a
            LEFT JOIN barrio AS b ON a.id_barrio = b.id_barrio
            LEFT JOIN apartment_images AS ai ON a.id_apt = ai.id_apt
            WHERE a.user_id = ?
            GROUP BY a.id_apt;
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
      
            db.query(queryBarrio, [data.barrio, data.barrio], (err) => {
                if (err) return db.rollback(() => callback(err));
      
                db.query(getBarrioId, [data.barrio], (err, results) => {
                    if (err) return db.rollback(() => callback(err));
                    const idBarrio = results[0].id_barrio;
      
                    db.query(queryApartment, [
                        data.direccion_apt,
                        idBarrio,
                        data.latitud_apt,
                        data.longitud_apt,
                        data.info_add_apt,
                        id_apt
                    ], (err, results) => {
                        if (err) return db.rollback(() => callback(err));
      
                        if (typeof data.existing_images !== 'undefined') {
                            // Normalizamos la cadena: reemplazamos backslashes y aplicamos trim
                            const normalizedExistingImages = data.existing_images.replace(/\\/g, '/').trim();
                            console.log("Normalized existing_images:", normalizedExistingImages);
                            
                            const existingImagesArray = normalizedExistingImages
                                .split(',')
                                .map(img => img.trim())
                                .filter(img => img !== "");
          
                            if (existingImagesArray.length === 0) {
                                const deleteQuery = "DELETE FROM apartment_images WHERE id_apt = ?";
                                db.query(deleteQuery, [id_apt], (err, deleteResult) => {
                                    if (err) return db.rollback(() => callback(err));
                                    console.log("Filas eliminadas (caso vacío):", deleteResult.affectedRows);
                                    db.commit((err) => {
                                        if (err) return db.rollback(() => callback(err));
                                        callback(null, results);
                                    });
                                });
                            } else {
                                // Crear placeholders para el array de imágenes
                                const placeholders = existingImagesArray.map(() => '?').join(',');
                                // Aquí usamos '\\\\' para obtener dos backslashes en el literal SQL
                                const deleteQuery = `
                                    DELETE FROM apartment_images 
                                    WHERE id_apt = ? 
                                    AND TRIM(REPLACE(imagen, '\\\\', '/')) NOT IN (${placeholders})
                                `;
                                const params = [id_apt, ...existingImagesArray];
                                console.log("Delete query params:", params);
                                db.query(deleteQuery, params, (err, deleteResult) => {
                                    if (err) {
                                        console.error("Error en deleteQuery:", err);
                                        return db.rollback(() => callback(err));
                                    }
                                    console.log("Filas eliminadas:", deleteResult.affectedRows);
                                    db.commit((err) => {
                                        if (err) return db.rollback(() => callback(err));
                                        callback(null, results);
                                    });
                                });
                            }
                        } else {
                            db.commit((err) => {
                                if (err) return db.rollback(() => callback(err));
                                callback(null, results);
                            });
                        }
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
                u.user_phonenumber,
                GROUP_CONCAT(ai.imagen) AS images
            FROM
                apartments AS a
            LEFT JOIN barrio AS b ON a.id_barrio = b.id_barrio
            LEFT JOIN users AS u ON a.user_id = u.user_id
            LEFT JOIN apartment_images AS ai ON a.id_apt = ai.id_apt
            GROUP BY a.id_apt;
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
