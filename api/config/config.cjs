const path = require('node:path');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

// Configuracion para las migraciones
module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3307),
        dialect: 'mysql',
        logging: false
    }
};