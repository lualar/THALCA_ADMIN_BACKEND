// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Import each module here
import { CollaboratorsModule } from './collaborators.module'; 

@Module({
  // Register each module her
  imports: [CollaboratorsModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}