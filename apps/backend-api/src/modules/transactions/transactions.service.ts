import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRefundDto, CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(outletId?: string) {
    return this.prisma.transaction.findMany({
      where: outletId ? { outletId } : undefined,
      include: { items: true, payments: true, refunds: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const tx = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        items: { include: { product: true, variant: true } },
        payments: true,
        refunds: true,
        cashier: true,
        outlet: true,
      },
    });
    if (!tx) throw new NotFoundException(`Transaction ${id} not found`);
    return tx;
  }

  async checkout(dto: CreateTransactionDto) {
    const subtotal = dto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountTotal = dto.discountTotal ?? 0;
    const taxTotal = dto.taxTotal ?? 0;
    const grandTotal = subtotal - discountTotal + taxTotal;
    const transactionNumber = `TRX-${Date.now()}`;

    const transaction = await this.prisma.transaction.create({
      data: {
        transactionNumber,
        outletId: dto.outletId,
        cashierId: dto.cashierId,
        subtotal,
        discountTotal,
        taxTotal,
        grandTotal,
        voucherId: dto.voucherId,
        items: { create: dto.items },
        payments: { create: dto.payments },
      },
      include: { items: true, payments: true },
    });

    await this.prisma.$transaction(
      dto.items.map((item) =>
        this.prisma.stockMovement.create({
          data: {
            outletId: dto.outletId,
            productId: item.productId,
            variantId: item.variantId,
            type: 'STOCK_OUT',
            quantity: item.quantity,
            reference: transaction.id,
          },
        }),
      ),
    );

    return transaction;
  }

  async void(id: string) {
    await this.findOne(id);
    return this.prisma.transaction.update({ where: { id }, data: { status: 'VOID' } });
  }

  async requestRefund(id: string, dto: CreateRefundDto) {
    await this.findOne(id);
    return this.prisma.refund.create({
      data: { transactionId: id, reason: dto.reason, amount: dto.amount },
    });
  }

  async approveRefund(refundId: string, approvedById: string) {
    const refund = await this.prisma.refund.findUnique({ where: { id: refundId } });
    if (!refund) throw new NotFoundException(`Refund ${refundId} not found`);

    await this.prisma.refund.update({
      where: { id: refundId },
      data: { status: 'APPROVED', approvedById, resolvedAt: new Date() },
    });

    return this.prisma.transaction.update({
      where: { id: refund.transactionId },
      data: { status: 'REFUNDED' },
    });
  }
}
