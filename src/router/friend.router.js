const Router = require('koa-router')
const friendRouter = new Router({prefix: '/friend'})
const {getRelation, emitToFriend, emitToUser} = require('../middleware/friend.middleware')
const {
  buildRelation,
  getFriendApply,
  updateRelationStatus,
  getFriend
} = require('../controller/friend.controller')

friendRouter.post('/', getRelation, buildRelation, emitToFriend)
friendRouter.get('/', getFriend)
friendRouter.put('/', updateRelationStatus, emitToUser)
friendRouter.get('/notice', getFriendApply)

module.exports = friendRouter
