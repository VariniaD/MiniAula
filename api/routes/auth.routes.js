import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import validar from '../middlewares/validate.middleware.js';
import { registroSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

// Registro de usuario (estudiante o instructor)
router.post('/register', validar(registroSchema), authController.register);

// Inicio de sesión
router.post('/login', validar(loginSchema), authController.login);

export default router;

