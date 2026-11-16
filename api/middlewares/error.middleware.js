import AppError from '../utils/AppError.js';

// Middleware para manejar errores de la API
const manejarErrores = (error, req, res, next) => {

    // Si la respuesta ya comenzó, delegamos el error
    if (res.headersSent) {
        return next(error);
    }

    // Obtener el código de error
    const statusCode = error instanceof AppError
        ? error.statusCode
        : (error.status >= 400 && error.status < 600
            ? error.status
            : 500);

    // Evitar mostrar detalles internos del servidor
    const mensaje = statusCode === 500
        ? 'Error interno del servidor'
        : error.message;

    if (statusCode === 500) {
        console.error(error);
    }

    // Responder en formato JSON
    return res.status(statusCode).json({
        mensaje,
        errores: error.detalles || []
    });
};

export default manejarErrores;