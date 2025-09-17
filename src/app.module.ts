// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaboratorsModule } from './collaborators.module'; // <-- 1. IMPORTAR EL MÓDULO

@Module({
  imports: [CollaboratorsModule], // <-- 2. AÑADIR EL MÓDULO AQUÍ
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}