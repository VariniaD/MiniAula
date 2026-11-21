import { z } from 'zod';

// Esquema de validación para el registro de usuarios
export const registroSchema = z.object({
    nombre: z
        .string({
            required_error: 'El nombre es obligatorio',
            invalid_type_error: 'El nombre debe ser una cadena de texto'
        })
        .trim()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(100, 'El nombre no debe superar los 100 caracteres'),

    email: z
        .string({
            required_error: 'El email es obligatorio',
            invalid_type_error: 'El email debe ser una cadena de texto'
        })
        .trim()
        .toLowerCase()
        .email('El formato del email es invalido'),

    password: z
        .string({
            required_error: 'La contraseña es obligatoria',
            invalid_type_error: 'La contraseña debe ser una cadena de texto'
        })
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),

    rol: z.enum(['estudiante', 'instructor'], {
        errorMap: () => ({ message: 'El rol debe ser estudiante o instructor' })
    })
});

// Esquema de validación para el inicio de sesión
export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'El email es obligatorio',
            invalid_type_error: 'El email debe ser una cadena de texto'
        })
        .trim()
        .toLowerCase()
        .email('El formato del email es invalido'),

    password: z
        .string({
            required_error: 'La contraseña es obligatoria',
            invalid_type_error: 'La contraseña debe ser una cadena de texto'
        })
        .min(1, 'La contraseña es obligatoria')
});

// Exportar alias en inglés por compatibilidad
export const registerSchema = registroSchema;

