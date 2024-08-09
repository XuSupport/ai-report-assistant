const db = require('../db/db')
const fs = require('fs')
const bcrypt = require('bcryptjs')
//生成token字符串
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.uploadImagePath = (req, res) => {
    //req.file 是通过 multer 中间件处理上传的文件后得到的文件对象
    if (!req.file) {
        return res.cc('未获取到图像数据');
    }

    // 将文件路径存入数据库,filename是定义过的格式
    const imagePath = `/images/${req.file.filename}`;
    const sqlStr = 'INSERT INTO user SET ?';
    db.query(sqlStr, {image: imagePath}, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send({
            status: 1,
            message: '图片上传成功！',
            path: imagePath
        });
    });
}

exports.regUser = (req, res) => {
    const userinfo = req.body
    const sqlStr = 'SELECT * FROM user WHERE username = ?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.cc('查询用户名失败！')
        } else if (results.length > 0) {
            return res.cc('该用户名已被占用！')
        } else {
            //req.file 是通过 multer 中间件处理上传的文件后得到的文件对象
            if (!req.file) {
                return res.cc('未获取到用户头像数据！');
            }
            // 将文件路径存入数据库,filename是定义过的格式
            //req.file 是由 multer 处理并添加到请求对象中的
            const imagePath = `/images/${req.file.filename}`;
            userinfo.password = bcrypt.hashSync(userinfo.password, 10)
            const sqlStr = 'INSERT INTO user SET ?';
            db.query(sqlStr, {
                username: userinfo.username,
                password: userinfo.password,
                image: imagePath
            }, (err, results) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send({
                    status: 0,
                    message: '用户注册成功！',
                    path: imagePath
                });
            });
        }
    })
}

exports.login = (req, res) => {
    const userinfo = req.body
    const sqlStr = 'SELECT * FROM user WHERE username = ?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            res.cc(err)
        } else if (results.length !== 1) {
            res.cc('用户不存在！')
        } else {
            console.log(results[0]);
            const compareResult = bcrypt.compare(userinfo.password, results[0].password, (compareErr, compareResult) => {
                if (compareErr) return res.cc('密码比对失败');
                if (!compareResult) return res.cc('密码错误！')
                //只保留id和username信息在token字符串中
                const user = {...results[0], password: '', image: ''}
                const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
                console.log(results[0].image)
                res.send({
                    status: 0,
                    message: '登录成功！',
                    tokenStr: 'Bearer ' + tokenStr,
                    username: results[0].username,
                    userImage: results[0].image // 将用户头像URL添加到响应中
                })
            })
        }
    })
}