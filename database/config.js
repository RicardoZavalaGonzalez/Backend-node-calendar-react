const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // conexion a la base de datos
        await mongoose.connect(process.env.DB_CNN);
        console.log('Database conected');
    } catch (error) {
        console.log(error);
        throw Error('Error en la conexión a la base de datos');
    }
}

module.exports = { dbConnection }