import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import type { CreateLibroPayload } from '@app/shared';

export class CreateLibroDto implements CreateLibroPayload {
  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  autor!: string;

  @IsString()
  @IsOptional()
  editorial: string = '';

  @Type(() => Number)
  @IsInt()
  anio!: number;

  @IsString()
  @IsNotEmpty()
  genero!: string;

  @IsString()
  @IsNotEmpty()
  unidad!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costo!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  precio?: number;

  @IsBoolean()
  @IsOptional()
  activo: boolean = true;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  stockMinimo?: number;
}
