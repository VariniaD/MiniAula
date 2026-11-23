import { Curso, Inscripcion, Leccion, Progreso, Usuario } from '../models/index.js';

// Buscar si ya existe inscripción para un estudiante en un curso
export const buscarPorEstudianteYCurso = async (estudianteId, cursoId) => {
    return await Inscripcion.findOne({
        where: {
            estudianteId,
            cursoId
        }
    });
};

// Crear una nueva inscripción
export const crear = async (datos) => {
    return await Inscripcion.create(datos);
};

// Listar todas las inscripciones de un estudiante con su curso, lecciones y progreso
export const listarPorEstudiante = async (estudianteId) => {
    return await Inscripcion.findAll({
        where: { estudianteId },
        include: [
            {
                model: Curso,
                as: 'curso',
                attributes: ['id', 'titulo', 'descripcion', 'categoria', 'nivel', 'estado'],
                include: [
                    {
                        model: Usuario,
                        as: 'instructor',
                        attributes: ['id', 'nombre']
                    },
                    {
                        model: Leccion,
                        as: 'lecciones',
                        attributes: ['id', 'orden']
                    }
                ]
            },
            {
                model: Progreso,
                as: 'progresos',
                attributes: ['id', 'leccionId', 'completada']
            }
        ],
        order: [
            ['fechaInscripcion', 'DESC'],
            ['id', 'DESC']
        ]
    });
};

