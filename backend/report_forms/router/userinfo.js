const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')

router.post('/verifyToken', userinfo_handler.verifyToken)
router.get('/getImagePath/:username', userinfo_handler.getUserImage)

module.exports = router