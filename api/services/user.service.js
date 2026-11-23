import * as userRepository from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';

// Devolver solo los datos públicos del usuario (nunca passwordHash)
const formatearUsuario = (usuario) => ({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    creadoEn: usuario.creadoEn
});

// Buscar al usuario o lanzar 404 si no existe
const obtenerUsuarioExistente = async (id) => {

    const usuario = await userRepository.buscarPorId(id);

    if (!usuario) {
        throw new AppError('Usuario no encontrado', 404);
    }

    return usuario;
};

// Verificar que el email no pertenezca a otro usuario
const verificarEmailDisponible = async (email, usuarioId) => {

    const usuarioConEmail = await userRepository.buscarPorEmail(email);

    if (usuarioConEmail && usuarioConEmail.id !== usuarioId) {
        throw new AppError('El email ya está registrado', 409);
    }
};

// Consultar el perfil del usuario autenticado
export const obtenerPerfil = async (usuarioId) => {

    const usuario = await obtenerUsuarioExistente(usuarioId);

    return formatearUsuario(usuario);
};

// Actualizar nombre y/o email del usuario autenticado
export const actualizarPerfil = async (usuarioId, { nombre, email }) => {

    const usuario = await obtenerUsuarioExistente(usuarioId);

    const cambios = {};

    if (nombre !== undefined) {
        cambios.nombre = nombre;
    }

    if (email !== undefined && email !== usuario.email) {
        await verificarEmailDisponible(email, usuario.id);
        cambios.email = email;
    }

    const usuarioActualizado = Object.keys(cambios).length > 0
        ? await userRepository.actualizar(usuario, cambios)
        : usuario;

    return formatearUsuario(usuarioActualizado);
};

