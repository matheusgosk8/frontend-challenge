'use client';

import { useReactQueryHome } from "@/Utils/ReactQueryUtils/useReactQueryHome";
import { useQuery } from "@tanstack/react-query";



import React from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti";
import ClimaResumo from "./ClimaResumo";
import ClimaDia from "./ClimaDia";
import { BsExclamationCircle } from "react-icons/bs";

type Props = {
    cidade: string,
    estado: string
}

const ClimaData = ({ cidade, estado }: Props) => {

    const { getWeatherLocationCode, getNextDayClima } = useReactQueryHome();


    //Existe uma forma mais prática de fazer isso, quando
    //uma query depende da outra é interessante usar o 'useQueries'
    // para queries paralelas.

    /**
     * @description Resgata o código da localização da cidade usada pelo accuweater
     * Deveria ser guardado em algum local para evitar realizar esta query de forma
     * desnecessária, atualizada quando a geolocalização mudar. 
     */
    const { data: locationData, isLoading: locationLoading, isError: locationError } = useQuery({
        queryFn: () => getWeatherLocationCode(cidade),
        queryKey: ['rqLocationCode', cidade],
    });

    const key = locationData?.[0]?.Key;

    /**
     * @description A data usada para pegar as informações foi colocada de forma hard code para amanhã, assim como o solicitado.
     */
    const { data: climaData, isLoading: climaIsLoading, isError: climaError } = useQuery({
        queryFn: () => (key ? getNextDayClima(key) : Promise.resolve(null)),
        queryKey: ['rqClima', key],
        enabled: !!key,
    });

    const forecast = climaData?.DailyForecasts[0];
    const minTemp = forecast?.Temperature?.Minimum?.Value;
    const maxTemp = forecast?.Temperature?.Maximum?.Value;
    const dayIcon = forecast?.Day?.Icon;
    const nightIcon = forecast?.Night?.Icon;

    if (locationLoading || climaIsLoading) {
        return (
            <div>
                <div className="flex justify-center items-center space-x-2 ">
                    <svg
                        className="animate-spin h-12 w-12 text-gray-500 dark:text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>

                </div>
                <h1 className="text-3xl mt-5 text-blue-600 font-semibold">Aguarde ... </h1>

            </div>

        )
    }

    if (locationError || climaError) {
        return (
            <div className="flex flex-col justify-center items-center bg-white p-4 shadow-md rounded-md min-h-44">
                <span><BsExclamationCircle size={50} /></span>
                <h1 className="text-5xl">Erro ao buscar dados!</h1>
            </div>
        )
    }

    if (!locationData || !climaData) {
        return (
            <div className="flex flex-col justify-center items-center bg-white p-4 shadow-md rounded-md min-h-44">
                <span><BsExclamationCircle size={50} /></span>
                <h1 className="text-5xl">Dados não encontrados!</h1>
            </div>
        )
    }

    return (

        <div className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg ">



            <h1 className="text-xl max-w-md font-semibold text-center text-blue-600 mb-6 flex flex-row gap-2 items-center">
                <TiWeatherPartlySunny size={50} className='mb-1' />
                Previsão do tempo  em {cidade}, {estado} para amanhã:
            </h1>


            <div className="flex flex-col gap-2">


                <ClimaResumo
                    maxTemp={maxTemp}
                    minTemp={minTemp}
                    icon={dayIcon ? dayIcon : 1}
                />

                <div className="flex flex-row gap-5 items-center justify-center">
                    <ClimaDia icon={dayIcon ? dayIcon : 1} tipo="dia" />
                    <ClimaDia icon={nightIcon ? nightIcon : 1} tipo="noite" />
                </div>
            </div>


        </div>
    )
}

export default ClimaData

