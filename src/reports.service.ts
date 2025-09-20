// src/reports.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getUsageReportByService() {
    const usageData = await this.prisma.pCL_Action_Logs.groupBy({
      by: ['serviceId'], // Assumes serviceId is logged in the details
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    return usageData.map((item) => ({
      serviceId: item.serviceId,
      usageCount: item._count.id,
    }));
  }
}
