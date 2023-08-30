const router = require('express').Router()
const {ChatRoomController} = require('../controllers')

router.post('/', ChatRoomController.addChatRoom)

module.exports =  {chatRoomRouter: router}