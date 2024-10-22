const express = require('express');
const cors = require('cors');
const lessorRoutes = require('./routes/lessorRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//usar las rutas
app.use('/lessors', lessorRoutes);
app.use('/apartments', apartmentRoutes);

const portconnect = 3001;
app.listen(portconnect, () => {
    console.log(`Servidor ejecutandose en: http://localhost:${portconnect}`);
});
