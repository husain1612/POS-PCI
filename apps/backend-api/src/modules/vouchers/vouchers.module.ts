import { Module } from '@nestjs/common';
import { VoucherController } from './vouchers.controller';
import { VoucherService } from './vouchers.service';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [VoucherService],
})
export class VoucherModule {}
