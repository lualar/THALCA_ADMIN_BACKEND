// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create the first super_admin collaborator.
  // This solves the requirement for a provisioning script.
  const superAdmin = await prisma.collaborator.create({
    data: {
      uid: 'seed-super-admin-uid',
      firstName: 'Admin',
      lastName: 'Thalca',
      corporateEmail: 'admin@thalca.com',
      position: 'Super Administrator',
      status: 'ACTIVE',
    },
  });
  console.log('Created super admin:', superAdmin);
  console.log('Seeding finished.');
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