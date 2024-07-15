const passport = require('koa-passport');

exports.checkRoles = (roles) => {
  return async function (ctx, next) {
    if (typeof roles === 'string') {
      roles = [roles];
    }

    if (roles.includes('user')) {
      return passport.authenticate('jwt', { session: false })(ctx, next);
    }
  };
};

