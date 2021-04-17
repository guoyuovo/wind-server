const Koa = require('koa')
const path = require('path')
const staticFiles = require('koa-static')
const jwt = require('jsonwebtoken')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const friendRouter = require('../router/friend.router')
const fileRouter = require('../router/file.router')
const chatRouter = require('../router/chat.router')
const errorHandle = require('./error-handle')
const socket = require('./socket')
const {SECRET_KEY} = require('./config')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (ctx.method === 'OPTIONS') {
    ctx.body = 200
  } else {
    await next()
  }
})
// 启动静态资源服务
app.use(staticFiles(path.resolve(__dirname, '../../../uploads')))

app.use(async (ctx, next) => {
  const {authorization} = ctx.headers
  const {path} = ctx.request
  try {
    const result = jwt.verify(authorization, SECRET_KEY)
    ctx.headers.requestUserId = +result.id
  } catch (error) {
    if (path !== '/user' && path !== '/login') {
      ctx.status = 401
      return ctx.body = '当前登陆状态过期,请重新登陆~'
    }
  }
  await next()
})

app.use(bodyParser())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

app.use(friendRouter.routes())
app.use(friendRouter.allowedMethods())

app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())

app.use(chatRouter.routes())
app.use(chatRouter.allowedMethods())

app.on('error', errorHandle)

module.exports = app
