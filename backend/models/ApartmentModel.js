const db = require('../config/db');

class Apartment {
    static addApartment(data, callback) {
        const query = 'INSERT INTO apartamentos_data (barrio_apartamento, direccion_apartamento, latitud_apartamento, longitud_apartamento, info_adicional_apartamento, Lessor_email) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [data.barrio, data.direccion, data.latitud, data.longitud, data.addInfo, data.Lessor_email], callback);
    }

    static getApartmentsByLessor(email, callback) {
        const query = 'SELECT * FROM apartamentos_data WHERE Lessor_email = ?';
        db.query(query, [email], callback);
    }

    static updateApartment(id_apartamento, data, callback) {
        const query = `UPDATE apartamentos_data SET direccion_apartamento = ?, barrio_apartamento = ?, latitud_apartamento = ?, longitud_apartamento = ?, info_adicional_apartamento = ? WHERE id_apartamento = ?`;
        db.query(query, [data.direccion_apartamento, data.barrio_apartamento, data.latitud_apartamento, data.longitud_apartamento, data.info_adicional_apartamento, id_apartamento], callback);
    }

    static deleteApartment(id_apartamento, callback) {
        const query = 'DELETE FROM apartamentos_data WHERE id_apartamento = ?';
        db.query(query, [id_apartamento], callback);
    }

    static getAllApartments(callback) {
        const query = `
        SELECT
            a.*,
            r.Lessor_name,
            r.Lessor_lastname,
            r.Lessor_email,
            r.Lessor_phonenumber
        FROM
            apartamentos_data AS a
        LEFT JOIN
            arrendadores_data AS r
        ON
            a.Lessor_email = r.Lessor_email
        `;
        db.query(query, callback);
    };
}

module.exports = Apartment;
