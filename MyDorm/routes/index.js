var express = require('express');
var router = express.Router();

var
    wModels = require('../models/WatchImg'),
    mModels = require('../models/Message'),
    uModels = require('../models/User');
var
    WatchImg = wModels.WatchImg,
    Message = mModels.Message,
    User = uModels.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页', layout: 'layout.ejs'});
});

router.get('/currentWatchingData', function(req, res, next) {
  var
      data = {
        path: "",
        updateTime: "",
        electric: 0
      };

  data.path = '/images/watching/1.png?t=' + Math.round(Math.random() * 10000);
  data.updateTime = "12:34:50";
  data.electric = 43.21;

  res.send(data);
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

router.get('/downloadMessage', function(req, res, next) {
    console.log('download message', req.query);
    var
        from = parseInt(req.query.from),
        to = parseInt(req.query.to),
        latestId = req.query.latestId;

    Message.find(function(err, msgs) {
        var
            len = msgs.length,
            sortFunc =function(a, b) {
                return parseInt(a.createTimestamp) - parseInt(b.createTimestamp);
            };
        if (!msgs.find)
            msgs = [msgs];

        msgs.sort(sortFunc);
        console.log(msgs, len, from, to, latestId);

        if (from && from < 0) {
            from += len;
            if (from < 0)
                from = 0;
        }
        if (to && to < 0) {
            to += len;
            if (to < 0)
                to = 0;
        }

        if (latestId) {
            var index =
                msgs.indexOf(
                    msgs.find(
                        function(item){
                            return item._id == latestId;
                        }
                    )
                );
            if (to) {
                // after _id to to
                res.send(msgs.slice(index + 1, to + 1));
            }
            else {
                // from from to before _id
                console.log(msgs.slice(from, index).map(function(a){return a.content}), from, to + 1, 'from');

                res.send(msgs.slice(from, index).reverse());
            }
        }
        else {
            console.log(msgs.slice(from, to + 1), from, to + 1, 'here');
            if (from > to)
                res.send([]);
            else
                res.send(msgs.slice(from, to + 1));
        }
    });
    console.log('ha');
});

router.post('/sendMessageData', function(req, res, next) {
    var
        data = req.body;
    console.log(data);

    User.find({'md5': data.userPassword}, {},
        function(err, userdata) {
            if (userdata[0]) {
                // 发送信息的用户
                console.log(userdata[0]);

                var
                    userName = userdata[0].name,
                    d = new Date(),
                    m = new Message({
                        userName: userName,
                        content: data.content,
                        createTimestamp: d.getTime()
                    });

                m.save(function(err, data) {
                    res.sendStatus(200);
                });
            }
            else {
                res.sendStatus(503);
            }
        }
    );
});

router.post('/uploadImage', function(req, res, next) {
    console.log('image upload');
    var
        data = req.body,
        file = data.file;
    console.log(req.files);
    res.sendStatus(200);
});


module.exports = router;
