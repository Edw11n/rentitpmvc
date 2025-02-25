const db = require('../config/db');

class Document {
    /**
 * Obtiene la información completa de un apartamento por su ID.
 * Se unen las tablas de barrio, usuario y las imágenes asociadas.
 * @param {number} id - El ID del apartamento.
 * @param {function} callback - Callback que recibe (error, results).
 */
    static getApartmentById(id, callback) {
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
        FROM apartments AS a
        LEFT JOIN barrio AS b ON a.id_barrio = b.id_barrio
        LEFT JOIN users AS u ON a.user_id = u.user_id
        LEFT JOIN apartment_images AS ai ON a.id_apt = ai.id_apt
        WHERE a.id_apt = ?
        GROUP BY a.id_apt;
        `;
        db.query(query, [id], (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            callback(null, results[0]);
        } else {
            callback(null, null);
        }
        });
    }
}      

module.exports = Document;
