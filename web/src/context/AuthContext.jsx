import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AUTH_UNAUTHORIZED_EVENT,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../services/api';

export const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

function readStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(readStoredToken);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback((userData, authToken) => {
    if (!userData || !authToken) return;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
    setUser(userData);
    setToken(authToken);
  }, []);

  const updateUser = useCallback((updatedUser) => {
    if (!updatedUser) return;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  // Sincronizar cierre de sesión cuando la API devuelve 401 o cambia localStorage en otra pestaña
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    const handleStorageChange = (event) => {
      if (event.key === TOKEN_STORAGE_KEY || event.key === USER_STORAGE_KEY) {
        setToken(readStoredToken());
        setUser(readStoredUser());
      }
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [logout]);

  const isAuthenticated = Boolean(token && user);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      updateUser,
      isAuthenticated,
    }),
    [user, token, login, logout, updateUser, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

