const http = require('http'); // Criando um objeto com a lib http (tratar as resuisiçÕes)
const app = require('./app'); // Incluindo no meu projeto o arquivo app.js
const port = process.env.port || 3000; // Configurar a porta que ele vai escutar
const server = http.createServer(app); // Criar o servidor propriamente dito
server.listen(port); // Configurar a porta que o servidor irá escutar