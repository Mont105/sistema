import { Injectable, NotFoundException } from '@nestjs/common';
import type { Bodega } from '@app/shared';
import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';

@Injectable()
export class BodegasService {
  private readonly bodegas: Bodega[] = [];

  findAll(): Bodega[] {
    return this.bodegas;
  }

  create(payload: CreateBodegaDto): Bodega {
    const nueva: Bodega = {
      id: Date.now().toString(),
      codigo: payload.codigo,
      nombre: payload.nombre,
      direccion: payload.direccion,
      activo: payload.activo ?? true,
      createdAt: new Date().toISOString(),
    };

    this.bodegas.push(nueva);
    return nueva;
  }

  update(id: string, payload: UpdateBodegaDto): Bodega {
    const index = this.bodegas.findIndex((bodega) => bodega.id === id);
    if (index === -1) {
      throw new NotFoundException('Bodega no existe');
    }

    const updated: Bodega = {
      ...this.bodegas[index],
      ...payload,
    };

    this.bodegas[index] = updated;
    return updated;
  }

  remove(id: string): void {
    const index = this.bodegas.findIndex((bodega) => bodega.id === id);
    if (index === -1) {
      throw new NotFoundException('Bodega no existe');
    }

    this.bodegas.splice(index, 1);
  }
}
