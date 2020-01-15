const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
mongoose.connect('mongodb+srv://tonyarthur:8844Tutu@cluster0-8uopa.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//dizer para o express que aceita formato json
app.use(express.json());
app.use(routes);
// Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:
//Query Params: request.query(filtros, ordenação, paginação)
//Route Params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.Body (Dados para criação ou alteração)
//MongoDB ( acessar o mongoDB Atlas)

app.listen(3333);