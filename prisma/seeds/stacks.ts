import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const stacks = [
  'Frontend',
  'Backend',
  'Full Stack',
  'Mobile',
  'DevOps',
  'QA',
  'Data Science',
  'Data Engineering',
  'Machine Learning',
  'Artificial Intelligence',
  'Cybersecurity',
  'Cloud Computing',
  'UI Design',
  'UX Design',
  'Product Design',
  'Product Management',
  'Product Owner',
  'Scrum Master',
  'Project Management',
  'Business Analysis',
  'Solutions Architecture',
  'Software Architecture',
  'Technical Writing',
  'Game Development',
  'Embedded Systems',
  'Blockchain',
  'Site Reliability Engineering',
  'Database Administration',
  'Systems Administration',
];

async function main() {
  await prisma.stack.createMany({
    data: stacks.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log(`✅ ${stacks.length} stacks processadas`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
