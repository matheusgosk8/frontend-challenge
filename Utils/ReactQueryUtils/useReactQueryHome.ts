import { TDadosGerais } from "@/Types/formTypes";

/**
 * @description Hook das requisições que serão utilizadas pelo react query
 * @alias Não foi utilizado o axios, embora já estivesse instalado o fetch api já da conta do recado aqui.
 * @returns As funções que forma criadas no custom hook
 */
export const useReactQueryHome = () => {
  /**
   *
   * @param cep Cep em forma numérica, sem traços e caracteres especiais.
   * @returns Busca em API externa os complementos do endereço através do CEP
   */
  const getCepData = async (cep: string) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const response = await res.json();
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   * @description Função principal de envio dos dados para a rota de API do next..
   * @param data Utiliza um tipe unido de todas as etapas do formulário.
   * @returns Retorna o aviso do BE informando que os dados foram enviados.
   */
  const postData = async (data: TDadosGerais) => {
    const url = "http://localhost:3000/api/v1";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        console.error("Erro na requisição!");
      }

      const response = await res.json();
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   *
   * @param cidade Em formato de string, recomendado transformar quaisquer símbolos em url antes.
   * @returns Busca a chave usada na API de clima para a próxima
   */
  const getWeatherLocationCode = async (cidade: string) => {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.NEXT_PUBLIC_ACCUWATHER_API_KEY}&q=${cidade}`;

    try {
      const res = await fetch(url);
      const response = await res.json();
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   * @description É a função que resgata as informações do clima de acordo com a cidade informada.
   * @param code É o código usado para as zonas na API do clima
   * @alias 1day É colocado em forma hard code, pegando sempre os dados de amanhã
   * @returns
   */
  const getNextDayClima = async (code: number) => {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${code}?apikey=${process.env.NEXT_PUBLIC_ACCUWATHER_API_KEY}`;

    try {
      const res = await fetch(url);
      const response = await res.json();
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    getCepData,
    postData,
    getWeatherLocationCode,
    getNextDayClima,
  };
};
