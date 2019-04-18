const mongoose = require('mongoose');
const User = mongoose.model('User');

// Metodos de crud do controller de usuários

exports.getAll = (request, response, next) => {
    User
        .find({active: true}, "_id name age phones")
        .then(users => {
            response.status(200).send(users);   
        }).catch(ex => {
            response.status(400).send({
                message: "Falha ao pegar lista de usuários",
                error: ex
            });
        });      
}

exports.getByName = (request, response, next) => {
    User
        .findOne({name: request.params.name, active: true}, "_id name age phones")
        .then(user => {
           // if (user) {
                response.status(200).send(user);
            /*} else {
                response.status(200).send("Usuário não encontrado");
            }*/
            
        }).catch(ex =>{
            response.status(400).send({
                message: "Falha ao buscar usuário",
                error: ex
            })
        })
}

exports.getByPhone = (request, response, next) => {
    User
        .find({
            phones: request.params.phone,
            active: "true"
        })
        .then(users => {
            response.status(200).send(users);
        }).catch(ex => {
            response.status(400).send({
                message: "Falha ao buscar usuários pelo numero de telefone",
                error: ex
            })
        })
}

exports.create = (request, response, next) => { 
    let user = new User(request.body);
    user
        .save()
        .then(insert => {
            response.status(201).send({
                message: "Usuário cadastrado com sucesso!"
            });    
        }).catch(ex => {
            response.status(400).send({
                message: "Falha ao cadastrar novo usuário!",
                error: ex
            });
        });       
}

exports.update = (request, response, next) => {
    User
        .findOneAndUpdate(request.params.id, {
            $set: {
                name: request.body.name,
                age: request.body.age,
                active: request.body.active,
                phones: request.body.phones
            }
        })
        .then(update => {
            response.status(200).send({
                message: "Usuario atualizado com sucesso!",
                //update: update
            })
        }).catch(ex => {
            response.send({
                message: "Falha ao atualizar usuário",
                error: ex
            })
        })
}

exports.delete = (request, response, next) => {
    User
        .findByIdAndDelete({_id: request.params.id})
        .then(x => {
            response.status(200).send({
                message: "Usuário deletado com sucesso!",
                user: x
            })
        }).catch(ex => {
            response.status(400).send({
                message: "Falha ao deletar usuário!",
                error: ex
            })
        })
}