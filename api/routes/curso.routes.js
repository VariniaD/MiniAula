import { Router } from 'express';

import * as cursoController from '../controllers/curso.controller.js';

import * as inscripcionController from '../controllers/inscripcion.controller.js';

import autenticar from '../middlewares/auth.middleware.js';

import autorizarRoles from '../middlewares/role.middleware.js';

import validar from '../middlewares/validate.middleware.js';

import {
    crearCursoSchema,
    editarCursoSchema,
    listarCursosQuerySchema
} from '../schemas/curso.schema.js';

const router = Router();

// Catálogo público de cursos publicados 
router.get(
    '/',
    validar(listarCursosQuerySchema, 'query'),
    cursoController.listarCatalogo
);

// Detalle público de curso publicado con temario sin contenido 
router.get(
    '/:id',
    cursoController.obtenerDetallePublico
);

// Inscripción de estudiante en un curso publicado sin duplicados
router.post(
    '/:id/inscripcion',
    autenticar,
    autorizarRoles('estudiante'),
    inscripcionController.inscribirse
);

// Crear curso: solo instructores
router.post(
    '/',
    autenticar,
    autorizarRoles('instructor'),
    validar(crearCursoSchema),
    cursoController.crearCurso
);

// Editar curso: solo su instructor propietario
router.put(
    '/:id',
    autenticar,
    autorizarRoles('instructor'),
    validar(editarCursoSchema),
    cursoController.editarCurso
);

export default router;