const connection = require('../app/database')

class ChatService {
  // 添加聊天记录
  async createChat(chatInfo) {
    const {fromId, toId, message, type} = chatInfo
    const statement = `INSERT INTO user_chat ( fromId, toId, message, type) VALUES (?,?,?,?);`
    const result = await connection.execute(statement, [fromId, toId, message, type])
    // 返回添加结果
    return result
  }

  // 获取用户的聊天记录
  async getUserChat(userId) {
    const statement = `SELECT * FROM user_chat WHERE fromId = ?  
UNION
SELECT * FROM user_chat WHERE toId = ?;`
    const result = await connection.execute(statement, [userId, userId])
    // 返回查询结果
    return result
  }
}

module.exports = new ChatService()
