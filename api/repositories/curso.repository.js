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

// Listar únicamente los cursos de un instructor
export const listarPorInstructor = async (
    instructorId,
    pagina,
    limite,
    estado
) => {

    // Filtrar por el instructor autenticado
    const where = {
        instructorId
    };

    // Aplicar filtro de estado si fue enviado
    if (estado) {
        where.estado = estado;
    }

    // Calcular desde qué registro comenzamos
    const offset = (pagina - 1) * limite;

    // Consultar los cursos utilizando Sequelize
    return await Curso.findAndCountAll({
        where,
        limit: limite,
        offset,
        order: [
            ['creadoEn', 'DESC'],
            ['id', 'DESC']
        ]
    });

};