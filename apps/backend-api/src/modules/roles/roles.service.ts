import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.role.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Role ${id} not found`);
    return record;
  }

  create(data: Prisma.RoleUncheckedCreateInput) {
    return this.prisma.role.create({ data });
  }

  async update(id: string, data: Prisma.RoleUncheckedUpdateInput) {
    await this.findOne(id);
    return this.prisma.role.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.role.delete({ where: { id } });
  }
}
