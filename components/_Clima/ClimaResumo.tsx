'use client'
import { WiDayCloudy, WiDayHail, WiDayRain, WiDayStormShowers, WiDaySunny, WiDaySunnyOvercast, WiDayThunderstorm } from "react-icons/wi";


import React, { useEffect, useState } from 'react'

type Props = {
    icon: number | 1,
    minTemp?: number,
    maxTemp?: number
}

const ClimaResumo = ({ icon, maxTemp, minTemp }: Props) => {


    const [weaterSaituacao, setWeaterSituacao] = useState({
        icone: <WiDayCloudy />,
        text: 'Céu claro'
    })

    const converterTemp = (fahrenheit: number): number => {
        return ((fahrenheit - 32) * 5) / 9;
    };


    useEffect(() => {
        switch (true) {
            case icon >= 1 && icon < 4:
                setWeaterSituacao({
                    text: 'Céu claro',
                    icone: <WiDaySunny />
                })
                break;
            case icon > 4 && icon < 6:
                setWeaterSituacao({
                    text: 'Parcialmente nublado',
                    icone: <WiDaySunnyOvercast />
                })
                break;
            case icon > 7 && icon < 11:
                setWeaterSituacao({
                    text: 'Nublado',
                    icone: <WiDayCloudy />
                })
                break;
            case icon > 11 && icon < 14:
                setWeaterSituacao({
                    text: 'Parcialmente nublado com chuva leve',
                    icone: <WiDayRain />

                })
                break;
            case icon > 14 && icon < 15:
                setWeaterSituacao({
                    text: 'CTempestade com relâmpagos',
                    icone: <WiDayStormShowers />

                })
                break;
            case icon > 15 && icon < 20:
                setWeaterSituacao({
                    text: 'Chuva forte',
                    icone: <WiDayThunderstorm />

                })
                break
            case icon > 20 && icon < 21:
                setWeaterSituacao({
                    text: 'Chuva ocasional',
                    icone: <WiDayHail />
                })
                break;
            default:
                setWeaterSituacao({
                    text: 'Céu claro',
                    icone: <WiDaySunny />
                })
        }
    }, [icon])



    return (

        <div className="flex flex-col  p-4 w-fit">

            <h3 className="text-3xl text-blue-500"> {weaterSaituacao.text}</h3>

            <div className=" flex flex-row">
                <span className="h-full w-fit text-8xl text-blue-600">
                    {weaterSaituacao.icone}
                </span>

                <div className="flex flex-col h-full text-blue-600">
                    <label className="font-semibold">Temperatura</label>

                    {
                        minTemp && maxTemp ?
                            <>
                                <label > Máxima:  {converterTemp(maxTemp as number).toFixed(0)} Cº</label>
                                <label > Mínima  {converterTemp(minTemp as number).toFixed(0)}  Cº</label>
                            </>
                            :
                            <label>Temperaturas indisponíveis!</label>


                    }

                </div>
            </div>

        </div>

    )
}

export default ClimaResumo