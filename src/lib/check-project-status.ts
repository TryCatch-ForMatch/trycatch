import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { MESSAGES, buildResponse } from '@/constants/messages';

export async function checkProjectStatus(projectId: string) {
  console.log(
    `\n🔍 Verificando contagem de stacks para o projeto: ${projectId}`
  );

  // Verifica se existe algum registro em StackTaken com esse projectId
  const existsInStackTaken = await prisma.stackTaken.findFirst({
    where: { projectId },
  });

  if (!existsInStackTaken) {
    console.log(
      '⚠️ Nenhum registro encontrado na tabela StackTaken para este projeto.'
    );
  } else {
    console.log('✅ Projeto encontrado na tabela StackTaken.');
  }

  // Se o projeto já estiver concluído, não alterar o status
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { status: true },
  });

  if (!project) {
    console.log('❌ Projeto não encontrado.');
    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.NOT_FOUND,
      status: 404,
    });
  }

  if (project.status === ProjectStatus.CONCLUIDO) {
    console.log('✅ Projeto já está concluído — sem alterações.');
    return buildResponse({
      success: true,
      message: MESSAGES.PROJECT.FETCH_SUCCESS,
      data: { status: project.status },
    });
  }

  // Conta quantos registros existem na tabela ProjectStack para esse projeto
  const totalProjectStack = await prisma.projectStack.count({
    where: { projectId },
  });
  // Conta quantos registros existem na tabela StackTaken para esse projeto
  const totalStackTaken = await prisma.stackTaken.count({
    where: { projectId },
  });

  // Exibe os resultados no console
  console.log(`📊 Total de ProjectStack: ${totalProjectStack}`);
  console.log(`📊 Total de StackTaken: ${totalStackTaken}`);

  // Decidir novo status
  let newStatus = project.status;

  if (totalStackTaken < totalProjectStack) {
    newStatus = ProjectStatus.BUSCANDO;
  } else if (totalStackTaken === totalProjectStack) {
    newStatus = ProjectStatus.EM_ANDAMENTO;
  }

  // Atualizar status se for diferente do atual
  if (newStatus !== project.status) {
    await prisma.project.update({
      where: { id: projectId },
      data: { status: newStatus },
    });
    console.log(`✅ Status do projeto atualizado para: ${newStatus}`);
  } else {
    console.log(`ℹ️ Nenhuma alteração no status (${newStatus})`);
  }

  return {
    totalProjectStack,
    totalStackTaken,
    newStatus,
  };
}
