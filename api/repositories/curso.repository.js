import { Op } from 'sequelize';
import { Curso, Leccion, Usuario } from '../models/index.js';

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

// Listar cursos publicados con búsqueda, filtro por categoría y paginación
export const listarPublicados = async ({ q, categoria, page, limit }) => {

    const where = { estado: 'publicado' };

    if (q) {
        where.titulo = { [Op.like]: `%${q}%` };
    }

    if (categoria) {
        where.categoria = categoria;
    }

    return await Curso.findAndCountAll({
        where,
        include: [
            {
                model: Usuario,
                as: 'instructor',
                attributes: ['id', 'nombre']
            },
            {
                model: Leccion,
                as: 'lecciones',
                attributes: ['id']
            }
        ],
        order: [
            ['creadoEn', 'DESC'],
            ['id', 'DESC']
        ],
        limit,
        offset: (page - 1) * limit,
        distinct: true
    });
};

// Buscar un curso publicado con su temario ordenado (sin contenido ni preguntas)
export const buscarPublicadoConTemario = async (id) => {
    return await Curso.findOne({
        where: {
            id,
            estado: 'publicado'
        },
        include: [
            {
                model: Usuario,
                as: 'instructor',
                attributes: ['id', 'nombre']
            },
            {
                model: Leccion,
                as: 'lecciones',
                attributes: ['id', 'titulo', 'tipo', 'orden']
            }
        ],
        order: [
            [{ model: Leccion, as: 'lecciones' }, 'orden', 'ASC']
        ]
    });
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