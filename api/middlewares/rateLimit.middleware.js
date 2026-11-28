import rateLimit from 'express-rate-limit';
import AppError from '../utils/AppError.js';

// Limitar intentos fallidos repetidos en POST /api/auth/login
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    limit: Number(process.env.LOGIN_RATE_LIMIT_MAX) || 5,
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        next(
            new AppError(
                'Demasiados intentos fallidos de inicio de sesión. Inténtalo de nuevo más tarde.',
                429
            )
        );
    }
});

export default loginRateLimiter;
