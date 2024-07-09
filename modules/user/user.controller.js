const mongoose = require('mongoose');
const userModel = require('./user.model');
const _ = require('lodash');



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
};