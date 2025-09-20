// src/dto/role.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsUUID()
  @IsNotEmpty()
  collaboratorId: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  role?: string;
}
