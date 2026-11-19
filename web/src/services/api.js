import axios from 'axios';

export const TOKEN_STORAGE_KEY = 'miniaula_token';
export const USER_STORAGE_KEY = 'miniaula_user';
export const AUTH_UNAUTHORIZED_EVENT = 'miniaula:unauthorized';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adjuntar automáticamente el token JWT en cada petición si existe sesión activa
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

// Cerrar sesión automáticamente ante una respuesta 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';
    const isAuthEndpoint =
      requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');

    if (status === 401 && !isAuthEndpoint) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT));
    }

    return Promise.reject(error);
  }
);

export default api;

