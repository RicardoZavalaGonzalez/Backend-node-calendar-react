const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');
// creando el servidor de express
const app = express();
// Conexion a la base de datos
dbConnection();
// CORS
app.use(cors());
// Directorio publico
app.use(express.static('public'));
// lectura y parseo del body (raw postnam)
/* Proceso de las peticiones que llevan JSON */
app.use(express.json());
// Rutas /* prefijo /api/auth/... */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
// Ecuchando peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})