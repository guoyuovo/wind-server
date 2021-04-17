class fileController {
  async returnStaticUrl(ctx, next) {
    // 1.获取图像相关的信息
    const {filename} = ctx.req.file
    // console.log(ctx.req.file)
    // 2.将图像信息数据保存到数据库中
    ctx.body = `${ctx.origin}/avatar/${filename}`
  }
}

module.exports = new fileController()
