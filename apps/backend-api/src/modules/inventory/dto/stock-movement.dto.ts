import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateStockMovementDto {
  @IsString()
  outletId: string;

  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsIn(['STOCK_IN', 'STOCK_OUT', 'ADJUSTMENT'])
  type: 'STOCK_IN' | 'STOCK_OUT' | 'ADJUSTMENT';

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  supplierId?: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
