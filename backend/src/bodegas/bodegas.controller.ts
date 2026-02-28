import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import type { Bodega } from '@app/shared';
import { BodegasService } from './bodegas.service';
import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBodegaDto): Bodega {
    return this.bodegasService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.bodegasService.remove(id);
  }
}
