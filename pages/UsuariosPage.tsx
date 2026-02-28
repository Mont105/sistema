import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TablaInventario } from '@/components/TablaInventario';
import { Badge } from '@/components/ui/badge';
import { usuarios as initialUsuarios } from '@/lib/mockData';
import { Usuario } from '@/types';

export function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: 'operador' as 'admin' | 'operador' | 'consulta',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newUsuario: Usuario = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      email: formData.email,
      rol: formData.rol,
      activo: true,
      createdAt: new Date().toISOString(),
    };

    setUsuarios([...usuarios, newUsuario]);
    setShowForm(false);
    setFormData({ nombre: '', email: '', rol: 'operador' });
  };

  const handleDelete = (usuario: Usuario) => {
    if (confirm(`¿Estás seguro de eliminar al usuario "${usuario.nombre}"?`)) {
      setUsuarios(usuarios.filter((u) => u.id !== usuario.id));
    }
  };

  const columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    {
      key: 'rol',
      label: 'Rol',
      render: (value: string) => {
        const variants: Record<string, 'primary' | 'success' | 'default'> = {
          admin: 'primary',
          operador: 'success',
          consulta: 'default',
        };
        const labels: Record<string, string> = {
          admin: 'Admin',
          operador: 'Operador',
          consulta: 'Consulta',
        };
        return <Badge variant={variants[value]}>{labels[value]}</Badge>;
      },
    },
    {
      key: 'activo',
      label: 'Estado',
      render: (value: boolean) => (
        <Badge variant={value ? 'success' : 'default'}>{value ? 'Activo' : 'Inactivo'}</Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Fecha creación',
      render: (value: string) =>
        new Date(value).toLocaleDateString('es-CL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="mb-2">Usuarios</h3>
          <p className="text-neutral-600">Gestión de usuarios del sistema</p>
        </div>
        {!showForm && (
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5" />
            Nuevo usuario
          </Button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
          <h5 className="mb-6">Nuevo usuario</h5>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usuario-nombre">Nombre completo *</Label>
                <Input
                  id="usuario-nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="usuario-email">Email *</Label>
                <Input
                  id="usuario-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="juan@inventario.cl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usuario-rol">Rol *</Label>
              <Select
                value={formData.rol}
                onValueChange={(value) =>
                  setFormData({ ...formData, rol: value as 'admin' | 'operador' | 'consulta' })
                }
              >
                <SelectTrigger id="usuario-rol">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="operador">Operador</SelectItem>
                  <SelectItem value="consulta">Consulta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <p className="caption text-neutral-600 mb-2">Permisos por rol:</p>
              <ul className="space-y-1 caption text-neutral-600">
                <li>
                  • <strong>Admin:</strong> Acceso total al sistema
                </li>
                <li>
                  • <strong>Operador:</strong> Gestión de inventario y movimientos
                </li>
                <li>
                  • <strong>Consulta:</strong> Solo lectura
                </li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              <Button type="submit" variant="primary">
                Guardar
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <TablaInventario
          columns={columns}
          data={usuarios}
          onDelete={handleDelete}
          searchPlaceholder="Buscar por nombre o email..."
          emptyMessage="No hay usuarios registrados"
        />
      )}
    </div>
  );
}
