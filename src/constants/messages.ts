import { NextResponse } from 'next/server';

export function buildResponse<TData = unknown, TErrors = unknown>({
  success,
  message,
  data = null as TData | null,
  errors = null as TErrors | null,
  status = 200,
}: {
  success: boolean;
  message: string;
  data?: TData | null;
  errors?: TErrors | null;
  status?: number;
}) {
  return NextResponse.json({ success, message, data, errors }, { status });
}

export const MESSAGES = {
  AUTH: {
    UNAUTHORIZED: 'Você não está autorizado a acessar este recurso.',
    INVALID_CREDENTIALS: 'Credenciais inválidas.',
    EMAIL_NOT_FOUND: 'Email não encontrado.',
    INVALID_TOKEN: 'Token inválido ou expirado.',
    PASSWORD_RESET_SUCCESS: 'Senha redefinida com sucesso.',
    INVALID_PASSWORD: 'Senha incorreta.',
    FORGOT_PASSWORD_EMAIL_SENT:
      'Se este e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.',
    FORGOT_PASSWORD_ERROR:
      'Erro ao processar solicitação de recuperação de senha.',
    INVALID_RESET_TOKEN: 'Token de redefinição de senha inválido ou expirado.',
    VALID_RESET_TOKEN: 'Token de redefinição de senha válido.',
    PASSWORD_RESET_ERROR: 'Erro ao redefinir a senha.',
  },

  FEEDBACK: {
    SELF_FEEDBACK: 'Você não pode avaliar a si mesmo.',
    ALREADY_GIVEN: 'Você já enviou feedback para este usuário neste projeto.',
    CREATED: 'Feedback registrado com sucesso.',
    NOT_FOUND: 'Feedback não encontrado.',
    UPDATED: 'Feedback atualizado com sucesso.',
    NO_PARTICIPATION: 'Usuário não participou deste projeto.',
    INTERNAL_ERROR: 'Erro interno ao processar feedback.',
    FETCH_SUCCESS: 'Feedbacks carregados com sucesso.',
  },
  GENERAL: {
    INVALID_ID: 'ID inválido.',
    INVALID_DATA:
      'Campos obrigatórios estão faltando ou com formato incorreto.',
    INTERNAL_ERROR: 'Erro interno no servidor.',
  },
  INVITE: {
    NOT_FOUND: 'Convite não encontrado.',
    VALID: 'Convite válido.',
    ALREADY_EXISTS: 'Já existe um convite ou usuário com este email.',
    INTERNAL_DELETE_ERROR: 'Erro interno ao excluir convite.',
    INTERNAL_ERROR: 'Erro interno ao processar convite.',
    FETCH_SUCCESS: 'Convites carregados com sucesso.',
  },
  INVITE_REQUEST: {
    CREATED: 'Solicitação de convite criada com sucesso.',
    ALREADY_EXISTS: 'Já existe uma solicitação de convite com este email.',
    GENERAL_ERROR: 'Erro interno ao processar solicitação de convite.',
    LIST_SUCCESS: 'Solicitações de convite carregadas com sucesso.',
    NOT_FOUND: 'Solicitação de convite não encontrada.',
    DELETED: 'Solicitação de convite removida com sucesso.',
  },
  LOGIN: {
    SUCCESS: 'Login realizado com sucesso.',
  },
  PROJECT: {
    NOT_FOUND: 'Projeto não encontrado.',
    CREATED: 'Projeto criado com sucesso.',
    UPDATED: 'Projeto atualizado com sucesso.',
    DELETED: 'Projeto removido com sucesso.',
    FETCH_SUCCESS: 'Projetos carregados com sucesso.',
    INTERNAL_ERROR: 'Erro interno ao processar projeto.',
  },
  PROJECT_SKILL: {
    NOT_FOUND: 'Associação de skill ao projeto não encontrada.',
    CREATED: 'Skill adicionada ao projeto com sucesso.',
    CREATE_ERROR: 'Erro ao adicionar skill ao projeto.',
    UPDATED: 'Associação de skill ao projeto atualizada com sucesso.',
    DELETED: 'Skill removida do projeto com sucesso.',
    DELETE_ERROR: 'Erro ao remover skill do projeto.',
    FETCH_SUCCESS: 'Associações de skill ao projeto carregadas com sucesso.',
    INTERNAL_ERROR: 'Erro interno ao processar associação de skill ao projeto.',
  },
  PROJECT_STACK: {
    NOT_FOUND: 'Associação de stack ao projeto não encontrada.',
    CREATED: 'Associação de stack ao projeto criada com sucesso.',
    UPDATED: 'Associação de stack ao projeto atualizada com sucesso.',
    DELETED: 'Associação de stack ao projeto removida com sucesso.',
    DELETE_ERROR: 'Erro ao remover associação de stack do projeto.',
    FETCH_SUCCESS: 'Associações de stack ao projeto carregadas com sucesso.',
    INTERNAL_ERROR: 'Erro interno ao processar associação de stack ao projeto.',
    PERCENTAGE_ERROR: 'A soma dos percentuais das stacks deve ser 100%',
  },
  REGISTER: {
    SUCCESS: 'Registro realizado com sucesso.',
    INVALID: 'Email ou código de convite inválido.',
    VALID: 'Convite válido.',
    VALIDATION_ERROR: 'Erro interno ao validar convite.',
  },
  SKILL: {
    ALREADY_EXISTS: 'Já existe uma skill com este nome.',
    NOT_FOUND: 'Skill não encontrada.',
    CREATED: 'Skill criada com sucesso.',
    UPDATED: 'Skill atualizada com sucesso.',
    UPDATE_CONFLICT:
      'Esta skill está sendo usada em projetos ou por usuários. Alterações podem impactar dados existentes.',
    DELETED: 'Skill removida com sucesso.',
    DELETE_ERROR: 'Erro ao remover skill.',
    FETCH_SUCCESS: 'Skills carregadas com sucesso.',
    INTERNAL_ERROR: 'Erro interno ao processar skill.',
  },
  STACK_TAKEN: {
    ALREADY_TAKEN: 'Essa stack já foi assumida por outro usuário.',
    NOT_FOUND: 'Stack taken não encontrada.',
    CREATED: 'Stack taken registrada com sucesso.',
    UPDATED: 'Stack taken atualizada com sucesso.',
    DELETED: 'Stack taken removida com sucesso.',
    FETCH_SUCCESS: 'Stacks taken carregadas com sucesso.',
    INTERNAL_ERROR: 'Erro interno ao processar stack taken.',
  },
  TECH_STACK: {
    NOT_FOUND: 'Stack não encontrada.',
    CREATED: 'Stack criada com sucesso.',
    UPDATE_CONFLICT:
      'Esta stack está sendo usada em projetos. Alterações podem impactar dados existentes.',
    UPDATED: 'Stack atualizada com sucesso.',
    DELETED: 'Stack removida com sucesso.',
    FETCH_SUCCESS: 'Stacks carregadas com sucesso.',
    INTERNAL_ERROR: 'Erro interno ao processar stack.',
    LINKED_TO_PROJECT: 'Esta stack está sendo usada em projetos.',
    ALREADY_EXISTS: 'Já existe uma stack com esse nome.',
  },
  USER: {
    NOT_FOUND: 'Usuário não encontrado.',
    CREATED: 'Usuário criado com sucesso.',
    UPDATED: 'Usuário atualizado com sucesso.',
    DELETED: 'Usuário removido com sucesso.',
    ALREADY_EXISTS: 'Usuário já existe.',
    INTERNAL_ERROR_HASH: 'Erro ao hashear senha.',
    USER_CREATION_ERROR: 'Erro interno ao criar usuário.',
    INTERNAL_ERROR: 'Erro interno ao processar usuário.',
  },
  USER_AVAILABILITY: {
    NOT_FOUND: 'Disponibilidade de usuário não encontrada.',
    CREATED: 'Disponibilidade registrada com sucesso.',
    UPDATED: 'Disponibilidade atualizada com sucesso.',
    DELETED: 'Disponibilidade removida com sucesso.',
    FETCH_SUCCESS: 'Disponibilidades carregadas com sucesso.',
    INTERNAL_ERROR: 'Erro interno ao processar disponibilidade.',
  },
  USER_CERTIFICATE: {
    NOT_FOUND: 'Associação de certificado ao usuário não encontrada.',
    CREATED: 'Certificado criado com sucesso.',
    UPDATED: 'Certificado atualizado com sucesso.',
    ALREADY_EXISTS: 'Certificado já existe para este usuário',
    DELETED: 'Certificado excluído com sucesso.',
    FETCH_SUCCESS: 'Certificados do usuário carregados com sucesso.',
    INTERNAL_ERROR: 'Erro interno ao processar certificados do usuário.',
  },
  USER_SKILL: {
    NOT_FOUND: 'Associação de habilidade ao usuário não encontrada.',
    CREATED: 'Habilidade adicionada ao usuário com sucesso.',
    UPDATED: 'Associação de habilidade ao usuário atualizada com sucesso.',
    ALREADY_EXISTS: 'Skill já adicionada para este usuário',
    DELETED: 'Habilidade removida do usuário com sucesso.',
    FETCH_SUCCESS:
      'Associações de habilidade ao usuário carregadas com sucesso.',
    INTERNAL_ERROR:
      'Erro interno ao processar associação de habilidade ao usuário.',
  },
};
