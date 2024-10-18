const db = require('../config/db');

const Apartment = {};

// Agregar un nuevo apartamento
Apartment.create = (barrio, direccion, latitud, longitud, addInfo, Lessor_email, callback) => {
    const query = 'INSERT INTO apartamentos_data (barrio_apartamento, direccion_apartamento, latitud_apartamento, longitud_apartamento, info_adicional_apartamento, Lessor_email) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [barrio, direccion, latitud, longitud, addInfo, Lessor_email], callback);
};

// Obtener apartamentos por email del arrendador
Apartment.findByLessorEmail = (email, callback) => {
    const query = 'SELECT * FROM apartamentos_data WHERE Lessor_email = ?';
    db.query(query, [email], callback);
};

// Obtener todos los apartamentos
Apartment.getAll = (callback) => {
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

// Eliminar apartamento por ID
Apartment.delete = (id_apartamento, callback) => {
    const query = 'DELETE FROM apartamentos_data WHERE id_apartamento = ?';
    db.query(query, [id_apartamento], callback);
};

// Actualizar apartamento por ID
Apartment.update = (id_apartamento, direccion_apartamento, barrio_apartamento, latitud_apartamento, longitud_apartamento, info_adicional_apartamento, callback) => {
    const query = `
        UPDATE apartamentos_data 
        SET direccion_apartamento = ?, barrio_apartamento = ?, latitud_apartamento = ?, longitud_apartamento = ?, info_adicional_apartamento = ? 
        WHERE id_apartamento = ?`;
    db.query(query, [direccion_apartamento, barrio_apartamento, latitud_apartamento, longitud_apartamento, info_adicional_apartamento, id_apartamento], callback);
};

module.exports = Apartment;
