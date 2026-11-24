import axios from 'axios';

export const TOKEN_STORAGE_KEY = 'miniaula_token';
export const USER_STORAGE_KEY = 'miniaula_user';
export const AUTH_UNAUTHORIZED_EVENT = 'miniaula:unauthorized';

// Rutas de autenticación pública: un 401 aquí significa credenciales inválidas, no sesión vencida
const PUBLIC_AUTH_PATHS = ['/auth/login', '/auth/register'];

// Única instancia configurada de Axios para toda la aplicación (RT-F03 / RT-F08)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Limpiar la sesión guardada en el navegador
export function clearStoredSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

// Interceptor de request: adjunta Authorization: Bearer <token> si existe sesión
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: ante un 401 limpia la sesión y redirige a /login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';
    const isPublicAuthRequest = PUBLIC_AUTH_PATHS.some((path) =>
      requestUrl.includes(path)
    );

    if (status === 401 && !isPublicAuthRequest) {
      clearStoredSession();
      window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT));

      if (window.location.pathname !== '/login') {
        window.location.replace('/login');
      }
    }

    return Promise.reject(error);
  }
);

// Obtener un mensaje legible a partir del formato { error: { code, message, details } }
export function getApiErrorMessage(error, fallback = 'Ocurrió un error inesperado') {
  if (error?.response?.data?.error?.message) {
    return error.response.data.error.message;
  }
  if (error?.request && !error?.response) {
    return 'No se pudo conectar con el servidor. Inténtalo nuevamente.';
  }
  return error?.message || fallback;
}

// Obtener los errores de validación por campo devueltos por la API
export function getApiErrorDetails(error) {
  const details = error?.response?.data?.error?.details;
  if (!Array.isArray(details)) return {};

  return details.reduce((acc, detail) => {
    const field = detail.field || detail.campo;
    const message = detail.message || detail.mensaje;
    if (field && message && !acc[field]) {
      acc[field] = message;
    }
    return acc;
  }, {});
}

// ---------- Servicios de autenticación (docs/contrato-api.md §3.2 y §3.3) ----------

// POST /auth/login -> { token, usuario }
export async function loginRequest({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

// POST /auth/register -> { id, nombre, email, rol, creadoEn }
export async function registerRequest({ nombre, email, password, rol }) {
  const { data } = await api.post('/auth/register', {
    nombre,
    email,
    password,
    rol,
  });
  return data;
}

// ---------- Servicios de cursos (docs/contrato-api.md §6 y §7) ----------

// GET /cursos?q=&categoria=&page=&limit= -> { datos, paginacion }
export async function getCursosRequest({ q, categoria, page = 1, limit = 9 } = {}) {
  const params = { page, limit };
  if (q) params.q = q;
  if (categoria) params.categoria = categoria;

  const { data } = await api.get('/cursos', { params });
  return data;
}

export default api;
