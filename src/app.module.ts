// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Import each module here
import { CollaboratorsModule } from './collaborators.module'; 
import { ServicesModule } from './services.module';
import { RolesModule } from './roles.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { ReportsModule } from './reports.module';
import { PrismaService } from './prisma.service';

@Module({
  // Register each module her
  imports: [
    CollaboratorsModule,
    ServicesModule,
    RolesModule,
    ReportsModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}