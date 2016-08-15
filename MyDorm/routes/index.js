var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页', layout: 'layout.ejs'});
});

router.get('/currentWatchingImgLocation', function(req, res, next) {
  res.send('/images/watching/' + Math.round(Math.random()) + '.png');
});

module.exports = router;
