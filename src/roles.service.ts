// src/roles.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID '${id}' not found.`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    // First, check if the role exists
    await this.findOne(id);
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.role.delete({ where: { id } });
  }
}
