import { BookOpen, Search } from 'lucide-react';

export function CatalogoPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Catálogo de cursos
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Explora los cursos cortos disponibles en MiniAula y aprende a tu ritmo.
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            disabled
            placeholder="Buscar cursos por título..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-2xs sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-slate-900">
          Cursos disponibles próximamente
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">
          Aquí se mostrará el catálogo de cursos publicados con búsqueda por título,
          filtro por categoría y paginación.
        </p>
      </div>
    </section>
  );
}

export default CatalogoPage;

