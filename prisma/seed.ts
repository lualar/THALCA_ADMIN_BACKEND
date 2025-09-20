// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

// Initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  // This script will be executed when you run `npx prisma db seed`.

  console.log('Seeding database...');

  // Create the first super_admin collaborator.
  // This solves the requirement for a provisioning script.
  const superAdmin = await prisma.collaborator.create({
    data: {
      uid: 'seed-super-admin-uid', // Placeholder UID
      firstName: 'Admin',
      lastName: 'Thalca',
      corporateEmail: 'admin@thalca.com',
      position: 'Super Administrator',
      status: 'ACTIVE',
    },
  });

  console.log(`Created super admin user: ${superAdmin.corporateEmail}`);
  console.log('Database seeding finished.');
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  });