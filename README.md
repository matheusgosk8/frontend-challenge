## Getting Started

First, install dependecies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Architecture:

`app` Router for pages

`app/api` Internal api routes

`components` UI components

`services` external/internal services

## Documentação Expandida

### matheusgosk8

## Estrutura do Projeto

### `components/HomeForm`

Componentes relacionados aos formulários da aplicação.

### `components/_Clima`

Componentes responsáveis pela exibição das informações climáticas.

### `types/`

Pasta contendo os **types** organizados para os formulários e demais estruturas tipadas.

### `utils/ReactQueryUtils`

Funções de requisição utilizadas no **React Query**.

---

## Bibliotecas Instaladas

- **Tailwind CSS** - Estilização da aplicação.
- **Post CSS** - Estilização da aplicação.
- **React Query** - Gerenciamento de estado assíncrono e requisições.
- **React Toastify** - Notificações e alertas visuais.
- **IMask Input** - Manipulação e formatação de inputs.

---

## Configuração da API

Antes de rodar o projeto, é necessário configurar a chave da API para utilizar o **AccuWeather** na obtenção dos dados climáticos,
realize uma das alternativas abaixo.

1. Copie o arquivo `.env.example` e renomeie para `.env`.
2. Insira a chave da API no arquivo `.env`.

Esta chave será apagada daqui a uma semana (08/03/2025) por questões de segurança.

---

## Como Rodar a Aplicação

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
