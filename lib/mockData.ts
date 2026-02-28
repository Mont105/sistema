import { Bodega, Libro, Movimiento, Usuario, Genero, Motivo, StockPorBodega } from '../types';

// Bodegas
export const bodegas: Bodega[] = [
  {
    id: '1',
    codigo: 'B001',
    nombre: 'Casa Matriz',
    direccion: 'Av. Libertador Bernardo O\'Higgins 1234, Santiago',
    activo: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    codigo: 'B002',
    nombre: 'Sucursal Norte',
    direccion: 'Av. Recoleta 567, Recoleta',
    activo: true,
    createdAt: '2024-02-01T10:00:00Z',
  },
];

// Géneros
export const generos: Genero[] = [
  { id: '1', nombre: 'Tecnología' },
  { id: '2', nombre: 'Administración' },
  { id: '3', nombre: 'Literatura' },
  { id: '4', nombre: 'Ciencias' },
  { id: '5', nombre: 'Historia' },
  { id: '6', nombre: 'Arte' },
];

// Libros
export const libros: Libro[] = [
  {
    id: '1',
    isbn: '978-956-00-0001',
    titulo: 'Introducción a la Programación',
    autor: 'J. Pérez',
    editorial: 'Editorial Técnica',
    anio: 2023,
    genero: 'Tecnología',
    unidad: 'Ejemplar',
    costo: 15000,
    precio: 22000,
    activo: true,
    stockMinimo: 10,
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    isbn: '978-956-00-0002',
    titulo: 'Gestión de Operaciones',
    autor: 'M. González',
    editorial: 'Editorial Empresarial',
    anio: 2022,
    genero: 'Administración',
    unidad: 'Ejemplar',
    costo: 18000,
    precio: 25000,
    activo: true,
    stockMinimo: 5,
    createdAt: '2024-01-22T10:00:00Z',
  },
  {
    id: '3',
    isbn: '978-956-00-0003',
    titulo: 'Literatura Chilena I',
    autor: 'C. Silva',
    editorial: 'Editorial Cultura',
    anio: 2021,
    genero: 'Literatura',
    unidad: 'Ejemplar',
    costo: 12000,
    precio: 18000,
    activo: true,
    stockMinimo: 8,
    createdAt: '2024-01-25T10:00:00Z',
  },
  {
    id: '4',
    isbn: '978-956-00-0004',
    titulo: 'Historia de Chile Contemporáneo',
    autor: 'R. Vargas',
    editorial: 'Editorial Historia',
    anio: 2023,
    genero: 'Historia',
    unidad: 'Ejemplar',
    costo: 20000,
    precio: 28000,
    activo: true,
    stockMinimo: 5,
    createdAt: '2024-02-01T10:00:00Z',
  },
];

// Usuarios
export const usuarios: Usuario[] = [
  {
    id: '1',
    nombre: 'Admin Sistema',
    email: 'admin@inventario.cl',
    rol: 'admin',
    activo: true,
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    nombre: 'María Operador',
    email: 'maria@inventario.cl',
    rol: 'operador',
    activo: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '3',
    nombre: 'Juan Consulta',
    email: 'juan@inventario.cl',
    rol: 'consulta',
    activo: true,
    createdAt: '2024-02-01T10:00:00Z',
  },
];

// Movimientos
export const movimientos: Movimiento[] = [
  {
    id: '1',
    tipo: 'entrada',
    fecha: '2024-11-10T09:30:00Z',
    libroId: '1',
    libroTitulo: 'Introducción a la Programación',
    libroISBN: '978-956-00-0001',
    bodegaDestinoId: '1',
    bodegaDestinoNombre: 'Casa Matriz',
    cantidad: 50,
    costoUnitario: 15000,
    motivo: 'Compra a proveedor',
    docReferencia: 'FC-001234',
    usuarioId: '1',
    usuarioNombre: 'Admin Sistema',
    createdAt: '2024-11-10T09:30:00Z',
  },
  {
    id: '2',
    tipo: 'entrada',
    fecha: '2024-11-10T10:15:00Z',
    libroId: '2',
    libroTitulo: 'Gestión de Operaciones',
    libroISBN: '978-956-00-0002',
    bodegaDestinoId: '1',
    bodegaDestinoNombre: 'Casa Matriz',
    cantidad: 30,
    costoUnitario: 18000,
    motivo: 'Compra a proveedor',
    docReferencia: 'FC-001235',
    usuarioId: '1',
    usuarioNombre: 'Admin Sistema',
    createdAt: '2024-11-10T10:15:00Z',
  },
  {
    id: '3',
    tipo: 'transferencia',
    fecha: '2024-11-11T14:00:00Z',
    libroId: '1',
    libroTitulo: 'Introducción a la Programación',
    libroISBN: '978-956-00-0001',
    bodegaOrigenId: '1',
    bodegaOrigenNombre: 'Casa Matriz',
    bodegaDestinoId: '2',
    bodegaDestinoNombre: 'Sucursal Norte',
    cantidad: 20,
    motivo: 'Reposición sucursal',
    docReferencia: 'TRF-00123',
    usuarioId: '2',
    usuarioNombre: 'María Operador',
    createdAt: '2024-11-11T14:00:00Z',
  },
  {
    id: '4',
    tipo: 'salida',
    fecha: '2024-11-12T11:30:00Z',
    libroId: '1',
    libroTitulo: 'Introducción a la Programación',
    libroISBN: '978-956-00-0001',
    bodegaOrigenId: '2',
    bodegaOrigenNombre: 'Sucursal Norte',
    cantidad: 5,
    motivo: 'Venta',
    docReferencia: 'BV-00456',
    usuarioId: '2',
    usuarioNombre: 'María Operador',
    createdAt: '2024-11-12T11:30:00Z',
  },
  {
    id: '5',
    tipo: 'entrada',
    fecha: '2024-11-12T15:00:00Z',
    libroId: '3',
    libroTitulo: 'Literatura Chilena I',
    libroISBN: '978-956-00-0003',
    bodegaDestinoId: '1',
    bodegaDestinoNombre: 'Casa Matriz',
    cantidad: 40,
    costoUnitario: 12000,
    motivo: 'Compra a proveedor',
    docReferencia: 'FC-001236',
    usuarioId: '1',
    usuarioNombre: 'Admin Sistema',
    createdAt: '2024-11-12T15:00:00Z',
  },
  {
    id: '6',
    tipo: 'salida',
    fecha: '2024-11-13T10:00:00Z',
    libroId: '2',
    libroTitulo: 'Gestión de Operaciones',
    libroISBN: '978-956-00-0002',
    bodegaOrigenId: '1',
    bodegaOrigenNombre: 'Casa Matriz',
    cantidad: 3,
    motivo: 'Venta',
    docReferencia: 'BV-00457',
    usuarioId: '2',
    usuarioNombre: 'María Operador',
    createdAt: '2024-11-13T10:00:00Z',
  },
  {
    id: '7',
    tipo: 'entrada',
    fecha: '2024-11-13T14:30:00Z',
    libroId: '4',
    libroTitulo: 'Historia de Chile Contemporáneo',
    libroISBN: '978-956-00-0004',
    bodegaDestinoId: '2',
    bodegaDestinoNombre: 'Sucursal Norte',
    cantidad: 25,
    costoUnitario: 20000,
    motivo: 'Compra a proveedor',
    docReferencia: 'FC-001237',
    usuarioId: '1',
    usuarioNombre: 'Admin Sistema',
    createdAt: '2024-11-13T14:30:00Z',
  },
  {
    id: '8',
    tipo: 'transferencia',
    fecha: '2024-11-14T09:00:00Z',
    libroId: '3',
    libroTitulo: 'Literatura Chilena I',
    libroISBN: '978-956-00-0003',
    bodegaOrigenId: '1',
    bodegaOrigenNombre: 'Casa Matriz',
    bodegaDestinoId: '2',
    bodegaDestinoNombre: 'Sucursal Norte',
    cantidad: 15,
    motivo: 'Reposición sucursal',
    docReferencia: 'TRF-00124',
    usuarioId: '2',
    usuarioNombre: 'María Operador',
    createdAt: '2024-11-14T09:00:00Z',
  },
  {
    id: '9',
    tipo: 'salida',
    fecha: '2024-11-14T11:00:00Z',
    libroId: '3',
    libroTitulo: 'Literatura Chilena I',
    libroISBN: '978-956-00-0003',
    bodegaOrigenId: '2',
    bodegaOrigenNombre: 'Sucursal Norte',
    cantidad: 8,
    motivo: 'Venta',
    docReferencia: 'BV-00458',
    usuarioId: '2',
    usuarioNombre: 'María Operador',
    createdAt: '2024-11-14T11:00:00Z',
  },
  {
    id: '10',
    tipo: 'salida',
    fecha: '2024-11-14T13:00:00Z',
    libroId: '1',
    libroTitulo: 'Introducción a la Programación',
    libroISBN: '978-956-00-0001',
    bodegaOrigenId: '1',
    bodegaOrigenNombre: 'Casa Matriz',
    cantidad: 7,
    motivo: 'Venta',
    docReferencia: 'BV-00459',
    usuarioId: '2',
    usuarioNombre: 'María Operador',
    createdAt: '2024-11-14T13:00:00Z',
  },
];

// Motivos
export const motivos: Motivo[] = [
  { id: '1', tipo: 'entrada', nombre: 'Compra a proveedor' },
  { id: '2', tipo: 'entrada', nombre: 'Devolución de cliente' },
  { id: '3', tipo: 'entrada', nombre: 'Ajuste de inventario' },
  { id: '4', tipo: 'salida', nombre: 'Venta' },
  { id: '5', tipo: 'salida', nombre: 'Merma' },
  { id: '6', tipo: 'salida', nombre: 'Devolución a proveedor' },
  { id: '7', tipo: 'salida', nombre: 'Ajuste de inventario' },
  { id: '8', tipo: 'transferencia', nombre: 'Reposición sucursal' },
  { id: '9', tipo: 'transferencia', nombre: 'Redistribución' },
];

// Función para calcular stock por bodega
export function calcularStockPorBodega(): StockPorBodega[] {
  const stockMap = new Map<string, StockPorBodega>();

  movimientos.forEach(mov => {
    // Entradas
    if (mov.tipo === 'entrada' && mov.bodegaDestinoId) {
      const key = `${mov.libroId}-${mov.bodegaDestinoId}`;
      const existing = stockMap.get(key);
      
      if (existing) {
        const totalCosto = existing.cantidad * existing.costoPromedio + mov.cantidad * (mov.costoUnitario || 0);
        existing.cantidad += mov.cantidad;
        existing.costoPromedio = totalCosto / existing.cantidad;
      } else {
        const libro = libros.find(l => l.id === mov.libroId);
        const bodega = bodegas.find(b => b.id === mov.bodegaDestinoId);
        if (libro && bodega) {
          stockMap.set(key, {
            libroId: mov.libroId,
            libroISBN: libro.isbn,
            libroTitulo: libro.titulo,
            bodegaId: mov.bodegaDestinoId,
            bodegaNombre: bodega.nombre,
            cantidad: mov.cantidad,
            costoPromedio: mov.costoUnitario || 0,
          });
        }
      }
    }

    // Salidas
    if (mov.tipo === 'salida' && mov.bodegaOrigenId) {
      const key = `${mov.libroId}-${mov.bodegaOrigenId}`;
      const existing = stockMap.get(key);
      if (existing) {
        existing.cantidad -= mov.cantidad;
      }
    }

    // Transferencias
    if (mov.tipo === 'transferencia') {
      // Salida de origen
      if (mov.bodegaOrigenId) {
        const keyOrigen = `${mov.libroId}-${mov.bodegaOrigenId}`;
        const existingOrigen = stockMap.get(keyOrigen);
        if (existingOrigen) {
          existingOrigen.cantidad -= mov.cantidad;
        }
      }

      // Entrada a destino
      if (mov.bodegaDestinoId) {
        const keyDestino = `${mov.libroId}-${mov.bodegaDestinoId}`;
        const existingDestino = stockMap.get(keyDestino);
        
        if (existingDestino) {
          existingDestino.cantidad += mov.cantidad;
        } else {
          const libro = libros.find(l => l.id === mov.libroId);
          const bodega = bodegas.find(b => b.id === mov.bodegaDestinoId);
          if (libro && bodega) {
            stockMap.set(keyDestino, {
              libroId: mov.libroId,
              libroISBN: libro.isbn,
              libroTitulo: libro.titulo,
              bodegaId: mov.bodegaDestinoId,
              bodegaNombre: bodega.nombre,
              cantidad: mov.cantidad,
              costoPromedio: libro.costo,
            });
          }
        }
      }
    }
  });

  return Array.from(stockMap.values());
}
