const Router = require('koa-router')
const {verifyChat, emitNewChat} = require('../middleware/chat.middleware')
const {createChat, getUserChat} = require('../controller/chat.controller')
const chatRouter = new Router({prefix: '/chat'})

chatRouter.post('/user', verifyChat, createChat, emitNewChat)
chatRouter.get('/user/:id', getUserChat)

module.exports = chatRouter
