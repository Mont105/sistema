import React from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';
import { BodegasPage } from '@/pages/BodegasPage';
import { LibrosPage } from '@/pages/LibrosPage';
import { MovimientosPage } from '@/pages/MovimientosPage';
import { ReportesPage } from '@/pages/ReportesPage';
import { UsuariosPage } from '@/pages/UsuariosPage';
import { ConfiguracionPage } from '@/pages/ConfiguracionPage';
import { usuarios } from '@/lib/mockData';

const routeByPage: Record<string, string> = {
  dashboard: '/',
  bodegas: '/bodegas',
  libros: '/inventario',
  movimientos: '/movimientos',
  reportes: '/reportes',
  usuarios: '/usuarios',
  configuracion: '/configuracion',
};

const pageByRoute: Record<string, string> = {
  '/': 'dashboard',
  '/bodegas': 'bodegas',
  '/inventario': 'libros',
  '/libros': 'libros',
  '/movimientos': 'movimientos',
  '/reportes': 'reportes',
  '/usuarios': 'usuarios',
  '/configuracion': 'configuracion',
};

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = usuarios[0];

  const currentPage = pageByRoute[location.pathname] ?? 'dashboard';

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={(page) => navigate(routeByPage[page] ?? '/')}
      currentUser={currentUser}
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
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
