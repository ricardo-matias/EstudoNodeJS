const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Conecta com o banco

//mongoose.connect("mongodb+srv://Ricardo:root@cluster0-pmnsv.mongodb.net/Test", { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/new', { useNewUrlParser: true });

// Carregar models

const User = require("./models/user.js");

// Carrega as rotas

const testRoutes = require("./routes/test-routes");
const userRoutes = require("./routes/user-routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', testRoutes);
app.use('/usuarios', userRoutes);

// exportando a aplicação
// toda vez que a classe for instanciada oque vai é o app

module.exports = app;