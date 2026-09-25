import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class StartOpnameItemDto {
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsInt()
  @Min(0)
  systemQty: number;
}

export class StartOpnameDto {
  @IsString()
  outletId: string;

  @IsString()
  createdById: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StartOpnameItemDto)
  items: StartOpnameItemDto[];
}

export class SubmitCountDto {
  @IsArray()
  @ArrayMinSize(1)
  counts: { itemId: string; physicalQty: number }[];
}

export class ApproveOpnameDto {
  @IsString()
  approvedById: string;
}
