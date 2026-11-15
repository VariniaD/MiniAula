import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Modelo de progreso de estudiantes en MiniAula
const Progreso = sequelize.define('Progreso', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    inscripcionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    leccionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    completada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    intentos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 3
        }
    },

    mejorNota: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },

    actualizadoEn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

}, {
    tableName: 'progresos',
    timestamps: false,

    indexes: [
        {
            unique: true,
            fields: ['inscripcionId', 'leccionId']
        }
    ]
});

export default Progreso;