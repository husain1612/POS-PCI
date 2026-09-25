import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StockOpnameService } from './stock-opname.service';
import { ApproveOpnameDto, StartOpnameDto, SubmitCountDto } from './dto/stock-opname.dto';

@UseGuards(JwtAuthGuard)
@Controller('stock-opnames')
export class StockOpnameController {
  constructor(private readonly service: StockOpnameService) {}

  @Get()
  findAll(@Query('outletId') outletId?: string) {
    return this.service.findAll(outletId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  start(@Body() dto: StartOpnameDto) {
    return this.service.start(dto);
  }

  @Patch(':id/submit')
  submitCounts(@Param('id') id: string, @Body() dto: SubmitCountDto) {
    return this.service.submitCounts(id, dto);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string, @Body() dto: ApproveOpnameDto) {
    return this.service.approve(id, dto);
  }

  @Patch(':id/adjust')
  adjust(@Param('id') id: string) {
    return this.service.adjust(id);
  }
}
