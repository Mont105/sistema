import { Injectable } from '@nestjs/common';
import type { Libro } from '@app/shared';
import { CreateLibroDto } from './dto/create-libro.dto';

@Injectable()
export class LibrosService {
  private readonly libros: Libro[] = [];

  findAll(): Libro[] {
    return this.libros;
  }

  create(payload: CreateLibroDto): Libro {
    const nuevo: Libro = {
      id: Date.now().toString(),
      isbn: payload.isbn,
      titulo: payload.titulo,
      autor: payload.autor,
      editorial: payload.editorial ?? '',
      anio: payload.anio,
      genero: payload.genero,
      unidad: payload.unidad,
      costo: payload.costo,
      precio: payload.precio,
      activo: payload.activo ?? true,
      stockMinimo: payload.stockMinimo ?? 5,
      createdAt: new Date().toISOString(),
    };

    this.libros.push(nuevo);
    return nuevo;
  }
}
