import { Curso } from '../models/index.js';

// Guardar un curso en la base de datos
export const crear = async (datos) => {
    return await Curso.create(datos);
};

// Buscar un curso por su ID
export const buscarPorId = async (id) => {
    return await Curso.findByPk(id);
};

// Actualizar los datos de un curso
export const actualizar = async (curso, datos) => {
    return await curso.update(datos);
};