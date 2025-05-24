// configuracao do proxy para o login, que redireciona a requisicao para o servidor do backend

import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message || 'Erro no proxy' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

