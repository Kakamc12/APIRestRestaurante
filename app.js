const URL_BASE = '/api.restaurante';
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const pratoDao = require('./rotas/pratoDao');
app.use(URL_BASE + '/prato-dao', pratoDao);

// http://localhost:3000/api.prato
/*
app.use(URL_BASE,(req,res,next) => {
    res.status(200).send({
        resposta : 'A URl padrão da sua API REST funcionou!'
    });
});*/

// Passou por todas as rotas e não encontrou a rota solicitada

app.use((req,res,next) => {
    const erro = new Error('Rota Inexistente!');
    erro.status = 404;
    next(erro)
});

// Exportar o objeto app (que trata as requisições) 
// para a minha variável de ambiente global
module.exports = app;