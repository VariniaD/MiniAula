// Clase para manejar errores personalizados
class AppError extends Error {

    constructor(mensaje, statusCode, detalles = [], code = null) {

        super(mensaje);

        this.statusCode = statusCode;

        this.code = code || statusCode;

        this.detalles = detalles;

        this.details = detalles;
    }
}

export default AppError;