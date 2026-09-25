import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class TransactionItemDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount?: number;
}

export class TransactionPaymentDto {
  @IsIn(['CASH', 'QRIS', 'DEBIT', 'CREDIT_CARD', 'EWALLET'])
  method: 'CASH' | 'QRIS' | 'DEBIT' | 'CREDIT_CARD' | 'EWALLET';

  @IsNumber()
  amount: number;
}

export class CreateTransactionDto {
  @IsString()
  outletId: string;

  @IsString()
  cashierId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TransactionItemDto)
  items: TransactionItemDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TransactionPaymentDto)
  payments: TransactionPaymentDto[];

  @IsOptional()
  @IsNumber()
  discountTotal?: number;

  @IsOptional()
  @IsNumber()
  taxTotal?: number;

  @IsOptional()
  @IsString()
  voucherId?: string;
}

export class CreateRefundDto {
  @IsString()
  reason: string;

  @IsNumber()
  amount: number;
}
