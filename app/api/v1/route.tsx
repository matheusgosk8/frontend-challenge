import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {

  try {
    return NextResponse.json({ message: 'Bem vindo! Este é seu espaço para desenvolver o desafio' });



  } catch (error) {

    return NextResponse.json({
      message: 'Erro interno!'
    }, { status: 500, statusText: 'ERRO No: 500' })

  }



}

//Uma observação, em projetos com o next, é legal utilizar o trpc, com ele agente consegue
//passar os types entre client e server components e até mesmo com as rotas de api do next
//sem precisar enviar os types nas respostas de api, como o exemplo é simples não vale a pena 
// instalar tudo e configurar o trpc com o zod.
export const POST = async (request: Request) => {

  try {

    const body = await request.json();

    const dados = body.data;
    console.log(dados);

    const checkData = Object.values(dados).some(value => value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0));

    if (checkData) {
      return NextResponse.json({
        message: 'Erro, não são permitidos envios vazios!',
        status: 3
      }, { status: 400, statusText: 'ERRO No 400' })
    }

    // Tratando os dados
    const senha = dados.senha;

    const regex = /^[a-zA-Z0-9]+$/;
    const testSenha = regex.test(senha);
    if (!testSenha) {
      return NextResponse.json({
        message: 'Erro, a senha contém caracteres não permitidos!',
        status: 3
      }, { status: 500, statusText: 'ERRO No 500' })
    }

    // Hasheando a senha para colocar na DB
    const hashedSenha = await bcrypt.hash(senha, 12);
    console.log('Hashed senha: ', hashedSenha)

    return NextResponse.json({ message: 'Dados enviados com sucesso!', status: 1 }, { status: 200, statusText: "Ok!" })

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      message: 'Erro interno!',
      status: 3
    }, { status: 500, statusText: 'ERRO No 500' })
  }

}