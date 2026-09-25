import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.organization.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.organization.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Organization ${id} not found`);
    return record;
  }

  create(data: Prisma.OrganizationUncheckedCreateInput) {
    return this.prisma.organization.create({ data });
  }

  async update(id: string, data: Prisma.OrganizationUncheckedUpdateInput) {
    await this.findOne(id);
    return this.prisma.organization.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.organization.delete({ where: { id } });
  }
}
