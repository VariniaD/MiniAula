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