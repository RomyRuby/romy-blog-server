const userController = require('./user.controller');


module.exports = router => {
  router.get('/users/info', userController.getInfo);
};