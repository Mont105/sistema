import React, { useMemo, useState } from 'react';
import { Download, Edit2, Eye, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TablaInventarioProps<T extends Record<string, any>> {
  columns: ColumnDef<T>[];
  data: T[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  searchPlaceholder?: string;
  filterOptions?: { value: string; label: string }[];
  filterKey?: keyof T;
  onExport?: () => void;
  emptyMessage?: string;
}

export function TablaInventario<T extends Record<string, any>>({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  searchPlaceholder = 'Buscar...',
  filterOptions,
  filterKey,
  onExport,
  emptyMessage = 'No hay datos disponibles',
}: TablaInventarioProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const resolvedFilterKey = useMemo(() => {
    if (filterKey) return filterKey;
    if (!filterOptions?.length) return undefined;
    return filterOptions[0].value as keyof T;
  }, [filterKey, filterOptions]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        searchTerm.length === 0 ||
        Object.values(row).some((value) =>
          String(value ?? '')
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );

      const matchesFilter =
        filterValue === 'all' || !resolvedFilterKey
          ? true
          : String(row[resolvedFilterKey] ?? '') === filterValue;

      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterValue, resolvedFilterKey]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-xl border border-neutral-200">
      <div className="p-4 border-b border-neutral-200 flex flex-col lg:flex-row gap-3">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>

          {filterOptions && (
            <div className="sm:w-48 space-y-2">
              <Label>Filtro</Label>
              <Select
                value={filterValue}
                onValueChange={(value) => {
                  setFilterValue(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {filterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {onExport && (
          <Button variant="secondary" onClick={onExport} size="md">
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </Button>
        )}
      </div>

      <Table>
        <TableHeader className="bg-neutral-50">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="px-4 py-3 caption text-neutral-600">
                {column.label}
              </TableHead>
            ))}
            {(onView || onEdit || onDelete) && (
              <TableHead className="px-4 py-3 caption text-neutral-600 text-right">Acciones</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (onView || onEdit || onDelete ? 1 : 0)}
                className="px-4 py-12 text-center text-neutral-500"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow key={index} className="border-b border-neutral-200 hover:bg-neutral-50">
                {columns.map((column) => {
                  const value = row[column.key as keyof T];
                  return (
                    <TableCell key={String(column.key)} className="px-4 py-3">
                      {column.render ? column.render(value, row) : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}
                {(onView || onEdit || onDelete) && (
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="p-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="caption text-neutral-600">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de{' '}
            {filteredData.length} resultados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={safeCurrentPage === 1}
            >
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`min-w-[44px] min-h-[36px] px-3 py-1 rounded-lg transition-colors ${
                    safeCurrentPage === i + 1
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={safeCurrentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
