import * as userService from '../services/user.service.js';

// Consultar el perfil del usuario autenticado
export const obtenerPerfil = async (req, res, next) => {

    try {

        const usuario = await userService.obtenerPerfil(req.usuario.id);

        return res.status(200).json(usuario);

    } catch (error) {
        next(error);
    }
};

// Editar el perfil del usuario autenticado
export const actualizarPerfil = async (req, res, next) => {

    try {

        const usuario = await userService.actualizarPerfil(
            req.usuario.id,
            req.body
        );

        return res.status(200).json(usuario);

    } catch (error) {
        next(error);
    }
};
