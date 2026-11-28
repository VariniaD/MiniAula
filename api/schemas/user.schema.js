import { z } from 'zod';

// Validar los datos al editar el propio perfil
export const actualizarPerfilSchema = z
    .object({

        nombre: z
            .string({ error: 'El nombre debe ser una cadena de texto' })
            .trim()
            .min(2, 'El nombre debe tener al menos 2 caracteres')
            .max(100, 'El nombre no debe superar los 100 caracteres'),

        email: z
            .string({ error: 'El email debe ser una cadena de texto' })
            .trim()
            .toLowerCase()
            .email('El formato del email es invalido')

    })
    .strict()
    .partial()
    .refine(
        (datos) => Object.keys(datos).length > 0,
        'Debes proporcionar al menos un campo para actualizar'
    );
