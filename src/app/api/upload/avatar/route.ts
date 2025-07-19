import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { NextResponse } from 'next/server';

// Configura Cloudinary com as variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json(
      { error: 'Nenhum arquivo enviado' },
      { status: 400 }
    );
  }

  // Converte para buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Faz upload para Cloudinary
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'avatars', // organiza em uma pasta "avatars" na Cloudinary
          transformation: [
            { width: 300, height: 300, crop: 'thumb', gravity: 'face' }, // centraliza no rosto
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

  return NextResponse.json({ url: result.secure_url });
}
