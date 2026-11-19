import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

// Cargar las variables del archivo .env
dotenv.config({
    path: fileURLToPath(new URL('../../.env', import.meta.url))
});

// Obtener la clave secreta
const obtenerClave = () => {

    if (!process.env.JWT_SECRET) {
        throw new Error('Falta configurar JWT_SECRET');
    }

    return process.env.JWT_SECRET;
};

// Generar un token para un usuario con id y rol
const generarToken = (usuario, rolParam = null) => {

    const payload = typeof usuario === 'object' && usuario !== null
        ? { id: usuario.id, ...(usuario.rol ? { rol: usuario.rol } : {}) }
        : { id: usuario, ...(rolParam ? { rol: rolParam } : {}) };

    return jwt.sign(
        payload,
        obtenerClave(),
        {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        }
    );
};

// Verificar si un token es valido
const verificarToken = (token) => {

    return jwt.verify(token, obtenerClave(), {
        algorithms: ['HS256']
    });
};

export {
    generarToken,
    verificarToken
};