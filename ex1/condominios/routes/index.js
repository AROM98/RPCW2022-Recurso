var express = require('express');
var router = express.Router();
const Movimentos = require('../controllers/movimentos')
const Fracoes = require('../controllers/fracoes')
const Pagamentos = require('../controllers/pagamentos')


router.get('/movimentos', function(req, res, next) {
  //para procurar por tipo
  if (req.query['groupBy'] == "Receita" ||req.query['groupBy'] == "Despesa" ) {
    console.log("QUERIE1 == ",req.query)
    Movimentos.listarMovimentosTipo(req.query['groupBy'])
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(error => {
        res.status(506).jsonp({ error: error })
      })
  }
  // procurar por entidade
  else if (req.query['groupBy'] == "entidade"){
    console.log("QUERIE2 == ",req.query)
    Fracoes.listarFracoes().
    then(dados =>{
      nomeFracoes = {} //nome da fracao : quanto paga
      dados.forEach(d =>{
        nomeFracoes[d.Fracao] = d.Mensalidade
      })
      Movimentos.listarMovimentos()
      .then(movs =>{
        result = []
        movs.forEach(m =>{
          if (m.Entidade in nomeFracoes){
            var obj = {entidade: m.Entidade, receita: m.Valor}
            result.push(obj)
          }else{
            var obj = {entidade: m.Entidade, despesa: m.Valor}
            result.push(obj)
          }
        })
        res.status(200).jsonp(result)
      })
      .catch(e => res.status(501).jsonp({error: e}))
    })
    .catch(e => res.status(501).jsonp({error: e}))
  }
  // senão devolve todos os movimentos
  else {
    Movimentos.listarMovimentos()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(501).jsonp({error: e}))
  }
});

router.get('/pagamentos', function(req, res, next) {
  if (req.query['status'] != undefined) {
    console.log("QUERIE1 == ",req.query)
    Fracoes.listarFracoes().
    then(dados =>{
      nomeFracoes = {} //nome da fracao : quanto paga
      dados.forEach(d =>{
        nomeFracoes[d.Fracao] = d.Mensalidade
      })
      Pagamentos.listarPagamentos()
      .then(pags =>{
        result = []
        console.log("POF1")
          var obj = {id: p.Fracao, Falta_pagar_ate_o_mes: p.Mensalidade}
          result.push(obj)
        
        res.status(200).jsonp(result)
      })
      .catch(e => res.status(501).jsonp({error: e}))
    })
    .catch(e => res.status(501).jsonp({error: e}))
  }
  else{
    Pagamentos.listarPagamentos()
    .then(dados =>{
      res.status(200).jsonp(dados)
    })
    .catch(e => res.status(501).jsonp({error: e}))
  }
});

router.get('/pagamentos/:id', function(req, res) {
  console.log("ID == ", req.params.id)
  Fracoes.listarFracoes().
    then(dados =>{
      nomeFracoes = {} //nome da fracao : quanto paga
      dados.forEach(d =>{
        nomeFracoes[d.Fracao] = d.Mensalidade
      })
      Pagamentos.listarPagamentos()
      .then(pags =>{
        result = []
        console.log("POF1")
        pags.forEach(p =>{
            const mensalidade = nomeFracoes[p.Fracao]
            var total = nomeFracoes[p.Fracao] * 12
            var pago = 0
            console.log("POF2")
            //console.log(p)
            for (x in p){
              if (p[x] == 1){
                pago += mensalidade
                console.log(x, p[x]);
              }
            }
            var obj = {id: p.Fracao, total_pago: pago, total_divida: (total-pago)}
            result.push(obj)
        })
        res.status(200).jsonp(result)
      })
      .catch(e => res.status(501).jsonp({error: e}))
    })
    .catch(e => res.status(501).jsonp({error: e}))
});

router.post('/movimentos', function(req, res) {
  Movimentos.inserir(req.body.numero, req.body.tipo, req.body.valor, req.body.entidade, req.body.descricao)
  .then(res =>{
    res.status(501).jsonp('Inserido com sucesso.')
  })
  .catch(e => res.status(501).jsonp({error: e}))
})


module.exports = router;
