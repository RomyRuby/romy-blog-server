const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');


exports.signUp = async ctx => {
  const { username, password, confirmPassword, email } = ctx.request.body;

  // 判断密码
  if (password !== confirmPassword) {
    return (ctx.body = { success: false, message: '两次密码不一致' });
  }

  // 保存用户
  const user = await userModel.create({ email, password, username });
  ctx.body = { success: true, data: _.omit(user.toObject(), ['password', 'salt']) };
};


exports.login = async ctx => {
  const { email, password } = ctx.request.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return (ctx.body = { success: false, message: '邮箱或密码错误' });
  }

  const isCorrect = await user.validatePassword(password);

  if (!isCorrect) {
    return (ctx.body = { success: false, message: '用户名或密码错误' });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, 'romy');

  ctx.body = {
    success: true,
    data: { user: _.omit(user.toObject(), ['password', 'salt']), token }
  };

};

exports.getInfo = async ctx => {
  console.log(ctx.state);
};