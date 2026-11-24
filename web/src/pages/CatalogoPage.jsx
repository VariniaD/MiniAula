import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Search,
} from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { getCursosRequest } from '../services/api';

const LIMITE_POR_PAGINA = 9;

function CursoCard({ curso }) {
  return (
    <Link
      to={`/cursos/${curso.id}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-indigo-200 hover:shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-2">
        {curso.categoria && (
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {curso.categoria}
          </span>
        )}
        {curso.nivel && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-600">
            {curso.nivel}
          </span>
        )}
      </div>
      <h2 className="mt-3 text-base font-semibold text-slate-900 group-hover:text-indigo-700">
        {curso.titulo}
      </h2>
      <p className="mt-1 line-clamp-3 flex-1 text-sm text-slate-600">
        {curso.descripcion}
      </p>
      <span className="mt-4 text-sm font-medium text-indigo-600">Ver detalle →</span>
    </Link>
  );
}

function EstadoMensaje({ icon: Icon, titulo, descripcion, children, tono = 'neutral' }) {
  const colores =
    tono === 'error' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600';

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-2xs sm:p-12">
      <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${colores}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-slate-900">{titulo}</h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">{descripcion}</p>
      {children}
    </div>
  );
}

export function CatalogoPage() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaInput, setCategoriaInput] = useState('');
  const [filtros, setFiltros] = useState({ q: '', categoria: '' });
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useFetch(
    () =>
      getCursosRequest({
        q: filtros.q,
        categoria: filtros.categoria,
        page,
        limit: LIMITE_POR_PAGINA,
      }),
    [filtros.q, filtros.categoria, page]
  );

  const cursos = Array.isArray(data?.datos) ? data.datos : [];
  const totalPaginas = data?.paginacion?.totalPaginas ?? 1;

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setFiltros({ q: busqueda.trim(), categoria: categoriaInput.trim() });
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Catálogo de cursos
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Explora los cursos cortos disponibles en MiniAula y aprende a tu ritmo.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-[1fr_200px_auto]"
      >
        <label className="relative block">
          <span className="sr-only">Buscar por título</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar cursos por título..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <label className="block">
          <span className="sr-only">Categoría</span>
          <input
            type="text"
            value={categoriaInput}
            onChange={(e) => setCategoriaInput(e.target.value)}
            placeholder="Categoría"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>
        <button
          type="submit"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-indigo-700"
        >
          Buscar
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
          <span>Cargando cursos...</span>
        </div>
      )}

      {!loading && error && (
        <EstadoMensaje
          icon={AlertCircle}
          tono="error"
          titulo="No se pudo cargar el catálogo"
          descripcion={error}
        >
          <button
            type="button"
            onClick={refetch}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reintentar
          </button>
        </EstadoMensaje>
      )}

      {!loading && !error && cursos.length === 0 && (
        <EstadoMensaje
          icon={BookOpen}
          titulo="No hay cursos para mostrar"
          descripcion="No se encontraron cursos publicados con los filtros seleccionados."
        />
      )}

      {!loading && !error && cursos.length > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cursos.map((curso) => (
              <CursoCard key={curso.id} curso={curso} />
            ))}
          </div>

          {totalPaginas > 1 && (
            <nav
              aria-label="Paginación del catálogo"
              className="flex items-center justify-center gap-3"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>
              <span className="text-sm text-slate-600">
                Página {page} de {totalPaginas}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPaginas, p + 1))}
                disabled={page >= totalPaginas}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}

export default CatalogoPage;
