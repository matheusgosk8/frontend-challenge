import ClimaData from '@/components/_Clima/ClimaData';
import Link from 'next/link';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';


type Props = {
    params: { slug: string };
    searchParams: { status: string; cidade: string; estado: string };
};

const Page = ({ params, searchParams }: Props) => {
    // Extraindo as informações da URL
    const { status, cidade, estado } = searchParams;


    //A página segue a mesma estrutura qu costumo usar no next, mantenha a página principal da rota como server component, deste modo é possível utilizar o "<Head>" e metadados do next para trabalhar no seo das páginas.

    return (
        <div className='flex flex-col justify-center items-center gap-40 min-h-screen w-full bg-gradient-to-br from-blue-400 from-0% to-sky-300 to-100% relative'>

            {
                status && status === 'ok' ?
                    <ClimaData
                        cidade={cidade}
                        estado={estado}
                    />
                    :
                    <h1>Não foi possível processar a solicitação!</h1>
            }

            <div className='p-2 font-semibold text-blue-600 rounded-md bg-white shadow-md text-3xl commonIcon'>
                <Link href={'/'} className='flex flex-row gap-2 items-center justify-center'> Voltar <BsArrowLeft size={30} /></Link>
            </div>

        </div>
    );
};

export default Page;
