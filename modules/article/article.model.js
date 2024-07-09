const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: '请填写标题'
  },
  content: {
    type: String,
    required: '请填写内容'
  },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('article', ArticleSchema);