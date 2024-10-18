const express = require('express');
const cors = require('cors');
const apartmentsRoutes = require('./routes/apartmentRoutes');
const lessorRoutes = require('./routes/lessorRoutes');

// Crear aplicación express
const app = express();
app.use(cors());
app.use(express.json());

// Importar las rutas
app.use('/apartments', apartmentsRoutes);  // Rutas para los apartamentos
app.use('/lessors', lessorRoutes);  // Rutas para los arrendadores

// Iniciar el servidor
const portconnect = 3001;
app.listen(portconnect, () => {
    console.log(`Servidor inicializando en http://localhost:${portconnect}`);
});
