const mongoose = require('mongoose')
var Movimentos = require('../models/movimentos')

module.exports.inserir = function(num, tipo, valor, ent, desc){
    var data = new Date()
    movimento.Data = data.toISOString().substring(0, 16)
    movimento.Numero = num
    movimento.Tipo = tipo
    movimento.Valor = valor
    movimento.Entidade = ent
    movimento.Descricao = desc
    var newMov = new Movimentos(movimento)
    return newMov.save()
}

module.exports.listarMovimentos = function(){
    return Movimentos
        .find()
        .exec()
}

module.exports.listarMovimentosTipo = function(tipo){
    return Movimentos
        .find({Tipo: tipo},{})
        .exec()
}

module.exports.listarMovimentosEntidade = function(){
    return Movimentos
        .find()
        .exec()
}

