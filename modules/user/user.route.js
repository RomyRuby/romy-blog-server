const userController = require('./user.controller');
const { checkRoles } = require('../../tools/acl');


module.exports = router => {
  router
    .post('/users/login', userController.login)
    .post('/users/signUp', userController.signUp)
    .get('/users', checkRoles('admin'), userController.list)
    .get('/users/info', checkRoles('user'), userController.getInfo);
};