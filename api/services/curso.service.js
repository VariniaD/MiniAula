import * as cursoRepository from '../repositories/curso.repository.js';
import AppError from '../utils/AppError.js';

// Crear un nuevo curso
export const crearCurso = async (datos, instructorId) => {

    // Todos los cursos nuevos comienzan como borrador
    const nuevoCurso = await cursoRepository.crear({
        ...datos,
        instructorId,
        estado: 'borrador'
    });

    return nuevoCurso;
};

// Editar un curso existente
export const editarCurso = async (id, datos, instructorId) => {

    // Verificar que el ID sea válido
    const cursoId = Number(id);

    if (!Number.isInteger(cursoId) || cursoId <= 0) {
        throw new AppError('ID de curso invalido', 400);
    }

    // Buscar el curso en la base de datos
    const curso = await cursoRepository.buscarPorId(cursoId);

    // Comprobar que exista
    if (!curso) {
        throw new AppError('Curso no encontrado', 404);
    }

    // Verificar que pertenezca al instructor
    if (curso.instructorId !== instructorId) {
        throw new AppError(
            'No tienes permiso para editar este curso',
            403
        );
    }

    // Actualizar únicamente los campos permitidos
    const cursoActualizado = await cursoRepository.actualizar(
        curso,
        datos
    );

    return cursoActualizado;
};

// Formatear los datos públicos del instructor
const formatearInstructor = (instructor) => (
    instructor
        ? { id: instructor.id, nombre: instructor.nombre }
        : null
);

// Consultar el catálogo público de cursos publicados 
export const listarCatalogo = async ({ q, categoria, page = 1, limit = 10 }) => {

    const { rows, count } = await cursoRepository.listarPublicados({
        q,
        categoria,
        page,
        limit
    });

    const datos = rows.map((curso) => ({
        id: curso.id,
        titulo: curso.titulo,
        descripcion: curso.descripcion,
        categoria: curso.categoria,
        nivel: curso.nivel,
        estado: curso.estado,
        creadoEn: curso.creadoEn,
        instructor: formatearInstructor(curso.instructor),
        totalLecciones: Array.isArray(curso.lecciones) ? curso.lecciones.length : 0
    }));

    return {
        datos,
        paginacion: {
            pagina: page,
            limite: limit,
            total: count,
            totalPaginas: count === 0 ? 0 : Math.ceil(count / limit)
        }
    };
};

// Consultar el detalle público de un curso publicado y su temario 
export const obtenerDetallePublico = async (id) => {

    const cursoId = Number(id);

    if (!Number.isInteger(cursoId) || cursoId <= 0) {
        throw new AppError('ID de curso invalido', 400);
    }

    const curso = await cursoRepository.buscarPublicadoConTemario(cursoId);

    if (!curso) {
        throw new AppError('Curso no encontrado', 404);
    }

    const lecciones = Array.isArray(curso.lecciones)
        ? [...curso.lecciones]
            .sort((a, b) => a.orden - b.orden)
            .map((leccion) => ({
                id: leccion.id,
                titulo: leccion.titulo,
                tipo: leccion.tipo,
                orden: leccion.orden
            }))
        : [];

    return {
        id: curso.id,
        titulo: curso.titulo,
        descripcion: curso.descripcion,
        categoria: curso.categoria,
        nivel: curso.nivel,
        estado: curso.estado,
        creadoEn: curso.creadoEn,
        instructor: formatearInstructor(curso.instructor),
        lecciones
    };

};
// Obtener los cursos del instructor autenticado
export const listarCursosInstructor = async (
    instructorId,
    filtros
) => {

    const { page, limit, estado } = filtros;

    // Consultar los cursos y contar los resultados
    const resultado = await cursoRepository.listarPorInstructor(
        instructorId,
        page,
        limit,
        estado
    );

    // Calcular el número total de páginas
    const totalPaginas = Math.ceil(resultado.count / limit);

    // Preparar la respuesta
    return {
        datos: resultado.rows,

        paginacion: {
            pagina: page,
            limite: limit,
            total: resultado.count,
            totalPaginas
        }
    };

};