// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, CollaboratorsController], 
  providers: [AppService, CollaboratorsService, PrismaService],       
})
export class AppModule {}