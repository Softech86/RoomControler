/**
 * Created by leobai on 16/8/25.
 */
var express = require('express');
var router = express.Router();

var models = require('../models/User');
var User = models.User;

router.get('/login', function(req, res, next) {
    res.render('admin/login', { title: '后台登录'});
});

router.post('/login', function(req, res, next) {
    var data = req.body;
    var pw = data.password;
    if (pw == 'qwerty') {
        //res.render('admin/admin', { title: '后台管理'});

        User.find(function(err, doc) {
            res.json(doc);
        });
    }
    else {
        res.render('admin/login', { title: '后台登录'});
    }
});



module.exports = router;