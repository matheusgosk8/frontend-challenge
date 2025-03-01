"use client"

import { useReactQueryHome } from '@/Utils/ReactQueryUtils/useReactQueryHome';
import { useQuery } from '@tanstack/react-query';
import { Span } from 'next/dist/trace'
import React, { useState } from 'react'
import { BsArrowRight, BsEye, BsEyeSlash } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md';
import { IMaskInput } from "react-imask";



type TDadosGerais = {
    cep: string,
    pais: string,
    estado: string,
    cidade: string,
    endereco: string
}
type Props = {

    handleEtapa: ({ cep, cidade, endereco, estado, pais }: TDadosGerais) => void

}

const FormEtapaDois = ({ handleEtapa }: Props) => {


    const [erro, setErro] = useState<boolean>(false);

    const [cep, setCep] = useState<string>('')
    const [pais, setPais] = useState<string>('')
    const [estado, setEstado] = useState<string>('')
    const [cidade, setCidade] = useState<string>('')
    const [endereco, setEndereco] = useState<string>('')

    const [cepError, setCepError] = useState<string>('')
    const [paisError, setPaisError] = useState<string>('')
    const [estadoError, setEstadoError] = useState<string>('')
    const [cidadeError, setCidadeError] = useState<string>('')
    const [enderecoError, setEnderecoError] = useState<string>('')

    const { getCepData } = useReactQueryHome();

    type TCepSearchResponse = {
        bairro: string,
        estado: string
        localidade: string
        logradouro: string
        uf: string
    }
    const { data: cepData, isLoading: cepIsLoading, refetch: cepRefetch } = useQuery<TCepSearchResponse, Error>({
        queryFn: () => getCepData(cep),
        queryKey: ["rqCep"],
        enabled: false,
        staleTime: Infinity
    })

    const validarFormatoCep = (cep: string) => {
        const regexCep = /^[0-9]{5}-?[0-9]{3}$/;
        return regexCep.test(cep);
    };


    const handleCep = () => {

        if (!cep || !validarFormatoCep(cep)) {
            return
        }


        cepRefetch();

        if (cepData) {
            console.log('Cep data: ', cepData)
            setPais('Brasil');
            setEstado(cepData?.estado);
            setCidade(cepData.localidade);
            setEndereco(`${cepData?.logradouro}, ${cepData?.bairro}`);
        }


    }


    const checkTextFields = () => {
        let erros: Record<string, string> = {};

        if (!cep?.trim()) erros.cep = "CEP não informado!";
        if (!pais.trim()) erros.pais = "País não informado!";
        if (!estado.trim()) erros.estado = "Estado não informado!";
        if (!cidade.trim()) erros.cidade = "Cidade não informada!";
        if (!endereco.trim()) erros.endereco = "Endereço não informado!";

        // Atualiza os estados de erro
        setCepError(erros.cep || "");
        setPaisError(erros.pais || "");
        setEstadoError(erros.estado || "");
        setCidadeError(erros.cidade || "");
        setEnderecoError(erros.endereco || "");

        return Object.keys(erros).length === 0;
    };

    const handleSendEtapa = () => {
        if (!checkTextFields()) {
            setErro(true);
            return
        }

        handleEtapa({
            cep,
            pais,
            estado,
            cidade,
            endereco
        })
    }




    return (
        <div className='flex flex-col '>
            <div className='flex flex-col gap-5 relative'>
                <label className="containerField ">
                    <span className="labelField">Cep: </span>
                    <IMaskInput
                        mask="00000-000" // Máscara para CEP
                        value={cepIsLoading ? 'Aguarde ...' : cep}
                        onAccept={(val: string) => setCep(val)} // Atualiza o estado corretamente
                        placeholder="Digite seu CEP"
                        className="inputField"
                        onBlur={handleCep}
                    />
                    <span className="errorField">
                        {
                            erro && cepError?.length >= 1 &&
                            <span className='text-red-600'>{cepError}</span>
                        }

                    </span>

                </label>

                <label className="containerField">
                    <span className="labelField">País:</span>
                    <input
                        type="text"
                        value={cepIsLoading ? 'Aguarde ...' : pais}
                        onChange={(e) => setPais(e.target.value)}
                        placeholder="Informe o país"
                        className="inputField"
                    />
                    {paisError && (
                        <span className="errorField text-red-600">{paisError}</span>
                    )}
                </label>

                <label className="containerField">
                    <span className="labelField">Estado:</span>
                    <input
                        type="text"
                        value={cepIsLoading ? 'Aguarde ...' : estado}
                        onChange={(e) => setEstado(e.target.value)}
                        placeholder="Informe o estado"
                        className="inputField"
                    />
                    {estadoError && (
                        <span className="errorField text-red-600">{estadoError}</span>
                    )}
                </label>

                <label className="containerField">
                    <span className="labelField">Cidade:</span>
                    <input
                        type="text"
                        value={cepIsLoading ? 'Aguarde ...' : cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Informe a cidade"
                        className="inputField"
                    />
                    {cidadeError && (
                        <span className="errorField text-red-600">{cidadeError}</span>
                    )}
                </label>

                <label className="containerField">
                    <span className="labelField">Endereço:</span>
                    <input
                        type="text"
                        value={cepIsLoading ? 'Aguarde ...' : endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Informe o endereço"
                        className="inputField"
                    />
                    {enderecoError && (
                        <span className="errorField text-red-600">{enderecoError}</span>
                    )}
                </label>


            </div>
            <div className='rounded-md shadow-md p-2 flex flex-row justify-center items-center w-fit mt-5'>
                <button className='commonIcon text-3xl flex flex-row gap-5 items-center font-semibold text-blue-500'
                    onClick={handleSendEtapa}
                > Salvar dados <span><BsArrowRight /></span></button>
            </div>


        </div>
    )
}

export default FormEtapaDois