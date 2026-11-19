import { Link } from 'react-router-dom';
import { BookMarked } from 'lucide-react';

export function MisCursosPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Mis cursos
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Revisa los cursos en los que estás inscrito y tu porcentaje de avance.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Explorar catálogo
        </Link>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-2xs sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <BookMarked className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-slate-900">
          Tus inscripciones aparecerán aquí
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">
          Podrás ver tu progreso en cada curso y continuar exactamente en la lección
          donde te quedaste.
        </p>
      </div>
    </section>
  );
}

export default MisCursosPage;

