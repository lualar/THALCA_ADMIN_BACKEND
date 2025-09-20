// src/services.controller.ts
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Controller('api/v1/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':serviceId')
  findOne(@Param('serviceId') serviceId: string) {
    return this.servicesService.findOne(serviceId);
  }

  @Put(':serviceId')
  update(@Param('serviceId') serviceId: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(serviceId, updateServiceDto);
  }
}
