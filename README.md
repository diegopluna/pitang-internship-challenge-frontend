<h1 align="center">Vacina Fácil Frontend</h1>

<p align="center">
  <a href="https://github.com/diegopluna/pitang-internship-challeng-frontend/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/diegopluna/pitang-internship-challenge-frontend?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introdução"><strong>Introdução</strong></a> ·
  <a href="#pré-requisitos"><strong>Pré-requisitos</strong></a> ·
  <a href="#instalação"><strong>Instalação</strong></a> ·
  <a href="#tecnologias-utilizadas"><strong>Tecnologias Utilizadas</strong></a> ·
  <a href="#funcionalidades"><strong>Funcionalidades</strong></a> ·
  <a href="#testes"><strong>Testes</strong></a> ·
  <a href="#scripts-disponíveis"><strong>Scripts Disponíveis</strong></a> ·
  <a href="#license"><strong>Licença</strong></a>
</p>
<br/>

## Introdução

Vacina Fácil: Interface para agendamento de vacinas COVID-19, desenvolvida para o desafio de estágio da Pitang. Oferece gerenciamento eficiente de agendamentos de vacinação.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (v20.14.0) - Ambiente de execução JavaScript

## Instalação

### Configuração do Ambiente

1. Clone o repositório:

```bash
git clone https://github.com/diegopluna/pitang-internship-challenge-backend.git
```

2. Instale as dependências:

```bash
npm install
```

3. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### Executando o servidor

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:5173`.

## Tecnologias Utilizadas

- [React](https://react.dev/) (v18.2.0) - Biblioteca JavaScript para construção de interfaces de usuário.
- [Typescript](https://www.typescriptlang.org/) (v5.2.2) - Linguagem de programação
- [Vite](https://vitejs.dev/) (v5.2.0) - Build tool e dev server rápido para projetos web modernos.
- [React Router](https://reactrouter.com/) (v6.24.1) - Biblioteca de roteamento para React.
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) (v5.50.1) - Biblioteca de gerenciamento de estado e side effects.
- [React Hook Form](https://react-hook-form.com/) (v7.52.1) - Biblioteca para gerenciamento de formulários em React com performance otimizada.
- [Zod](https://zod.dev/) (v3.23.8) - Biblioteca de validação de esquemas TypeScript-first.
- [Tailwind CSS](https://tailwindcss.com/) (v3.4.4) - Framework CSS utilitário para criação rápida de designs personalizados.
- [shadcn/ui](https://ui.shadcn.com/) - Biblioteca de componentes de UI reutilizáveis e customizáveis construídos com Radix UI e Tailwind CSS.
- [Vitest](https://vitest.dev/) (v2.0.3) - Framework de testes unitários rápido e leve para Vite.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (v16.0.0) - Conjunto de utilitários para testar componentes React de forma centrada no usuário.
- [Axios](https://axios.dev/) (v1.7.2) - Cliente HTTP baseado em Promises para o navegador e node.js.
- [React Datepicker](https://reactdatepicker.com/) (v7.3.0) - Componente de seleção de data flexível e reutilizável para React.
- [date-fns](https://date-fns.org/) (v3.6.0) - Biblioteca moderna de utilitários de data JavaScript.
- [Lucide React](https://lucide.dev/) (v0.407.0) - Conjunto de ícones bem elaborados para React.

## Funcionalidades

- Agendamento de vacinas
- Visualização de agendamentos existentes
- Edição de agendamentos
- Interface responsiva para desktop e dispositivos móveis

## Testes

Para executar os testes:

```bash
npm run test
```

Para executar os testes com cobertura:

```bash
npm run test:coverage
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run lint`: Executa o linter no código
- `npm run format`: Formata o código usando Prettier
- `npm run preview`: Inicia um servidor local para pré-visualização da build
- `npm run test`: Executa os testes unitários
- `npm run test:coverage`: Executa os testes com cobertura

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
