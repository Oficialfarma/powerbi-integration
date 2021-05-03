# INTEGRAÇÃO BASE DE DADOS E POWER BI
## Descrição
Módulo para obter os dados de pedidos, centralizar na base local e utilizar as informações na criação de Dashboards
> Status do Projeto: Em desenvolvimento :warning:
<br />

## Objetivo
O objetivo do projeto é gerar uma ferramenta que execute a cada determinado período de tempo
uma requisição na api de pedidos da vtex - solicitando novas entradas de compras - e faça a atualização de pedidos já
existentes na base de dados local para a utilização de todas as informações necessárias na geração de Dashboards e demais planilhas
<br />

## Funcionalidades
 - [x] Obtenção da lista de ID's dos pedidos do período especificado
 - [x] Obtenção de informações detalhadas dos pedidos
 - [ ] Manipulação das informações (remoção de dados que não serão armazenados) dos pedidos detalhados
 - [ ] Cadastro dos pedidos/informações no banco de dados
 - [ ] Atualização no banco de dados das informações dos pedidos
 - [x] Escrita e leitura de status / logs das requisições em disco local

## Inicialização, instalação das dependências e execução de testes.
### Pré-requisitos
Antes de começar será necessário ter instalado em sua máquina o [Node.js](https://nodejs.org/en/) e o [npm](https://www.npmjs.com/).

## Instalando as dependências
### Acesse a pasta raíz do projeto pelo terminal
> ```cd powerbi-integration```

### Para baixar as dependências do projeto utilize:
> ```npm install```

&nbsp;
## Execução de testes
Para rodar os testes dos módulos rode:
> ```npm test```

&nbsp;
## Iniciar a aplicação

Crie o arquivo *.env* na raíz do projeto contendo os tokens de autenticação e configurações do banco de dados. Para a criação dessas variáveis de ambiente, siga o arquivo de exemplo *.env.example* que se encontra também na raíz.
Certifique-se de ter feito a importação no banco de dados da tabela contendo o status da última requisição feita.
*Obs*: Para obter os tokens de acesso para a api vtex, acesse o perfil da sua loja VTEX e procure por: "X-VTEX-API-AppKey" e "X-VTEX-API-AppToken" e "VTEX ACCOUNT NAME".

### Para iniciar a geração dos pedidos em modo de desenvolvimento
> ```npm run dev```
<br />

### Para iniciar a geração dos pedidos em produção<br />
Gere o build utilizando:

> ```npm run build```

Logo após inicie a aplicação:
> ```node build/src/index```

<br />

## :wrench: Tecnologias
As seguintes ferramentas estão sendo utilizadas na construção deste projeto:

- [Node.js](https://nodejs.org/en/)
- [SQL Server 2019 Express](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

## Licença
<img src="https://img.shields.io/hexpm/l/apa" alt="Badges"/>
<br />

## Autores
<b>Alessandro Lima de Miranda</b>

[![Linkedin Badge](https://img.shields.io/badge/-Alessandro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/alessandro-miranda-b23b74169)](https://www.linkedin.com/in/alessandro-miranda-b23b74169) 
[![Gmail Badge](https://img.shields.io/badge/-ad.lmiranda2018@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:ad.lmiranda2018@gmail.com)
[![Github Badge](https://img.shields.io/github/followers/Alessandro-Miranda?label=Follow&style=social)](https://github.com/Alessandro-Miranda)

<b>Grupo OficialFarma</b>

[![Linkedin Badge](https://img.shields.io/badge/-Oficialfarma-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/company/oficialfarma/mycompany/)](https://www.linkedin.com/company/oficialfarma/mycompany/)
[![Github Badge](https://img.shields.io/github/followers/Oficialfarma?label=Follow&style=social)](https://github.com/Oficialfarma)