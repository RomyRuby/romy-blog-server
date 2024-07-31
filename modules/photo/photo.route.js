const photos = require('./photo.controller');

/**
 * photos
 */
module.exports = router => {
  router.get('/photos', photos.list)
    .post('/photo', photos.create);
};