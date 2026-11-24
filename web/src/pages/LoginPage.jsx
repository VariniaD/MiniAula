import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorDetails, getApiErrorMessage } from '../services/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass = (hasError) =>
  `mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
  }`;

// Validación en cliente alineada con loginSchema del backend
function validarLogin({ email, password }) {
  const errores = {};
  if (!email.trim()) errores.email = 'El email es obligatorio';
  else if (!EMAIL_REGEX.test(email.trim())) errores.email = 'El formato del email es invalido';
  if (!password) errores.password = 'La contraseña es obligatoria';
  return errores;
}

// Ruta por defecto tras autenticar según el rol
export function rutaInicioPorRol(rol) {
  return rol === 'instructor' ? '/instructor/cursos' : '/mis-cursos';
}

export function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Ruta protegida que el usuario intentó visitar antes de ser enviado al login
  const destinoPrevio = location.state?.from?.pathname;

  if (isAuthenticated) {
    return <Navigate to={destinoPrevio || rutaInicioPorRol(user?.rol)} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');

    const erroresCliente = validarLogin(form);
    setErrores(erroresCliente);
    if (Object.keys(erroresCliente).length > 0) return;

    setLoading(true);
    try {
      const usuario = await login({ email: form.email.trim(), password: form.password });
      navigate(destinoPrevio || rutaInicioPorRol(usuario.rol), { replace: true });
    } catch (error) {
      setApiError(getApiErrorMessage(error, 'No se pudo iniciar sesión'));
      setErrores(getApiErrorDetails(error));
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md py-4 sm:py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <LogIn className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Iniciar sesión
            </h1>
            <p className="text-sm text-slate-600">Accede a tu cuenta de MiniAula</p>
          </div>
        </div>

        {apiError && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="usuario@example.com"
              aria-invalid={Boolean(errores.email)}
              className={inputClass(errores.email)}
            />
            {errores.email && <p className="mt-1 text-xs text-red-600">{errores.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              aria-invalid={Boolean(errores.password)}
              className={inputClass(errores.password)}
            />
            {errores.password && (
              <p className="mt-1 text-xs text-red-600">{errores.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Todavía no tienes cuenta?{' '}
          <Link to="/registro" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
