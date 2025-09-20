// src/services.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  findAll() {
    return this.prisma.service.findMany();
  }

  async findOne(serviceId: string) {
    const service = await this.prisma.service.findUnique({
      where: { serviceId },
    });
    if (!service) {
      throw new NotFoundException(`Service with ID '${serviceId}' not found.`);
    }
    return service;
  }

  async update(serviceId: string, updateServiceDto: UpdateServiceDto) {
    // First, check if the service exists
    await this.findOne(serviceId);
    return this.prisma.service.update({
      where: { serviceId },
      data: updateServiceDto,
    });
  }
}
