const mysql = require('mysql2');

// Crear una conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'wasd', 
    database: process.env.DB_NAME || 'rentitp',
    port: process.env.DB_PORT || 3306
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
