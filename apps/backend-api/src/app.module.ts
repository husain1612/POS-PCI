import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organizations/organizations.module';
import { OutletModule } from './modules/outlets/outlets.module';
import { UserModule } from './modules/users/users.module';
import { RoleModule } from './modules/roles/roles.module';
import { CategoryModule } from './modules/categories/categories.module';
import { ProductModule } from './modules/products/products.module';
import { SupplierModule } from './modules/suppliers/suppliers.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { StockOpnameModule } from './modules/stock-opname/stock-opname.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PromotionModule } from './modules/promotions/promotions.module';
import { VoucherModule } from './modules/vouchers/vouchers.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { NotificationModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    OrganizationModule,
    OutletModule,
    UserModule,
    RoleModule,
    CategoryModule,
    ProductModule,
    SupplierModule,
    InventoryModule,
    StockOpnameModule,
    TransactionsModule,
    PromotionModule,
    VoucherModule,
    ReportsModule,
    AuditLogsModule,
    NotificationModule,
  ],
})
export class AppModule {}
