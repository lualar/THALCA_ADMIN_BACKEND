// src/prisma.service.ts


import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // This method is called automatically when the module is initialized.
  async onModuleInit() {
    // Establishes the connection to the database.
    await this.$connect();
  }
}