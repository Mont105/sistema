import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateLibroDto {
  @IsString()
  @IsOptional()
  isbn?: string;

  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  autor?: string;

  @IsString()
  @IsOptional()
  editorial?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  anio?: number;

  @IsString()
  @IsOptional()
  genero?: string;

  @IsString()
  @IsOptional()
  unidad?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  costo?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  precio?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  stockMinimo?: number;
}
