import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.supplier.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.supplier.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Supplier ${id} not found`);
    return record;
  }

  create(data: Prisma.SupplierUncheckedCreateInput) {
    return this.prisma.supplier.create({ data });
  }

  async update(id: string, data: Prisma.SupplierUncheckedUpdateInput) {
    await this.findOne(id);
    return this.prisma.supplier.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.supplier.delete({ where: { id } });
  }
}
