import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.promotion.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.promotion.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Promotion ${id} not found`);
    return record;
  }

  create(data: Prisma.PromotionUncheckedCreateInput) {
    return this.prisma.promotion.create({ data });
  }

  async update(id: string, data: Prisma.PromotionUncheckedUpdateInput) {
    await this.findOne(id);
    return this.prisma.promotion.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.promotion.delete({ where: { id } });
  }
}
