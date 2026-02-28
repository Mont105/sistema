import React, { useState } from 'react';
import { AppShell } from './components/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { BodegasPage } from './pages/BodegasPage';
import { LibrosPage } from './pages/LibrosPage';
import { MovimientosPage } from './pages/MovimientosPage';
import { ReportesPage } from './pages/ReportesPage';
import { UsuariosPage } from './pages/UsuariosPage';
import { ConfiguracionPage } from './pages/ConfiguracionPage';
import { usuarios } from './lib/mockData';

type Page =
  | 'dashboard'
  | 'bodegas'
  | 'libros'
  | 'movimientos'
  | 'reportes'
  | 'usuarios'
  | 'configuracion';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [currentUser] = useState(usuarios[0]); // Default user

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={handleNavigate}
      currentUser={currentUser}
    >
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'bodegas' && <BodegasPage />}
      {currentPage === 'libros' && <LibrosPage />}
      {currentPage === 'movimientos' && <MovimientosPage />}
      {currentPage === 'reportes' && <ReportesPage />}
      {currentPage === 'usuarios' && <UsuariosPage />}
      {currentPage === 'configuracion' && <ConfiguracionPage />}
    </AppShell>
  );
}