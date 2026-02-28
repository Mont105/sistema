import React, { useState } from 'react';
import { Printer, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { libros, bodegas, calcularStockPorBodega } from '../lib/mockData';

type ReportTab = 'stock' | 'bajoStock' | 'kardex';

export function ReportesPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('stock');
  const [selectedBodega, setSelectedBodega] = useState('all');
  const [selectedLibro, setSelectedLibro] = useState('');

  const stockPorBodega = calcularStockPorBodega();

  // Filter stock by bodega
  const filteredStock =
    selectedBodega === 'all'
      ? stockPorBodega
      : stockPorBodega.filter((s) => s.bodegaId === selectedBodega);

  // Low stock items
  const bajoStock = libros
    .map((libro) => {
      const stockLibro = stockPorBodega
        .filter((s) => s.libroId === libro.id)
        .reduce((sum, s) => sum + s.cantidad, 0);
      return {
        ...libro,
        stockActual: stockLibro,
        deficit: (libro.stockMinimo || 0) - stockLibro,
      };
    })
    .filter((l) => l.deficit > 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('Exportar reporte a CSV');
  };

  const tabs = [
    { id: 'stock' as const, label: 'Stock por Bodega' },
    { id: 'bajoStock' as const, label: 'Bajo Stock' },
    { id: 'kardex' as const, label: 'Kardex' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="mb-2">Reportes</h3>
          <p className="text-neutral-600">Informes y análisis del inventario</p>
        </div>
        <div className="flex gap-3 no-print">
          <Button variant="secondary" onClick={handleExport}>
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            <Printer className="w-5 h-5" />
            <span className="hidden sm:inline">Imprimir</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="border-b border-neutral-200 overflow-x-auto no-print">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 whitespace-nowrap transition-colors min-h-[52px] ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Report content */}
        <div className="p-4 lg:p-6">
          {/* Stock por Bodega */}
          {activeTab === 'stock' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 no-print">
                <Select
                  label="Filtrar por bodega"
                  value={selectedBodega}
                  onChange={(e) => setSelectedBodega(e.target.value)}
                  options={[
                    { value: 'all', label: 'Todas las bodegas' },
                    ...bodegas.map((b) => ({ value: b.id, label: b.nombre })),
                  ]}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="px-4 py-3 text-left caption text-neutral-600">ISBN</th>
                      <th className="px-4 py-3 text-left caption text-neutral-600">Título</th>
                      <th className="px-4 py-3 text-left caption text-neutral-600">Bodega</th>
                      <th className="px-4 py-3 text-right caption text-neutral-600">Cantidad</th>
                      <th className="px-4 py-3 text-right caption text-neutral-600">
                        Costo Promedio
                      </th>
                      <th className="px-4 py-3 text-right caption text-neutral-600">
                        Valor Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStock.map((item, index) => (
                      <tr key={index} className="border-b border-neutral-200">
                        <td className="px-4 py-3 caption mono">{item.libroISBN}</td>
                        <td className="px-4 py-3 caption">{item.libroTitulo}</td>
                        <td className="px-4 py-3 caption">{item.bodegaNombre}</td>
                        <td className="px-4 py-3 text-right caption">{item.cantidad}</td>
                        <td className="px-4 py-3 text-right caption">
                          ${item.costoPromedio.toLocaleString('es-CL')}
                        </td>
                        <td className="px-4 py-3 text-right caption">
                          ${(item.cantidad * item.costoPromedio).toLocaleString('es-CL')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-neutral-50 border-t border-neutral-200">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 caption">
                        Total
                      </td>
                      <td className="px-4 py-3 text-right caption">
                        {filteredStock.reduce((sum, item) => sum + item.cantidad, 0)}
                      </td>
                      <td></td>
                      <td className="px-4 py-3 text-right caption">
                        $
                        {filteredStock
                          .reduce((sum, item) => sum + item.cantidad * item.costoPromedio, 0)
                          .toLocaleString('es-CL')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Bajo Stock */}
          {activeTab === 'bajoStock' && (
            <div className="space-y-6">
              <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
                <p className="text-warning-700">
                  ⚠ Se encontraron {bajoStock.length} libros con stock bajo el mínimo
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="px-4 py-3 text-left caption text-neutral-600">ISBN</th>
                      <th className="px-4 py-3 text-left caption text-neutral-600">Título</th>
                      <th className="px-4 py-3 text-left caption text-neutral-600">Género</th>
                      <th className="px-4 py-3 text-right caption text-neutral-600">
                        Stock Actual
                      </th>
                      <th className="px-4 py-3 text-right caption text-neutral-600">
                        Stock Mínimo
                      </th>
                      <th className="px-4 py-3 text-right caption text-neutral-600">Déficit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bajoStock.map((item) => (
                      <tr key={item.id} className="border-b border-neutral-200 bg-danger-50">
                        <td className="px-4 py-3 caption mono">{item.isbn}</td>
                        <td className="px-4 py-3 caption">{item.titulo}</td>
                        <td className="px-4 py-3 caption">{item.genero}</td>
                        <td className="px-4 py-3 text-right caption text-danger-600">
                          {item.stockActual}
                        </td>
                        <td className="px-4 py-3 text-right caption">{item.stockMinimo}</td>
                        <td className="px-4 py-3 text-right caption text-danger-600">
                          {item.deficit}
                        </td>
                      </tr>
                    ))}
                    {bajoStock.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-neutral-500">
                          No hay libros con bajo stock
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Kardex */}
          {activeTab === 'kardex' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
                <Select
                  label="Seleccionar libro"
                  value={selectedLibro}
                  onChange={(e) => setSelectedLibro(e.target.value)}
                  options={[
                    { value: '', label: 'Seleccionar un libro' },
                    ...libros.map((l) => ({
                      value: l.id,
                      label: `${l.isbn} - ${l.titulo}`,
                    })),
                  ]}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-neutral-700 caption">Fecha desde</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 min-h-[44px] bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-neutral-700 caption">Fecha hasta</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 min-h-[44px] bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {selectedLibro ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                      <tr>
                        <th className="px-4 py-3 text-left caption text-neutral-600">Fecha</th>
                        <th className="px-4 py-3 text-left caption text-neutral-600">Tipo</th>
                        <th className="px-4 py-3 text-left caption text-neutral-600">
                          Documento
                        </th>
                        <th className="px-4 py-3 text-left caption text-neutral-600">Bodega</th>
                        <th className="px-4 py-3 text-right caption text-neutral-600">Entrada</th>
                        <th className="px-4 py-3 text-right caption text-neutral-600">Salida</th>
                        <th className="px-4 py-3 text-right caption text-neutral-600">Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-neutral-500">
                          Kardex del libro seleccionado (implementación pendiente)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-neutral-500 bg-neutral-50 rounded-lg border border-neutral-200">
                  Selecciona un libro para ver su kardex
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
