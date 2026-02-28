import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Libro } from '../types';
import { generos } from '../lib/mockData';

interface FormLibroProps {
  libro?: Libro;
  onSave: (libro: Partial<Libro>) => Promise<void>;
  onCancel: () => void;
}

export function FormLibro({ libro, onSave, onCancel }: FormLibroProps) {
  const [formData, setFormData] = useState<Partial<Libro>>({
    isbn: libro?.isbn || '',
    titulo: libro?.titulo || '',
    autor: libro?.autor || '',
    editorial: libro?.editorial || '',
    anio: libro?.anio || new Date().getFullYear(),
    genero: libro?.genero || '',
    unidad: libro?.unidad || 'Ejemplar',
    costo: libro?.costo || 0,
    precio: libro?.precio || 0,
    activo: libro?.activo ?? true,
    stockMinimo: libro?.stockMinimo || 5,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.isbn) newErrors.isbn = 'ISBN es requerido';
    if (!formData.titulo) newErrors.titulo = 'Título es requerido';
    if (!formData.autor) newErrors.autor = 'Autor es requerido';
    if (!formData.genero) newErrors.genero = 'Género es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitError(null);
      await onSave(formData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Error inesperado al guardar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="ISBN o Código *"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          error={errors.isbn}
          placeholder="978-956-00-0000"
        />

        <Input
          label="Título *"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          error={errors.titulo}
          placeholder="Nombre del libro"
        />

        <Input
          label="Autor *"
          value={formData.autor}
          onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
          error={errors.autor}
          placeholder="Nombre del autor"
        />

        <Input
          label="Editorial"
          value={formData.editorial}
          onChange={(e) => setFormData({ ...formData, editorial: e.target.value })}
          placeholder="Editorial"
        />

        <Input
          label="Año de publicación"
          type="number"
          value={formData.anio}
          onChange={(e) => setFormData({ ...formData, anio: parseInt(e.target.value) })}
          placeholder="2024"
        />

        <Select
          label="Género *"
          value={formData.genero}
          onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
          options={[
            { value: '', label: 'Seleccionar género' },
            ...generos.map((g) => ({ value: g.nombre, label: g.nombre })),
          ]}
          error={errors.genero}
        />

        <Input
          label="Unidad de medida"
          value={formData.unidad}
          onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
          placeholder="Ejemplar"
        />

        <Input
          label="Stock mínimo"
          type="number"
          value={formData.stockMinimo}
          onChange={(e) => setFormData({ ...formData, stockMinimo: parseInt(e.target.value) })}
          placeholder="5"
        />

        <Input
          label="Costo unitario"
          type="number"
          value={formData.costo}
          onChange={(e) => setFormData({ ...formData, costo: parseFloat(e.target.value) })}
          placeholder="0"
        />

        <Input
          label="Precio de venta (opcional)"
          type="number"
          value={formData.precio || ''}
          onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) || 0 })}
          placeholder="0"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="activo"
          checked={formData.activo}
          onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
          className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="activo" className="text-neutral-700">
          Libro activo
        </label>
      </div>

      {submitError && (
        <p className="text-danger-600 text-sm">{submitError}</p>
      )}
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
