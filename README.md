# INTEGRAÇÃO VTEX, SQL Server e POWER BI
## Descrição
Módulo para obter os dados de pedidos, centralizar em base local e utilizar as informações na criação de Dashboards
> Status do Projeto: Em desenvolvimento :warning:

## Objetivo
Criar um módulo capaz de executar a cada determinado período de tempo
uma requisição na api de pedidos da vtex - solicitando novas entradas de compras - e faça a atualização de pedidos já
existentes na base de dados local para a utilização de todas as informações necessárias na geração de Dashboards e demais planilhas.
<br />

## Funcionalidades
 - [x] Obtenção da lista de ID's dos pedidos do período especificado
 - [x] Obtenção de informações detalhadas dos pedidos
 - [x] Manipulação das informações (remoção de dados que não serão armazenados e dados duplicados ou que já existem no banco de dados) dos pedidos detalhados
 - [x] Cadastro dos novos pedidos/informações no banco de dados
 - [x] Coleta de novos pedidos a cada 30 minutos
 - [x] Atualização no banco de dados das informações dos pedidos a cada 20 minutos
 - [x] Escrita e leitura de status / logs das requisições em disco local
 - [x] Realização de back-up automático à meia-noite

## Inicialização, instalação das dependências e execução de testes.
### Pré-requisitos
Antes de começar será necessário ter instalado em sua máquina o [Node.js](https://nodejs.org/en/) e o [SQL Server 2019 Express](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads).

## Instalando as dependências
### Acesse a pasta raíz do projeto pelo terminal
> ```cd powerbi-integration```

### Instale as dependências do projeto com:
> ```npm install```

## Iniciar a aplicação

Crie o arquivo *.env* na raíz do projeto contendo os tokens de autenticação e configurações do banco de dados. Para a criação dessas variáveis de ambiente, siga o arquivo de exemplo *.env.example* que se encontra também na raíz.
Certifique-se de ter feito a importação no banco de dados da tabela contendo o status da última requisição feita.
*Obs*: Para obter os tokens de acesso, acesse o perfil da sua loja VTEX e procure por: "X-VTEX-API-AppKey" e "X-VTEX-API-AppToken" e "VTEX ACCOUNT NAME".

### Banco de Dados

Para importar o banco de dados é necessário apenas abrir o script que está na pasta *database* como uma nova query no SQL Server Management Studio e executar.
Após ter o banco já instanciado, é necessário preencher as informações da tabela _requestStatus_ com o horário que se deseja iniciar a obtenção de pedidos.

_Obs.: é recomendado que o horário inserido seja próximo no limite de até 8 horas do horário da build, caso contrário, será necessário atualizar manualmente no código o horário máximo para obtenção dos pedidos por dois fatores:_

_1 - A VTEX limita em até 30 páginas sua API_

_2 - Evitar que ocorra estouro de pilha na execução dos métodos de manipulação e remoção de itens duplicados_

### Para iniciar a geração dos pedidos em modo de desenvolvimento
> ```npm run dev```

### Execução de testes
Para inicar a execução dos testes:
> ```npm test```

Para realização dos testes utilizando o modo watch:
> ```npm run test:watch```

Para gerar a cobertura de códigos:
> ```npm run test:cov```

## Build
Para gerar o build do projeto execute:
> ```npm run build```

Logo após será possível iniciar a aplicação em modo produção com:
> ```npm start```

## Especificações

### Limite de pedidos sendo manipulados

Devido aos laços de repetição e recursividade utilizado em alguns módulos para a limpeza de itens que por ventura venham duplicados, o limite máximo de horas - em valor aproximado pois pode variar de acordo com a quantia de pedidos do período - está entre 6 e 9 horas.

### Tolerância à erros

Por rodar processos filhos, todo erro que ocorrer em algum dos childs lançados durante obtenção, atualização ou backup não derruba o sistema por completo, apenas o processo que gerou o erro é finalizado ou, se o erro for em pontos não esperados, o processo filho fica parado sem continuidade mas o processo principal consegue reexecutar o procedimento lançando uma nova thread após o período de tempo determinado para cada função.

### Tempos de execução

Tempo estimado para a finalização de cada processo:

- Download de pedidos: 1/2 minutos (Período de 9 horas)
- Atualização de pedidos (execução de blocos de 500 a cada 20 segundos): 6/9 minutos
- Backup da base de dados: 1 minuto

## :wrench: Ferramentas
As seguintes ferramentas foram utilizadas na construção deste projeto:

- [Node.js](https://nodejs.org/en/)
- [SQL Server 2019 Express](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)
- [Axios](https://www.npmjs.com/package/axios)
- [uuidv4](https://www.npmjs.com/package/uuidv4)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [node-cron](https://www.npmjs.com/package/node-cron)
<!-- - [pm2](https://pm2.keymetrics.io/) -->

## Licença
<img src="https://img.shields.io/hexpm/l/apa" alt="Badges"/>

## Autores
<b>Alessandro Lima de Miranda</b>

[![Linkedin Badge](https://img.shields.io/badge/-Alessandro-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/alessandro-miranda-b23b74169)](https://www.linkedin.com/in/alessandro-miranda-b23b74169) 
[![Gmail Badge](https://img.shields.io/badge/-ad.lmiranda2018@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tgmarinho@gmail.com)](mailto:ad.lmiranda2018@gmail.com)
[![Github Badge](https://img.shields.io/github/followers/Alessandro-Miranda?label=Follow&style=social)](https://github.com/Alessandro-Miranda)

<b>Grupo OficialFarma</b>

[![Linkedin Badge](https://img.shields.io/badge/-Oficialfarma-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/company/oficialfarma/mycompany/)](https://www.linkedin.com/company/oficialfarma/mycompany/)
[![Github Badge](https://img.shields.io/github/followers/Oficialfarma?label=Follow&style=social)](https://github.com/Oficialfarma)
