const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');

exports.connect = async () => {
  const uri = 'mongodb://127.0.0.1:27017/server';
  await mongoose.connect(uri, { useNewUrlParser: true }).catch(err => console.log(err));
  console.log('mongo connected : ' + uri);
};

exports.loadModels = () => {
  const filePattern = path.resolve('./modules/*/*.model.js');//TODO: 这里的路径是怎么算的？
  const files = glob.sync(filePattern);
  files.forEach(file => require(file));
};