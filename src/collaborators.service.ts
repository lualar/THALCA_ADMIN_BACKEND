// src/collaborators.service.ts
// Add 'NotFoundException' to handle cases where the user doesn't exist.
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CollaboratorsService {
  constructor(private prisma: PrismaService) {}

async create(createCollaboratorDto: CreateCollaboratorDto) {
  // Log the incoming data for debugging purposes.
  console.log('Service received data to create:', createCollaboratorDto);

  // Separate the roles array from the rest of the collaborator data.
  const { roles, ...collaboratorData } = createCollaboratorDto;

  // Use Prisma's "nested write" feature to create the collaborator
  // and their associated roles in a single, atomic database transaction.
  const newCollaborator = await this.prisma.collaborator.create({
    data: {
      // Spread the basic collaborator data (firstName, lastName, etc.).
      ...collaboratorData,
      uid: `temp-uid-${Date.now()}`, // Placeholder UID, we will replace this later.

      // The 'roles' field here corresponds to the relation defined in schema.prisma.
      roles: {
        // 'create' tells Prisma to create new records in the Role table.
        create: roles.map(role => ({
          serviceId: role.serviceId,
          role: role.role,
        })),
      },
    },
    // 'include' tells Prisma to return the newly created collaborator
    // object along with their newly created roles.
    include: {
      roles: true,
    },
  });
  console.log('Successfully created collaborator with roles:', newCollaborator);
  return newCollaborator;
}

// --- NEW METHOD START ---
async findOne(uid: string) {
  // Use Prisma's 'findUnique' method to search for a collaborator
  // by the 'uid' field, which we defined as unique in our schema.
  const collaborator = await this.prisma.collaborator.findUnique({
    where: { uid: uid },
  });

  // If no collaborator is found, throw a standard 404 Not Found error.
  // NestJS will handle sending the correct HTTP response.
  if (!collaborator) {
    throw new NotFoundException(`Collaborator with UID '${uid}' not found.`);
  }
  return collaborator;
  }
}
// --- NEW METHOD END --