const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// definindo rota

const route = router.get('/', (request, response, next) => {
    response.status(200).send({
        titulo: "Estudo NodeJS API",
        versao: "0.0.2"
    });
});

const create = router.post('/', (request, response, next) => {
    response.status(201).send(request.body);
});

const put = router.put('/:id', (request, response, next) => {
    let id = request.params.id;
    response.status(200).send({
        id: id,
        item: request.body
    });
});

const remove = router.delete('/', (request, response, next) => {
    response.status(200).send(request.body);
});

app.use('/', route);
app.use('/usuarios', create);
app.use('/usuarios', put);
app.use('/usuarios', remove);

// exportando a aplicação
// toda vez que a classe for instanciada oque vai é o app

module.exports = app;