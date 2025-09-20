// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Import each module here
import { CollaboratorsModule } from './collaborators.module'; 
import { ServicesModule } from './services.module';

@Module({
  // Register each module her
  imports: [CollaboratorsModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}