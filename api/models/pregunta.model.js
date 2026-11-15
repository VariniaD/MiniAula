import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Modelo de preguntas de los cuestionarios de MiniAula
const Pregunta = sequelize.define('Pregunta', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    enunciado: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    opciones: {
        type: DataTypes.JSON,
        allowNull: false
    },

    indiceCorrecto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    leccionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'preguntas',
    timestamps: false
});

export default Pregunta;