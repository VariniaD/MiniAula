import AppError from '../utils/AppError.js';

// Middleware para manejar errores de la API
const manejarErrores = (error, req, res, next) => {

    // Si la respuesta ya comenzó, delegamos el error
    if (res.headersSent) {
        return next(error);
    }

    // Obtener el código de error
    let statusCode = error instanceof AppError
        ? error.statusCode
        : (error.status >= 400 && error.status < 600
            ? error.status
            : 500);

    // Manejar errores comunes de Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409;
    } else if (error.name === 'SequelizeValidationError') {
        statusCode = 400;
    }

    // Evitar mostrar detalles internos del servidor
    const mensaje = statusCode === 500
        ? 'Error interno del servidor'
        : error.message;

    if (statusCode === 500) {
        console.error(error);
    }

    const details = error.detalles || error.details || [];

    // Responder en formato JSON { error: { code, message, details } }
    return res.status(statusCode).json({
        error: {
            code: error.code || statusCode,
            message: mensaje,
            details
        }
    });
};

export default manejarErrores;