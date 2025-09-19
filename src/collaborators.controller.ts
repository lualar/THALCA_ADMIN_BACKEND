// src/collaborators.controller.ts
// Add 'Get' and 'Param' to the list of imports from '@nestjs/common'
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';

@Controller('api/v1/collaborators') // Route prefix updated to V6
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Post()
  create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return this.collaboratorsService.create(createCollaboratorDto);
  }

  // --- NEW METHOD START ---
  // This decorator tells NestJS to handle GET requests.
  // The ':uid' part is a placeholder for a URL parameter.
  @Get(':uid')
  // The @Param('uid') decorator extracts the 'uid' from the URL
  // and injects it into the 'uid' variable.
  findOne(@Param('uid') uid: string) {
    return this.collaboratorsService.findOne(uid);
  }
  // --- NEW METHOD END ---
}