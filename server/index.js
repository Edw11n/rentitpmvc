const express = require('express');
const cors = require('cors');
const lessorRoutes = require('./routes/lessorRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const DocumentRoutes = require('./routes/DocumentRoutes');
const path = require('path');
const asd = adadad

const app = express();
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//usar las rutas
app.use('/lessors', lessorRoutes);
app.use('/apartments', apartmentRoutes);
app.use('/documents', DocumentRoutes);

const portconnect = 3001;
app.listen(portconnect, () => {
    console.log(`Servidor ejecutandose en: http://localhost:${portconnect}`);
});
