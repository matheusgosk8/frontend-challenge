"use client";

import TextareaAutosize from 'react-textarea-autosize';

import { TDadosEtapaTres } from '@/Types/formTypes';
import React, { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';

type Props = {
    handleEtapa: (data: TDadosEtapaTres) => void;
    loading: boolean
}

const FormEtapaTres = ({ handleEtapa, loading }: Props) => {

    const [mensagem, setMensagem] = useState<string>('');
    const [mensagemErro, setMensagemErro] = useState<boolean>(false);

    const handleSendEtapa = () => {

        if (mensagem.length === 0) {
            setMensagemErro(true)
            return;
        }

        handleEtapa({
            message: mensagem
        })
    }


    return (
        <div className='flex flex-col '>
            <div className='flex flex-col gap-5 relative'>
                <label className="containerField">
                    <span className="labelField">Mensagem</span>

                    <TextareaAutosize
                        id="meuInput"
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Digite sua mensagem"
                        minRows={20}
                        maxRows={20}
                        className='border rounded-md mt-5 p-2'
                    />

                </label>

                <div className='rounded-md shadow-md p-2 flex flex-row justify-center items-center w-fit   '>
                    <button className={`commonIcon text-3xl flex flex-row gap-5 items-center font-semibold text-blue-500 ${loading && 'pointer-events-none opacity-55 cursor-not-allowed'}`}
                        onClick={handleSendEtapa}
                    > {loading ? 'Aguarde...' : 'Enviar dados'}<span><BsArrowRight /></span></button>
                </div>
                {
                    mensagemErro &&
                    <span className='text-red-500 text-sm'> O envio da mensagem é obrigatório! </span>
                }

            </div>
        </div>
    )
}

export default FormEtapaTres