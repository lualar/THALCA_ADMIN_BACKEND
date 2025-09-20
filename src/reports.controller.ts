// src/reports.controller.ts

import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('api/v1/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('usage-by-service')
  getUsageReport() {
    return this.reportsService.getUsageReportByService();
  }
}