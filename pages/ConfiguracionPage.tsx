import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generos as initialGeneros, motivos as initialMotivos } from '../lib/mockData';
import { Genero, Motivo } from '../types';

export function ConfiguracionPage() {
  const [generos, setGeneros] = useState(initialGeneros);
  const [motivos, setMotivos] = useState(initialMotivos);
  const [newGenero, setNewGenero] = useState('');
  const [newMotivo, setNewMotivo] = useState({ tipo: 'entrada' as const, nombre: '' });

  const handleAddGenero = () => {
    if (newGenero.trim()) {
      setGeneros([
        ...generos,
        { id: Date.now().toString(), nombre: newGenero.trim() },
      ]);
      setNewGenero('');
    }
  };

  const handleDeleteGenero = (id: string) => {
    setGeneros(generos.filter((g) => g.id !== id));
  };

  const handleAddMotivo = () => {
    if (newMotivo.nombre.trim()) {
      setMotivos([
        ...motivos,
        { id: Date.now().toString(), ...newMotivo, nombre: newMotivo.nombre.trim() },
      ]);
      setNewMotivo({ tipo: 'entrada', nombre: '' });
    }
  };

  const handleDeleteMotivo = (id: string) => {
    setMotivos(motivos.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="mb-2">Configuración</h3>
        <p className="text-neutral-600">Parámetros y catálogos del sistema</p>
      </div>

      {/* Géneros */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
        <h5 className="mb-4">Géneros de libros</h5>
        <p className="text-neutral-600 caption mb-6">
          Gestiona los géneros o categorías disponibles para clasificar los libros
        </p>

        <div className="space-y-4">
          {/* Add new */}
          <div className="flex gap-3">
            <Input
              placeholder="Nuevo género (ej: Ficción)"
              value={newGenero}
              onChange={(e) => setNewGenero(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddGenero()}
            />
            <Button onClick={handleAddGenero} disabled={!newGenero.trim()}>
              <Plus className="w-5 h-5" />
              Agregar
            </Button>
          </div>

          {/* List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {generos.map((genero) => (
              <div
                key={genero.id}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <span className="caption">{genero.nombre}</span>
                <button
                  onClick={() => handleDeleteGenero(genero.id)}
                  className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unidades de medida */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
        <h5 className="mb-4">Unidades de medida</h5>
        <p className="text-neutral-600 caption mb-6">
          Unidades para contabilizar los ejemplares
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
            <span className="caption text-primary-700">Ejemplar (predeterminado)</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <span className="caption">Unidad</span>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <span className="caption">Volumen</span>
          </div>
        </div>
      </div>

      {/* Motivos */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
        <h5 className="mb-4">Motivos de movimiento</h5>
        <p className="text-neutral-600 caption mb-6">
          Gestiona los motivos disponibles para cada tipo de movimiento
        </p>

        <div className="space-y-4">
          {/* Add new */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={newMotivo.tipo}
              onChange={(e) =>
                setNewMotivo({
                  ...newMotivo,
                  tipo: e.target.value as 'entrada' | 'salida' | 'transferencia',
                })
              }
              className="px-4 py-2.5 min-h-[44px] bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
              <option value="transferencia">Transferencia</option>
            </select>
            <Input
              placeholder="Nuevo motivo (ej: Compra mayorista)"
              value={newMotivo.nombre}
              onChange={(e) => setNewMotivo({ ...newMotivo, nombre: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleAddMotivo()}
            />
            <Button onClick={handleAddMotivo} disabled={!newMotivo.nombre.trim()}>
              <Plus className="w-5 h-5" />
              Agregar
            </Button>
          </div>

          {/* Lists by type */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {['entrada', 'salida', 'transferencia'].map((tipo) => (
              <div key={tipo}>
                <h6 className="mb-3 capitalize">{tipo}</h6>
                <div className="space-y-2">
                  {motivos
                    .filter((m) => m.tipo === tipo)
                    .map((motivo) => (
                      <div
                        key={motivo.id}
                        className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                      >
                        <span className="caption">{motivo.nombre}</span>
                        <button
                          onClick={() => handleDeleteMotivo(motivo.id)}
                          className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parámetros generales */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 lg:p-6">
        <h5 className="mb-4">Parámetros generales</h5>
        <p className="text-neutral-600 caption mb-6">
          Configuración general del sistema
        </p>

        <div className="space-y-4">
          <Input
            label="Stock mínimo por defecto"
            type="number"
            defaultValue="5"
            helperText="Cantidad mínima de ejemplares antes de alerta"
          />
          <Input
            label="Razón social"
            defaultValue="Librería Central S.A."
            helperText="Aparecerá en reportes e impresiones"
          />
          <Input
            label="RUT"
            defaultValue="76.XXX.XXX-X"
            helperText="Identificación tributaria"
          />
        </div>
      </div>
    </div>
  );
}
