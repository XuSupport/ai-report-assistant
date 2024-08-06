const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require('../db/db')

exports.verifyToken = (req, res) => {
    //不能用大写
    const token = req.headers['authorization'].split(' ')[1]
    if (!token) return res.cc('未提供身份认证信息')
    jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
        if (err) return res.cc(`出现异常:${err}`)
        res.send({
            status: 0,
            message: '身份认证通过！',
            id: decoded.id
        })
    })
}

exports.getUserImage = (req, res) => {
    const username = req.params.username;
    const sql = 'SELECT image FROM user WHERE username = ?';

    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.cc('获取用户头像失败！');
        }
        if (results.length === 0) {
            return res.cc('未找到该用户头像！');
        }
        // 返回图像路径
        res.send(`http://${config.host}${results[0].image}`);
    });
}