import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleRoute } from './components/RoleRoute';

import { CatalogoPage } from './pages/CatalogoPage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { DetalleCursoPage } from './pages/DetalleCursoPage';
import { PerfilPage } from './pages/PerfilPage';
import { MisCursosPage } from './pages/MisCursosPage';
import { LeccionPage } from './pages/LeccionPage';
import { InstructorCursosPage } from './pages/InstructorCursosPage';
import { CrearCursoPage } from './pages/CrearCursoPage';
import { EditarCursoPage } from './pages/EditarCursoPage';
import { PanelCursoPage } from './pages/PanelCursoPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Rutas públicas */}
            <Route path="/" element={<CatalogoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/cursos/:id" element={<DetalleCursoPage />} />

            {/* Rutas protegidas (cualquier usuario autenticado) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<PerfilPage />} />
            </Route>

            {/* Rutas protegidas (solo rol estudiante) */}
            <Route element={<RoleRoute allowedRoles={['estudiante']} />}>
              <Route path="/mis-cursos" element={<MisCursosPage />} />
              <Route
                path="/cursos/:id/leccion/:leccionId"
                element={<LeccionPage />}
              />
            </Route>

            {/* Rutas protegidas (solo rol instructor) */}
            <Route element={<RoleRoute allowedRoles={['instructor']} />}>
              <Route
                path="/instructor/cursos"
                element={<InstructorCursosPage />}
              />
              <Route
                path="/instructor/cursos/nuevo"
                element={<CrearCursoPage />}
              />
              <Route
                path="/instructor/cursos/:id/editar"
                element={<EditarCursoPage />}
              />
              <Route
                path="/instructor/cursos/:id/panel"
                element={<PanelCursoPage />}
              />
            </Route>

            {/* Ruta no encontrada */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

