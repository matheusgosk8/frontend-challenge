"use client";

import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import FormEtapaUm from "../HomeForm/FormEtapaUm";
import Stepper from "../HomeForm/Stepper";
import FormEtapaDois from "../HomeForm/FormEtapaDois";
import FormEtapaTres from "../HomeForm/FormEtapaTres";
import { TDadosEtapaDois, TDadosEtapaTres, TDadosEtapaUm, TDadosGerais } from "@/Types/formTypes";
import { useReactQueryHome } from "@/Utils/ReactQueryUtils/useReactQueryHome";
import { useMutation } from "@tanstack/react-query";

const Hello = () => {


  const { postData } = useReactQueryHome();

  const [loading, setLoading] = useState<boolean>(false);
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);


  /**
   * @description Processo de mutação comum com o react query, nesta caso, como
   * não estamos atualizando nenhum dado que possui conexão com nossa aplicação
   * em alguma rota de get, não precisamos realmente de uma mutação.
   */
  const postDataMutation = useMutation({
    mutationFn: postData,
    onMutate: async (data) => {
      setLoading(true);
      console.log('Mutação iniciada <----------------->');

    },
    onSuccess: async (response) => {
      console.log('Mutação bem, sucedida <----------------->', response);


      if (response.status === 1) {
        setSucesso(true);
      }
      if (response.status === 3) {
        console.log('Mutação retornou falha <----------------->');

        setError(true);
      }

    },
    onError: async (err) => {
      console.log('Mutação falhou <----------------->');

      console.error(err.message);
      setError(true);
    },
    onSettled: async (data) => {
      console.log('Mutação finalizada <----------------->');

      setLoading(false)
    }
  })


  /**
   * @alias Dava pra ter o mesmo resultado sem o uso de enums, todo lugar que 
   * pesquiso contra indica essa ferramenta do TS, mas eu ainda sim gosto de usa-la
   */
  enum EEtapaForm {
    CADASTRO = 'cadastro',
    ENDERECO = 'endereco',
    MENSAGEM = 'mensagem'
  }

  const [etapaForm, setEtapaForm] = useState<EEtapaForm>(EEtapaForm.CADASTRO);
  const [steperEtapa, setSteperEtapa] = useState<number>(1);


  const [etapaData, setEtapaData] = useState<TDadosGerais>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cep: '',
    cidade: '',
    endereco: '',
    estado: '',
    pais: '',
    message: ''
  });


  /**
   * @description Essa é a função que agrega todos os dados das etapas, no final ela envia tudo para a API
   * @param data utiliza uma combinação de três types, portanto passar any aqui n é um problema já que os types
   * correspondentes estão sendo devidamente enforcados dentro dos componentes das etapas.
   */
  const handleEtapa = (data: TDadosEtapaUm | TDadosEtapaDois | TDadosEtapaTres) => {

    console.log('Dados da etapa --------> ', data)

    setEtapaData((prev) => {
      const updatedData = {
        ...prev,
        ...data,  // Mesclando os dados da etapa atual com os anteriores
      };
      return updatedData;
    });


    switch (etapaForm) {
      case EEtapaForm.CADASTRO:
        setEtapaForm(EEtapaForm.ENDERECO);
        break;
      case EEtapaForm.ENDERECO:
        setEtapaForm(EEtapaForm.MENSAGEM);
        break;
      default:

        const temValorVazio = Object.entries(etapaData).some(([_, value]) => !value);
        console.log(temValorVazio)

        const tempData = {
          ...etapaData,
          ...data
        }



        postDataMutation.mutate(tempData);

    }


  };

  useLayoutEffect(() => {
    switch (etapaForm) {
      case EEtapaForm.ENDERECO:
        setSteperEtapa(2);
        break;
      case EEtapaForm.MENSAGEM:
        setSteperEtapa(3);
        break;
      default:
        setSteperEtapa(1);
        break
    }
  }, [etapaForm])


  /**
   * 
   * @param etapa Passa o número da etapa manualmente ao selecionar uma etapa no formulário.
   */
  const alterarEtapa = (etapa: number) => {
    switch (etapa) {
      case 1:
        setEtapaForm(EEtapaForm.CADASTRO);
        break;
      case 2:
        setEtapaForm(EEtapaForm.ENDERECO);
        break;
      case 3:
        setEtapaForm(EEtapaForm.MENSAGEM);
        break;
    }
  }

  useEffect(() => {
    if (error) {
      window.alert('Erro na solicitação!')
    }

  }, [error])


  if (sucesso) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-3xl "> Dados enviados com sucesso</h1>
      </div>
    )
  }



  return (

    <div className="flex flex-col justify-center items-center lg:justify-normal  lg:grid lg:grid-cols-[40%_auto] w-full min-h-screen h-screen " >


      <div className="w-full h-full object-contain bg-blue-600 p-20 lg:block hidden">
        <img
          src="/unnamed.png" alt="" className=" origin-center w-full h-full object-contain" />
      </div>

      <div className="flex flex-col justify-center items-center w-full h-full md:px-36 py-12 p-16 ">
        <div className="bg-white shadow-md rounded-md max-w-4xl w-full h-full">

          <div
            className="p-5 h-full flex flex-col justify-between"
          >

            <div className={etapaForm === EEtapaForm.CADASTRO ? 'block' : 'hidden'}><FormEtapaUm
              handleEtapa={handleEtapa}
            /> </div>
            <div className={etapaForm === EEtapaForm.ENDERECO ? 'block' : 'hidden'}><FormEtapaDois handleEtapa={handleEtapa} /> </div>
            <div className={etapaForm === EEtapaForm.MENSAGEM ? 'block' : 'hidden'}><FormEtapaTres handleEtapa={handleEtapa} loading={loading} /> </div>

            <div className="w-full items-center justify-center flex flex-col lg:justify-normal">
              <h3 className="text-3xl text-blue-500 mb-2">Etapa {steperEtapa}/3</h3>
              <Stepper currentStep={steperEtapa} alterarEtapa={alterarEtapa} />
            </div>
          </div>

        </div>

      </div>


    </div>

  )
}

export default Hello;