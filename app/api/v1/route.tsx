import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

  try {
    return NextResponse.json({ message: 'Bem vindo! Este é seu espaço para desenvolver o desafio' });



  } catch (error) {

    return NextResponse.json({
      message: 'Erro interno!'
    }, { status: 500, statusText: 'ERRO No: 500' })

  }



}


export const POST = async (request: Request) => {

  try {

    const body = await request.json();
    console.log(body);
    return NextResponse.json({ message: 'Ok!', status: 1 }, { status: 200, statusText: "Ok!" })

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      message: 'Erro interno!',
      status: 3
    }, { status: 500, statusText: 'ERRO No 500' })
  }

}