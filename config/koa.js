const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const glob = require('glob');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const router = new Router();
const app = new Koa();

app.on('error', function (err) {
  console.log('errlog - ', err);
  console.log(err);
});


exports.app = app;
exports.router = router;


const initMiddleware = () => {
  app.use(cors({ credentials: true }));
  app.use(bodyParser());
};

const initLog = () => {
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${ms} ms`);
  });
};

const initRoutes = () => {
  const files = glob.sync(path.resolve('./modules/*/*.route.js'));
  files.forEach(file => require(file)(router));
  app.use(router.routes()).use(router.allowedMethods());
};

const initPassport = () => {
  const files = glob.sync(path.resolve('./modules/*/*.passport.js'));
  files.forEach(file => require(file)(passport));
  app.use(passport.initialize());
  app.use(passport.session());
};

exports.init = () => {
  initMiddleware();
  initLog();
  initRoutes();
  initPassport();
};

