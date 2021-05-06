# INTEGRAÇÃO BASE DE DADOS E POWER BI
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
 - [ ] Manipulação das informações (remoção de dados que não serão armazenados) dos pedidos detalhados
 - [ ] Cadastro dos pedidos/informações no banco de dados
 - [ ] Atualização no banco de dados das informações dos pedidos
 - [x] Escrita e leitura de status / logs das requisições em disco local

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
*Obs*: Para obter os tokens de acesso para a api vtex, acesse o perfil da sua loja VTEX e procure por: "X-VTEX-API-AppKey" e "X-VTEX-API-AppToken" e "VTEX ACCOUNT NAME".

### Banco de Dados

Para importar o banco de dados é necessário apenas abrir o script que está na pasta *database* como uma nova query no SQL Server Management Studio e executar.
Pode ser necessário atualizar os paths para o caminho do SQL na sua máquina

### Para iniciar a geração dos pedidos em modo de desenvolvimento
> ```npm run dev```

### Execução de testes
Para rodar os testes dos módulos rode:
> ```npm test```

Para os testes com watch:
> ```npm run test:watch```

Para gerar a cobertura de códigos:
> ```npm run test:cov```

## Build
Para gerar o build do projeto execute:
> ```npm run build```

Logo após será possível iniciar a aplicação com:
> ```node build/src/index```

## :wrench: Tecnologias
As seguintes ferramentas estão sendo utilizadas na construção deste projeto:

- [Node.js](https://nodejs.org/en/)
- [SQL Server 2019 Express](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

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
