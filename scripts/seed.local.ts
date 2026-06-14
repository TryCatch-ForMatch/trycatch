/**
 * seed.local.ts — Seed para testar a feature de portfólio local
 *
 * Cria cenários de teste para validar as regras de visibilidade:
 *   - Usuário com portfólio público e todos os toggles ativos
 *   - Usuário com portfólio público mas com campos ocultos
 *   - Usuário com portfólio privado (portfolioPublic = false)
 *   - Usuário inativo (isActive = false)
 *
 * Rodar: npx tsx scripts/seed.local.ts
 */

import { PrismaClient, ProjectStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed local para feature de portfólio...\n');

  const hashedPassword = await bcrypt.hash('teste123', 10);

  // --------------------------------------------------
  // Cenário 1: Portfólio público, todos os campos visíveis
  // Acessível em: /portfolio/joao_public
  // --------------------------------------------------
  const userPublic = await prisma.user.upsert({
    where: { email: 'joao_public@test.com' },
    update: {},
    create: {
      name: 'João Portfólio Público',
      userName: 'joao_public',
      email: 'joao_public@test.com',
      password: hashedPassword,
      bio: 'Desenvolvedor fullstack com experiência em Next.js e Node.',
      github: 'https://github.com/joao_public',
      linkedin: 'https://linkedin.com/in/joao_public',
      isActive: true,
      portfolioPublic: true,
      showEmail: true,
      showGithub: true,
      showLinkedin: true,
      showCertificates: true,
      showProjects: true,
      showFeedback: true,
    },
  });
  console.log(`✅ [Cenário 1] Usuário público criado: ${userPublic.userName}`);

  // --------------------------------------------------
  // Cenário 2: Portfólio público, campos sensíveis ocultos
  // Acessível em: /portfolio/maria_parcial
  // email, feedback e certificados ocultos
  // --------------------------------------------------
  const userParcial = await prisma.user.upsert({
    where: { email: 'maria_parcial@test.com' },
    update: {},
    create: {
      name: 'Maria Campos Ocultos',
      userName: 'maria_parcial',
      email: 'maria_parcial@test.com',
      password: hashedPassword,
      bio: 'Designer UI/UX focada em acessibilidade.',
      github: 'https://github.com/maria_parcial',
      linkedin: 'https://linkedin.com/in/maria_parcial',
      isActive: true,
      portfolioPublic: true,
      showEmail: false, // oculto
      showGithub: true,
      showLinkedin: true,
      showCertificates: false, // oculto
      showProjects: true,
      showFeedback: false, // oculto
    },
  });
  console.log(`✅ [Cenário 2] Usuário parcial criado: ${userParcial.userName}`);

  // --------------------------------------------------
  // Cenário 3: Portfólio PRIVADO — deve retornar 404
  // /portfolio/carlos_private → 404
  // --------------------------------------------------
  const userPrivate = await prisma.user.upsert({
    where: { email: 'carlos_private@test.com' },
    update: {},
    create: {
      name: 'Carlos Portfólio Privado',
      userName: 'carlos_private',
      email: 'carlos_private@test.com',
      password: hashedPassword,
      bio: 'Usuário que optou por não exibir portfólio.',
      isActive: true,
      portfolioPublic: false, // ← portfólio privado
      showEmail: false,
      showGithub: false,
      showLinkedin: false,
      showCertificates: false,
      showProjects: false,
      showFeedback: false,
    },
  });
  console.log(`✅ [Cenário 3] Usuário privado criado: ${userPrivate.userName}`);

  // --------------------------------------------------
  // Cenário 4: Usuário INATIVO — deve retornar 404
  // /portfolio/ana_inactive → 404
  // --------------------------------------------------
  const userInactive = await prisma.user.upsert({
    where: { email: 'ana_inactive@test.com' },
    update: {},
    create: {
      name: 'Ana Usuária Inativa',
      userName: 'ana_inactive',
      email: 'ana_inactive@test.com',
      password: hashedPassword,
      bio: 'Conta desativada.',
      isActive: false, // ← inativa
      portfolioPublic: true,
      showEmail: true,
      showGithub: true,
      showLinkedin: true,
      showCertificates: true,
      showProjects: true,
      showFeedback: true,
    },
  });
  console.log(
    `✅ [Cenário 4] Usuário inativo criado: ${userInactive.userName}`
  );

  // --------------------------------------------------
  // Skills e Stacks base
  // --------------------------------------------------
  const skillNext = await prisma.skill.upsert({
    where: { name: 'Next.js' },
    update: {},
    create: { name: 'Next.js' },
  });
  const skillNode = await prisma.skill.upsert({
    where: { name: 'Node.js' },
    update: {},
    create: { name: 'Node.js' },
  });
  const stackFrontend = await prisma.stack.upsert({
    where: { name: 'Frontend' },
    update: {},
    create: { name: 'Frontend' },
  });
  const stackBackend = await prisma.stack.upsert({
    where: { name: 'Backend' },
    update: {},
    create: { name: 'Backend' },
  });

  // --------------------------------------------------
  // Skills do usuário público
  // --------------------------------------------------
  await prisma.userSkill.upsert({
    where: { id: 'seed-skill-joao-1' },
    update: {},
    create: {
      id: 'seed-skill-joao-1',
      userId: userPublic.id,
      skillId: skillNext.id,
    },
  });
  await prisma.userSkill.upsert({
    where: { id: 'seed-skill-joao-2' },
    update: {},
    create: {
      id: 'seed-skill-joao-2',
      userId: userPublic.id,
      skillId: skillNode.id,
    },
  });

  // --------------------------------------------------
  // Projeto CONCLUÍDO (aparece no portfólio) do joao_public
  // --------------------------------------------------
  const projectConcluido = await prisma.project.upsert({
    where: { id: 'seed-project-concluido' },
    update: {},
    create: {
      id: 'seed-project-concluido',
      ownerId: userPublic.id,
      name: 'Plataforma de Matching',
      description: 'Sistema de matching entre devs e projetos open source.',
      deadline: new Date('2025-12-31'),
      totalValue: 0,
      status: ProjectStatus.CONCLUIDO,
    },
  });

  // Projeto EM_ANDAMENTO (NÃO deve aparecer no portfólio)
  await prisma.project.upsert({
    where: { id: 'seed-project-andamento' },
    update: {},
    create: {
      id: 'seed-project-andamento',
      ownerId: userPublic.id,
      name: 'Projeto Em Andamento',
      description: 'Este projeto NÃO deve aparecer no portfólio público.',
      deadline: new Date('2026-12-31'),
      totalValue: 0,
      status: ProjectStatus.EM_ANDAMENTO,
    },
  });

  // ProjectStack + StackTaken (joao assumiu Frontend e Backend no mesmo projeto)
  const ps1 = await prisma.projectStack.upsert({
    where: { id: 'seed-ps-1' },
    update: {},
    create: {
      id: 'seed-ps-1',
      projectId: projectConcluido.id,
      stackId: stackFrontend.id,
      percentage: 60,
    },
  });
  const ps2 = await prisma.projectStack.upsert({
    where: { id: 'seed-ps-2' },
    update: {},
    create: {
      id: 'seed-ps-2',
      projectId: projectConcluido.id,
      stackId: stackBackend.id,
      percentage: 40,
    },
  });

  // João assumiu DUAS stacks no mesmo projeto → backend deve agrupar
  await prisma.stackTaken.upsert({
    where: { id: 'seed-st-1' },
    update: {},
    create: {
      id: 'seed-st-1',
      userId: userPublic.id,
      projectId: projectConcluido.id,
      stackId: stackFrontend.id,
      projectStackId: ps1.id,
    },
  });
  await prisma.stackTaken.upsert({
    where: { id: 'seed-st-2' },
    update: {},
    create: {
      id: 'seed-st-2',
      userId: userPublic.id,
      projectId: projectConcluido.id,
      stackId: stackBackend.id,
      projectStackId: ps2.id,
    },
  });

  console.log(`✅ Projeto concluído criado com 2 stacks para agrupar`);

  // --------------------------------------------------
  // Certificado do joao_public
  // --------------------------------------------------
  await prisma.userCertificate.upsert({
    where: { id: 'seed-cert-1' },
    update: {},
    create: {
      id: 'seed-cert-1',
      userId: userPublic.id,
      title: 'Next.js Foundations',
      issuer: 'Vercel',
      date: '2024-06',
      url: 'https://nextjs.org/learn/certificate',
      description: 'Certificado de conclusão do curso oficial de Next.js.',
    },
  });

  // --------------------------------------------------
  // Feedback para joao_public (de maria_parcial)
  // --------------------------------------------------
  await prisma.feedback.upsert({
    where: { id: 'seed-feedback-1' },
    update: {},
    create: {
      id: 'seed-feedback-1',
      projectId: projectConcluido.id,
      fromUserId: userParcial.id,
      toUserId: userPublic.id,
      stackTakenId: 'seed-st-1',
      rating: 5,
      comment: 'Excelente colaborador, entregou tudo no prazo.',
      anonymous: false,
    },
  });

  console.log('\n📋 Resumo dos cenários criados:');
  console.log('  ✅ /portfolio/joao_public    → 200, todos os campos visíveis');
  console.log(
    '  ✅ /portfolio/maria_parcial  → 200, email/feedback/certs ocultos'
  );
  console.log('  ✅ /portfolio/carlos_private → 404 (portfolioPublic = false)');
  console.log('  ✅ /portfolio/ana_inactive   → 404 (isActive = false)');
  console.log('\n  🔑 Senha de todos os usuários de teste: teste123');
}

main()
  .then(async () => {
    console.log('\n✅ Seed local finalizado com sucesso!');
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error('\n❌ Erro no seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
