import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  LogOut,
  Menu,
  PlusCircle,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function getInitials(nombre) {
  if (!nombre) return 'U';
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

const navLinkClass = ({ isActive }) =>
  `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
  }`;

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isEstudiante = isAuthenticated && user?.rol === 'estudiante';
  const isInstructor = isAuthenticated && user?.rol === 'instructor';

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Marca */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span>MiniAula</span>
        </Link>

        {/* Navegación Desktop */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 md:flex"
        >
          <NavLink to="/" end className={navLinkClass}>
            <BookOpen className="h-4 w-4" />
            <span>Catálogo</span>
          </NavLink>

          {isEstudiante && (
            <NavLink to="/mis-cursos" className={navLinkClass}>
              <span>Mis cursos</span>
            </NavLink>
          )}

          {isInstructor && (
            <>
              <NavLink to="/instructor/cursos" end className={navLinkClass}>
                <span>Mis cursos</span>
              </NavLink>
              <NavLink to="/instructor/cursos/nuevo" className={navLinkClass}>
                <PlusCircle className="h-4 w-4" />
                <span>Nuevo curso</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Acciones de sesión Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Iniciar sesión
              </NavLink>
              <Link
                to="/registro"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-indigo-700"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <NavLink
                to="/perfil"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                  {getInitials(user?.nombre)}
                </span>
                <span className="max-w-[140px] truncate">{user?.nombre || 'Perfil'}</span>
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Salir</span>
              </button>
            </>
          )}
        </div>

        {/* Botón Menú Móvil */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menú desplegable Móvil (funciona desde 375px) */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 shadow-sm md:hidden">
          {isAuthenticated && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                {getInitials(user?.nombre)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user?.nombre}
                </p>
                <p className="truncate text-xs capitalize text-slate-500">
                  {user?.rol}
                </p>
              </div>
            </div>
          )}

          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            <NavLink to="/" end onClick={closeMenu} className={mobileLinkClass}>
              <BookOpen className="h-4 w-4" />
              <span>Catálogo de cursos</span>
            </NavLink>

            {isEstudiante && (
              <NavLink to="/mis-cursos" onClick={closeMenu} className={mobileLinkClass}>
                <span>Mis cursos</span>
              </NavLink>
            )}

            {isInstructor && (
              <>
                <NavLink
                  to="/instructor/cursos"
                  end
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <span>Mis cursos</span>
                </NavLink>
                <NavLink
                  to="/instructor/cursos/nuevo"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Nuevo curso</span>
                </NavLink>
              </>
            )}

            {isAuthenticated ? (
              <>
                <NavLink to="/perfil" onClick={closeMenu} className={mobileLinkClass}>
                  <User className="h-4 w-4" />
                  <span>Mi perfil</span>
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </button>
              </>
            ) : (
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <NavLink to="/login" onClick={closeMenu} className={mobileLinkClass}>
                  Iniciar sesión
                </NavLink>
                <Link
                  to="/registro"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;

