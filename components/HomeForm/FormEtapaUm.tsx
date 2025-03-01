import { TDadosEtapaUm } from '@/Types/formTypes'
import { Span } from 'next/dist/trace'
import React, { useEffect, useState } from 'react'
import { BsArrowRight, BsEye, BsEyeSlash } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'



type Props = {
    handleVerificarEtapa: (isValid: boolean) => void;

    handleEtapa: ({ confirmarSenha, email, nome, senha }: TDadosEtapaUm) => void

}

const FormEtapaUm = ({ handleEtapa, handleVerificarEtapa }: Props) => {

    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [confirmarSenha, setconfirmarSenha] = useState<string>('');

    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
    const [mostrarRepetirSenha, setMostrarRepetirSenha] = useState<boolean>(false);

    const [erro, setErro] = useState<boolean>(false);
    const [senhaErro, setSenhaErro] = useState<string[]>([]);
    const [confirmarSenhaErro, setConfirmarSenhaErro] = useState<string[]>([]);

    const [nomeErro, setNomeErro] = useState<string[]>(['']);
    const [emailErro, setEmailErro] = useState<string[]>(['']);


    const validarSenha = (val: string) => {
        // Verifica se a senha é alfanumérica (contém letras e números)
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(val);
    };


    const checkSenha = () => {
        let erros: string[] = [];
        let confirmarSenhaErros: string[] = [];

        if (senha !== confirmarSenha) {
            confirmarSenhaErros.push("As senhas não coincidem!");
        }
        if (senha.length > 0 && senha.length < 8) {
            erros.push("A senha deve ter mais de 8 dígitos!");
        }
        if (confirmarSenha.length > 0 && confirmarSenha.length < 8) {
            confirmarSenhaErros.push("A senha deve ter mais de 8 dígitos!");
        }

        if (senha.length > 0 && senha.length > 35) {
            erros.push('A senha não pode conter mais de 35 caracteres!')
        }


        if (!validarSenha(senha)) {
            erros.push('A senha não pode conter caracteres especiais (%, #, @ , etc)')
        }


        setSenhaErro(erros);
        setConfirmarSenhaErro(confirmarSenhaErros);
    };

    const checkTextFields = () => {
        let nomeErroTemp = [];
        let emailErroTemp = [];

        if (nome.length === 0) {
            nomeErroTemp.push('Nome não informado!')
        }
        if (email.length === 0) {
            emailErroTemp.push('É necessário informar o email!')
        }
        if (nome.length > 150) {
            nomeErroTemp.push("O nome não pode conter mais de 150 caracteres")
        }




        setNomeErro(nomeErroTemp);
        setEmailErro(emailErroTemp)

    }

    const handleSendEtapa = () => {
        checkTextFields()
        checkSenha()
        if (emailErro.length >= 1 || nomeErro.length >= 1 || senhaErro.length >= 1 || confirmarSenhaErro.length >= 1) {
            setErro(true);

            return;
        }

        setErro(false);

        handleEtapa({
            nome: nome,
            email: email,
            senha: senha,
            confirmarSenha: confirmarSenha
        })
    }


    useEffect(() => {

        if (!confirmarSenha || !senha || !nome || !email || senha !== confirmarSenha) {
            handleVerificarEtapa(false);

        } else {
            handleVerificarEtapa(true);

        }

    }, [confirmarSenha, senha, nome, email]);




    return (
        <div className='flex flex-col '>
            <div className='flex flex-col gap-5 relative'>
                <label className="containerField ">
                    <span className="labelField">Nome</span>
                    <input
                        type='text'
                        className="inputField"
                        placeholder="Escreva o seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onBlur={checkTextFields}
                        max={150}
                    />
                    <span className="errorField">
                        {erro && nomeErro.length >= 1 &&
                            nomeErro.map((erro, index) => (
                                <span key={index} className='text-sm text-red-500'> {erro}</span>
                            ))
                        }
                    </span>
                </label>
                <label className="containerField">
                    <span className="labelField">Email</span>
                    <input
                        type='email'
                        className="inputField"
                        placeholder="examplo@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={checkTextFields}
                    />
                    <span className="errorField">
                        {erro && emailErro.length >= 1 &&
                            emailErro.map((erro, index) => (
                                <span key={index} className='text-sm text-red-500'> {erro}</span>
                            ))
                        }
                    </span>
                </label>
                <label className="containerField">
                    <span className="labelField">Senha</span>
                    <input
                        type={mostrarSenha ? 'text' : 'password'}
                        className="inputField"
                        placeholder="Insira sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        onBlur={checkSenha}
                        minLength={8}
                        maxLength={35}
                    />
                    <div
                        onClick={() => setMostrarSenha(current => !current)}
                        className='w-fit commonIcon'
                    >
                        {
                            mostrarSenha ?
                                <span className='flex flex-row gap-2 items-center commonIcon'>
                                    <BsEyeSlash /> Ocular senha
                                </span>
                                :
                                <span className='flex flex-row gap-2 items-center commonIcon'>
                                    <BsEye /> Mostrar senha
                                </span>
                        }
                    </div>
                    {
                        senhaErro?.map((erro: string, index: number) => (
                            <span key={index} className='text-red-500 text-sm'>{erro}</span>
                        ))
                    }
                </label>
                <label className="containerField">
                    <span className="labelField">Repetir a senha</span>
                    <input
                        type={mostrarRepetirSenha ? 'text' : 'password'}
                        className="inputField"
                        placeholder="Insira a senha novamente"
                        value={confirmarSenha}
                        onChange={(e) => setconfirmarSenha(e.target.value)}
                        onBlur={checkSenha}
                    />
                    <div
                        onClick={() => setMostrarRepetirSenha(current => !current)}
                        className='w-fit commonIcon'
                    >
                        {
                            mostrarRepetirSenha ?
                                <span className='flex flex-row gap-2 items-center commonIcon'>
                                    <BsEyeSlash /> Ocultar senha
                                </span>
                                :
                                <span className='flex flex-row gap-2 items-center commonIcon'>
                                    <BsEye /> Mostrar senha
                                </span>
                        }
                    </div>
                    {
                        confirmarSenhaErro?.map((erro: string, index: number) => (
                            <span key={index} className='text-red-500 text-sm'>{erro}</span>
                        ))
                    }
                </label>
            </div>


            <div className='rounded-md shadow-md p-2 flex flex-row justify-center items-center w-fit   '>
                <button className={`commonIcon text-3xl flex flex-row gap-5 items-center font-semibold text-blue-500 `}
                    onClick={handleSendEtapa}
                > Salvar dados <span><BsArrowRight /></span></button>
            </div>


        </div>
    )
}

export default FormEtapaUm