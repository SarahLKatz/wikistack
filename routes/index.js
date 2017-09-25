const router = require('express').Router();

router.use('/wiki', require('./wiki'));
router.use('/user', require('./user'));

module.exports = router;