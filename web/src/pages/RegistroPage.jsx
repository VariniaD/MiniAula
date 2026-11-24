import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorDetails, getApiErrorMessage } from '../services/api';
import { rutaInicioPorRol } from './LoginPage';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES = [
  { value: 'estudiante', label: 'Estudiante', descripcion: 'Quiero aprender' },
  { value: 'instructor', label: 'Instructor', descripcion: 'Quiero enseñar' },
];

const inputClass = (hasError) =>
  `mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
  }`;

// Validación en cliente alineada con registroSchema del backend
function validarRegistro({ nombre, email, password, rol }) {
  const errores = {};
  const nombreLimpio = nombre.trim();

  if (nombreLimpio.length < 2) errores.nombre = 'El nombre debe tener al menos 2 caracteres';
  else if (nombreLimpio.length > 100) errores.nombre = 'El nombre no debe superar los 100 caracteres';

  if (!email.trim()) errores.email = 'El email es obligatorio';
  else if (!EMAIL_REGEX.test(email.trim())) errores.email = 'El formato del email es invalido';

  if (password.length < 6) errores.password = 'La contraseña debe tener al menos 6 caracteres';

  if (!ROLES.some((r) => r.value === rol)) errores.rol = 'El rol debe ser estudiante o instructor';

  return errores;
}

export function RegistroPage() {
  const { register, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'estudiante',
  });
  const [errores, setErrores] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={rutaInicioPorRol(user?.rol)} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');

    const erroresCliente = validarRegistro(form);
    setErrores(erroresCliente);
    if (Object.keys(erroresCliente).length > 0) return;

    setLoading(true);
    try {
      const usuario = await register({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        password: form.password,
        rol: form.rol,
      });
      navigate(rutaInicioPorRol(usuario.rol), { replace: true });
    } catch (error) {
      setApiError(getApiErrorMessage(error, 'No se pudo completar el registro'));
      setErrores(getApiErrorDetails(error));
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md py-4 sm:py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <UserPlus className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Crear cuenta
            </h1>
            <p className="text-sm text-slate-600">Únete como estudiante o instructor</p>
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
            <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
              Nombre completo
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ana Pérez"
              aria-invalid={Boolean(errores.nombre)}
              className={inputClass(errores.nombre)}
            />
            {errores.nombre && <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>}
          </div>

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
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              aria-invalid={Boolean(errores.password)}
              className={inputClass(errores.password)}
            />
            {errores.password && (
              <p className="mt-1 text-xs text-red-600">{errores.password}</p>
            )}
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">Rol</legend>
            <div className="mt-1 grid grid-cols-2 gap-3">
              {ROLES.map((rol) => (
                <label
                  key={rol.value}
                  className={`flex cursor-pointer flex-col rounded-lg border p-3 text-sm transition-colors ${
                    form.rol === rol.value
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="rol"
                    value={rol.value}
                    checked={form.rol === rol.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-semibold text-slate-900">{rol.label}</span>
                  <span className="text-xs text-slate-500">{rol.descripcion}</span>
                </label>
              ))}
            </div>
            {errores.rol && <p className="mt-1 text-xs text-red-600">{errores.rol}</p>}
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegistroPage;
