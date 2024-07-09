const article = require('./article.controller');

/**
 * list
 * @description 获取列表
 * @query pageNum 页数
 * @query pageSize 每页的数量
 */
module.exports = router => {
  router.get('/articles', article.list)
    .get('/article/:id', article.article)
    .post('/articles', article.create)
    .put('/articles', article.update)
    .delete('/article/:id', article.delete);
};
