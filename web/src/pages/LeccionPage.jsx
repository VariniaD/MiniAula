import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export function LeccionPage() {
  const { id, leccionId } = useParams();

  return (
    <section className="space-y-6">
      <div>
        <Link
          to="/mis-cursos"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a mis cursos</span>
        </Link>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Lección #{leccionId}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Curso #{id} — Vista de lección de contenido o cuestionario con avance secuencial.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <h2 className="text-sm font-semibold text-slate-900">Temario del curso</h2>
          <p className="mt-2 text-xs text-slate-500">
            Aquí se mostrará la lista de lecciones con estado completada, actual o
            bloqueada.
          </p>
        </aside>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 shadow-2xs sm:p-8 lg:col-span-2">
          <div className="flex items-center gap-2 text-slate-800">
            <PlayCircle className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-semibold">Contenido de la lección</h2>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Aquí se renderizará el video/texto de la lección o el cuestionario
            calificado en el servidor.
          </p>
        </div>
      </div>
    </section>
  );
}

export default LeccionPage;

