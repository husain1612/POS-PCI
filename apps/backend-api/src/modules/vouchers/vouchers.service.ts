import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.voucher.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.voucher.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Voucher ${id} not found`);
    return record;
  }

  create(data: Prisma.VoucherUncheckedCreateInput) {
    return this.prisma.voucher.create({ data });
  }

  async update(id: string, data: Prisma.VoucherUncheckedUpdateInput) {
    await this.findOne(id);
    return this.prisma.voucher.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.voucher.delete({ where: { id } });
  }
}
