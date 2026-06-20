import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'NestJS',
  'HTML',
  'CSS',
  'Sass',
  'Tailwind CSS',
  'Bootstrap',
  'Java',
  'Spring Boot',
  'Python',
  'Django',
  'Flask',
  'C#',
  '.NET',
  'PHP',
  'Laravel',
  'Ruby',
  'Ruby on Rails',
  'Go',
  'Rust',
  'Kotlin',
  'Swift',
  'Flutter',
  'React Native',
  'Android',
  'iOS',
  'PostgreSQL',
  'MySQL',
  'SQLite',
  'MongoDB',
  'Redis',
  'Firebase',
  'Supabase',
  'Prisma',
  'GraphQL',
  'REST API',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Google Cloud',
  'CI/CD',
  'Git',
  'GitHub',
  'GitLab',
  'Linux',
  'Jest',
  'Vitest',
  'Cypress',
  'Playwright',
  'Testing Library',
  'Figma',
  'UX/UI Design',
  'Scrum',
  'Kanban',
  'Agile',
  'Microservices',
  'Clean Architecture',
  'SOLID',
  'Design Patterns',
];

async function main() {
  await prisma.skill.createMany({
    data: skills.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log(`✅ ${skills.length} skills processadas`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
