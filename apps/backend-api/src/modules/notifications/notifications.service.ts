import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.notification.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.notification.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`Notification ${id} not found`);
    return record;
  }

  create(data: Prisma.NotificationUncheckedCreateInput) {
    return this.prisma.notification.create({ data });
  }

  async update(id: string, data: Prisma.NotificationUncheckedUpdateInput) {
    await this.findOne(id);
    return this.prisma.notification.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.notification.delete({ where: { id } });
  }
}
