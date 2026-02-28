import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Libro } from '@app/shared';
import { CreateLibroDto } from './dto/create-libro.dto';
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
}
