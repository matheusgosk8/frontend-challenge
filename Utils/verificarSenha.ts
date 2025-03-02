export const verificarSenha = (senha: string) => {
  if (!senha) {
    return false;
  }

  try {
    const regex = /^[a-zA-Z0-9]+$/;
    const testSenha = regex.test(senha);
    if (!testSenha || senha.length > 35) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
