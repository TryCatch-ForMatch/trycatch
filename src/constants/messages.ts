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
  GENERAL: {
    INVALID_ID: 'ID inválido.',
    INVALID_DATA:
      'Campos obrigatórios estão faltando ou com formato incorreto.',
  },
  AUTH: {
    UNAUTHORIZED: 'Você não está autorizado a acessar este recurso.',
    INVALID_CREDENTIALS: 'Credenciais inválidas.',
    EMAIL_NOT_FOUND: 'Email não encontrado.',
    INVALID_TOKEN: 'Token inválido ou expirado.',
    PASSWORD_RESET_SUCCESS: 'Senha redefinida com sucesso.',
    INVALID_PASSWORD: 'Senha incorreta.',
  },
  INVITE: {
    NOT_FOUND: 'Convite não encontrado.',
    VALID: 'Convite válido.',
    ALREADY_EXISTS: 'Já existe um convite com este email.',
    INTERNAL_DELETE_ERROR: 'Erro interno ao excluir convite.',
    INTERNAL_ERROR: 'Erro interno ao processar convite.',
    FETCH_SUCCESS: 'Convites carregados com sucesso.',
  },
  REGISTER: {
    SUCCESS: 'Registro realizado com sucesso.',
    INVALID: 'Email ou código de convite inválido.',
    VALID: 'Convite válido.',
    VALIDATION_ERROR: 'Erro interno ao validar convite.',
  },
  LOGIN: {
    SUCCESS: 'Login realizado com sucesso.',
  },
  USER: {
    NOT_FOUND: 'Usuário não encontrado.',
    CREATED: 'Usuário criado com sucesso.',
    UPDATED: 'Usuário atualizado com sucesso.',
    DELETED: 'Usuário removido com sucesso.',
    ALREADY_EXISTS: 'Usuário já existe.',
    INTERNAL_ERROR: 'Erro interno no processamento da senha.',
    USER_CREATION_ERROR: 'Erro interno ao criar usuário.',
  },
  PROJECT: {
    NOT_FOUND: 'Projeto não encontrado.',
    CREATED: 'Projeto criado com sucesso.',
    UPDATED: 'Projeto atualizado com sucesso.',
    DELETED: 'Projeto removido com sucesso.',
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
};
