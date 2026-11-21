import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BarChart3, PencilLine } from 'lucide-react';

export function EditarCursoPage() {
  const { id } = useParams();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            to="/instructor/cursos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a mis cursos</span>
          </Link>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Editar curso #{id}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Modifica la información del curso, gestiona lecciones, orden y cuestionarios.
          </p>
        </div>

        <Link
          to={`/instructor/cursos/${id}/panel`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <BarChart3 className="h-4 w-4" />
          <span>Ver panel del curso</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 shadow-2xs sm:p-8">
        <div className="flex items-center gap-2 text-slate-800">
          <PencilLine className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-semibold">Editor de curso y lecciones</h2>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Aquí se mostrarán el formulario del curso, el gestor de lecciones (contenido
          y cuestionarios) y las acciones de publicar o archivar.
        </p>
      </div>
    </section>
  );
}

export default EditarCursoPage;

