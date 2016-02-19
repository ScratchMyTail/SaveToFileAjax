var express = require('express');
var router = express.Router();
var fs = require('fs');
var LineByLineReader = require('line-by-line');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    var verdi = req.body.verdi;

    fs.appendFile('public/tekstfil.txt', verdi+"\n", function(err){
      res.end();
    });
});

router.get('/show', function(req, res, next) {
    lr = new LineByLineReader('public/tekstfil.txt');
    var arr = new Array();

    lr.on('line', function(line){
        arr.push(line);
    });

    lr.on('end', function(){
        console.log(arr);
        res.render('show', {linjer: arr});
    })
});

module.exports = router;
