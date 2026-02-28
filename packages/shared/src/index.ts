export type Money = number;

export interface Bodega {
  id: string;
  codigo: string;
  nombre: string;
  direccion: string;
  activo: boolean;
  createdAt: string;
}

export interface Libro {
  id: string;
  isbn: string;
  titulo: string;
  autor: string;
  editorial: string;
  anio: number;
  genero: string;
  unidad: string;
  /** @description Almacenar en centavos/enteros para evitar errores de coma flotante */
  costo: Money;
  /** @description Almacenar en centavos/enteros para evitar errores de coma flotante */
  precio?: Money;
  imagen?: string;
  activo: boolean;
  stockMinimo?: number;
  createdAt: string;
}

export interface Movimiento {
  id: string;
  tipo: 'entrada' | 'salida' | 'transferencia';
  fecha: string;
  libroId: string;
  libroTitulo: string;
  libroISBN: string;
  bodegaOrigenId?: string;
  bodegaOrigenNombre?: string;
  bodegaDestinoId?: string;
  bodegaDestinoNombre?: string;
  cantidad: number;
  /** @description Almacenar en centavos/enteros para evitar errores de coma flotante */
  costoUnitario?: Money;
  motivo: string;
  docReferencia?: string;
  usuarioId: string;
  usuarioNombre: string;
  createdAt: string;
}

export interface StockPorBodega {
  libroId: string;
  libroISBN: string;
  libroTitulo: string;
  bodegaId: string;
  bodegaNombre: string;
  cantidad: number;
  costoPromedio: number;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'operador' | 'consulta';
  activo: boolean;
  avatar?: string;
  createdAt: string;
}

export interface KardexEntry {
  fecha: string;
  tipo: 'entrada' | 'salida' | 'transferencia';
  documento: string;
  bodega: string;
  entrada: number;
  salida: number;
  saldo: number;
  costoUnitario: number;
  costoTotal: number;
}

export interface Genero {
  id: string;
  nombre: string;
}

export interface Motivo {
  id: string;
  tipo: 'entrada' | 'salida' | 'transferencia';
  nombre: string;
}

export type CreateBodegaPayload = Pick<Bodega, 'codigo' | 'nombre' | 'direccion' | 'activo'>;

export type CreateLibroPayload = Pick<
  Libro,
  | 'isbn'
  | 'titulo'
  | 'autor'
  | 'editorial'
  | 'anio'
  | 'genero'
  | 'unidad'
  | 'costo'
  | 'precio'
  | 'activo'
  | 'stockMinimo'
>;
