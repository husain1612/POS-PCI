import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('sales-summary')
  salesSummary(@Query('outletId') outletId?: string) {
    return this.service.salesSummary(outletId);
  }

  @Get('sales-by-payment-method')
  salesByPaymentMethod(@Query('outletId') outletId?: string) {
    return this.service.salesByPaymentMethod(outletId);
  }

  @Get('top-products')
  topProducts(@Query('outletId') outletId?: string) {
    return this.service.topProducts(outletId);
  }

  @Get('revenue-by-outlet')
  revenueByOutlet() {
    return this.service.revenueByOutlet();
  }

  @Get('inventory')
  inventoryReport(@Query('outletId') outletId?: string) {
    return this.service.inventoryReport(outletId);
  }

  @Get('low-stock')
  lowStock(@Query('outletId') outletId?: string) {
    return this.service.lowStock(outletId);
  }
}
