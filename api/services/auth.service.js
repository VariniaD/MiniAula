import Usuario from '../models/usuario.model.js';
import AppError from '../utils/AppError.js';
import { hashearPassword, compararPassword } from '../utils/password.utils.js';
import { generarToken } from '../utils/jwt.utils.js';

// Registrar un nuevo usuario (estudiante o instructor)
export const register = async ({ nombre, email, password, rol }) => {

    const emailNormalizado = email.trim().toLowerCase();

    // Verificar si el correo ya está registrado
    const usuarioExistente = await Usuario.findOne({
        where: { email: emailNormalizado }
    });

    if (usuarioExistente) {
        throw new AppError('El email ya está registrado', 409);
    }

    // Hashear la contraseña con bcrypt
    const passwordHash = await hashearPassword(password);

    // Guardar el nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
        nombre: nombre.trim(),
        email: emailNormalizado,
        passwordHash,
        rol
    });

    // Seguridad: passwordHash NUNCA sale del servicio
    return {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        creadoEn: nuevoUsuario.creadoEn
    };
};

// Iniciar sesión y autenticar credenciales
export const login = async ({ email, password }) => {

    const emailNormalizado = email.trim().toLowerCase();

    // Buscar al usuario por su email
    const usuario = await Usuario.findOne({
        where: { email: emailNormalizado }
    });

    // Si el usuario no existe, credenciales inválidas (401)
    if (!usuario) {
        throw new AppError('Credenciales invalidas', 401);
    }

    // Verificar la contraseña con bcrypt
    const esPasswordValido = await compararPassword(password, usuario.passwordHash);

    if (!esPasswordValido) {
        throw new AppError('Credenciales invalidas', 401);
    }

    // Generar el token JWT con expiración incluyendo id y rol
    const token = generarToken({
        id: usuario.id,
        rol: usuario.rol
    });

    // Seguridad: passwordHash NUNCA sale del servicio
    return {
        token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            creadoEn: usuario.creadoEn
        }
    };
};

