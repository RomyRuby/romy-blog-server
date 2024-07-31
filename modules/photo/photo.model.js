const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  fileName: {
    type: String,
    required: '请填写名称'
  },
  fileInfo: {
    type: Object,
    required: '图片信息不能为空'
  },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('photo', PhotoSchema);