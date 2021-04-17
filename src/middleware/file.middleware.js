const multer = require('koa-multer')

const storage = multer.diskStorage({ // multer调用diskStorage可控制磁盘存储引擎
    destination(req, file, cb) {
      cb(null, '../uploads/avatar')
    },
    filename(req, file, cb) {
      let type = file.originalname.split('.')[1]
      cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`) // 文件名使用cb回调更改，参数二是文件名，为了保证命名不重复，使用时间戳
    }
  }
)

const upload = multer({
  storage
})
const avatarHandler = upload.single('avatar')

module.exports = {
  avatarHandler
}
