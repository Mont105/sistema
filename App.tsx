import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DashboardPage } from '@/pages/DashboardPage';
import { BodegasPage } from '@/pages/BodegasPage';
import { LibrosPage } from '@/pages/LibrosPage';
import { MovimientosPage } from '@/pages/MovimientosPage';
import { ReportesPage } from '@/pages/ReportesPage';
import { UsuariosPage } from '@/pages/UsuariosPage';
import { ConfiguracionPage } from '@/pages/ConfiguracionPage';

type AppPages =
  | 'dashboard'
  | 'bodegas'
  | 'libros'
  | 'movimientos'
  | 'reportes'
  | 'usuarios'
  | 'configuracion';

type AppRoutes =
  | '/'
  | '/bodegas'
  | '/inventario'
  | '/libros'
  | '/movimientos'
  | '/reportes'
  | '/usuarios'
  | '/configuracion';

const routeByPage: Record<AppPages, AppRoutes> = {
  dashboard: '/',
  bodegas: '/bodegas',
  libros: '/inventario',
  movimientos: '/movimientos',
  reportes: '/reportes',
  usuarios: '/usuarios',
  configuracion: '/configuracion',
};

const pageByRoute: Record<AppRoutes, AppPages> = {
  '/': 'dashboard',
  '/bodegas': 'bodegas',
  '/inventario': 'libros',
  '/libros': 'libros',
  '/movimientos': 'movimientos',
  '/reportes': 'reportes',
  '/usuarios': 'usuarios',
  '/configuracion': 'configuracion',
};

function isAppPage(page: string): page is AppPages {
  return page in routeByPage;
}

function isAppRoute(route: string): route is AppRoutes {
  return route in pageByRoute;
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const currentRoute: AppRoutes = isAppRoute(location.pathname) ? location.pathname : '/';
  const currentPage = pageByRoute[currentRoute];

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={(page) => navigate(isAppPage(page) ? routeByPage[page] : '/')}
      currentUser={currentUser ?? undefined}
    >
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/inventario" element={<LibrosPage />} />
        <Route path="/libros" element={<LibrosPage />} />
        <Route path="/bodegas" element={<BodegasPage />} />
        <Route path="/movimientos" element={<MovimientosPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
