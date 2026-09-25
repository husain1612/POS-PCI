import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId?: string) {
    return this.prisma.auditLog.findMany({
      where: userId ? { userId } : undefined,
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  record(userId: string, action: string, module: string, entityId?: string, dataBefore?: unknown, dataAfter?: unknown) {
    return this.prisma.auditLog.create({
      data: {
        userId,
        action,
        module,
        entityId,
        dataBefore: dataBefore as Prisma.InputJsonValue,
        dataAfter: dataAfter as Prisma.InputJsonValue,
      },
    });
  }
}
