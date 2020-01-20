const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
// retirado o http do express, para trabalhar com o mesmo tiretamente.
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://tonyarthur:8844Tutu@cluster0-8uopa.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors());
//dizer para o express que aceita formato json
app.use(express.json());
app.use(routes);
// Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:
//Query Params: request.query(filtros, ordenação, paginação)
//Route Params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.Body (Dados para criação ou alteração)
//MongoDB ( acessar o mongoDB Atlas)

server.listen(3333);