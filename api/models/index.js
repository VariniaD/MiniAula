// Importar los modelos
import Usuario from './usuario.model.js';
import Curso from './curso.model.js';
import Leccion from './leccion.model.js';
import Pregunta from './pregunta.model.js';
import Inscripcion from './inscripcion.model.js';
import Progreso from './progreso.model.js';

// Un instructor puede tener varios cursos
Usuario.hasMany(Curso, {
    foreignKey: 'instructorId',
    as: 'cursosCreados'
});

Curso.belongsTo(Usuario, {
    foreignKey: 'instructorId',
    as: 'instructor'
});

// Un curso puede tener varias lecciones
Curso.hasMany(Leccion, {
    foreignKey: 'cursoId',
    as: 'lecciones'
});

Leccion.belongsTo(Curso, {
    foreignKey: 'cursoId',
    as: 'curso'
});

// Una leccion puede tener varias preguntas
Leccion.hasMany(Pregunta, {
    foreignKey: 'leccionId',
    as: 'preguntas'
});

Pregunta.belongsTo(Leccion, {
    foreignKey: 'leccionId',
    as: 'leccion'
});

// Un estudiante puede tener varias inscripciones
Usuario.hasMany(Inscripcion, {
    foreignKey: 'estudianteId',
    as: 'inscripciones'
});

Inscripcion.belongsTo(Usuario, {
    foreignKey: 'estudianteId',
    as: 'estudiante'
});

// Un curso puede tener varios estudiantes inscritos
Curso.hasMany(Inscripcion, {
    foreignKey: 'cursoId',
    as: 'inscripciones'
});

Inscripcion.belongsTo(Curso, {
    foreignKey: 'cursoId',
    as: 'curso'
});

// Una inscripcion puede tener varios registros de progreso
Inscripcion.hasMany(Progreso, {
    foreignKey: 'inscripcionId',
    as: 'progresos'
});

Progreso.belongsTo(Inscripcion, {
    foreignKey: 'inscripcionId',
    as: 'inscripcion'
});

// Una leccion puede tener varios registros de progreso
Leccion.hasMany(Progreso, {
    foreignKey: 'leccionId',
    as: 'progresos'
});

Progreso.belongsTo(Leccion, {
    foreignKey: 'leccionId',
    as: 'leccion'
});

// Exportar los modelos para utilizarlos en los servicios
export {
    Usuario,
    Curso,
    Leccion,
    Pregunta,
    Inscripcion,
    Progreso
};