import { Router } from 'express';
import { z } from 'zod';

import autenticar from '../middlewares/auth.middleware.js';
import autorizarRoles from '../middlewares/role.middleware.js';

import AppError from '../utils/AppError.js';

import * as cursoController from '../controllers/curso.controller.js';

const router = Router();

// Validar los parámetros del listado
const listadoSchema = z.object({

    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),

    estado: z.enum([
        'borrador',
        'publicado',
        'archivado'
    ]).optional()

}).strict();

// Middleware para validar la consulta
const validarListado = (req, res, next) => {

    const resultado = listadoSchema.safeParse(req.query);

    if (!resultado.success) {

        return next(
            new AppError(
                'Parametros de consulta invalidos',
                400
            )
        );

    }

    // Guardar los filtros validados
    req.filtrosCursos = resultado.data;

    next();

};

// Consultar cursos del instructor
router.get(
    '/cursos',
    autenticar,
    autorizarRoles('instructor'),
    validarListado,
    cursoController.listarCursosInstructor
);

export default router;