import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import type { Libro } from '@app/shared';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { LibrosService } from './libros.service';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get()
  findAll(): Libro[] {
    return this.librosService.findAll();
  }

  @Post()
  create(@Body() payload: CreateLibroDto): Libro {
    return this.librosService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateLibroDto): Libro {
    return this.librosService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.librosService.remove(id);
  }
}
