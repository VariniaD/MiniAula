import * as cursoService from '../services/curso.service.js';

// Crear curso
export const crearCurso = async (req, res, next) => {

    try {

        // Obtener el ID del instructor autenticado
        const instructorId = req.usuario.id;

        // Guardar el curso
        const curso = await cursoService.crearCurso(
            req.body,
            instructorId
        );

        // Responder con el curso creado
        return res.status(201).json(curso);

    } catch (error) {
        next(error);
    }
};

// Editar curso
export const editarCurso = async (req, res, next) => {

    try {

        const instructorId = req.usuario.id;

        // Obtener el ID del curso desde la URL
        const { id } = req.params;

        // Actualizar el curso
        const curso = await cursoService.editarCurso(
            id,
            req.body,
            instructorId
        );

        return res.status(200).json(curso);

    } catch (error) {
        next(error);
    }
};

// Listar catálogo público de cursos publicados
export const listarCatalogo = async (req, res, next) => {

    try {

        const resultado = await cursoService.listarCatalogo(
            req.queryValidada || req.query
        );

        return res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};
// Listar cursos del instructor
export const listarCursosInstructor = async (req, res, next) => {

    try {

        // Obtener el ID desde el usuario autenticado
        const instructorId = req.usuario.id;

        // Obtener los filtros previamente validados
        const filtros = req.filtrosCursos;

        // Consultar los cursos del instructor
        const resultado = await cursoService.listarCursosInstructor(
            instructorId,
            filtros
        );

        return res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};

// Consultar detalle público de un curso publicado con su temario
export const obtenerDetallePublico = async (req, res, next) => {

    try {

        const { id } = req.params;

        const curso = await cursoService.obtenerDetallePublico(id);

        return res.status(200).json(curso);

    } catch (error) {
        next(error);
    }
};