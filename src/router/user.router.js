const Router = require('koa-router')
const {create, search, getUserInfo, updateUserInfo} = require('../controller/user.controller')
const userRouter = new Router({prefix: '/user'})
const {verifyUser, handlePassword} = require('../middleware/user.middleware')
userRouter.post('/', verifyUser, handlePassword, create)
userRouter.put('/', updateUserInfo)
userRouter.get('/', search)
userRouter.get('/:id', getUserInfo)

module.exports = userRouter
