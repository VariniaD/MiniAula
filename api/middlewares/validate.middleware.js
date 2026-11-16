import AppError from '../utils/AppError.js';

// Middleware para validar los datos recibidos
const validar = (esquema) => {

    return (req, res, next) => {

        // Validar los datos utilizando Zod
        const resultado = esquema.safeParse(req.body);

        if (!resultado.success) {

            // Obtener los errores de validación
            const errores = resultado.error.issues.map((error) => ({
                campo: error.path.join('.'),
                mensaje: error.message
            }));

            return next(
                new AppError('Datos invalidos', 400, errores)
            );
        }

        // Guardar los datos validados
        req.body = resultado.data;

        next();
    };
};

export default validar;