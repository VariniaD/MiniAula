import { Usuario } from '../models/index.js';

// Columnas públicas del usuario: passwordHash nunca se consulta para el perfil
const ATRIBUTOS_PUBLICOS = ['id', 'nombre', 'email', 'rol', 'creadoEn'];

// Buscar un usuario por su ID
export const buscarPorId = async (id) => {
    return await Usuario.findByPk(id, {
        attributes: ATRIBUTOS_PUBLICOS
    });
};

// Buscar un usuario por su email
export const buscarPorEmail = async (email) => {
    return await Usuario.findOne({
        where: { email },
        attributes: ATRIBUTOS_PUBLICOS
    });
};

// Actualizar los datos de un usuario
export const actualizar = async (usuario, datos) => {
    return await usuario.update(datos);
};
