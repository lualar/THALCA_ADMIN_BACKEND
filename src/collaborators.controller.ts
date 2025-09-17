// src/collaborators.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return this.collaboratorsService.create(createCollaboratorDto);
  }
}