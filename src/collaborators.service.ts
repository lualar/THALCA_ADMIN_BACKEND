// src/collaborators.service.ts

import { Injectable } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { PrismaService } from './prisma.service'; // <-- Import PrismaService

@Injectable()
export class CollaboratorsService {
  // NestJS will "inject" an instance of PrismaService here
  // allowing us to use it anywhere in this class via "this.prisma".
  constructor(private prisma: PrismaService) {}

  // The method is now async because database operations are asynchronous.
  async create(createCollaboratorDto: CreateCollaboratorDto) {
    // Log the incoming data
    console.log('Service received data:', createCollaboratorDto);

    // Here is the database logic using Prisma.
    // It's trying to create a new record in the "collaborator" table.
    // The data is mapped from our DTO.
    const newCollaborator = await this.prisma.collaborator.create({
      data: {
        firstName: createCollaboratorDto.firstName,
        lastName: createCollaboratorDto.lastName,
        corporateEmail: createCollaboratorDto.corporateEmail,
        position: createCollaboratorDto.position,
        // NOTE: We will handle the UID and Roles logic in a later step.
        // For now, we are providing placeholder values to satisfy the schema.
        uid: `temp-uid-${Date.now()}`,
      },
    });

    console.log('Successfully created collaborator:', newCollaborator);

    return newCollaborator;
  }
}