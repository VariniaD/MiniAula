import * as inscripcionService from '../services/inscripcion.service.js';

// Inscribir al estudiante autenticado en un curso publicado
export const inscribirse = async (req, res, next) => {

    try {

        const estudianteId = req.usuario.id;
        const { id } = req.params;

        const inscripcion = await inscripcionService.inscribirse(id, estudianteId);

        return res.status(201).json(inscripcion);

    } catch (error) {
        next(error);
    }
};

// Listar las inscripciones del estudiante autenticado con su progreso
export const listarMisInscripciones = async (req, res, next) => {

    try {

        const estudianteId = req.usuario.id;

        const inscripciones = await inscripcionService.listarMisInscripciones(estudianteId);

        return res.status(200).json(inscripciones);

    } catch (error) {
        next(error);
    }
};

