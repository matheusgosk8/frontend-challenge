"use client"

import { BsCheck } from "react-icons/bs";
import { toast } from "react-toastify";

type Props = {
    currentStep: number,
    alterarEtapa: (data: number) => void;
    validations: { etapa1: boolean, etapa2: boolean, etapa3: boolean }
}

//Usei type assertion aqui ("as keyof typeof"), não é recomendado, mas pra não ter de criar um context pra isso
// é mais fácil trapacear um pouco no TypeScript

const Stepper = ({ currentStep, alterarEtapa, validations }: Props) => {
    const steps = [1, 2, 3];
    // Lembrando que as etapas são sempre subtraídas por um por conta do index do map na verificação.

    return (
        <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`commonIcon w-10 h-10 flex items-center justify-center rounded-full text-white font-bold
                                    ${step <= currentStep ? "bg-blue-500" : "bg-gray-300"}
                                    ${step > 1 && !validations[`etapa${step - 1}` as keyof typeof validations] ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                                `}
                        onClick={() => {
                            if (step === 1 || validations[`etapa${step - 1}` as keyof typeof validations]) {
                                alterarEtapa(step);
                            } else {
                                toast.warn('Existem campos incompletos ou com erros!')
                            }

                        }}
                    >
                        {validations[`etapa${step}` as keyof typeof validations] ? <BsCheck /> : step}
                    </div>

                    {step !== steps.length && (
                        <div
                            className={`h-1 w-20 lg:w-40 ${step < currentStep ? "bg-blue-500" : "bg-gray-300"}`}

                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Stepper