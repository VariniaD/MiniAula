import { Link } from 'react-router-dom';
import { ArrowLeft, FilePlus2 } from 'lucide-react';

export function CrearCursoPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          to="/instructor/cursos"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a mis cursos</span>
        </Link>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Crear nuevo curso
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Todo curso nuevo se crea inicialmente en estado borrador.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 shadow-2xs sm:p-8">
        <div className="flex items-center gap-2 text-slate-800">
          <FilePlus2 className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-semibold">Datos generales del curso</h2>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Aquí se ubicará el formulario para definir título, categoría, nivel y
          descripción del curso.
        </p>
      </div>
    </section>
  );
}

export default CrearCursoPage;

