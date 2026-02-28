import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Bodega } from '@app/shared';
import { BodegasService } from './bodegas.service';
import { CreateBodegaDto } from './dto/create-bodega.dto';

@Controller('bodegas')
export class BodegasController {
  constructor(private readonly bodegasService: BodegasService) {}

  @Get()
  findAll(): Bodega[] {
    return this.bodegasService.findAll();
  }

  @Post()
  create(@Body() payload: CreateBodegaDto): Bodega {
    return this.bodegasService.create(payload);
  }
}
