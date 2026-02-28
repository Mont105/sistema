import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Warehouse,
  BookOpen,
  ArrowLeftRight,
  FileText,
  Users,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser?: {
    nombre: string;
    email: string;
    rol: string;
  };
  onLogout?: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bodegas', label: 'Bodegas', icon: Warehouse },
  { id: 'libros', label: 'Libros', icon: BookOpen },
  { id: 'movimientos', label: 'Movimientos', icon: ArrowLeftRight },
  { id: 'reportes', label: 'Reportes', icon: FileText },
  { id: 'usuarios', label: 'Usuarios', icon: Users, adminOnly: true },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

export function AppShell({ children, currentPage, onNavigate, currentUser, onLogout }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || currentUser?.rol === 'admin'
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-neutral-200">
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          {(sidebarOpen || mobileMenuOpen) && <h5 className="text-neutral-900">Inventario</h5>}
        </div>
        {/* Desktop collapse button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ChevronLeft className={`w-5 h-5 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
        {/* Mobile close button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-colors min-h-[44px] ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {(sidebarOpen || mobileMenuOpen) && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      {onLogout && (
        <div className="p-3 lg:p-4 border-t border-neutral-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-danger-600 hover:bg-danger-50 transition-colors min-h-[44px]"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {(sidebarOpen || mobileMenuOpen) && <span>Salir</span>}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-neutral-50">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:block border-r border-neutral-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar libros, bodegas..."
                className="w-full pl-10 pr-4 py-2 min-h-[44px] bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-lg transition-colors min-h-[44px]"
            >
              <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                {currentUser?.nombre?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="caption">{currentUser?.nombre || 'Usuario'}</p>
                <p className="text-xs text-neutral-500 capitalize">{currentUser?.rol || 'rol'}</p>
              </div>
            </button>

            {/* User dropdown */}
            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-20">
                  <div className="px-4 py-2 border-b border-neutral-200">
                    <p className="caption">{currentUser?.nombre}</p>
                    <p className="text-xs text-neutral-500">{currentUser?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('configuracion');
                      setUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-50 transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configuración</span>
                  </button>
                  {onLogout && (
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout?.();
                      }}
                      className="w-full px-4 py-2 text-left text-danger-600 hover:bg-danger-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar sesión</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}