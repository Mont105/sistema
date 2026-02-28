import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { CreateBodegaPayload } from '@app/shared';

export class CreateBodegaDto implements CreateBodegaPayload {
  @IsString()
  @IsNotEmpty()
  codigo!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  direccion!: string;

  @IsBoolean()
  @IsOptional()
  activo: boolean = true;
}
