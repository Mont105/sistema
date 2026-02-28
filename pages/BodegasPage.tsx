import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TablaInventario } from '@/components/TablaInventario';
import { FormBodega, SaveResult } from '@/components/FormBodega';
import { Badge } from '@/components/ui/badge';
import {
  createBodega,
  deleteBodega,
  getBodegas,
  getErrorMessage,
  updateBodega,
} from '@/lib/apiClient';
import { bodegas as initialBodegas } from '../lib/mockData';
import { Bodega } from '../types';

export function BodegasPage() {
  const [bodegas, setBodegas] = useState(initialBodegas);
  const [showForm, setShowForm] = useState(false);
  const [editingBodega, setEditingBodega] = useState<Bodega | undefined>();
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await getBodegas();
        if (isMounted) {
          setBodegas(data);
          setPageError(null);
        }
      } catch {
        if (isMounted) {
          setBodegas(initialBodegas);
          setPageError('No se pudo conectar al servidor. Mostrando datos mock.');
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (bodega: Partial<Bodega>): Promise<SaveResult> => {
    try {
      if (editingBodega) {
        const updated = await updateBodega(editingBodega.id, {
          codigo: bodega.codigo,
          nombre: bodega.nombre,
          direccion: bodega.direccion,
          activo: bodega.activo,
        });

        setBodegas((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item)),
        );
      } else {
        const created = await createBodega({
          codigo: bodega.codigo ?? '',
          nombre: bodega.nombre ?? '',
          direccion: bodega.direccion ?? '',
          activo: bodega.activo ?? true,
        });
        setBodegas((prev) => [...prev, created]);
      }

      setShowForm(false);
      setEditingBodega(undefined);
      setPageError(null);
      return { ok: true };
    } catch (error) {
      const message = getErrorMessage(error);
      setPageError(message);
      return { ok: false, message };
    }
  };

  const handleEdit = (bodega: Bodega) => {
    setEditingBodega(bodega);
    setShowForm(true);
  };

  const handleDelete = async (bodega: Bodega) => {
    if (!confirm(`¿Estás seguro de eliminar la bodega "${bodega.nombre}"?`)) {
      return;
    }

    try {
      await deleteBodega(bodega.id);
      setBodegas((prev) => prev.filter((item) => item.id !== bodega.id));
      setPageError(null);
    } catch (error) {
      setPageError(getErrorMessage(error));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBodega(undefined);
  };

  const columns = [
    { key: 'codigo', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'direccion', label: 'Dirección' },
    {
      key: 'activo',
      label: 'Estado',
      render: (value: boolean) => (
        <Badge variant={value ? 'success' : 'default'}>{value ? 'Activa' : 'Inactiva'}</Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="mb-2">Bodegas</h3>
          <p className="text-neutral-600">Gestión de bodegas y almacenes</p>
        </div>
        {!showForm && (
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5" />
            Nueva bodega
          </Button>
        )}
      </div>

      {pageError && <p className="text-danger-600 text-sm">{pageError}</p>}

      {showForm && (
        <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
          <h5 className="mb-6">{editingBodega ? 'Editar bodega' : 'Nueva bodega'}</h5>
          <FormBodega bodega={editingBodega} onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}

      {!showForm && (
        <TablaInventario
          columns={columns}
          data={bodegas}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Buscar por código o nombre..."
          emptyMessage="No hay bodegas registradas"
          onExport={() => alert('Exportar CSV')}
        />
      )}
    </div>
  );
}
