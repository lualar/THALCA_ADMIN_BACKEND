// src/collaborators.service.ts

import { Injectable } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

@Injectable()
export class CollaboratorsService {
  create(createCollaboratorDto: CreateCollaboratorDto) {
    console.log('Datos recibidos en el servicio:', createCollaboratorDto);
    // Aquí iría la lógica para guardar en la base de datos con Prisma.
    // Por ahora, solo devolvemos los datos recibidos para confirmar que funciona.
    return {
      message: 'Colaborador recibido con éxito.',
      data: createCollaboratorDto,
    };
  }
}