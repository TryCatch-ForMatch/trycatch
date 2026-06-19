import { NextRequest } from 'next/server';
import { checkAuth } from '@/lib/check-auth';
import { buildResponse } from '@/constants/messages';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { CloudinaryResource } from '@/types/interface/cloudinary';
import { logger } from '@/lib/logger';

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const folder = 'ui_assets';

    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by('created_at', 'desc')
      .max_results(200)
      .execute();

    const images = result.resources.map((img: CloudinaryResource) => ({
      url: img.secure_url,
      public_id: img.public_id,
      format: img.format,
      width: img.width,
      height: img.height,
      created_at: img.created_at,
    }));

    return buildResponse({
      success: true,
      message: 'Imagens listadas com sucesso.',
      data: images,
      status: 200,
    });
  } catch (error) {
    logger.error(
      'Erro ao listar imagens do Cloudinary:',
      'GET /api/upload/ui-assets',
      { error: error instanceof Error ? error.message : String(error) }
    );
    return buildResponse({
      success: false,
      message: 'Erro ao listar imagens.',
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const auth = await checkAuth({ requireAdmin: true });
  if (!auth.authorized) return auth.response;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return buildResponse({
        success: false,
        message: 'Nenhum arquivo enviado.',
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'ui_assets',
            resource_type: 'image',
            public_id: file.name.replace(/\.[^/.]+$/, ''), // usa o nome do arquivo sem extensão
            overwrite: true,
          },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (error || !result) {
              reject(error || new Error('Erro no upload.'));
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return buildResponse({
      success: true,
      message: 'Imagem enviada com sucesso.',
      data: { url: result.secure_url },
      status: 201,
    });
  } catch (error) {
    logger.error('Erro ao enviar imagem:', 'POST /api/upload/ui-assets', {
      error: error instanceof Error ? error.message : String(error),
    });
    return buildResponse({
      success: false,
      message: 'Erro interno ao enviar imagem.',
      status: 500,
    });
  }
}
