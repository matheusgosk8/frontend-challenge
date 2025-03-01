
type Props = {
    currentStep: number,
    alterarEtapa: (data: number) => void;
}


const Stepper = ({ currentStep, alterarEtapa }: Props) => {
    const steps = [1, 2, 3]; // Definição das etapas

    return (
        <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`commonIcon w-10 h-10 flex items-center justify-center rounded-full text-white font-bold
                            ${step <= currentStep ? "bg-blue-500" : "bg-gray-300"}
                        `}
                        onClick={() => alterarEtapa(step)}
                    >
                        {step}
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