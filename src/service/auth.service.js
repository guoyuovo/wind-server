const connection = require('../app/database')

class AuthService {
  // 用户登陆
  async login(userInfo) {
    // 获取用户请求传递的参数
    const {email, password} = userInfo
    // 查询数据
    const statement = `SELECT * FROM user WHERE email = ?;`
    const result = await connection.execute(statement, [email])
    // console.log(result[0])
    return result
  }

  // 判断用户是否存在
  async getUserByEmail(email) {
    const statement = `SELECT * FROM user WHERE email = ?;`
    const result = await connection.execute(statement, [email])
    return result[0]
  }
}

module.exports = new AuthService()
