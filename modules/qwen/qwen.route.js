const qwen = require('./qwen.controller');


module.exports = router => {
  router.post('/qwen', qwen.qwenChat);
};
