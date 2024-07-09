const userController = require('./user.controller');
const { checkRoles } = require('../../tools/acl');


module.exports = router => {
  router.get('/users/info', checkRoles('test'), userController.getInfo);
};