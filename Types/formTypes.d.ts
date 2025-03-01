export type TDadosEtapaUm = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export type TDadosEtapaDois = {
  cep: string;
  pais: string;
  estado: string;
  cidade: string;
  endereco: string;
};

export type TDadosEtapaTres = {
  message: string;
};

export type TDadosGerais = TDadosEtapaUm & TDadosEtapaDois & TDadosEtapaTres;
