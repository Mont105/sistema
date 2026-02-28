import React from 'react';
import { BookOpen, Warehouse, AlertTriangle, Package } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { Badge } from '../components/Badge';
import { movimientos, libros, bodegas, calcularStockPorBodega } from '../lib/mockData';

export function DashboardPage() {
  const stockPorBodega = calcularStockPorBodega();
  const stockTotal = stockPorBodega.reduce((sum, item) => sum + item.cantidad, 0);
  
  // Calculate low stock alerts
  const alertasBajoStock = libros.filter((libro) => {
    const stockLibro = stockPorBodega
      .filter((s) => s.libroId === libro.id)
      .reduce((sum, s) => sum + s.cantidad, 0);
    return stockLibro < (libro.stockMinimo || 5);
  }).length;

  const ultimosMovimientos = [...movimientos]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 10);

  const getMovimientoColor = (tipo: string) => {
    switch (tipo) {
      case 'entrada':
        return 'success';
      case 'salida':
        return 'danger';
      case 'transferencia':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2">Dashboard</h3>
        <p className="text-neutral-600">Vista general del sistema de inventario</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Stock Total"
          value={`${stockTotal.toLocaleString('es-CL')} ejemplares`}
          icon={Package}
          variant="primary"
        />
        <KPICard
          title="Libros Registrados"
          value={libros.filter((l) => l.activo).length}
          icon={BookOpen}
          variant="success"
        />
        <KPICard
          title="Bodegas Activas"
          value={bodegas.filter((b) => b.activo).length}
          icon={Warehouse}
          variant="default"
        />
        <KPICard
          title="Alertas Bajo Stock"
          value={alertasBajoStock}
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      {/* Recent movements */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="p-4 lg:p-6 border-b border-neutral-200">
          <h5>Últimos 10 movimientos</h5>
          <p className="text-neutral-600 caption mt-1">Registro de movimientos recientes</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left caption text-neutral-600">Fecha</th>
                <th className="px-4 py-3 text-left caption text-neutral-600">Tipo</th>
                <th className="px-4 py-3 text-left caption text-neutral-600">Libro</th>
                <th className="px-4 py-3 text-left caption text-neutral-600">Bodega</th>
                <th className="px-4 py-3 text-right caption text-neutral-600">Cantidad</th>
                <th className="px-4 py-3 text-left caption text-neutral-600">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {ultimosMovimientos.map((mov) => (
                <tr key={mov.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="px-4 py-3 caption">
                    {new Date(mov.fecha).toLocaleDateString('es-CL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={getMovimientoColor(mov.tipo) as any} size="sm">
                      {mov.tipo.charAt(0).toUpperCase() + mov.tipo.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <p className="caption">{mov.libroTitulo}</p>
                    <p className="text-xs text-neutral-500">{mov.libroISBN}</p>
                  </td>
                  <td className="px-4 py-3 caption">
                    {mov.tipo === 'entrada' && mov.bodegaDestinoNombre}
                    {mov.tipo === 'salida' && mov.bodegaOrigenNombre}
                    {mov.tipo === 'transferencia' &&
                      `${mov.bodegaOrigenNombre} → ${mov.bodegaDestinoNombre}`}
                  </td>
                  <td className="px-4 py-3 text-right caption">
                    {mov.tipo === 'entrada' && (
                      <span className="text-success-600">+{mov.cantidad}</span>
                    )}
                    {mov.tipo === 'salida' && (
                      <span className="text-danger-600">-{mov.cantidad}</span>
                    )}
                    {mov.tipo === 'transferencia' && <span>{mov.cantidad}</span>}
                  </td>
                  <td className="px-4 py-3 caption">{mov.usuarioNombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h5 className="mb-4">Movimientos por semana</h5>
        <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
          <p className="text-neutral-400">Gráfico de movimientos (placeholder)</p>
        </div>
      </div>
    </div>
  );
}
