const { app, init } = require('./koa');
const mongoose = require('./mongoose');
const minio = require('./minio');

exports.start = async () => {
  await mongoose.connect();//连接数据库
  mongoose.loadModels();//加载数据库模块

  minio.initMinio();

  try {
    init();//初始化koa相关
  } catch (err) {
    console.error(err);
  }
  // 响应
  app.use(ctx => {
    ctx.body = 'Hello Koa';
  });

  app.listen(8080);
  console.log('Server is running at 8080');
};


