'use client'
import { WiDayCloudy, WiDayRain, WiDaySunny, WiNightClear, WiNightRainWind } from "react-icons/wi";


import React, { useEffect, useState } from 'react'

type Props = {
    icon: number | 1,
    tipo: 'dia' | 'noite',
}

const ClimaDia = ({ icon, tipo }: Props) => {


    const [weaterSaituacao, setWeaterSituacao] = useState({
        icone: <WiDayCloudy />,
        text: 'Céu claro'
    })

    useEffect(() => {
        switch (true) {
            case icon < 12:
                setWeaterSituacao({
                    text: 'Céu claro',
                    icone: <WiDaySunny />
                })
                break;
            case icon > 12 && icon < 33:
                setWeaterSituacao({
                    text: 'Dia chuvoso',
                    icone: <WiDayRain />
                })
                break;
            case icon > 33 && icon < 38:
                setWeaterSituacao({
                    text: 'Noite limpa',
                    icone: <WiNightClear />

                })
                break;
            case icon > 38:
                setWeaterSituacao({
                    text: 'Noite chuvosa',
                    icone: <WiNightRainWind />
                })
                break;
            default:
                setWeaterSituacao({
                    text: 'Noite limpa',
                    icone: <WiNightRainWind />
                })
        }
    }, [icon])


    const getBgTipe = (): string => {

        switch (true) {
            case icon < 12:
                return 'bg-white text-blue-600'
            case icon > 12 && icon < 33:
                return 'bg-gradient-to-br from-blue-200 from-0% to-sky-300 to-100% text-blue-600'
            case icon > 33 && icon < 38:
                return 'bg-gradient-to-br from-slate-800 from-0% via-slate-700 via-50% to-slate-600 to-100% text-white'
            case icon > 38:
                return 'bg-gradient-to-br from-slate-800 from-0% to-zinc-700 to-100% text-white'
            default:
                return 'bg-white'
        }
    }

    return (

        <div className={`flex flex-col rounded-md shadow-md p-4 w-fit max-w-72 ${getBgTipe()}`}>

            <h3 className="text-3xl "> {weaterSaituacao.text}</h3>

            <div className=" flex flex-row">
                <span className="h-full w-fit text-8xl ">
                    {weaterSaituacao.icone}
                </span>


            </div>

        </div>

    )
}

export default ClimaDia