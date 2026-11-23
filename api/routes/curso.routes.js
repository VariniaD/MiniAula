import { Router } from 'express';

import * as cursoController from '../controllers/curso.controller.js';

import autenticar from '../middlewares/auth.middleware.js';

import autorizarRoles from '../middlewares/role.middleware.js';

import validar from '../middlewares/validate.middleware.js';

import {
    crearCursoSchema,
    editarCursoSchema
} from '../schemas/curso.schema.js';

const router = Router();

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