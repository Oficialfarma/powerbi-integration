# INTEGRAÇÃO E CRIAÇÃO DE BASE DE DADOS PARA CRIAÇÃO DE DASHBOARD
## Descrição
Módulo para obter os dados de pedidos, centralizar na base local e utilizar as informações na criação de Dashboards
> Status do Projeto: Em desenvolvimento :warning:
<br />
<p>
<img src="https://img.shields.io/hexpm/l/apa" alt="Badges" />
<img src="https://img.shields.io/static/v1?label=dependencies&message=node-fetch&color=brightgreen" alt="Badges"/>
</p>

## Objetivo
O objetivo do projeto é gerar uma ferramenta que execute a cada determinado período de tempo
uma requisição na api de pedidos da vtex - solicitando novas entradas de compras - e faça a atualização de pedidos já
existentes na base de dados local para a utilização de todas as informações necessárias na geração de Dashboards e demais planilhas
<br />


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
Verifique se na raíz existe o arquivo _**vtex_auth_config.js**_ caso não possua, acesse o portal da **VTEX** para obter a chave e o token de acesso e, também, o nome da conta, crie o arquivo com os itens de autenticação.
Exemplo de arquivo:
```javascript
const vtex_api_appKey_appToken = {
    "X-VTEX-API-AppKey": "sua-chave-de-acesso",
    "X-VTEX-API-AppToken": "seu-token-de-acesso"
};

const vtexAccountName = "nome da conta vtex que é utilizada como parte da url";

module.exports = {
    vtex_api_appKey_appToken,
    vtexAccountName
};
```
## Após ter as chaves de autenticação definidas, inicie a aplicação:
### Acessando a pasta src pelo terminal
> ``` cd src```

### Para iniciar a geração/atualização dos pedidos
> ```node index```

<br />

## :wrench: Tecnologias
As seguintes ferramentas estão sendo utilizadas na construção deste projeto:

- [Node.js](https://nodejs.org/en/)
- [SQL Server 2019 Express](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

## Licença
<img src="https://img.shields.io/hexpm/l/apa" alt="Badges"/>
<br />

## Autor
---
<b>Alessandro Lima de Miranda</b>

[![Linkedin Badge](https://img.shields.io/badge/-Alessandro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/alessandro-miranda-b23b74169)](https://www.linkedin.com/in/alessandro-miranda-b23b74169) 
[![Gmail Badge](https://img.shields.io/badge/-ad.lmiranda2018@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:ad.lmiranda2018@gmail.com)
