import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ApproveOpnameDto, StartOpnameDto, SubmitCountDto } from './dto/stock-opname.dto';

@Injectable()
export class StockOpnameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(outletId?: string) {
    return this.prisma.stockOpname.findMany({
      where: outletId ? { outletId } : undefined,
      include: { items: true },
      orderBy: { startedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const opname = await this.prisma.stockOpname.findUnique({
      where: { id },
      include: { items: { include: { product: true, variant: true } } },
    });
    if (!opname) throw new NotFoundException(`StockOpname ${id} not found`);
    return opname;
  }

  // Step 1: Start — snapshot system quantities for counting
  start(dto: StartOpnameDto) {
    return this.prisma.stockOpname.create({
      data: {
        outletId: dto.outletId,
        createdById: dto.createdById,
        status: 'COUNTING',
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            systemQty: item.systemQty,
          })),
        },
      },
      include: { items: true },
    });
  }

  // Step 2: Submit physical counts — computes variance per item
  async submitCounts(id: string, dto: SubmitCountDto) {
    await this.findOne(id);

    await this.prisma.$transaction(
      dto.counts.map((count) =>
        this.prisma.stockOpnameItem.update({
          where: { id: count.itemId },
          data: {
            physicalQty: count.physicalQty,
          },
        }),
      ),
    );

    const items = await this.prisma.stockOpnameItem.findMany({ where: { opnameId: id } });
    await this.prisma.$transaction(
      items.map((item) =>
        this.prisma.stockOpnameItem.update({
          where: { id: item.id },
          data: { variance: (item.physicalQty ?? 0) - item.systemQty },
        }),
      ),
    );

    return this.prisma.stockOpname.update({
      where: { id },
      data: { status: 'SUBMITTED', submittedAt: new Date() },
      include: { items: true },
    });
  }

  // Step 3: Approval
  approve(id: string, dto: ApproveOpnameDto) {
    return this.prisma.stockOpname.update({
      where: { id },
      data: { status: 'APPROVED', approvedById: dto.approvedById, approvedAt: new Date() },
    });
  }

  // Step 4: Adjustment — apply variance to Inventory and log StockMovement
  async adjust(id: string) {
    const opname = await this.findOne(id);
    const changedItems = opname.items.filter((item) => (item.variance ?? 0) !== 0);

    await this.prisma.$transaction(async (tx) => {
      for (const item of changedItems) {
        await tx.stockMovement.create({
          data: {
            outletId: opname.outletId,
            productId: item.productId,
            variantId: item.variantId,
            type: 'OPNAME',
            quantity: item.variance as number,
            reference: opname.id,
          },
        });

        // variantId may be null, which Prisma's compound-unique lookup does not
        // support directly, so resolve the row with findFirst instead of upsert.
        const existing = await tx.inventory.findFirst({
          where: { outletId: opname.outletId, productId: item.productId, variantId: item.variantId ?? null },
        });

        if (existing) {
          await tx.inventory.update({
            where: { id: existing.id },
            data: { currentStock: item.physicalQty ?? 0 },
          });
        } else {
          await tx.inventory.create({
            data: {
              outletId: opname.outletId,
              productId: item.productId,
              variantId: item.variantId,
              currentStock: item.physicalQty ?? 0,
            },
          });
        }
      }
    });

    return this.prisma.stockOpname.update({
      where: { id },
      data: { status: 'ADJUSTED' },
    });
  }
}
