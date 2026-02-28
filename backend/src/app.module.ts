import { Module } from '@nestjs/common';
import { BodegasModule } from './bodegas/bodegas.module';
import { LibrosModule } from './libros/libros.module';

@Module({
  imports: [BodegasModule, LibrosModule],
})
export class AppModule {}
