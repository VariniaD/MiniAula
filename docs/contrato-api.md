# MiniAula — Contrato de API REST

**Proyecto:** Ingeniería Web II  
**Tarea:** MA-15 — Especificación de respuestas y endpoints  
**Backend:** Node.js, Express y Sequelize  
**Base URL local:** `http://localhost:3000`

## 1. Objetivo

Documentar las respuestas JSON del backend de MiniAula para facilitar la comunicación con el frontend React.

Se diferencian los endpoints implementados de aquellos que todavía están pendientes de desarrollo.

## 2. Códigos de respuesta HTTP

| Código | Significado |
|---|---|
| 200 | Solicitud procesada correctamente |
| 201 | Recurso creado correctamente |
| 400 | Datos inválidos |
| 401 | Usuario no autenticado o credenciales inválidas |
| 403 | Usuario sin permisos |
| 404 | Recurso o ruta no encontrada |
| 409 | Conflicto, por ejemplo, correo duplicado |
| 500 | Error interno del servidor |

## 3. Endpoints implementados

### 3.1 Verificar funcionamiento del servidor

**Método:** GET  
**Ruta:** `/api/health`

Respuesta HTTP 200:

```json
{
  "mensaje": "API MiniAula funcionando correctamente"
}
```

### 3.2 Registro de usuario

**Método:** POST  
**Ruta:** `/api/auth/register`

Datos de entrada:

```json
{
  "nombre": "Usuario Prueba",
  "email": "usuario@example.com",
  "password": "Prueba123!",
  "rol": "estudiante"
}
```

Los roles permitidos son `estudiante` e `instructor`.

Respuesta HTTP 201:

```json
{
  "id": 1,
  "nombre": "Usuario Prueba",
  "email": "usuario@example.com",
  "rol": "estudiante",
  "creadoEn": "2026-11-22T20:00:00.000Z"
}
```

La contraseña nunca debe aparecer en la respuesta.

### 3.3 Inicio de sesión

**Método:** POST  
**Ruta:** `/api/auth/login`

Datos de entrada:

```json
{
  "email": "usuario@example.com",
  "password": "Prueba123!"
}
```

Respuesta HTTP 200:

```json
{
  "token": "<JWT_GENERADO>",
  "usuario": {
    "id": 1,
    "nombre": "Usuario Prueba",
    "email": "usuario@example.com",
    "rol": "estudiante",
    "creadoEn": "2026-11-22T20:00:00.000Z"
  }
}
```

El token permite autenticar las solicitudes posteriores.

### 3.4 Consultar el propio perfil

**Método:** GET  
**Ruta:** `/api/users/me`  
**Acceso:** usuario autenticado (`Authorization: Bearer <TOKEN_JWT>`)

Respuesta HTTP 200:

```json
{
  "id": 1,
  "nombre": "Usuario Prueba",
  "email": "usuario@example.com",
  "rol": "estudiante",
  "creadoEn": "2026-11-22T20:00:00.000Z"
}
```

Errores: 401 si el token falta, es inválido o está vencido.

### 3.5 Editar el propio perfil

**Método:** PUT  
**Ruta:** `/api/users/me`  
**Acceso:** usuario autenticado (`Authorization: Bearer <TOKEN_JWT>`)

Datos de entrada (al menos un campo; no se permiten otros campos como `rol` o `password`):

```json
{
  "nombre": "Nuevo Nombre",
  "email": "nuevo@example.com"
}
```

Respuesta HTTP 200: el usuario actualizado con la misma estructura de la sección 3.4.

Errores:

- 400 si los datos son inválidos o el body está vacío.
- 401 si el token falta, es inválido o está vencido.
- 409 si el nuevo email ya pertenece a otro usuario.

## 4. Contrato de errores

Los errores del backend utilizan la siguiente estructura:

```json
{
  "error": {
    "code": 400,
    "message": "Datos invalidos",
    "details": [
      {
        "campo": "nombre",
        "mensaje": "El nombre debe tener al menos 2 caracteres",
        "field": "nombre",
        "message": "El nombre debe tener al menos 2 caracteres"
      }
    ]
  }
}
```

La propiedad `details` contiene los errores específicos de validación cuando existen.

En errores sin detalles, se devuelve un arreglo vacío.

## 5. Autenticación y autorización

Las rutas protegidas deben recibir el token JWT en la cabecera HTTP:

```http
Authorization: Bearer <TOKEN_JWT>
```

El backend verifica el token y consulta al usuario correspondiente.

Los permisos se controlan mediante los roles:

- **estudiante:** acceso a las funcionalidades de aprendizaje.
- **instructor:** acceso a la administración de sus cursos.

Un token ausente o inválido produce una respuesta HTTP 401.

Un usuario autenticado sin autorización recibe HTTP 403.

## 6. Contrato propuesto de paginación

**Estado: pendiente de implementación.**

Para los futuros listados, se propone una respuesta con la siguiente estructura:

```json
{
  "datos": [],
  "paginacion": {
    "pagina": 1,
    "limite": 10,
    "total": 0,
    "totalPaginas": 0
  }
}
```

La estructura permitirá implementar paginación en React.

Los nombres definitivos de los parámetros de búsqueda y filtros deberán coordinarse con el responsable de cada endpoint.

## 7. Endpoints planificados

Los siguientes endpoints forman parte de las funcionalidades pendientes y todavía no deben considerarse disponibles.

| Método | Ruta propuesta | Función |
|---|---|---|
| POST | `/api/cursos` | Crear curso en borrador |
| PUT | `/api/cursos/:id` | Editar curso propio |
| GET | `/api/cursos` | Consultar catálogo |
| GET | `/api/cursos/:id` | Consultar detalle del curso |

La creación y edición de cursos corresponden a MA-19.

Las rutas definitivas se confirmarán durante la implementación de los servicios.

## 8. Reglas generales

1. Las solicitudes con información deben utilizar JSON.
2. Las rutas protegidas deben validar el token JWT.
3. Las operaciones deben respetar los permisos del usuario.
4. Los errores deben utilizar el middleware centralizado.
5. Las respuestas nunca deben incluir contraseñas ni hashes.
6. La paginación debe mantener una estructura consistente.
7. Los endpoints futuros deben documentarse al implementarse.

## 9. Estado de la documentación

**Implementado:** verificación del servidor, registro, login, consulta y edición del perfil (`/api/users/me`) y manejo centralizado de errores.

**Propuesto:** contrato de paginación y rutas de cursos.

**Pendiente:** actualizar el documento conforme se desarrollen los módulos restantes y realizar la revisión cruzada con la compañera.