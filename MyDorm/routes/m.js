var
    express = require('express'),
    md5 = require('js-md5');
var router = express.Router();

var models = require('../models/User');
var User = models.User;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('m/login', { title: '手机登录' });
});

router.post('/', function(req, res, next) {
    var
        password = req.body.password,
        pw_md5 = md5(password);
    console.log(password);
    User.find({'md5': pw_md5}, {},
        function(err, data) {
            console.log(err);
            console.log(data);
            if (data[0]) {
                res.render('m/index_m', {title: '手机版', user: data[0]});
            }
            else {
                res.render('m/login', { title: '手机登录' });
            }
        }
    );
});

module.exports = router;
