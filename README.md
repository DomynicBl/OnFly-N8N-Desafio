# Desafio Onfly: Conector n8n - True Random Number Generator

Este repositório contém a solução para o desafio técnico da Onfly, que consiste na criação de um conector (custom node) para a plataforma de automação n8n.

O conector se chama **Random** e possui uma única operação: **"True Random Number Generator"**. Ele utiliza a API pública da [Random.org](https://www.random.org) para buscar um número inteiro verdadeiramente aleatório com base em um intervalo (mínimo e máximo) definido pelo usuário.

## Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

* [Node.js](https://nodejs.org/) (versão 22 LTS ou superior)
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Instalação e Execução

Siga os passos abaixo para configurar e executar o ambiente n8n com o conector personalizado.

### 1. Clone o Repositório

```bash
git clone <https://github.com/DomynicBl/OnFly-N8N-Desafio>
cd onfly-n8n-desafio
```

### 2. Instale as Dependências e Compile o Conector

O conector é escrito em TypeScript e precisa ser compilado para JavaScript antes de ser utilizado pelo n8n.

```bash
# Entre na pasta do conector
cd nodes

# Instale as dependências
npm install

# Compile o código TypeScript para JavaScript
npm run build

# Volte para a pasta raiz do projeto
cd ..
```

### 3. Inicie o Ambiente n8n com Docker Compose

Com o conector já compilado, podemos iniciar o n8n e o banco de dados PostgreSQL.

```bash
docker-compose up -d
```

O n8n estará disponível no seu navegador em `http://localhost:5678`. Pode levar um ou dois minutos para o serviço iniciar completamente.

## Como Usar o Conector

1.  Acesse `http://localhost:5678` e crie um novo workflow.
2.  Clique no botão `+` para adicionar um novo node.
3.  Na barra de busca, digite **"Random"**.
4.  Selecione o conector.
5.  No painel de configurações à direita, defina os valores de **Min** e **Max**.
6.  Execute o node para ver o número aleatório gerado no campo `randomNumber`.

## Estrutura do Projeto

```
/
├── docker-compose.yml      # Orquestra os contêineres do n8n e PostgreSQL.
├── nodes/                  # Contém o código-fonte do conector.
│   ├── package.json        # Dependências e definição do node para o n8n.
│   ├── tsconfig.json       # Configurações do compilador TypeScript.
│   └── src/
│       └── Random/
│           ├── Random.node.ts  # Lógica principal do conector.
│           └── icon.svg        # Ícone do conector.
└── README.md               # Este arquivo de instruções.
```