const mongoose = require('mongoose');
const path = require('path');
const glob = require('glob');

exports.connect = async () => {
  const uri = 'mongodb://admin:password/127.0.0.1:27017server/?authSource=admin';
  await mongoose.connect(uri, { useNewUrlParser: true }).catch(err => console.log(err));
  console.log('mongo connected success: ' + uri);
};

exports.loadModels = () => {
  const filePattern = path.resolve('./modules/*/*.model.js');
  const files = glob.sync(filePattern);
  files.forEach(file => require(file));
};