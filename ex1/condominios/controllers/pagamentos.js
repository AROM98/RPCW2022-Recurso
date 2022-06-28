const mongoose = require('mongoose')
var Pagamentos = require('../models/pagamentos')



module.exports.listarPagamentos = function(){
    return Pagamentos
        .find()
        .exec()
}