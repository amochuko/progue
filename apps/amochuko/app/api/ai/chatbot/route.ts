import { NextResponse } from 'next/server';
import { openai } from '../openai';

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  const completeion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: body.messages }],
  });

  const response = completeion.choices[0].message;
  console.log(response);

  return NextResponse.json({ output: response }, { status: 200 });
}
