const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const paramsMap = {
  username: '用户名',
  password: '密码',
  confirmPassword: '用户名',
  email: '邮箱'
};

const emailReg = /^[\w.-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
const phoneReg = /^1[3|4|5|8]\d{9}$/;
const passwordReg = /[0-9a-zA-Z]{8,16}/;


exports.signUp = async ctx => {
  try {
    const { username, password, confirmPassword, email, phone, wx } = ctx.request.body;

    // 判断密码
    if (password !== confirmPassword) {
      return (ctx.body = { success: false, message: '两次密码不一致' });
    }

    if (!username) {
      return ctx.body = { success: false, code: 2001, message: '用户名不能为空' };
    }
    if (!password) {
      return ctx.body = { success: false, code: 2001, message: '密码不能为空' };
    }
    if (!confirmPassword) {
      return ctx.body = { success: false, code: 2001, message: '请输入确认密码' };
    }
    if (!email) {
      return ctx.body = { success: false, code: 2001, message: '邮箱不能为空' };
    }
    if (!emailReg.test(email)) {
      ctx.body = { success: false, code: 2002, message: '邮箱格式错误' };
    }
    if (!passwordReg.test(password)) {
      ctx.body = { success: false, code: 2002, message: '密码格式错误,请输入由数字或者字母构成的8-16位的密码' };
    }
    if (!phoneReg.test(phone)) {
      ctx.body = { success: false, code: 2002, message: '电话格式错误' };
    }

    // 保存用户
    const user = await userModel.create({ email, password, username, phone, wx });
    ctx.body = { success: true, data: _.omit(user.toObject(), ['password', 'salt']) };
  } catch (error) {
    console.log('xxx', error);
    if (error.code === 11000) {
      ctx.body = { success: false, code: 2003, message: paramsMap[Object.keys(error.keyValue)[0]] + '已存在，请更换' };
    }
  }
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