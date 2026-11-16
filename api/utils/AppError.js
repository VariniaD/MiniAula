// Clase para manejar errores personalizados
class AppError extends Error {

    constructor(mensaje, statusCode, detalles = []) {

        super(mensaje);

        this.statusCode = statusCode;

        this.detalles = detalles;
    }
}

export default AppError;