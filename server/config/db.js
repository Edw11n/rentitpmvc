const mysql = require('mysql2');

// Crear una conexión a la base de datos
const db = mysql.createConnection({
    host: 'mysql.railway.internal',
    user: 'root',
    password: 'eeSJzgtRnzznXGFCxDZgOjEKyIVGWsmE', 
    database: 'railway',
    port: 3306
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        return;
    }
    console.log('Conexión a la base de datos establecida correctamente');
});

module.exports = db;
