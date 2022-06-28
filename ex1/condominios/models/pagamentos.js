const mongoose = require('mongoose')

var pagamentosSchema = new mongoose.Schema({
    Fracao: String,
    Jan: Number,
    Fev: Number,
    Mar: Number,
    Abr: Number,
    Mai: Number,
    Jun: Number,
    Jul: Number,
    Ago: Number,
    Set: Number,
    Out: Number,
    Nov: Number,
    Dec: Number
})

module.exports = mongoose.model('pagamentos', pagamentosSchema)
