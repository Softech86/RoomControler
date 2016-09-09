var express = require('express');
var router = express.Router();

var models = require('../models/WatchImg');
var WatchImg = models.WatchImg;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页', layout: 'layout.ejs'});
});

router.get('/currentWatchingImgLocation', function(req, res, next) {
  res.send('/images/watching/' + Math.round(Math.random()) + '.png');
  /*WatchImg.find({}, {}, {sort: [['CreateTimestamp', -1]]}, function(err, data) {
    console.log(data);
  });*/
});

router.get('/getLockStatus', function(req, res, next) {
  console.log('ask for lock status');
  //TODO: get lock status
  var status = Math.round(Math.random()) ? true : false;
  //status true: door locked => closed
  console.log('reply: ' + status);
  res.send(status);
});

router.post('/changeLockStatus', function(req, res, next) {
  console.log('change lock status');
  //TODO: change lock status
  console.log(req.body);
  var
      data = req.body,
      operate = data.operate,
      userPassword = data.userPassword;

  var returnData = {
      status: "",
      operate: ""
  };

  returnData.status = (operate == 'LOCK') ? 'CLOSE' : 'OPEN';
  returnData.operate = (operate == 'LOCK') ? 'UNLOCK' : 'LOCK';

  console.log(returnData);
  res.send(returnData);
});

module.exports = router;
