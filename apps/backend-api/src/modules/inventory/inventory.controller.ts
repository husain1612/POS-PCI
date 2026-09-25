import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InventoryService } from './inventory.service';
import { CreateStockMovementDto } from './dto/stock-movement.dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get('outlets/:outletId/inventory')
  findByOutlet(@Param('outletId') outletId: string) {
    return this.service.findByOutlet(outletId);
  }

  @Get('outlets/:outletId/stock-movements')
  listMovements(@Param('outletId') outletId: string) {
    return this.service.listMovements(outletId);
  }

  @Post('stock-movements')
  recordMovement(@Body() dto: CreateStockMovementDto) {
    return this.service.recordMovement(dto);
  }
}
