const express = require('express')
//nodemon
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const index = express()
const mycrypto = require('../utils/cryptoUtils')
const port = 3001
const db = require('../db/index');
var models = require('../db/model');
var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/test');
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
    // we're connected!
});

//const crypto = require('crypto');

index.use(bodyParser.json()); // for parsing application/json
index.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
index.use(cookieParser());


index.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");


    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type,token");//content-type
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    //res.header("Access-Control-Expose-Headers", "*");

    if (req.path != '/login' && req.path != '/signup') {
        if (!req.cookies.token || !req.cookies.username) {
            return res.json({
                success: false,
                status: -1,
                message: '请先登录(缺失token)!'
            })
        } else {
            if (!checkIsLogin(req.cookies.token, req.cookies.username)) {
                return res.json({
                    success: false,
                    status: -1,
                    message: '请先登录(token过期)!'
                })
            }
        }
    }

    // res.header("token", "*");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});


/*var User = mongoose.model('User', userSchema);*/
index.get('/another',(req, res) => {
    return res.json({
        success: true,
        status: 1,
        message: '成功访问another接口!'
    })
});

index.post('/signup', (req, res) => {
    const params = req.body;
    db.findUserByUsername(params.username).then(() => {
        return res.json({
            success: false,
            status: -1,
            message: '该用户已注册!'
        })
    }, () => {
        db.createUser(params.username, params.password)
            .then(() => {
                return res.json({
                    success: true,
                    status: 0,
                })
            }).catch((e) => {
            console.log(e);
        })
    }).catch((e) => {
        console.log(e);
    })
})

function checkIsLogin(token, username) {
    console.log(token,username);
    const check_token = require('../utils/cryptoUtils').mydecrypto(token, "password");

    console.log("check_token",check_token);
    console.log("username",username);
    if (check_token == username) {
        return true;
    } else return false;
}


index.post('/login', (req, res) => {
    const params = req.body;
    if (!req.cookies.token || !req.cookies.username) {
        //不是if判断~
        db.findUser(params.username, params.password)
            .then(() => {
                res.cookie("username", params.username, {maxAge: 900000, /*httpOnly: true*/});
                res.cookie("token", mycrypto.mycrypto(params.username, "password"), {maxAge: 900000, /*httpOnly: true*/});
                //   res.header("Access-Control-Expose-Headers", "*");

                return res.json({
                    success: true,
                    status: 0,
                    token: mycrypto.mycrypto(params.username, "password")
                })
            }, () => {
                return res.json({
                    success: false,
                    status: -1,
                })
            }).catch((e) => {
            console.log(e);
        })
    }
    else {
        if (!checkIsLogin(req.cookies.token, req.cookies.username)) {
            return res.json({
                success: false,
                status: -1,
            })
        }else{
            return res.json({
                success: true,
                status: 1,
            })
        }
    }
})

index.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})