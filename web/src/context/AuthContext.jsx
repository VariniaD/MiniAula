import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AUTH_UNAUTHORIZED_EVENT,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
  clearStoredSession,
  loginRequest,
  registerRequest,
} from '../services/api';

export const AuthContext = createContext(null);

// Leer el campo "exp" del JWT para descartar sesiones vencidas al recargar
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

// Recuperar la sesión guardada en localStorage (sobrevive a F5)
function readStoredSession() {
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const rawUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!token || !rawUser || isTokenExpired(token)) {
      clearStoredSession();
      return { token: null, user: null };
    }

    return { token, user: JSON.parse(rawUser) };
  } catch {
    clearStoredSession();
    return { token: null, user: null };
  }
}

function persistSession(user, token) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);
  const { user, token } = session;

  const logout = useCallback(() => {
    clearStoredSession();
    setSession({ token: null, user: null });
  }, []);

  // Autenticar contra la API y guardar la sesión
  const login = useCallback(async (credentials) => {
    const { token: authToken, usuario } = await loginRequest(credentials);
    persistSession(usuario, authToken);
    setSession({ token: authToken, user: usuario });
    return usuario;
  }, []);

  // Registrar un usuario y abrir sesión automáticamente con sus credenciales
  const register = useCallback(
    async (datos) => {
      await registerRequest(datos);
      return login({ email: datos.email, password: datos.password });
    },
    [login]
  );

  const updateUser = useCallback(
    (updatedUser) => {
      if (!updatedUser || !token) return;
      persistSession(updatedUser, token);
      setSession((prev) => ({ ...prev, user: updatedUser }));
    },
    [token]
  );

  // Sincronizar cierre de sesión ante un 401 de la API o cambios en otra pestaña
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === TOKEN_STORAGE_KEY || event.key === USER_STORAGE_KEY) {
        setSession(readStoredSession());
      }
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, logout);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, logout);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [logout]);

  const isAuthenticated = Boolean(token && user);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated,
    }),
    [user, token, login, register, logout, updateUser, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
