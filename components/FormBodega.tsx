import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Bodega } from '../types';

export type SaveResult =
  | { ok: true }
  | { ok: false; message: string };

interface FormBodegaProps {
  bodega?: Bodega;
  onSave: (bodega: Partial<Bodega>) => Promise<SaveResult>;
  onCancel: () => void;
}

export function FormBodega({ bodega, onSave, onCancel }: FormBodegaProps) {
  const [formData, setFormData] = useState<Partial<Bodega>>({
    codigo: bodega?.codigo || '',
    nombre: bodega?.nombre || '',
    direccion: bodega?.direccion || '',
    activo: bodega?.activo ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.codigo) newErrors.codigo = 'Código es requerido';
    if (!formData.nombre) newErrors.nombre = 'Nombre es requerido';
    if (!formData.direccion) newErrors.direccion = 'Dirección es requerida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await onSave(formData);

      if (!result.ok) {
        setSubmitError(result.message);
        return;
      }

      setSubmitError(null);
    } catch {
      setSubmitError('No se pudo guardar. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Código único *"
          value={formData.codigo}
          onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
          error={errors.codigo}
          placeholder="B001"
          helperText="Código identificador único de la bodega"
        />

        <Input
          label="Nombre *"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          error={errors.nombre}
          placeholder="Casa Matriz"
        />
      </div>

      <Input
        label="Dirección *"
        value={formData.direccion}
        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
        error={errors.direccion}
        placeholder="Av. Libertador Bernardo O'Higgins 1234, Santiago"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="activo"
          checked={formData.activo}
          onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
          className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="activo" className="text-neutral-700">
          Bodega activa
        </label>
      </div>

      {submitError && <p className="text-danger-600 text-sm">{submitError}</p>}
      <div className="flex gap-3 pt-4 border-t border-neutral-200">
        <Button type="submit" variant="primary">
          Guardar
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
