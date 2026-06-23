import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from 'next/server';

const apiKey = process.env.GOOGLE_API_KEY;



if (!apiKey) {
  throw new Error('GOOGLE_API_KEY não definida no .env');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: NextRequest) {
  let prompt: string;

  try {
    const body = await request.json();
    prompt = body.prompt;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Body da requisição inválido ou vazio.' }, { status: 400 });
  }

  if (!prompt) {
    return NextResponse.json({ message: 'O prompt é obrigatório!' }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ text }, { status: 200 });

  } catch (error: any) {
    console.error("Erro ao chamar API do Gemini:", error);
    return NextResponse.json(
      { message: 'Erro ao gerar texto com o Gemini', error: error.message },
      { status: 500 }
    );
  }
}
