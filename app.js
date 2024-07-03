const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const productRoutes = require('./routes/productRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB Atlas', err));

// Utilizar las rutas de productos
app.use('/api', productRoutes);

// Puerto de la aplicación
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});