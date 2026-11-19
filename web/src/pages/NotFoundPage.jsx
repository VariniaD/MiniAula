import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-md py-12 text-center">
      <p className="text-sm font-semibold text-indigo-600">Error 404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        La ruta que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-indigo-700"
      >
        <Home className="h-4 w-4" />
        <span>Volver al catálogo</span>
      </Link>
    </section>
  );
}

export default NotFoundPage;

