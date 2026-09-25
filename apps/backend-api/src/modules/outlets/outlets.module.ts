import { Module } from '@nestjs/common';
import { OutletController } from './outlets.controller';
import { OutletService } from './outlets.service';

@Module({
  controllers: [OutletController],
  providers: [OutletService],
  exports: [OutletService],
})
export class OutletModule {}
