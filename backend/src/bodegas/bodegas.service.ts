import { Injectable } from '@nestjs/common';
import type { Bodega } from '@app/shared';
import { CreateBodegaDto } from './dto/create-bodega.dto';

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
}
