var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pagamentos', function(req, res, next) {
  axios.get('http://localhost:3000/api/pagamentos')
    .then(pags => {
      console.log(pags)
      res.render('pagamentos', { pagamentos: pags});
    })
    .catch(e => res.render('error', { error: e }))
});

router.get('/movimentos', function(req, res, next) {
  axios.get('http://localhost:3000/api/movimentos')
    .then(movs => {
      console.log(movs)
      res.render('movimentos', { movimentos: movs});
    })
    .catch(e => res.render('error', { error: e }))
});

module.exports = router;
