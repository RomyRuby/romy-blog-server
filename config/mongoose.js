const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');

exports.connect = async () => {
  const uri = 'mongodb://admin:password@47.98.122.17:27017server?authSource=admin';
  await mongoose.connect(uri, { useNewUrlParser: true }).catch(err => console.log(err));
  console.log('mongo connected success: ' + uri);
};

exports.loadModels = () => {
  const filePattern = path.resolve('./modules/*/*.model.js');
  const files = glob.sync(filePattern);
  files.forEach(file => require(file));
};