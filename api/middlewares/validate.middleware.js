import AppError from '../utils/AppError.js';

// Middleware para validar los datos recibidos (body, query o params)
const validar = (esquema, fuente = 'body') => {

    return (req, res, next) => {

        // Validar los datos utilizando Zod
        const resultado = esquema.safeParse(req[fuente]);

        if (!resultado.success) {

            // Obtener los errores de validación
            const errores = resultado.error.issues.map((issue) => ({
                campo: issue.path.join('.'),
                mensaje: issue.message,
                field: issue.path.join('.'),
                message: issue.message
            }));

            return next(
                new AppError('Datos invalidos', 400, errores)
            );
        }

        // Guardar los datos validados (en Express 5 req.query es solo lectura)
        if (fuente === 'body') {
            req.body = resultado.data;
        } else if (fuente === 'query') {
            req.queryValidada = resultado.data;
        } else if (fuente === 'params') {
            req.paramsValidados = resultado.data;
        }

        next();
    };
};

export default validar;