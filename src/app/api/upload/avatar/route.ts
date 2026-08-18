import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { NextRequest } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { ROLE_GROUPS } from '@/lib/roles';
import { buildResponse } from '@/constants/messages';
import { logger } from '@/lib/logger';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const TAMANHO_MAXIMO = 2 * 1024 * 1024; // 2 MB
const TIPOS_ACEITOS = ['image/png', 'image/jpeg', 'image/webp'];

export async function POST(req: NextRequest) {
  const { authorized, response, session } = await checkAuth({
    allowedRoles: ROLE_GROUPS.ALL,
  });
  if (!authorized || !session) return response;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return buildResponse({
        success: false,
        message: 'Nenhum arquivo enviado.',
        status: 400,
      });
    }

    // Primeira barreira. O `type` vem do cliente e pode ser forjado — a
    // validação real de conteúdo fica com o Cloudinary, via `resource_type`.
    if (!TIPOS_ACEITOS.includes(file.type)) {
      return buildResponse({
        success: false,
        message: 'Formato não suportado. Envie PNG, JPEG ou WebP.',
        status: 400,
      });
    }

    if (file.size > TAMANHO_MAXIMO) {
      return buildResponse({
        success: false,
        message: 'A imagem deve ter no máximo 2 MB.',
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'avatars',
            resource_type: 'image',
            // Amarra o arquivo à conta: cada pessoa só sobrescreve o próprio
            // avatar, em vez de poder gravar em qualquer caminho da pasta.
            public_id: session.user.id,
            overwrite: true,
            transformation: [
              { width: 300, height: 300, crop: 'thumb', gravity: 'face' },
            ],
          },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (error || !result) reject(error || new Error('Upload failed'));
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return buildResponse({
      success: true,
      message: 'Imagem enviada com sucesso.',
      data: { url: result.secure_url },
      status: 200,
    });
  } catch (error) {
    logger.error('Erro ao enviar avatar:', 'POST /api/upload/avatar', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: 'Erro interno ao enviar a imagem.',
      status: 500,
    });
  }
}
