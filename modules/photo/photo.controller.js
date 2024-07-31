const mongoose = require('mongoose');
const Photo = mongoose.model('photo');
const minio = require('../../config/minio');
const multiparty = require('multiparty');
// const randomRange = require('../../utils/randomRange');


module.exports = {
  async list(ctx) {
    const getData = Photo.find().sort('-created');
    const getCount = Photo.count();
    const [list, count] = await Promise.all([getData, getCount]);
    ctx.body = { success: true, data: { list, count } };
  },

  // async article(ctx) {
  //   // console.log(ctx.params.id);
  //   const getArticle = Article.findById(ctx.params.id);
  //   const { _id, content, title, created, updated } = await getArticle;
  //   ctx.body = { success: true, data: { _id, content, title, created, updated } };
  // },

  async create(ctx) {
    function formParse() {
      return new Promise(resolve => {
        let form = new multiparty.Form();
        form.parse(ctx.req, async function (err, fields, files) {
          const fileName = fields.fileName[0]; //获取上传文件名
          const file = files.file; // 获取上传文件
          const res = await minio.uploadFile(fileName, file);
          const photoContent = { fileName, fileInfo: res };
          const photo = await Photo.create(Object.assign(photoContent));
          resolve(photo);
        });
      });
    }
    const res = await formParse();
    ctx.body = { success: true, data: res, message: '上传成功' };
  },

  // async update(ctx) {
  //   const articleContent = ctx.request.body;
  //   const article = await Article.findByIdAndUpdate(articleContent.id, articleContent, { new: true });
  //   ctx.body = { success: true, data: article, message: '修改成功' };
  // },

  // async delete(ctx) {
  //   try {
  //     await Article.deleteOne({ _id: ctx.params.id });
  //     ctx.body = { success: true };
  //   } catch (error) {
  //     ctx.body = { success: false };
  //   }

  // },
};
