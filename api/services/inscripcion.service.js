import * as cursoRepository from '../repositories/curso.repository.js';
import * as inscripcionRepository from '../repositories/inscripcion.repository.js';
import AppError from '../utils/AppError.js';

// Calcular el avance de una inscripción a partir de Progreso y Leccion
const calcularAvance = (lecciones = [], progresos = []) => {

    const totalLecciones = lecciones.length;

    if (totalLecciones === 0) {
        return {
            totalLecciones: 0,
            leccionesCompletadas: 0,
            porcentajeAvance: 0
        };
    }

    const leccionesValidas = new Set(lecciones.map((leccion) => leccion.id));

    const leccionesCompletadas = progresos.filter(
        (progreso) => progreso.completada && leccionesValidas.has(progreso.leccionId)
    ).length;

    const porcentajeAvance = Math.round((leccionesCompletadas / totalLecciones) * 100);

    return {
        totalLecciones,
        leccionesCompletadas,
        porcentajeAvance
    };
};

// Inscribir a un estudiante en un curso publicado sin duplicados (MA-27)
export const inscribirse = async (idCurso, estudianteId) => {

    const cursoId = Number(idCurso);

    if (!Number.isInteger(cursoId) || cursoId <= 0) {
        throw new AppError('ID de curso invalido', 400);
    }

    // Verificar que el curso exista y esté publicado
    const curso = await cursoRepository.buscarPorId(cursoId);

    if (!curso || curso.estado !== 'publicado') {
        throw new AppError('Curso no encontrado o no publicado', 404);
    }

    // RN-04: un estudiante no puede inscribirse dos veces en el mismo curso
    const inscripcionExistente = await inscripcionRepository.buscarPorEstudianteYCurso(
        estudianteId,
        cursoId
    );

    if (inscripcionExistente) {
        throw new AppError('Ya estás inscrito en este curso', 409);
    }

    const nuevaInscripcion = await inscripcionRepository.crear({
        estudianteId,
        cursoId
    });

    return {
        id: nuevaInscripcion.id,
        estudianteId: nuevaInscripcion.estudianteId,
        cursoId: nuevaInscripcion.cursoId,
        fechaInscripcion: nuevaInscripcion.fechaInscripcion,
        completado: nuevaInscripcion.completado
    };
};

// Listar las inscripciones del estudiante autenticado con su avance (MA-28)
export const listarMisInscripciones = async (estudianteId) => {

    const inscripciones = await inscripcionRepository.listarPorEstudiante(estudianteId);

    return inscripciones.map((inscripcion) => {

        const curso = inscripcion.curso;
        const lecciones = Array.isArray(curso?.lecciones) ? curso.lecciones : [];
        const progresos = Array.isArray(inscripcion.progresos) ? inscripcion.progresos : [];

        return {
            id: inscripcion.id,
            fechaInscripcion: inscripcion.fechaInscripcion,
            completado: inscripcion.completado,
            curso: curso
                ? {
                    id: curso.id,
                    titulo: curso.titulo,
                    descripcion: curso.descripcion,
                    categoria: curso.categoria,
                    nivel: curso.nivel,
                    estado: curso.estado,
                    instructor: curso.instructor
                        ? {
                            id: curso.instructor.id,
                            nombre: curso.instructor.nombre
                        }
                        : null
                }
                : null,
            progreso: calcularAvance(lecciones, progresos)
        };
    });
};

