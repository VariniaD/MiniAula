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

// Tratar cadenas vacías en query string como undefined
const vacioAUndefined = (valor) => (valor === '' || valor === undefined ? undefined : valor);

// Validar los parámetros de consulta del catálogo público
export const listarCursosQuerySchema = z.object({

    q: z.preprocess(
        vacioAUndefined,
        z.string().trim().max(100, 'La busqueda no puede superar los 100 caracteres').optional()
    ),

    categoria: z.preprocess(
        vacioAUndefined,
        z.string().trim().max(100, 'La categoria no puede superar los 100 caracteres').optional()
    ),

    page: z.preprocess(
        vacioAUndefined,
        z.coerce
            .number({ error: 'page debe ser un numero entero' })
            .int('page debe ser un numero entero')
            .min(1, 'page debe ser mayor o igual a 1')
            .default(1)
    ),

    limit: z.preprocess(
        vacioAUndefined,
        z.coerce
            .number({ error: 'limit debe ser un numero entero' })
            .int('limit debe ser un numero entero')
            .min(1, 'limit debe ser mayor o igual a 1')
            .max(50, 'limit no puede superar 50')
            .default(10)
    )

});