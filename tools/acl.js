

exports.checkRoles = (roles) => {
  return async function (ctx, next) {
    ctx.state.roles = roles;
    next();
  };
};

