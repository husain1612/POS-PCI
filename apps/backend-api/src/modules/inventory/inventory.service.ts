import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockMovementDto } from './dto/stock-movement.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  findByOutlet(outletId: string) {
    return this.prisma.inventory.findMany({
      where: { outletId },
      include: { product: true, variant: true },
    });
  }

  listMovements(outletId: string) {
    return this.prisma.stockMovement.findMany({
      where: { outletId },
      include: { product: true, variant: true, supplier: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async recordMovement(dto: CreateStockMovementDto) {
    const delta = dto.type === 'STOCK_OUT' ? -dto.quantity : dto.quantity;

    return this.prisma.$transaction(async (tx) => {
      const movement = await tx.stockMovement.create({ data: dto });

      // variantId may be null, which Prisma's compound-unique lookup does not
      // support directly, so resolve the row with findFirst instead of upsert.
      const existing = await tx.inventory.findFirst({
        where: { outletId: dto.outletId, productId: dto.productId, variantId: dto.variantId ?? null },
      });

      if (existing) {
        await tx.inventory.update({
          where: { id: existing.id },
          data: { currentStock: { increment: delta } },
        });
      } else {
        await tx.inventory.create({
          data: {
            outletId: dto.outletId,
            productId: dto.productId,
            variantId: dto.variantId,
            currentStock: Math.max(delta, 0),
          },
        });
      }

      return movement;
    });
  }
}
