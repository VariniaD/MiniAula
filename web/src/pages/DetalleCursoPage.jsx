import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ListOrdered } from 'lucide-react';

export function DetalleCursoPage() {
  const { id } = useParams();

  return (
    <section className="space-y-6">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al catálogo</span>
        </Link>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Detalle del curso #{id}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Información general del curso, temario de lecciones y opción de inscripción.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 shadow-2xs sm:p-8">
        <div className="flex items-center gap-2 text-slate-800">
          <ListOrdered className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-semibold">Temario del curso</h2>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Aquí se mostrará la descripción del curso y la lista de lecciones (sin
          exponer el contenido hasta estar inscrito).
        </p>
      </div>
    </section>
  );
}

export default DetalleCursoPage;

