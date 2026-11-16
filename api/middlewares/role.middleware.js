import AppError from '../utils/AppError.js';

// Verificar que el usuario tenga el rol permitido
const autorizarRoles = (...rolesPermitidos) => {

    return (req, res, next) => {

        // Verificar que exista un usuario autenticado
        if (!req.usuario) {
            return next(new AppError('No autenticado', 401));
        }

        // Comprobar el rol del usuario
        if (!rolesPermitidos.includes(req.usuario.rol)) {

            return next(
                new AppError('No tienes permiso para esta accion', 403)
            );
        }

        next();
    };
};

export default autorizarRoles;