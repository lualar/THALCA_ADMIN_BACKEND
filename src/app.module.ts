// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';

@Module({
  imports: [],
  controllers: [AppController, CollaboratorsController], // <-- Añade CollaboratorsController aquí
  providers: [AppService, CollaboratorsService],       // <-- Añade CollaboratorsService aquí
})
export class AppModule {}