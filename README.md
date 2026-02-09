# ⭐ Desafio Técnico – Desenvolvedor(a) Front-End (Next.js)

​

## ⭐ Objetivo

​
Desenvolver uma aplicação web com **Next.js** que consuma a [REST Countries API](https://restcountries.com/#rest-countries), permitindo ao usuário explorar e visualizar informações sobre países de forma interativa e responsiva.
​

---

​

## ⭐ Contexto

​
A aplicação será um catálogo de países com recursos de filtragem e visualização de detalhes. O usuário deve poder:
​

- Navegar por uma lista de países.
- Filtrar por:
  - Nome do país (busca textual).
  - Continente (checkboxes).
  - Idioma (select).
- Acessar uma página com detalhes do país selecionado.
  ​

---

​

## ⭐ Layout

Segue links do layout para aplicação:
  - [Figma Componentes](https://www.figma.com/design/uqRKSNiAtLlHWzg6qs7J0v/TESTE-FRONT-PLAN?node-id=0-1&p=f)
  - [Figma Apresentação](https://www.figma.com/proto/uqRKSNiAtLlHWzg6qs7J0v/TESTE-FRONT-PLAN?node-id=2-615&t=jAEkXLJ8nXUMIDD4-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

**A responsividade deve ser aplicada para manter o layout mais coerente com o definido acima.**

---

​

## ⭐ Requisitos Técnicos

​

- Utilizar **Next.js** como framework principal ([https://nextjs.org/](https://nextjs.org/)).
- Utilizar **ESLint**, conforme [documentação oficial](https://nextjs.org/docs/app/api-reference/config/eslint).
- Utilizar **TypeScript**
- Garantir **responsividade** da aplicação.
- Exibir as informações dos países **em português**, quando disponível, utilizando o campo `translations.por` da versão `v3.1` da REST Countries API.
- Código organizado, componentizado e limpo.
  ​

---

​

## ⭐ Funcionalidades Esperadas

​

### 1. Página Inicial

- Lista de países com:
  - Nome (em português)
  - Bandeira
  - Região
- Filtros:
  - **Busca por nome**
  - **Filtro por continente** (checkbox)
  - **Filtro por idioma** (select)
    ​

### 2. Página de Detalhes

- Informações completas de um país:
  - Nome oficial
  - População
  - Moeda
  - Línguas faladas
  - Bandeira
  - Região / Sub-região
    ​

---

​

## ⭐ Diferenciais (Desejável, não obrigatório)

​

- Estilização moderna: **TailwindCSS**, **CSS Modules**
- Configuração de **Prettier** e **ESLint**
- Considerações básicas de acessibilidade
  ​

---

## ⭐ Considerações sobre o repositório

​

Este projeto deve ser utilizado como base para o desenvolvimento do seu teste. Alguns componentes estão presentes apenas como exemplo para o desenvolvedor, e devem ser removidos antes do início efetivo do desenvolvimento do teste.

​

## ⭐ Entrega

​

1. Faça um fork do repositório público <link do repositorio>.
2. Inclua no `README.md` as seguintes informações:
   - Instruções para rodar localmente.
   - Breve explicação sobre suas escolhas técnicas.
   - Link do deploy (se houver).
3. Submeta o link do repositório e, se aplicável, do deploy.
   ​
   Boa sorte! Estamos ansiosos para ver sua solução. 🚀

​

## ⭐ Instruções

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/plan-frontend-test.git
   cd plan-frontend-test
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

Outros comandos disponíveis:
- `npm run build` — gera a build de produção
- `npm run start` — inicia o servidor com a build de produção
- `npm run lint` — executa o ESLint para análise estática do código
- `npm run format` — aplica correções do ESLint e formatação com Prettier

## ⭐ Breve explicação

A aplicação foi desenvolvida com **Next.js 15** (App Router) e **TypeScript**, consumindo a [REST Countries API v3.1](https://restcountries.com/). As principais escolhas técnicas foram:

- **SCSS Modules** para estilização com escopo local por componente, evitando conflitos de classes e mantendo os estilos organizados junto aos componentes.
- **TailwindCSS** como complemento utilitário para espaçamentos e ajustes rápidos.
- **React Aria Components** para garantir acessibilidade nos componentes interativos (campos de busca, checkboxes, botões), seguindo as diretrizes WAI-ARIA.
- **Axios** para as requisições HTTP, com um service layer separado (`countryService`) que centraliza todas as chamadas à API.
- **Custom Hooks** (`useCountries`) para encapsular a lógica de estado, filtros, paginação e chamadas assíncronas, mantendo os componentes de UI limpos e focados na apresentação.
- **ESLint + Prettier + Husky** configurados para manter a qualidade e padronização do código em todo o projeto.

A aplicação exibe os nomes dos países em português (campo `translations.por`), permite filtragem por nome, continente e idioma (com busca textual no dropdown de idiomas), e possui uma página de detalhes com informações completas de cada país.

## ⭐ Link do deploy (se houver)

[https://plan-frontend-test.vercel.app/](https://plan-frontend-test.vercel.app/)
