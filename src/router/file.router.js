const Router = require('koa-router')
const {avatarHandler} = require('../middleware/file.middleware')
const {returnStaticUrl} = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/avatar', avatarHandler, returnStaticUrl)

module.exports = fileRouter
