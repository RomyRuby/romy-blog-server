const Minio = require('minio');
let minioClient;

//创建 minio 客户端
exports.initMinio = () => {
  try {
    minioClient = new Minio.Client({
      endPoint: '47.98.122.17', //主机域名或ip地址
      port: 9000, //端口
      useSSL: false, //需要https访问就开启true，像我这样懒的就不开了
      //配置accessKey secretKey
      accessKey: 'OBEwJtQhFBEOf9KM7Vio',
      secretKey: 'CIMIYKMUpfJtzVNALrWngcgMyfpSBM9IAPrOmEeY',
    });
    console.log('minio init successed');
  } catch (error) {
    console.log('minio init failed:', error);
  }
};


exports.uploadFile = (fileName, file) => {
  return new Promise((resolve, reject) => {
    //设置文件类型
    const metaData = {
      // 'Content-Type': 'application/octet-stream'//二进制文件
      // 'Content-Type': 'image/png' //图片
      // 'Content-Type': type
    };

    minioClient.fPutObject('romy-blog', fileName, file[0].path, metaData, function (err, objInfo) {
      if (err) return reject(err);
      resolve(objInfo);
    });
  });
};

