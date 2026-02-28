import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { TablaInventario } from '../components/TablaInventario';
import { FormBodega } from '../components/FormBodega';
import { Badge } from '../components/ui/badge';
import { bodegas as initialBodegas } from '../lib/mockData';
import { Bodega } from '../types';

export function BodegasPage() {
  const [bodegas, setBodegas] = useState(initialBodegas);
  const [showForm, setShowForm] = useState(false);
  const [editingBodega, setEditingBodega] = useState<Bodega | undefined>();

  const handleSave = (bodega: Partial<Bodega>) => {
    if (editingBodega) {
      setBodegas(bodegas.map((b) => (b.id === editingBodega.id ? { ...b, ...bodega } : b)));
    } else {
      const newBodega: Bodega = {
        id: Date.now().toString(),
        codigo: bodega.codigo!,
        nombre: bodega.nombre!,
        direccion: bodega.direccion!,
        activo: bodega.activo ?? true,
        createdAt: new Date().toISOString(),
      };
      setBodegas([...bodegas, newBodega]);
    }
    setShowForm(false);
    setEditingBodega(undefined);
  };

  const handleEdit = (bodega: Bodega) => {
    setEditingBodega(bodega);
    setShowForm(true);
  };

  const handleDelete = (bodega: Bodega) => {
    if (confirm(`¿Estás seguro de eliminar la bodega "${bodega.nombre}"?`)) {
      setBodegas(bodegas.filter((b) => b.id !== bodega.id));
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
        <Badge variant={value ? 'success' : 'default'}>
          {value ? 'Activa' : 'Inactiva'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
          <h5 className="mb-6">{editingBodega ? 'Editar bodega' : 'Nueva bodega'}</h5>
          <FormBodega bodega={editingBodega} onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}

      {/* Table */}
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
