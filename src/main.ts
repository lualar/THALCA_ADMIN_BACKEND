import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth.guard';
import { ValidationPipe } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';

async function bootstrap() {
  // IMPORTANT: Initialize Firebase Admin SDK
  // For this to work, you must set the FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable.
  // This variable should contain the base64 encoded string of your Firebase service account JSON file.
  // The application will not be able to authenticate users without it.
  const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (serviceAccountBase64) {
    try {
      const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('ascii'));
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin SDK initialized successfully.');
    } catch (error) {
      console.error('Error initializing Firebase Admin SDK:', error);
    }
  } else {
    console.warn('Firebase Admin SDK not initialized. FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable not set.');
    console.warn('Authentication will not work until the service account is configured.');
  }

  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AuthGuard());

  // Automatic validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
