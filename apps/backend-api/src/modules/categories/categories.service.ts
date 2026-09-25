import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.category.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Category ${id} not found`);
    return record;
  }

  create(data: Prisma.CategoryUncheckedCreateInput) {
    return this.prisma.category.create({ data });
  }

  async update(id: string, data: Prisma.CategoryUncheckedUpdateInput) {
    await this.findOne(id);
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.category.delete({ where: { id } });
  }
}
