import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OutletService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.outlet.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.outlet.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Outlet ${id} not found`);
    return record;
  }

  create(data: Prisma.OutletUncheckedCreateInput) {
    return this.prisma.outlet.create({ data });
  }

  async update(id: string, data: Prisma.OutletUncheckedUpdateInput) {
    await this.findOne(id);
    return this.prisma.outlet.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.outlet.delete({ where: { id } });
  }
}
