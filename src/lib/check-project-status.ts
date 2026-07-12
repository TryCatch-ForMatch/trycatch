import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { MESSAGES, buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

const CONTEXT = 'checkProjectStatus';

export async function checkProjectStatus(projectId: string) {
  logger.info('Verificando contagem de stacks do projeto', CONTEXT, {
    projectId,
  });

  // Verifica se existe algum registro em StackTaken com esse projectId
  const existsInStackTaken = await prisma.stackTaken.findFirst({
    where: { projectId },
  });

  if (!existsInStackTaken) {
    logger.warn('Nenhum registro encontrado na tabela StackTaken', CONTEXT, {
      projectId,
    });
  } else {
    logger.info('Projeto encontrado na tabela StackTaken', CONTEXT, {
      projectId,
    });
  }

  // Se o projeto já estiver concluído, não alterar o status
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { status: true },
  });

  if (!project) {
    logger.warn('Projeto não encontrado', CONTEXT, { projectId });

    return buildResponse({
      success: false,
      message: MESSAGES.PROJECT.NOT_FOUND,
      status: 404,
    });
  }

  if (project.status === ProjectStatus.CONCLUIDO) {
    logger.info('Projeto já está concluído sem alterações', CONTEXT, {
      projectId,
      status: project.status,
    });

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

  logger.info('Contagem de stacks do projeto calculada', CONTEXT, {
    projectId,
    totalProjectStack,
    totalStackTaken,
  });

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
    logger.info('Status do projeto atualizado', CONTEXT, {
      projectId,
      previousStatus: project.status,
      newStatus,
    });
  } else {
    logger.info('Status do projeto mantido', CONTEXT, {
      projectId,
      status: newStatus,
    });
  }

  return {
    totalProjectStack,
    totalStackTaken,
    newStatus,
  };
}
