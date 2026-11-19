import * as authService from '../services/auth.service.js';

// Manejar la petición de registro de usuario
export const register = async (req, res, next) => {

    try {

        const usuarioCreado = await authService.register(req.body);

        return res.status(201).json(usuarioCreado);

    } catch (error) {

        next(error);

    }
};

// Manejar la petición de inicio de sesión
export const login = async (req, res, next) => {

    try {

        const resultado = await authService.login(req.body);

        return res.status(200).json(resultado);

    } catch (error) {

        next(error);

    }
};

