import { User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function PerfilPage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Mi perfil
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Consulta y administra la información de tu cuenta en MiniAula.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <User className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-slate-900">
              {user?.nombre || 'Usuario'}
            </h2>
            <p className="truncate text-sm text-slate-600">{user?.email}</p>
            <span className="mt-1 inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium capitalize text-indigo-700">
              {user?.rol}
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          Aquí se habilitará el formulario para editar los datos del propio perfil.
        </div>
      </div>
    </section>
  );
}

export default PerfilPage;

