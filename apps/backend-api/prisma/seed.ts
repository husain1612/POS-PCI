import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.create({
    data: { name: 'Kopi Nusantara Group' },
  });

  const [adminRole, managerRole, cashierRole] = await Promise.all([
    prisma.role.create({ data: { organizationId: org.id, name: 'Admin', isSystem: true } }),
    prisma.role.create({ data: { organizationId: org.id, name: 'Outlet Manager', isSystem: true } }),
    prisma.role.create({ data: { organizationId: org.id, name: 'Cashier', isSystem: true } }),
  ]);

  const outlet = await prisma.outlet.create({
    data: {
      organizationId: org.id,
      name: 'Kopi Nusantara - Kemang',
      code: 'KNJ-001',
      address: 'Jl. Kemang Raya No. 10, Jakarta Selatan',
    },
  });

  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.user.create({
    data: {
      organizationId: org.id,
      name: 'Budi Santoso',
      email: 'admin@kopinusantara.id',
      passwordHash,
      roleId: adminRole.id,
    },
  });

  await prisma.user.create({
    data: {
      organizationId: org.id,
      name: 'Siti Aminah',
      email: 'cashier@kopinusantara.id',
      passwordHash,
      roleId: cashierRole.id,
      outletId: outlet.id,
    },
  });

  const category = await prisma.category.create({
    data: { organizationId: org.id, name: 'Minuman Kopi' },
  });

  await prisma.product.create({
    data: {
      organizationId: org.id,
      categoryId: category.id,
      name: 'Kopi Susu Gula Aren',
      sku: 'KSG-001',
      barcode: '8991002345671',
      basePrice: 25000,
    },
  });

  console.log('Seed complete:', { org: org.name, outlet: outlet.name, roles: [managerRole.name] });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
