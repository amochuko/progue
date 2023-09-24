import { OPENAI_API_KEY } from '@/lib/config';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextResponse) {
  const data = await req.formData();
  const file: File | null = data.get('file') as unknown as File;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('model', 'whisper-1');

  const response = await fetch(
    'https://api.openia.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    }
  );
  const body = await response.json();

  return NextResponse.json({ output: body }, { status: 200 });
}
