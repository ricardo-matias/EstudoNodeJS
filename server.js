//'use strict' // força o javascript a ser mais criterioso (falha na compilação caso esquesa ';', etc)

/**
 * para criar um servidor http é necessário instalar pacotes adicionais:
 * 
 * npm install http express debug --save    ('--save' coloca o pacote como dependencia do projeto no package.json)
 * 
 * o comando acima cria a pasta node_modules
 * 
 * é interessante excluir a pasta antes de colocar no git, pois é desnecessária e pode ser usada como
 * depedencias no arquivo package.json utilizando o argumento '--save'.
 * 
 * após baixar o repositório, basta executar o comando npm install, para baixar todas as dependencias do projeto                                   
 */ 

// importações de dependencias da pasta node_modules

const http = require('http');
const debug = require('debug');
const express = require('express');

// criando servidor 

const app = express();
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

// definindo rota

const route = router.get('/', (request, response, next) => {
    response.status(200).send({
        titulo: "Estudo NodeJS API",
        versao: "0.0.1"
    });
});

app.use('/', route);

// fazendo o servidor ouvir uma porta

server.listen(port);
console.log("API rodando na porta: " + port);

// para fazer o servidor rodar basta executar o comando: node server.js