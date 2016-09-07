/**
 * Created by leobai on 16/8/25.
 */
var express = require('express');
var router = express.Router();

var models = require('../models/User');
var User = models.User;

// login 登录页面
router.get('/login', function(req, res, next) {
    res.render('admin/login', { title: '后台登录'});
});

// login 验证密码
router.post('/login', function(req, res, next) {
    var data = req.body;
    var pw = data.password;

    if (pw == '') { // 这里是唯一的登录密码
        User.find(function(err, data) {
            res.render('admin/admin', { title: '后台管理', users: data});
        });
    }
    else {
        res.render('admin/login', { title: '后台登录'});
    }
});

router.get('/logout', function(req, res, next) {
    console.log('a');
    res.redirect('login');
});

// 修改用户数据
router.post('/data', function(req, res, next) {
    var data = req.body;
    console.log('post', data['data[]']);

    var user_data = {
        name: data['data[]'][0],
        id: data['data[]'][1],
        email: data['data[]'][2],
        password: data['data[]'][3]
    };

    //console.log(user_data);

    var _id = data['data[]'][4];
    //console.log('----update id = ' + _id + "," + user_data);
    User.findByIdAndUpdate(_id, user_data, function(err, docs) {
        //console.log('update-----'+ docs);
        User.find(function(err, data) {
            res.render('admin/admin', { title: '后台管理', users: data});
        });
    });

});

// 增加空用户
router.get('/data', function(req, res, next) {
    console.log('add');
    var u = new User({
        email: 'YOUR@EMAIL',
        name: 'YOUR_NAME',
        id: 'YOUR_USERID',
        password: ''
    });
    u.save(function (err, data) {
        console.log(data);
        User.find(function(err, data) {
            res.render('admin/admin', { title: '后台管理', users: data});
        });
    });
});

// 删除用户
router.delete('/data', function(req, res, next) {
    var data = req.body;
    console.log('delete', data);
    User.findByIdAndRemove(data.objectId, function(err, docs) {
        //console.log('delete-----'+ docs);
        User.find(function(err, data) {
            res.render('admin/admin', { title: '后台管理', users: data});
        });
    });
});


module.exports = router;