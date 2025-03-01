"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import FormEtapaUm from "../HomeForm/FormEtapaUm";
import Stepper from "../HomeForm/Stepper";
import FormEtapaDois from "../HomeForm/FormEtapaDois";
import FormEtapaTres from "../HomeForm/FormEtapaTres";
import { TDadosEtapaDois, TDadosEtapaTres, TDadosEtapaUm, TDadosGerais } from "@/Types/formTypes";
import { useReactQueryHome } from "@/Utils/ReactQueryUtils/useReactQueryHome";
import { useMutation } from "@tanstack/react-query";
import { BsArrowRight, BsCheck } from "react-icons/bs";
import { toast } from "react-toastify";
import Link from "next/link";

const Hello = () => {


  const { postData } = useReactQueryHome();
  const [loading, setLoading] = useState<boolean>(false);
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  /**
   * @description Este state carrega a situação dos erros nas três etapas do formulário
   */
  const [validations, setValidations] = useState<{ etapa1: boolean, etapa2: boolean, etapa3: boolean }>({
    etapa1: false,
    etapa2: false,
    etapa3: false,
  });


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
        toast.success(response.message);
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

    // console.log('Dados da etapa --------> ', data)

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

        setEtapaData(tempData)


        const checkForFalse = Object.values(validations).includes(false);



        if (checkForFalse) {
          toast.warn('Existem campos incompletos, por favor verifique os dados informados!')
        }

        postDataMutation.mutate(tempData);

    }


  };

  /**
   * @description Escolhido o useLayoutEffect por que ele roda antes do DOM, garantindo
   * uma melhor transição na aparência quando trocamos de componentes.
   */
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


  /**
   * 
   * @param etapa Função que valida cadas um das três etapas, se alguma apresentar erros 
   * ou dados incompletos esta função vai detextar.
   * 
   */
  const handleVerificarEtapa = (etapa: keyof typeof validations, isValid: boolean) => {
    setValidations((prev) => ({
      ...prev,
      [etapa]: isValid,
    }));
  };

  useEffect(() => {
    if (error) {
      window.alert('Erro na solicitação!')
    }

  }, [error])


  /**
   * 
   * @returns Retorna a url para a página de verificação do clima.
   */
  const climaUrlBuilder = (): string => {

    let url = '';
    if (etapaData.estado || etapaData.cidade) {
      url = `http://localhost:3000/clima?status=ok&estado=${etapaData.estado}&cidade=${etapaData.cidade}`;
    }
    else {
      url = `http://localhost:3000/clima?status=erro`
    }

    return url
  }


  // //~MANUTENÇÃO~//
  // useEffect(() => {
  //   console.log('Verificando: ', validations)
  // }, [validations])
  // //~MANUTENÇÃO~//


  if (sucesso) {
    return (
      <div className=" flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 from-0% to-sky-300 to-100%">
        <BsCheck className="text-green-700 text-6xl" />
        <h1 className="text-3xl "> Dados enviados com sucesso</h1>

        <div className="flex flex-col gap-2 justify-normal items-start bg-white shadow-md p-2 rounded-md min-w-80 w-fit mt-5">
          <h3 className="text-xl font-semibold">Dados cadastrados</h3>

          <label ><span className="font-semibold">Nome:     </span>{etapaData?.nome}</label>
          <label ><span className="font-semibold">Email:    </span>{etapaData?.email}</label>
          <label ><span className="font-semibold">Endereço: </span>{etapaData?.endereco}</label>
          <label ><span className="font-semibold">Cep:      </span>{etapaData?.cep}</label>
          <label ><span className="font-semibold">Pais:     </span>{etapaData?.pais}</label>
          <label ><span className="font-semibold">Estado:   </span>{etapaData?.estado}</label>
          <label ><span className="font-semibold">Cidade:   </span>{etapaData?.cidade}</label>
          <label ><span className="font-semibold">Pais:     </span>{etapaData?.endereco}</label>


          <div className="w-full">
            <label className="font-semibold"> Mensagem: </label>
            <pre className="mt-1 font-sans bg-gray-100 w-full min-h-10 rounded-md p-2">
              {etapaData.message}
            </pre>
          </div>



        </div>

        <div className="mt-5 rounded-md p-2 bg-white shadow-md flex flex-row gap-2 items-center commonIcon text-blue-600">
          <Link href={climaUrlBuilder()} className="flex flex-row gap-2 items-center ">
            Página do clima <BsArrowRight />
          </Link>
        </div>

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
              handleVerificarEtapa={(isValid) => handleVerificarEtapa('etapa1', isValid)}
            /> </div>
            <div className={etapaForm === EEtapaForm.ENDERECO ? 'block' : 'hidden'}><FormEtapaDois handleEtapa={handleEtapa} handleVerificarEtapa={(isValid) => handleVerificarEtapa('etapa2', isValid)} /> </div>
            <div className={etapaForm === EEtapaForm.MENSAGEM ? 'block' : 'hidden'}><FormEtapaTres handleEtapa={handleEtapa} loading={loading} handleVerificarEtapa={(isValid) => handleVerificarEtapa('etapa3', isValid)} /> </div>

            <div className="w-full items-center justify-center flex flex-col lg:justify-normal">
              <h3 className="text-3xl text-blue-500 mb-2">Etapa {steperEtapa}/3</h3>
              <Stepper currentStep={steperEtapa} alterarEtapa={alterarEtapa} validations={validations} />
            </div>
          </div>

        </div>

      </div>


    </div>

  )
}

export default Hello;