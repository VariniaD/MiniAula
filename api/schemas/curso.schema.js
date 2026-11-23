import { z } from 'zod';

// Campos permitidos para crear un curso
const camposCurso = {

    titulo: z
        .string()
        .trim()
        .min(1, 'El titulo es obligatorio'),

    descripcion: z
        .string()
        .trim()
        .min(1, 'La descripcion es obligatoria'),

    categoria: z
        .string()
        .trim()
        .min(1, 'La categoria es obligatoria'),

    nivel: z
        .string()
        .trim()
        .min(1, 'El nivel es obligatorio')

};

// Validar los datos al crear un curso
export const crearCursoSchema = z.object(camposCurso).strict();

// Validar los datos al editar un curso
export const editarCursoSchema = z
    .object(camposCurso)
    .strict()
    .partial()
    .refine(
        (datos) => Object.keys(datos).length > 0,
        'Debes proporcionar al menos un campo para actualizar'
    );