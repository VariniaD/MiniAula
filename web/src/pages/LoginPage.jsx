import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export function LoginPage() {
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
            <p className="text-sm text-slate-600">
              Accede a tu cuenta de MiniAula
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-600">
          Formulario de inicio de sesión pendiente de conexión con{' '}
          <code className="rounded bg-slate-200/70 px-1.5 py-0.5 text-xs font-medium text-slate-800">
            POST /api/auth/login
          </code>
          .
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Todavía no tienes cuenta?{' '}
          <Link
            to="/registro"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;

