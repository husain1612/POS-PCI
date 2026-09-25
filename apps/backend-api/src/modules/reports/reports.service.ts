import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async salesSummary(outletId?: string) {
    const where = { status: 'COMPLETED' as const, ...(outletId ? { outletId } : {}) };
    const [aggregate, count] = await Promise.all([
      this.prisma.transaction.aggregate({ where, _sum: { grandTotal: true } }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      revenue: aggregate._sum.grandTotal ?? 0,
      transactions: count,
      averageBasket: count > 0 ? Number(aggregate._sum.grandTotal ?? 0) / count : 0,
    };
  }

  salesByPaymentMethod(outletId?: string) {
    return this.prisma.payment.groupBy({
      by: ['method'],
      _sum: { amount: true },
      where: outletId ? { transaction: { outletId } } : undefined,
    });
  }

  async topProducts(outletId?: string, take = 10) {
    const grouped = await this.prisma.transactionItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      where: outletId ? { transaction: { outletId } } : undefined,
      orderBy: { _sum: { quantity: 'desc' } },
      take,
    });

    const products = await this.prisma.product.findMany({
      where: { id: { in: grouped.map((g) => g.productId) } },
    });

    return grouped.map((g) => ({
      product: products.find((p) => p.id === g.productId),
      quantitySold: g._sum.quantity ?? 0,
    }));
  }

  revenueByOutlet() {
    return this.prisma.transaction.groupBy({
      by: ['outletId'],
      _sum: { grandTotal: true },
      where: { status: 'COMPLETED' },
    });
  }

  async inventoryReport(outletId?: string) {
    return this.prisma.inventory.findMany({
      where: outletId ? { outletId } : undefined,
      include: { product: true, variant: true, outlet: true },
      orderBy: { currentStock: 'asc' },
    });
  }

  lowStock(outletId?: string) {
    const outletFilter = outletId ? Prisma.sql`AND i."outletId" = ${outletId}` : Prisma.empty;
    return this.prisma.$queryRaw`
      SELECT i.* FROM "Inventory" i
      WHERE i."currentStock" <= i."minimumStock"
      ${outletFilter}
    `;
  }
}
