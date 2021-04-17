const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

// 用来保存对应的socket，就是记录对方的socket实例
const socketObj = {}
// socket连接
io.on('connection', (socket) => {
  socket.on('login', userInfo => {
    console.log(`${userInfo.username}登陆成功`)
    socketObj[userInfo.id] = userInfo
    socketObj[userInfo.id].socket = socket
  })
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('isInputting', message => {
    const {toId} = message
    socketObj[toId] && socketObj[toId].socket.emit('isInputting', message)
  })
  socket.on('notInputting', message => {
    const {toId} = message
    socketObj[toId] && socketObj[toId].socket.emit('notInputting', message)
  })
})

// 监听端口
server.listen(9999, () => {
  console.log('listening on *:9999')
})

module.exports = {
  socketObj,
  io
}
