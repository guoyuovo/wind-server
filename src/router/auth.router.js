const Router = require('koa-router')
const authRouter = new Router({prefix: '/login'})
const {verifyLogin} = require('../middleware/auth.middleware')
const {login} = require('../controller/auth.controller')

authRouter.post('/', verifyLogin, login)

module.exports = authRouter
