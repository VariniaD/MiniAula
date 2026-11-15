import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Modelo de inscripciones de MiniAula
const Inscripcion = sequelize.define('Inscripcion', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    estudianteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cursoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fechaInscripcion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    completado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}, {
    tableName: 'inscripciones',
    timestamps: false,

    indexes: [
        {
            unique: true,
            fields: ['estudianteId', 'cursoId']
        }
    ]
});

export default Inscripcion;