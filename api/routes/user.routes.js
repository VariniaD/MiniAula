import { Router } from 'express';

import * as userController from '../controllers/user.controller.js';

import autenticar from '../middlewares/auth.middleware.js';

import validar from '../middlewares/validate.middleware.js';

import { actualizarPerfilSchema } from '../schemas/user.schema.js';

const router = Router();

// Consultar el propio perfil: cualquier usuario autenticado
router.get(
    '/me',
    autenticar,
    userController.obtenerPerfil
);

// Editar el propio perfil: cualquier usuario autenticado
router.put(
    '/me',
    autenticar,
    validar(actualizarPerfilSchema),
    userController.actualizarPerfil
);

export default router;
