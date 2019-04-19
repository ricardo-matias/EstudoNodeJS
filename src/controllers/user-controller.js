const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserRepository = require('../repositories/user-repository');

// Metodos de crud do controller de usuários

exports.getAll = async(request, response, next) => {
    try {
        let users = await UserRepository.getAll();
        response.status(200).send(users);
    } catch (ex) {
        throwException(response, "Falha ao buscar lista de usuários", ex);
    }
    
}

exports.getByName = async(request, response, next) => {
    try {
        let user = await UserRepository.getByName(request.params.name);
        if (user) {
            response.status(200).send(user);
        } else {
            response.status(400).send(
                'Nenhum usuário com o nome "' + request.params.name + '" foi encontrado!'
            );
        } 
    } catch(ex) {
        throwException(response, "Falha ao buscar usuário por nome", ex);
    }
}

exports.getByPhone = async(request, response, next) => {
    try {
        let users = await UserRepository.getByPhone(request.params.phone);
        response.status(200).send(users);
    } catch(ex) {
        throwException(response, "Falha ao buscar usuário pelo telefone", ex);
    }
}

exports.create = async(request, response, next) => { 
    try {
        await UserRepository.create(request.body);
        response.status(200).send("Usuário cadastrado com sucesso!");
    } catch(ex) {
        throwException(response, "Falha ao cadastrar usuário", ex);
    }    
}

exports.update = async (request, response, next) => {
    try {
        await UserRepository.update(request.params.id, request.body);
        response.status(200).send({
            message: "Usuario atualizado com sucesso!",
        });
    } catch (ex) {
        throwException(response, "Falha ao atualizar usuário", ex);
    }
}

exports.delete = async(request, response, next) => {
    try {
        await UserRepository.delete(request.params.id);
        response.status(200).send({
            message: "Usuário deletado com sucesso!",
        });
    } catch(ex) {
        throwException(response, "Falha ao deletar usuário", ex);
    }
}

/**
 * Recebe o objeto response, uma messagem de erro e a exceção gerada e devolve uma messagem 
 * de erro completa para o usuário.
 * 
 * @response : objeto response da requisição, usado para retornar a messagem para o usuário
 * @message : messagem de erro que será enviada para o usuário
 * @exception : exceção gerada pela tentativa de uso do banco
 */

throwException = (response, message, exception) => {
    response.status(500).send({
        message: message,
        error: {
            message: exception.message,
            type: exception.name
        }
    })
}