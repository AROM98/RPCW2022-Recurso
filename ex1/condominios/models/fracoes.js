const mongoose = require('mongoose')

var fracoesSchema = new mongoose.Schema({
    Fracao: String,
    Permilagem: Number,
    Mensalidade: Number
})

module.exports = mongoose.model('fracoes', fracoesSchema)
