import React, { useState } from 'react';
import { FormMovimiento } from '../components/FormMovimiento';
import { ScannerDialog } from '../components/ScannerDialog';
import { Movimiento } from '../types';
import { movimientos as initialMovimientos, libros, bodegas, usuarios } from '../lib/mockData';

export function MovimientosPage() {
  const [activeTab, setActiveTab] = useState<'entrada' | 'salida' | 'transferencia'>('entrada');
  const [movimientos, setMovimientos] = useState(initialMovimientos);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedISBN, setScannedISBN] = useState<string>();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (movimiento: Partial<Movimiento>) => {
    const libro = libros.find((l) => l.id === movimiento.libroId);
    const bodegaOrigen = bodegas.find((b) => b.id === movimiento.bodegaOrigenId);
    const bodegaDestino = bodegas.find((b) => b.id === movimiento.bodegaDestinoId);
    const usuario = usuarios[0]; // Current user

    const newMovimiento: Movimiento = {
      id: Date.now().toString(),
      tipo: movimiento.tipo!,
      fecha: new Date().toISOString(),
      libroId: movimiento.libroId!,
      libroTitulo: libro?.titulo || '',
      libroISBN: libro?.isbn || '',
      bodegaOrigenId: movimiento.bodegaOrigenId,
      bodegaOrigenNombre: bodegaOrigen?.nombre,
      bodegaDestinoId: movimiento.bodegaDestinoId,
      bodegaDestinoNombre: bodegaDestino?.nombre,
      cantidad: movimiento.cantidad!,
      costoUnitario: movimiento.costoUnitario,
      motivo: movimiento.motivo!,
      docReferencia: movimiento.docReferencia,
      usuarioId: usuario.id,
      usuarioNombre: usuario.nombre,
      createdAt: new Date().toISOString(),
    };

    setMovimientos([newMovimiento, ...movimientos]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setScannedISBN(undefined);
  };

  const handleScan = (isbn: string) => {
    setScannedISBN(isbn);
    setShowScanner(false);
  };

  const tabs = [
    { id: 'entrada' as const, label: 'Entrada' },
    { id: 'salida' as const, label: 'Salida' },
    { id: 'transferencia' as const, label: 'Transferencia' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="mb-2">Movimientos</h3>
        <p className="text-neutral-600">Registro de entradas, salidas y transferencias</p>
      </div>

      {/* Success message */}
      {showSuccess && (
        <div className="bg-success-50 border border-success-200 rounded-xl p-4">
          <p className="text-success-700">✓ Movimiento registrado exitosamente</p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="border-b border-neutral-200 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setScannedISBN(undefined);
                }}
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

        {/* Form */}
        <div className="p-4 lg:p-6">
          <FormMovimiento
            tipo={activeTab}
            onSave={handleSave}
            onScanISBN={() => setShowScanner(true)}
            scannedISBN={scannedISBN}
          />
        </div>
      </div>

      {/* Recent movements */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
        <h5 className="mb-4">Movimientos recientes</h5>
        <div className="space-y-2">
          {movimientos.slice(0, 5).map((mov) => (
            <div
              key={mov.id}
              className="flex items-start justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
            >
              <div className="flex-1">
                <p className="caption">
                  <span className="text-neutral-900">{mov.libroTitulo}</span> -{' '}
                  <span className="capitalize">{mov.tipo}</span>
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {new Date(mov.fecha).toLocaleDateString('es-CL')} · {mov.cantidad} ejemplares ·{' '}
                  {mov.usuarioNombre}
                </p>
              </div>
              <div className="ml-4">
                <span
                  className={`caption px-2 py-1 rounded ${
                    mov.tipo === 'entrada'
                      ? 'bg-success-100 text-success-700'
                      : mov.tipo === 'salida'
                      ? 'bg-danger-100 text-danger-700'
                      : 'bg-primary-100 text-primary-700'
                  }`}
                >
                  {mov.tipo === 'entrada' && '+'}
                  {mov.tipo === 'salida' && '-'}
                  {mov.cantidad}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scanner dialog */}
      <ScannerDialog isOpen={showScanner} onClose={() => setShowScanner(false)} onScan={handleScan} />
    </div>
  );
}
