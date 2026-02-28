import React, { useState } from 'react';
import { Scan } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Movimiento } from '../types';
import { bodegas, libros, motivos } from '../lib/mockData';

interface FormMovimientoProps {
  tipo: 'entrada' | 'salida' | 'transferencia';
  onSave: (movimiento: Partial<Movimiento>) => void;
  onScanISBN?: () => void;
  scannedISBN?: string;
}

export function FormMovimiento({ tipo, onSave, onScanISBN, scannedISBN }: FormMovimientoProps) {
  const [formData, setFormData] = useState<Partial<Movimiento>>({
    tipo,
    libroId: '',
    bodegaOrigenId: '',
    bodegaDestinoId: '',
    cantidad: 1,
    costoUnitario: 0,
    motivo: '',
    docReferencia: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-select libro when ISBN is scanned
  React.useEffect(() => {
    if (scannedISBN) {
      const libro = libros.find((l) => l.isbn === scannedISBN);
      if (libro) {
        setFormData((prev) => ({
          ...prev,
          libroId: libro.id,
          costoUnitario: libro.costo,
        }));
      }
    }
  }, [scannedISBN]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.libroId) newErrors.libroId = 'Libro es requerido';
    if (!formData.cantidad || formData.cantidad <= 0) newErrors.cantidad = 'Cantidad debe ser mayor a 0';
    if (!formData.motivo) newErrors.motivo = 'Motivo es requerido';

    if (tipo === 'entrada' && !formData.bodegaDestinoId) {
      newErrors.bodegaDestinoId = 'Bodega destino es requerida';
    }

    if (tipo === 'salida' && !formData.bodegaOrigenId) {
      newErrors.bodegaOrigenId = 'Bodega origen es requerida';
    }

    if (tipo === 'transferencia') {
      if (!formData.bodegaOrigenId) newErrors.bodegaOrigenId = 'Bodega origen es requerida';
      if (!formData.bodegaDestinoId) newErrors.bodegaDestinoId = 'Bodega destino es requerida';
      if (formData.bodegaOrigenId === formData.bodegaDestinoId) {
        newErrors.bodegaDestinoId = 'Las bodegas deben ser diferentes';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  const motivosFiltrados = motivos.filter((m) => m.tipo === tipo);
  const selectedLibro = libros.find((l) => l.id === formData.libroId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Libro selection with scanner */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Select
              label="Libro *"
              value={formData.libroId}
              onChange={(e) => {
                const libro = libros.find((l) => l.id === e.target.value);
                setFormData({
                  ...formData,
                  libroId: e.target.value,
                  costoUnitario: libro?.costo || 0,
                });
              }}
              options={[
                { value: '', label: 'Seleccionar libro' },
                ...libros.map((l) => ({
                  value: l.id,
                  label: `${l.isbn} - ${l.titulo}`,
                })),
              ]}
              error={errors.libroId}
            />
          </div>
          {onScanISBN && (
            <div className="pt-7">
              <Button type="button" variant="secondary" onClick={onScanISBN}>
                <Scan className="w-5 h-5" />
                <span className="hidden sm:inline">Escanear</span>
              </Button>
            </div>
          )}
        </div>

        {selectedLibro && (
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="caption text-neutral-600 mb-1">Información del libro:</p>
            <p className="caption">
              <span className="text-neutral-600">Autor:</span> {selectedLibro.autor} |{' '}
              <span className="text-neutral-600">Género:</span> {selectedLibro.genero} |{' '}
              <span className="text-neutral-600">Unidad:</span> {selectedLibro.unidad}
            </p>
          </div>
        )}
      </div>

      {/* Bodegas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(tipo === 'salida' || tipo === 'transferencia') && (
          <Select
            label="Bodega origen *"
            value={formData.bodegaOrigenId}
            onChange={(e) => setFormData({ ...formData, bodegaOrigenId: e.target.value })}
            options={[
              { value: '', label: 'Seleccionar bodega' },
              ...bodegas
                .filter((b) => b.activo)
                .map((b) => ({
                  value: b.id,
                  label: `${b.codigo} - ${b.nombre}`,
                })),
            ]}
            error={errors.bodegaOrigenId}
          />
        )}

        {(tipo === 'entrada' || tipo === 'transferencia') && (
          <Select
            label="Bodega destino *"
            value={formData.bodegaDestinoId}
            onChange={(e) => setFormData({ ...formData, bodegaDestinoId: e.target.value })}
            options={[
              { value: '', label: 'Seleccionar bodega' },
              ...bodegas
                .filter((b) => b.activo)
                .map((b) => ({
                  value: b.id,
                  label: `${b.codigo} - ${b.nombre}`,
                })),
            ]}
            error={errors.bodegaDestinoId}
          />
        )}
      </div>

      {/* Cantidad y Costo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Cantidad *"
          type="number"
          min="1"
          value={formData.cantidad}
          onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value) })}
          error={errors.cantidad}
          placeholder="1"
        />

        {tipo === 'entrada' && (
          <Input
            label="Costo unitario"
            type="number"
            min="0"
            step="0.01"
            value={formData.costoUnitario}
            onChange={(e) => setFormData({ ...formData, costoUnitario: parseFloat(e.target.value) })}
            placeholder="0"
          />
        )}
      </div>

      {/* Motivo y Documento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Motivo *"
          value={formData.motivo}
          onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
          options={[
            { value: '', label: 'Seleccionar motivo' },
            ...motivosFiltrados.map((m) => ({
              value: m.nombre,
              label: m.nombre,
            })),
          ]}
          error={errors.motivo}
        />

        <Input
          label="Documento de referencia"
          value={formData.docReferencia}
          onChange={(e) => setFormData({ ...formData, docReferencia: e.target.value })}
          placeholder="FC-001234"
          helperText="Factura, boleta, guía, etc."
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-neutral-200">
        <Button type="submit" variant="primary">
          Guardar movimiento
        </Button>
      </div>
    </form>
  );
}
