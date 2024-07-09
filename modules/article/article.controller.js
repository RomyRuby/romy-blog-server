const mongoose = require('mongoose');
const Article = mongoose.model('article');
// const randomRange = require('../../utils/randomRange');


module.exports = {
  async list(ctx) {
    const { pageSize = 15, pageNum = 1 } = ctx.query;
    const getData = Article.find().sort('-created').skip((pageNum - 1) * pageSize).limit(Number(pageSize));
    const getCount = Article.count();
    const [list, count] = await Promise.all([getData, getCount]);
    ctx.body = { success: true, data: { list, pageSize, pageNum, count } };
  },

  async article(ctx) {
    // console.log(ctx.params.id);
    const getArticle = Article.findById(ctx.params.id);
    const { _id, content, title, created, updated } = await getArticle;
    ctx.body = { success: true, data: { _id, content, title, created, updated } };
  },

  async create(ctx) {
    const articleContent = ctx.request.body;
    const article = await Article.create(Object.assign(articleContent));
    ctx.body = { success: true, data: article, message: '保存成功' };
    console.log(ctx);
  },

  async update(ctx) {
    const articleContent = ctx.request.body;
    const article = await Article.findByIdAndUpdate(articleContent.id, articleContent, { new: true });
    ctx.body = { success: true, data: article, message: '修改成功' };
  },

  async delete(ctx) {
    try {
      await Article.deleteOne({ _id: ctx.params.id });
      ctx.body = { success: true };
    } catch (error) {
      ctx.body = { success: false };
    }

  },
};
