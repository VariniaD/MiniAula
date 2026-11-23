import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import validar from '../middlewares/validate.middleware.js';
import loginRateLimiter from '../middlewares/rateLimit.middleware.js';
import { registroSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

// Registro de usuario (estudiante o instructor)
router.post('/register', validar(registroSchema), authController.register);

// Inicio de sesión (protegido con rate limit ante intentos fallidos)
router.post('/login', loginRateLimiter, validar(loginSchema), authController.login);

export default router;

