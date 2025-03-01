import { TDadosGerais } from "@/Types/formTypes";

export const useReactQueryHome = () => {
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
      console.log(error);
      return null;
    }
  };

  return {
    getCepData,
    postData,
  };
};
