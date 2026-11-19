import { Link } from 'react-router-dom';
import { FolderKanban, PlusCircle } from 'lucide-react';

export function InstructorCursosPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Mis cursos (Instructor)
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Administra tus cursos en borrador, publicados o archivados.
          </p>
        </div>

        <Link
          to="/instructor/cursos/nuevo"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-indigo-700"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Crear nuevo curso</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-2xs sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <FolderKanban className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-slate-900">
          Tus cursos creados aparecerán aquí
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">
          Desde aquí podrás editar lecciones, publicar o archivar cursos y acceder al
          panel de métricas de cada uno.
        </p>
      </div>
    </section>
  );
}

export default InstructorCursosPage;

