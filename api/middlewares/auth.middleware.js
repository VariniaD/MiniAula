import { verificarToken } from '../utils/jwt.utils.js';
import Usuario from '../models/usuario.model.js';
import AppError from '../utils/AppError.js';

// Verificar que el usuario este autenticado
const autenticar = async (req, res, next) => {

    try {

        // Obtener el token enviado en la cabecera
        const autorizacion = req.headers.authorization || '';

        const [tipo, token] = autorizacion.split(' ');

        // Verificar que exista el token
        if (tipo !== 'Bearer' || !token) {
            return next(new AppError('Token requerido', 401));
        }

        // Verificar la firma y vencimiento del token
        const datos = verificarToken(token);

        if (!Number.isInteger(datos.id) || datos.id < 1) {
            return next(new AppError('Token invalido', 401));
        }

        // Buscar al usuario en nuestra base de datos
        const usuario = await Usuario.findByPk(datos.id);

        if (!usuario) {
            return next(new AppError('Usuario no encontrado', 401));
        }

        // Guardar los datos del usuario autenticado
        req.usuario = {
            id: usuario.id,
            rol: usuario.rol
        };

        next();

    } catch (error) {

        // Token vencido
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Token vencido', 401));
        }

        // Token incorrecto
        if (
            error.name === 'JsonWebTokenError' ||
            error.name === 'NotBeforeError'
        ) {
            return next(new AppError('Token invalido', 401));
        }

        next(error);
    }
};

export default autenticar;