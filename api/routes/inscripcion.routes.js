import { Router } from 'express';

import * as inscripcionController from '../controllers/inscripcion.controller.js';

import autenticar from '../middlewares/auth.middleware.js';

import autorizarRoles from '../middlewares/role.middleware.js';

const router = Router();

// Listar las inscripciones del estudiante autenticado con su avance (MA-28)
router.get(
    '/mias',
    autenticar,
    autorizarRoles('estudiante'),
    inscripcionController.listarMisInscripciones
);

export default router;

