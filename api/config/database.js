import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

// Cargar las variables del archivo .env de MiniAula
dotenv.config({
    path: fileURLToPath(new URL('../../.env', import.meta.url))
});

// Configurar la conexion con MySQL
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3307),
        dialect: 'mysql',
        logging: false
    }
);

export default sequelize;