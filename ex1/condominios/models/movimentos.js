const mongoose = require('mongoose')

var movimentosSchema = new mongoose.Schema({
    Numero: String,
    Tipo: String,
    Data: Date,
    Valor: Number,
    Entidade: String,
    Descricao: String
})

module.exports = mongoose.model('movimentos', movimentosSchema)
