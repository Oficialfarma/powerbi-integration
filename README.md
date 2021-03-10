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
 - [ ] Obtenção da lista de pedidos gerais da API vtex
 - [ ] Obtenção de informações detalhadas dos pedidos
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
Crie o arquivo de configurção contendo a chave e token de autenticação da VTEX(vtex_authData.config.js) e o arquivo contendo o objeto de verificação de status da última requisição (lastRequestStatus.txt). Para obter as informações de acesso, acesse o perfil da sua loja VTEX e procure por: "X-VTEX-API-AppKey" e "X-VTEX-API-AppToken" e "VTEX ACCOUNT NAME"
Exemplo de arquivo de configuração:
```javascript
module.exports = {
    "X-VTEX-API-AppKey": "chave de acesso à API",
    "X-VTEX-API-AppToken": "token de acesso à API",
    "vtexAccountName": "nome da conta vtex"
};
```

Exemplo do objeto de status:
```json
{
    "lastRequest":"Tue Mar 09 2021 15:00:00 GMT-0300 (Horário Padrão de Brasília)",
    "status":"failed"
}
```
## Após ter as chaves de autenticação definidas, você poderá dar inicio a aplicação.

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
- [Typescript](https://www.typescriptlang.org/)

## Licença
<img src="https://img.shields.io/hexpm/l/apa" alt="Badges"/>
<br />

## Autor
<b>Alessandro Lima de Miranda</b>

[![Linkedin Badge](https://img.shields.io/badge/-Alessandro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/alessandro-miranda-b23b74169)](https://www.linkedin.com/in/alessandro-miranda-b23b74169) 
[![Gmail Badge](https://img.shields.io/badge/-ad.lmiranda2018@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:ad.lmiranda2018@gmail.com)
[![Github Badge](https://img.shields.io/github/followers/Alessandro-Miranda?label=Follow&style=social)](https://github.com/Alessandro-Miranda)