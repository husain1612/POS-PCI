import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateRefundDto, CreateTransactionDto } from './dto/create-transaction.dto';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Get()
  findAll(@Query('outletId') outletId?: string) {
    return this.service.findAll(outletId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post('checkout')
  checkout(@Body() dto: CreateTransactionDto) {
    return this.service.checkout(dto);
  }

  @Patch(':id/void')
  void(@Param('id') id: string) {
    return this.service.void(id);
  }

  @Post(':id/refund')
  requestRefund(@Param('id') id: string, @Body() dto: CreateRefundDto) {
    return this.service.requestRefund(id, dto);
  }

  @Patch('refunds/:refundId/approve')
  approveRefund(@Param('refundId') refundId: string, @Body('approvedById') approvedById: string) {
    return this.service.approveRefund(refundId, approvedById);
  }
}
