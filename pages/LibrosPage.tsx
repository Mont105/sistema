import React, { useEffect, useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TablaInventario } from '@/components/TablaInventario';
import { FormLibro, LibroSaveResult } from '@/components/FormLibro';
import { Badge } from '@/components/ui/badge';
import {
  createLibro,
  deleteLibro,
  getErrorMessage,
  getLibros,
  updateLibro,
} from '@/lib/apiClient';
import { libros as initialLibros, generos } from '../lib/mockData';
import { Libro } from '../types';

export function LibrosPage() {
  const [libros, setLibros] = useState(initialLibros);
  const [showForm, setShowForm] = useState(false);
  const [editingLibro, setEditingLibro] = useState<Libro | undefined>();
  const [pageError, setPageError] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await getLibros();
        if (isMounted) {
          setLibros(data);
          setPageError(null);
          setIsMockMode(false);
        }
      } catch {
        if (isMounted) {
          setLibros(initialLibros);
          setPageError('No se pudo conectar al servidor. Mostrando datos mock.');
          setIsMockMode(true);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (libro: Partial<Libro>): Promise<LibroSaveResult> => {
    if (isMockMode) {
      if (editingLibro) {
        setLibros((prev) =>
          prev.map((item) =>
            item.id === editingLibro.id
              ? {
                  ...item,
                  isbn: libro.isbn ?? item.isbn,
                  titulo: libro.titulo ?? item.titulo,
                  autor: libro.autor ?? item.autor,
                  editorial: libro.editorial ?? item.editorial,
                  anio: libro.anio ?? item.anio,
                  genero: libro.genero ?? item.genero,
                  unidad: libro.unidad ?? item.unidad,
                  costo: libro.costo ?? item.costo,
                  precio: libro.precio ?? item.precio,
                  activo: libro.activo ?? item.activo,
                  stockMinimo: libro.stockMinimo ?? item.stockMinimo,
                }
              : item,
          ),
        );
      } else {
        const created: Libro = {
          id: Date.now().toString(),
          isbn: libro.isbn ?? '',
          titulo: libro.titulo ?? '',
          autor: libro.autor ?? '',
          editorial: libro.editorial ?? '',
          anio: libro.anio ?? new Date().getFullYear(),
          genero: libro.genero ?? '',
          unidad: libro.unidad ?? 'Ejemplar',
          costo: libro.costo ?? 0,
          precio: libro.precio,
          activo: libro.activo ?? true,
          stockMinimo: libro.stockMinimo ?? 5,
          createdAt: new Date().toISOString(),
        };
        setLibros((prev) => [...prev, created]);
      }

      setShowForm(false);
      setEditingLibro(undefined);
      setPageError(null);
      return { ok: true };
    }

    try {
      if (editingLibro) {
        const updated = await updateLibro(editingLibro.id, {
          isbn: libro.isbn,
          titulo: libro.titulo,
          autor: libro.autor,
          editorial: libro.editorial,
          anio: libro.anio,
          genero: libro.genero,
          unidad: libro.unidad,
          costo: libro.costo,
          precio: libro.precio,
          activo: libro.activo,
          stockMinimo: libro.stockMinimo,
        });

        setLibros((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      } else {
        const created = await createLibro({
          isbn: libro.isbn ?? '',
          titulo: libro.titulo ?? '',
          autor: libro.autor ?? '',
          editorial: libro.editorial ?? '',
          anio: libro.anio ?? new Date().getFullYear(),
          genero: libro.genero ?? '',
          unidad: libro.unidad ?? 'Ejemplar',
          costo: libro.costo ?? 0,
          precio: libro.precio,
          activo: libro.activo ?? true,
          stockMinimo: libro.stockMinimo ?? 5,
        });
        setLibros((prev) => [...prev, created]);
      }

      setShowForm(false);
      setEditingLibro(undefined);
      setPageError(null);
      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error);
      setPageError(message);
      return { ok: false, message };
    }
  };

  const handleEdit = (libro: Libro) => {
    setEditingLibro(libro);
    setShowForm(true);
  };

  const handleDelete = async (libro: Libro) => {
    if (!confirm(`¿Estás seguro de eliminar el libro "${libro.titulo}"?`)) {
      return;
    }

    if (isMockMode) {
      setLibros((prev) => prev.filter((item) => item.id !== libro.id));
      setPageError(null);
      return;
    }

    try {
      await deleteLibro(libro.id);
      setLibros((prev) => prev.filter((item) => item.id !== libro.id));
      setPageError(null);
    } catch (error) {
      setPageError(getErrorMessage(error));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLibro(undefined);
  };

  const columns = [
    { key: 'isbn', label: 'ISBN' },
    {
      key: 'titulo',
      label: 'Título',
      render: (value: string, row: Libro) => (
        <div>
          <p className="caption">{value}</p>
          <p className="text-xs text-neutral-500">{row.autor}</p>
        </div>
      ),
    },
    { key: 'genero', label: 'Género' },
    { key: 'unidad', label: 'Unidad' },
    {
      key: 'costo',
      label: 'Costo',
      render: (value: number) => `$${value.toLocaleString('es-CL')}`,
    },
    {
      key: 'precio',
      label: 'Precio',
      render: (value?: number) => (value ? `$${value.toLocaleString('es-CL')}` : '-'),
    },
    {
      key: 'activo',
      label: 'Estado',
      render: (value: boolean) => (
        <Badge variant={value ? 'success' : 'default'}>{value ? 'Activo' : 'Inactivo'}</Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="mb-2">Libros</h3>
          <p className="text-neutral-600">Catálogo de libros del inventario</p>
          {isMockMode && <p className="text-warning-700 text-sm">Modo offline (datos locales)</p>}
        </div>
        {!showForm && (
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => alert('Importar CSV')}>
              <Upload className="w-5 h-5" />
              <span className="hidden sm:inline">Importar CSV</span>
            </Button>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <Plus className="w-5 h-5" />
              Nuevo libro
            </Button>
          </div>
        )}
      </div>

      {pageError && <p className="text-danger-600 text-sm">{pageError}</p>}

      {showForm && (
        <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
          <h5 className="mb-6">{editingLibro ? 'Editar libro' : 'Nuevo libro'}</h5>
          <FormLibro libro={editingLibro} onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}

      {!showForm && (
        <TablaInventario
          columns={columns}
          data={libros}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Buscar por ISBN o título..."
          filterOptions={generos.map((g) => ({ value: g.nombre, label: g.nombre }))}
          emptyMessage="No hay libros registrados"
          onExport={() => alert('Exportar CSV')}
        />
      )}
    </div>
  );
}
