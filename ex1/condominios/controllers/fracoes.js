const mongoose = require('mongoose')
var Fracoes = require('../models/fracoes')



module.exports.listarFracoes = function(){
    return Fracoes
        .find()
        .exec()
}

